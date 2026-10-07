from typing import List, Dict, Any, Optional, Tuple
from ..models.menu import MenuItem
from ..models.mood import DetectedPreferences
from ..models.recommendation import RecommendationItem, MatchBreakdown, ZoneRecommendation
from ..database.db import db

# Default scoring weights (Section 7 in prompt: customizable weights)
DEFAULT_WEIGHTS = {
    "mood": 0.35,
    "taste": 0.20,
    "dietary": 0.15,
    "temperature": 0.10,
    "sweet_spice": 0.10,
    "budget_heaviness": 0.10
}

class Recommender:
    def __init__(self, weights: Optional[Dict[str, float]] = None):
        self.weights = weights or DEFAULT_WEIGHTS

    def score_item(self, item: MenuItem, pref: DetectedPreferences) -> Tuple[float, MatchBreakdown]:
        mood_score = 0.0
        taste_score = 0.0
        dietary_score = 0.0
        temp_score = 0.0
        sweet_spice_score = 0.0
        budget_heaviness_score = 0.0

        # 1. Strict Dietary Constraint Check (Hard Filter & Scoring)
        if pref.dietary:
            diet = pref.dietary.lower()
            if diet in ["vegan", "plant-based"]:
                if "vegan" in item.dietary_tags or "vegan-option" in item.dietary_tags:
                    dietary_score = 1.0
                else:
                    return 0.0, MatchBreakdown()
            elif diet in ["vegetarian", "veg", "pure veg"]:
                if "vegetarian" in item.dietary_tags:
                    dietary_score = 1.0
                else:
                    return 0.0, MatchBreakdown()
            elif diet in ["gluten-free", "celiac"]:
                if "gluten-free" in item.dietary_tags or "gluten-free-available" in item.dietary_tags:
                    dietary_score = 1.0
                else:
                    return 0.0, MatchBreakdown()
        else:
            dietary_score = 0.8

        # 2. Mood Score (35%)
        if pref.mood:
            target_mood = pref.mood.lower()
            if target_mood in [m.lower() for m in item.mood_tags]:
                mood_score = 1.0
            else:
                related_mood_map = {
                    "tired": ["low-energy", "calm"],
                    "low-energy": ["tired", "calm"],
                    "calm": ["focused", "nostalgic"],
                    "focused": ["calm", "energetic"],
                    "happy": ["celebratory", "social"],
                    "celebratory": ["happy", "social", "curious"],
                    "energetic": ["happy", "focused"],
                    "nostalgic": ["calm", "tired"],
                    "social": ["happy", "celebratory"],
                    "curious": ["celebratory", "energetic"]
                }
                related = related_mood_map.get(target_mood, [])
                for rel in related:
                    if rel in [m.lower() for m in item.mood_tags]:
                        mood_score = max(mood_score, 0.6)
        else:
            mood_score = 0.5

        # 3. Taste Score (20%)
        if pref.taste:
            target_taste = pref.taste.lower()
            item_tastes = [t.lower() for t in item.taste_tags]
            if target_taste in item_tastes:
                taste_score = 1.0
            elif target_taste == "traditional":
                if "traditional" in item_tastes or "classic" in item.name.lower() or "vintage" in item.name.lower() or "heritage" in item.name.lower():
                    taste_score = 1.0
                else:
                    taste_score = 0.3
            elif target_taste == "comforting":
                if "comforting" in item_tastes or "warm" in item_tastes:
                    taste_score = 1.0
                else:
                    taste_score = 0.4
            elif target_taste == "sweet" and item.sweetness_level >= 2:
                taste_score = 0.9
            elif target_taste == "spicy" and item.spice_level >= 2:
                taste_score = 0.9
            elif target_taste == "savoury" and item.spice_level >= 1:
                taste_score = 0.8
            elif target_taste == "refreshing" and ("refreshing" in item_tastes or "cooling" in item_tastes or item.temperature == "cold"):
                taste_score = 0.95
            else:
                taste_score = 0.2
        else:
            taste_score = 0.6

        # 4. Temperature Score (10%)
        if pref.temperature:
            if item.temperature == pref.temperature:
                temp_score = 1.0
            elif item.temperature == "room":
                temp_score = 0.5
            else:
                temp_score = 0.2
        else:
            temp_score = 0.7

        # 5. Sweetness / Spice Score (10%)
        if pref.sweetness:
            if pref.sweetness == "low" and item.sweetness_level <= 2:
                sweet_spice_score += 0.5
            elif pref.sweetness == "high" and item.sweetness_level >= 3:
                sweet_spice_score += 0.5
            elif pref.sweetness == "zero" and item.sweetness_level == 0:
                sweet_spice_score += 0.5
        else:
            sweet_spice_score += 0.35

        if pref.spice:
            if pref.spice == "spicy" and item.spice_level >= 3:
                sweet_spice_score += 0.5
            elif pref.spice == "mild" and item.spice_level <= 1:
                sweet_spice_score += 0.5
        else:
            sweet_spice_score += 0.35
        sweet_spice_score = min(sweet_spice_score, 1.0)

        # 6. Heaviness / Beverage / Budget Score (10%)
        if pref.heaviness:
            if item.heaviness == pref.heaviness:
                budget_heaviness_score += 0.5
            elif pref.heaviness == "light" and item.heaviness == "medium":
                budget_heaviness_score += 0.3
        else:
            budget_heaviness_score += 0.3

        if pref.beverage_type:
            bev = pref.beverage_type.lower()
            if bev in ["coffee", "latte", "espresso"] and any(k in item.name.lower() for k in ["coffee", "latte", "brew", "espresso", "mocha"]):
                budget_heaviness_score += 0.5
            elif bev in ["tea", "chai"] and any(k in item.name.lower() for k in ["tea", "chai", "infusion"]):
                budget_heaviness_score += 0.5
            elif bev in ["cooler", "tonic", "sparkler", "rose milk"] and item.category == "COLD BEVERAGES":
                budget_heaviness_score += 0.5
        else:
            budget_heaviness_score += 0.2

        if pref.dessert_preference and item.category == "DESSERTS":
            budget_heaviness_score += 0.3

        budget_heaviness_score = min(budget_heaviness_score, 1.0)

        total = (
            mood_score * self.weights["mood"] +
            taste_score * self.weights["taste"] +
            dietary_score * self.weights["dietary"] +
            temp_score * self.weights["temperature"] +
            sweet_spice_score * self.weights["sweet_spice"] +
            budget_heaviness_score * self.weights["budget_heaviness"]
        )

        breakdown = MatchBreakdown(
            mood_score=round(mood_score, 2),
            taste_score=round(taste_score, 2),
            dietary_score=round(dietary_score, 2),
            temperature_score=round(temp_score, 2),
            sweet_spice_score=round(sweet_spice_score, 2),
            budget_score=round(budget_heaviness_score, 2),
            total_score=round(total, 2)
        )
        return total, breakdown

    def generate_why_rationale(self, item: MenuItem, pref: DetectedPreferences, mood: str) -> str:
        mood_str = (pref.mood or mood or "your moment").lower()
        
        if mood_str in ["tired", "low-energy"]:
            if item.temperature == "hot":
                return "Warm, deeply comforting and restorative - carefully crafted to soothe away tiredness and bring a calming reset."
            else:
                return "A refreshing, hydrating lift that gently restores your vitality without overwhelming your senses."
        elif mood_str in ["happy", "celebratory"]:
            if "SIGNATURE" in item.category or "DESSERT" in item.category:
                return "An indulgent, celebratory masterpiece with exquisite notes to make this joyful moment feel extraordinary."
            else:
                return "Vibrant, uplifting and delightfully crisp - a joyful pairing for your high spirits."
        elif mood_str in ["calm", "focused"]:
            return "Gentle, balanced and grounding - pairs effortlessly with reading, journaling, or quiet deep contemplation."
        elif mood_str == "nostalgic":
            return "Rich with time-honored heritage flavor and vintage warmth, evoking fond memories with every sip and bite."
        elif mood_str == "energetic":
            return "Bold, invigorating and spirited to fuel your momentum and keep your energy glowing."
        elif mood_str == "curious":
            return "An inventive harmony of unexpected botanical layers and artisanal craft to delight your curiosity."
        elif mood_str == "social":
            return "Wonderfully shareable and conversational, bringing warmth and flavor to time spent with friends."
        else:
            return "Balanced, aromatic, and hand-prepared to perfectly harmonize with how you feel right now."

    def recommend(self, pref: DetectedPreferences, limit: int = 3) -> List[RecommendationItem]:
        all_items = db.get_all_menu()
        scored_items = []

        for item in all_items:
            score, breakdown = self.score_item(item, pref)
            if score > 0:
                scored_items.append((score, breakdown, item))

        scored_items.sort(key=lambda x: x[0], reverse=True)

        results: List[RecommendationItem] = []
        seen_categories = set()
        
        for score, breakdown, item in scored_items:
            if len(results) >= limit:
                break
            if item.category not in seen_categories or len(results) == 0:
                seen_categories.add(item.category)
                why = self.generate_why_rationale(item, pref, pref.mood or "calm")
                results.append(RecommendationItem(
                    item=item,
                    match_score=round(score * 100, 1),
                    breakdown=breakdown,
                    why_it_matches=why
                ))

        if len(results) < limit:
            for score, breakdown, item in scored_items:
                if len(results) >= limit:
                    break
                if item.id not in [r.item.id for r in results]:
                    why = self.generate_why_rationale(item, pref, pref.mood or "calm")
                    results.append(RecommendationItem(
                        item=item,
                        match_score=round(score * 100, 1),
                        breakdown=breakdown,
                        why_it_matches=why
                    ))

        return results

    def recommend_zone(self, pref: DetectedPreferences) -> ZoneRecommendation:
        mood = (pref.mood or "calm").lower()
        activity = (pref.activity or "").lower()

        if activity in ["reading", "study", "writing"] or mood in ["calm", "focused", "nostalgic"]:
            return ZoneRecommendation(
                zone_id="zone-ink-ember",
                name="Ink & Ember",
                tagline="Reading & Writing Sanctuary",
                description="Secluded library alcove lined with vintage oak bookshelves and deep leather wingback armchairs.",
                seating_name="Corner Armchair near the Brass Hearth Lamp",
                ambiance="Quiet fireplace glow, turn-of-the-page silence, soft rain acoustics",
                why_it_fits="The absolute ideal sanctuary to lose yourself in a book, journal, or enjoy peaceful solitary contemplation.",
                image="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
            )
        elif mood in ["tired", "low-energy"]:
            return ZoneRecommendation(
                zone_id="zone-tranquil-nook",
                name="The Tranquil Nook",
                tagline="Botanical Mindful Retreat",
                description="A sun-drenched sanctuary bordered by hanging ferns, soft floor cushions, and gentle water murmurs.",
                seating_name="Sunlit Linen Bay with Cushion Bench",
                ambiance="Soft natural light, gentle water trickle, calming eucalyptus mist",
                why_it_fits="Designed specifically for restorative pauses where you can unwind tension and breathe deeply.",
                image="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80"
            )
        elif mood == "nostalgic":
            return ZoneRecommendation(
                zone_id="zone-retro",
                name="Retro",
                tagline="Vinyl Lounge & 70s Nostalgia",
                description="Golden-era salon with analog turntable listening stations, vintage vinyl records, and corduroy booths.",
                seating_name="Turntable Booth #4 with Master Audio Headphones",
                ambiance="Warm vinyl crackle, classic jazz & soul, warm walnut aesthetics",
                why_it_fits="Immerse in timeless records and vintage café charm that transports you back in time.",
                image="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80"
            )
        elif mood in ["social", "happy", "celebratory"]:
            return ZoneRecommendation(
                zone_id="zone-tiny-tales",
                name="Tiny Tales",
                tagline="Intimate Stories & Connection Corner",
                description="Cozy semi-private round tables designed for lively conversations and shared memories.",
                seating_name="The Round Oak Gathering Table",
                ambiance="Intimate table lamps, soft acoustic melodies, celebratory warmth",
                why_it_fits="Perfect for sharing laughter, delightful bites, and celebrating special moments together.",
                image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
            )
        elif mood == "focused":
            return ZoneRecommendation(
                zone_id="zone-echo-booth",
                name="Echo Booth",
                tagline="Solo Contemplation & Deep Focus Pod",
                description="Acoustically insulated wooden pods with dedicated brass task lighting and integrated charging.",
                seating_name="Solo Focus Pod #2",
                ambiance="Targeted white noise, noise-canceling headphones, distraction-free glow",
                why_it_fits="Zero distraction and supreme ergonomic comfort to help you accomplish deep work or study.",
                image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
            )
        else:
            return ZoneRecommendation(
                zone_id="zone-timeless",
                name="The Timeless",
                tagline="Grand Vintage Café & Clockwork Lounge",
                description="The centerpiece lounge with restored pendulum clocks, espresso aromas, and artisanal mahogany seating.",
                seating_name="Pendulum Lounge Table #7",
                ambiance="Warm amber lighting, soft acoustic piano, gentle café hum",
                why_it_fits="A timeless café ambiance where time slows down and every moment feels cherished.",
                image="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
            )

recommender = Recommender()
