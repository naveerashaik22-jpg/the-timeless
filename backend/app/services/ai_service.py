import os
import re
from typing import List, Dict, Any, Optional
from ..models.mood import DetectedPreferences, ChatMessage, ChatResponse
from ..models.recommendation import RecommendationItem, ZoneRecommendation
from .mood_extractor import MoodExtractor
from .recommender import recommender
from .faq_service import faq_service

class AIService:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.client = None
        if self.api_key:
            try:
                from google import genai
                self.client = genai.Client(api_key=self.api_key)
            except Exception:
                self.client = None

    def process_chat(
        self,
        message: str,
        session_id: str = "default-session",
        history: Optional[List[ChatMessage]] = None,
        current_preferences: Optional[DetectedPreferences] = None
    ) -> ChatResponse:
        history = history or []
        trimmed_message = message.strip()
        
        if not trimmed_message:
            return ChatResponse(
                session_id=session_id,
                reply="I'm here whenever you'd like to share how you're feeling today. Take your time.",
                preferences=current_preferences or DetectedPreferences(),
                recommendations=[],
                is_faq=False
            )

        # 1. Check for Safety Distress / Severe Emotional Crisis
        if MoodExtractor.is_safety_distress(trimmed_message):
            safe_reply = (
                "I hear how much pain and weight you're carrying right now, and I want you to know you are not alone. "
                "While I am only a café companion and not a counselor or healthcare professional, please be gentle with yourself. "
                "If you need someone to talk to right now, please consider reaching out to a trusted friend, loved one, or a compassionate support helpline. "
                "Here at The Timeless, our doors are always open if you simply want a warm, quiet corner and a soothing cup of tea."
            )
            safe_prefs = DetectedPreferences(mood="calm")
            recs = recommender.recommend(safe_prefs, limit=2)
            zone = recommender.recommend_zone(safe_prefs)
            return ChatResponse(
                session_id=session_id,
                reply=safe_reply,
                mood="calm",
                preferences=safe_prefs,
                recommendations=[r.model_dump() for r in recs],
                zone_recommendation=zone.model_dump(),
                is_safety_redirect=True
            )

        # 2. Check for Direct Dietary or Preference Correction
        is_diet_correction = False
        lower_msg = trimmed_message.lower()
        if re.search(r"^(i'm|i am|make it|keep it|only|actually)\s*(vegetarian|veg|vegan|gluten-free|plant-based)", lower_msg):
            is_diet_correction = True

        # Extract updated preferences from message and history
        updated_prefs, _ = MoodExtractor.extract_from_text(trimmed_message, current_preferences)

        if is_diet_correction:
            diet_name = updated_prefs.dietary or "vegetarian"
            recs = recommender.recommend(updated_prefs, limit=3)
            zone = recommender.recommend_zone(updated_prefs)
            reply = f"Understood - I've updated your preference to {diet_name}. All future recommendations will strictly respect this."
            return ChatResponse(
                session_id=session_id,
                reply=reply,
                mood=updated_prefs.mood,
                preferences=updated_prefs,
                recommendations=[r.model_dump() for r in recs],
                zone_recommendation=zone.model_dump()
            )

        # 3. Check FAQ Knowledge Base
        faq_result = faq_service.find_matching_faq(trimmed_message)
        if faq_result and not any(k in lower_msg for k in ["i feel", "i'm feeling", "i am", "mood", "tired", "happy", "exhausted", "hungry"]):
            faq_item, _ = faq_result
            return ChatResponse(
                session_id=session_id,
                reply=faq_item.answer,
                mood=updated_prefs.mood,
                preferences=updated_prefs,
                recommendations=[],
                is_faq=True
            )

        # 4. Generate Recommendations based on Mood & Preferences
        recs = recommender.recommend(updated_prefs, limit=3)
        zone = recommender.recommend_zone(updated_prefs)
        follow_up = MoodExtractor.get_smart_follow_up(updated_prefs, trimmed_message)

        # 5. Synthesize Emotionally Intelligent Natural Language Response
        reply = self._generate_companion_reply(trimmed_message, updated_prefs, recs, zone)

        return ChatResponse(
            session_id=session_id,
            reply=reply,
            mood=updated_prefs.mood,
            preferences=updated_prefs,
            recommendations=[r.model_dump() for r in recs],
            zone_recommendation=zone.model_dump(),
            follow_up_question=follow_up,
            is_faq=False
        )

    def _generate_companion_reply(
        self,
        user_message: str,
        prefs: DetectedPreferences,
        recs: List[RecommendationItem],
        zone: ZoneRecommendation
    ) -> str:
        mood = prefs.mood or "reflective"
        item_names = [r.item.name for r in recs]
        primary_pick = item_names[0] if item_names else "Warm Vanilla Latte"
        secondary_pick = item_names[1] if len(item_names) > 1 else None

        if mood == "tired":
            if "college" in user_message.lower() or "study" in user_message.lower():
                return (
                    f"Sounds like college took a lot out of you today. Let's slow time down for a moment.\n\n"
                    f"**My pick:** {primary_pick}" + (f" + {secondary_pick}" if secondary_pick else "") + "\n\n"
                    f"**Why:** A gentle, comforting combination to soothe your fatigue and restore your spirit without feeling heavy."
                )
            return (
                f"Sounds like you need something gentle and comforting after a long day.\n\n"
                f"**My pick:** {primary_pick}" + (f" + {secondary_pick}" if secondary_pick else "") + "\n\n"
                f"**Why:** A warm, restorative pairing that brings comfort without weighing you down."
            )
        elif mood == "happy":
            return (
                f"I love hearing that! Let's elevate that wonderful energy with something truly vibrant.\n\n"
                f"**My pick:** {primary_pick}" + (f" + {secondary_pick}" if secondary_pick else "") + "\n\n"
                f"**Why:** Bright, delightful flavors crafted to match your joyful moment."
            )
        elif mood == "celebratory":
            return (
                f"Cheers to this special moment! A celebration deserves nothing less than our most exquisite handcrafted creations.\n\n"
                f"**My pick:** {primary_pick}" + (f" + {secondary_pick}" if secondary_pick else "") + "\n\n"
                f"**Why:** An indulgent, celebratory pairing to mark your milestone in timeless style."
            )
        elif mood == "nostalgic":
            return (
                f"There is a unique beauty in reminiscing. Let's surround you with time-honored heritage tastes.\n\n"
                f"**My pick:** {primary_pick}" + (f" + {secondary_pick}" if secondary_pick else "") + "\n\n"
                f"**Why:** Classic, authentic flavors that carry the timeless warmth of golden memories."
            )
        elif mood == "calm":
            if "read" in user_message.lower() or "alone" in user_message.lower():
                return (
                    f"A quiet moment with a good book is one of life's greatest pleasures.\n\n"
                    f"**My pick:** {primary_pick}" + (f" + {secondary_pick}" if secondary_pick else "") + "\n\n"
                    f"**Why:** Subtle, aromatic notes that linger softly while you get lost in your pages."
                )
            return (
                f"Embracing a peaceful moment is so important. Here is a balanced, serene pairing for your pause.\n\n"
                f"**My pick:** {primary_pick}" + (f" + {secondary_pick}" if secondary_pick else "") + "\n\n"
                f"**Why:** Grounding and delicate notes designed to maintain your tranquil rhythm."
            )
        elif mood == "energetic":
            return (
                f"Feeling energized and ready to take on the world! Here's something with bold character to keep your momentum going.\n\n"
                f"**My pick:** {primary_pick}" + (f" + {secondary_pick}" if secondary_pick else "") + "\n\n"
                f"**Why:** Crisp, spirited flavors to fuel your drive."
            )
        elif mood == "focused":
            return (
                f"Setting up for deep focus requires clean, harmonious fuel that won't cause a slump.\n\n"
                f"**My pick:** {primary_pick}" + (f" + {secondary_pick}" if secondary_pick else "") + "\n\n"
                f"**Why:** Clean, stimulating notes to sustain your concentration and clarity."
            )
        elif mood == "curious":
            return (
                f"Curiosity is always rewarded here at The Timeless. Here is an adventurous botanical discovery for your palate.\n\n"
                f"**My pick:** {primary_pick}" + (f" + {secondary_pick}" if secondary_pick else "") + "\n\n"
                f"**Why:** Distinctive artisanal craft and multi-layered notes unlike anything ordinary."
            )
        elif mood == "social":
            return (
                f"Wonderful conversations are best accompanied by shared warmth and memorable flavors.\n\n"
                f"**My pick:** {primary_pick}" + (f" + {secondary_pick}" if secondary_pick else "") + "\n\n"
                f"**Why:** Wonderfully balanced and crowd-pleasing notes to enjoy with your company."
            )
        else:
            return (
                f"Thank you for sharing how you feel. I've curated a personalized café experience tailored for your moment.\n\n"
                f"**My pick:** {primary_pick}" + (f" + {secondary_pick}" if secondary_pick else "") + "\n\n"
                f"**Why:** Balanced, comforting notes that harmonize with your current state."
            )

ai_service = AIService()
