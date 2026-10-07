import re
from typing import Optional, List, Tuple
from ..models.faq import FAQItem
from ..database.db import db

class FAQService:
    @staticmethod
    def find_matching_faq(text: str) -> Optional[Tuple[FAQItem, float]]:
        faqs = db.get_all_faq()
        lower = text.lower()
        
        # Check explicit FAQ triggers like "hours", "open", "wifi", "vegetarian", "reserve", "payment", "quiet"
        best_match: Optional[FAQItem] = None
        best_score: float = 0.0

        for faq in faqs:
            score = 0.0
            # Question title similarity
            words_in_q = [w for w in re.findall(r"\w+", faq.question.lower()) if len(w) > 3]
            for w in words_in_q:
                if w in lower:
                    score += 0.35

            # Keyword match
            for kw in faq.keywords:
                if re.search(r"\b" + re.escape(kw) + r"\b", lower):
                    score += 0.5

            if score > best_score:
                best_score = score
                best_match = faq

        # If significant confidence
        if best_match and best_score >= 0.5:
            return best_match, best_score
        return None

faq_service = FAQService()
