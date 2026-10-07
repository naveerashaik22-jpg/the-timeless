from typing import List, Optional
from pydantic import BaseModel, Field

class BookItem(BaseModel):
    id: str
    title: str
    author: str
    genre: str
    year: str
    mood_tags: List[str]
    vibe: str
    quote: str
    description: str
    cover_image: str
    shelf_location: str
    available_for_exchange: bool = True

class BookRecommendationRequest(BaseModel):
    mood_or_vibe: str
    preferred_genre: Optional[str] = None

class BookRecommendationResponse(BaseModel):
    query: str
    recommended_books: List[BookItem]
    poetic_summary: str
