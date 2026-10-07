import random
from typing import List, Optional
from fastapi import APIRouter, Query, HTTPException
from ..models.book import BookItem, BookRecommendationRequest, BookRecommendationResponse
from ..database.db import db

router = APIRouter(prefix="/api/books", tags=["Ink & Ember Bookstore"])

@router.get("", response_model=List[BookItem])
async def get_books(
    genre: Optional[str] = Query(None, description="Filter by genre"),
    search: Optional[str] = Query(None, description="Search by title or author")
):
    books = db.get_all_books()
    if genre:
        books = [b for b in books if genre.lower() in b.genre.lower()]
    if search:
        s = search.lower()
        books = [b for b in books if s in b.title.lower() or s in b.author.lower() or s in b.description.lower()]
    return books

@router.post("/recommend", response_model=BookRecommendationResponse)
async def recommend_book(request: BookRecommendationRequest):
    query = request.mood_or_vibe.lower()
    books = db.get_all_books()
    
    # Match based on genre, mood tags, vibe or description
    matched = []
    for b in books:
        score = 0
        if any(m in query for m in b.mood_tags):
            score += 2
        if any(w in query for w in b.genre.lower().split()):
            score += 2
        if any(w in query for w in b.vibe.lower().split()):
            score += 1.5
        if "mystery" in query and ("mystery" in b.genre.lower() or "gothic" in b.genre.lower()):
            score += 3
        if "romance" in query and ("romance" in b.genre.lower() or "austen" in b.author.lower()):
            score += 3
        if "philosophy" in query or "reflect" in query and ("philosophy" in b.genre.lower() or "meditations" in b.title.lower()):
            score += 3
        if "child" in query or "fable" in query or "cozy" in query and ("fable" in b.genre.lower() or "little prince" in b.title.lower()):
            score += 3
        if score > 0:
            matched.append((score, b))
    
    matched.sort(key=lambda x: x[0], reverse=True)
    results = [b for _, b in matched[:3]] if matched else books[:2]

    poetic_summary = (
        f"For your desire of '{request.mood_or_vibe}', the antique shelves of Ink & Ember whisper: "
        f"'{results[0].title}' by {results[0].author}. {results[0].quote}"
    )

    return BookRecommendationResponse(
        query=request.mood_or_vibe,
        recommended_books=results,
        poetic_summary=poetic_summary
    )

@router.post("/forgotten-shelf")
async def exchange_book_on_shelf(book_title: str, user_note: Optional[str] = None):
    quote_options = [
        "Words left by strangers in a quiet room are the truest kind of poetry.",
        "To leave a book behind is to trust that the right hands will find it in time.",
        "Between the vintage pages of this volume rests a quiet fragment of memory."
    ]
    selected_quote = random.choice(quote_options)
    
    bookmark = {
        "book_title": book_title,
        "user_note": user_note or "Left with love for a fellow reader.",
        "poetic_blessing": selected_quote,
        "shelf_stamp": "The Forgotten Shelf • Ink & Ember Sanctuary"
    }

    db.save_user_memory("saved_books", bookmark)
    return bookmark
