import re
from typing import Optional, Dict, Any, List, Tuple
from ..models.mood import DetectedPreferences

# 10 Initial Mood Categories
MOOD_PATTERNS = {
    "tired": [
        r"\b(tired|exhausted|drained|fatigued|sleepy|worn out|long day|stress|stressed|after college|after work|burnt out|hectic)\b"
    ],
    "low-energy": [
        r"\b(low energy|sluggish|lazy|lethargic|slow|unmotivated|gloomy|need a break|slow evening|cozy|slow morning)\b"
    ],
    "energetic": [
        r"\b(energetic|pumped|active|hyped|full of energy|workout|gym|kickstart|boost|power through|refreshed|alive)\b"
    ],
    "calm": [
        r"\b(calm|peaceful|relax|relaxed|relaxing|serene|tranquil|chill|unwind|quiet|zen|slow down|gentle|soothing)\b"
    ],
    "happy": [
        r"\b(happy|cheerful|joy|joyful|great mood|good mood|wonderful|smiling|blessed|sunny|feeling good|delighted)\b"
    ],
    "celebratory": [
        r"\b(celebrate|celebrating|celebration|party|milestone|birthday|anniversary|promotion|aced|won|victory|special occasion|treat myself)\b"
    ],
    "curious": [
        r"\b(curious|try something new|adventurous|explore|unique|different|surprise me|unusual|special item|experiment)\b"
    ],
    "nostalgic": [
        r"\b(nostalgic|nostalgia|classic|vintage|old times|memories|childhood|traditional|retro|heritage|comfort food|authentic)\b"
    ],
    "focused": [
        r"\b(focused|focus|study|studying|work|working|read|reading|writing|coding|deep work|deadline|laptop|concentrate)\b"
    ],
    "social": [
        r"\b(social|friends|group|gathering|chatting|catch up|conversation|date|hangout|hanging out|meeting|with my friend)\b"
    ]
}

SAFETY_DISTRESS_PATTERNS = [
    r"\b(suicid|kill myself|end it all|hurt myself|hopeless|depressed|want to die|can't go on|severe depression|self-harm)\b"
]

DIETARY_PATTERNS = {
    "vegan": [r"\b(vegan|plant[- ]based|dairy[- ]free milk)\b"],
    "vegetarian": [r"\b(vegetarian|veg|pure veg|no meat|no non-veg|without egg)\b"],
    "gluten-free": [r"\b(gluten[- ]free|no gluten|celiac)\b"],
    "non-vegetarian": [r"\b(non-veg|non-vegetarian|chicken|meat)\b"]
}

TASTE_PATTERNS = {
    "sweet": [r"\b(sweet|sugary|dessert|waffle|cake|caramel|chocolate|honey|sweetness|sweet tooth|sugar)\b"],
    "savoury": [r"\b(savoury|savory|salted|crispy|garlic|herbs|cheese|toast|sandwich|pasta|fries|crostini)\b"],
    "spicy": [r"\b(spicy|hot spice|chili|chilli|harissa|masala|peppery|zesty|tangy spicy)\b"],
    "mild": [r"\b(mild|not spicy|gentle|bland|subtle|soothing)\b"],
    "refreshing": [r"\b(refreshing|cooler|cooling|sparkling|citrus|fizzy|minty|fruity|crisp)\b"],
    "comforting": [r"\b(comforting|comfort|cozy|warm|soothing)\b"],
    "traditional": [r"\b(classic|traditional|vintage|heritage|authentic|old-school)\b"],
    "earthy": [r"\b(earthy|mushroom|truffle|herbal|turmeric)\b"]
}

TEMPERATURE_PATTERNS = {
    "hot": [r"\b(hot|warm|steaming|freshly brewed|scalded|warmth)\b"],
    "cold": [r"\b(cold|iced|chilled|frozen|cooler|frappe|sparkling|draft|ice)\b"]
}

HEAVINESS_PATTERNS = {
    "light": [r"\b(light|not too heavy|not heavy|quick bite|small|nibble|delicate|snack|guilt-free)\b"],
    "filling": [r"\b(filling|heavy|hearty|hungry|full meal|starving|stuffed|rich|main course)\b"]
}

BEVERAGE_PATTERNS = {
    "coffee": [r"\b(coffee|latte|espresso|cold brew|cappuccino|caffeine|filter coffee|mocha)\b"],
    "tea": [r"\b(tea|chai|masala chai|earl grey|green tea|herbal infusion|tisane)\b"],
    "cooler": [r"\b(cooler|soda|tonic|sparkler|mocktail|lemonade|rose milk)\b"]
}

ACTIVITY_PATTERNS = {
    "reading": [r"\b(read|reading|book|novel|literature|library)\b"],
    "working": [r"\b(work|working|laptop|coding|study|studying|meeting)\b"],
    "relaxing": [r"\b(relax|relaxing|chill|peace|quiet|sit alone|alone|solitude)\b"],
    "celebrating": [r"\b(celebrate|celebrating|date|birthday|friends|hangout)\b"]
}

class MoodExtractor:
    @staticmethod
    def is_safety_distress(text: str) -> bool:
        lower = text.lower()
        for pattern in SAFETY_DISTRESS_PATTERNS:
            if re.search(pattern, lower):
                return True
        return False

    @staticmethod
    def extract_from_text(text: str, previous: Optional[DetectedPreferences] = None) -> Tuple[DetectedPreferences, bool]:
        lower = text.lower()
        pref = previous.model_copy() if previous else DetectedPreferences()
        
        # Check distress
        is_distress = MoodExtractor.is_safety_distress(text)
        if is_distress:
            pref.mood = "calm"
            return pref, True

        # Mood detection
        mood_scores: Dict[str, float] = {}
        for mood, patterns in MOOD_PATTERNS.items():
            score = 0.0
            for pattern in patterns:
                matches = re.findall(pattern, lower)
                score += len(matches) * 1.0
            if score > 0:
                mood_scores[mood] = score

        if mood_scores:
            top_mood = max(mood_scores.items(), key=lambda x: x[1])
            pref.mood = top_mood[0]
            pref.mood_confidence = min(top_mood[1] * 0.5, 1.0)

        # Dietary extraction
        for diet, patterns in DIETARY_PATTERNS.items():
            for pattern in patterns:
                if re.search(pattern, lower):
                    pref.dietary = diet
                    break

        # Taste extraction
        for taste, patterns in TASTE_PATTERNS.items():
            for pattern in patterns:
                if re.search(pattern, lower):
                    pref.taste = taste
                    break

        # Temperature extraction
        for temp, patterns in TEMPERATURE_PATTERNS.items():
            for pattern in patterns:
                if re.search(pattern, lower):
                    pref.temperature = temp
                    break

        # Heaviness extraction
        if re.search(r"\b(not too heavy|not heavy|light)\b", lower):
            pref.heaviness = "light"
        elif re.search(r"\b(filling|heavy|hearty|hungry|full meal|starving)\b", lower):
            pref.heaviness = "filling"

        # Beverage extraction
        for bev, patterns in BEVERAGE_PATTERNS.items():
            for pattern in patterns:
                if re.search(pattern, lower):
                    pref.beverage_type = bev
                    break

        # Activity extraction
        for act, patterns in ACTIVITY_PATTERNS.items():
            for pattern in patterns:
                if re.search(pattern, lower):
                    pref.activity = act
                    break

        # Dessert preference
        if re.search(r"\b(dessert|cake|waffle|panna cotta|cheesecake|fondant|something sweet)\b", lower):
            pref.dessert_preference = True

        # Sweetness / Spice specific levels
        if re.search(r"\b(less sweet|low sugar|mildly sweet|not too sweet)\b", lower):
            pref.sweetness = "low"
        elif re.search(r"\b(extra sweet|sweet|rich sweet)\b", lower):
            pref.sweetness = "high"

        if re.search(r"\b(very spicy|extra spicy|fiery)\b", lower):
            pref.spice = "spicy"
        elif re.search(r"\b(mild spice|mild|not spicy)\b", lower):
            pref.spice = "mild"

        return pref, False

    @staticmethod
    def get_smart_follow_up(pref: DetectedPreferences, user_input: str) -> Optional[str]:
        """
        Determines if a single gentle follow-up question is needed to refine recommendations.
        Avoids asking questions if enough context exists.
        """
        lower = user_input.lower()
        if len(user_input.split()) <= 4 and not pref.taste and not pref.beverage_type and pref.mood in ["tired", "low-energy", "happy"]:
            return "Would you prefer something sweet or savoury to accompany your mood?"
        if pref.mood == "calm" and not pref.beverage_type and not pref.temperature:
            return "Are you in the mood for a warm soothing brew or a chilled botanical refresher?"
        return None
