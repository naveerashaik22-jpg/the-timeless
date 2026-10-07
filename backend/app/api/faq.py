from typing import List, Optional
from fastapi import APIRouter, Query
from ..models.faq import FAQItem
from ..database.db import db

router = APIRouter(prefix="/api/faq", tags=["FAQ Knowledge Base"])

@router.get("", response_model=List[FAQItem])
async def get_faqs(search: Optional[str] = Query(None, description="Search term")):
    all_faqs = db.get_all_faq()
    if search:
        s = search.lower()
        return [
            f for f in all_faqs
            if s in f.question.lower() or s in f.answer.lower() or any(s in kw.lower() for kw in f.keywords)
        ]
    return all_faqs
