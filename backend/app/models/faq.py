from typing import List
from pydantic import BaseModel

class FAQItem(BaseModel):
    id: str
    question: str
    keywords: List[str]
    answer: str
