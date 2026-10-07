import uuid
import random
import datetime
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, HTTPException
from ..models.echo import AnonymousPostcard, SendPostcardRequest, TimeCapsuleLantern, WhisperedWallMessage
from ..database.db import db

router = APIRouter(prefix="/api/echo", tags=["Echo Booth • Room of Strangers"])

@router.get("/postcards", response_model=List[AnonymousPostcard])
async def get_postcards():
    return db.get_postcards()

@router.post("/postcards", response_model=AnonymousPostcard)
async def send_anonymous_postcard(req: SendPostcardRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Postcard message cannot be empty")
    
    postcard_id = f"post-{uuid.uuid4().hex[:6]}"
    now = datetime.datetime.now().strftime("%d %B, %I:%M %p")
    
    postcard = AnonymousPostcard(
        id=postcard_id,
        theme=req.theme or "Everyday Moment",
        location=req.location or "Sent from Echo Booth Sanctuary",
        date=now,
        message=req.message.strip(),
        likes=0,
        replies_count=0
    )
    
    db.add_postcard(postcard)
    db.save_user_memory("saved_postcards", postcard.model_dump())
    return postcard

@router.get("/lanterns", response_model=List[TimeCapsuleLantern])
async def get_floating_lanterns():
    return db.get_lanterns()

@router.post("/lanterns", response_model=TimeCapsuleLantern)
async def release_time_capsule_lantern(
    author_alias: Optional[str] = "Anonymous Traveler",
    target_recipient: Optional[str] = "My Future Self",
    letter_content: str = "",
    unlock_years_ahead: int = 1
):
    if not letter_content.strip():
        raise HTTPException(status_code=400, detail="Letter content cannot be empty")

    lantern_id = f"lan-{uuid.uuid4().hex[:6]}"
    now = datetime.datetime.now()
    created_str = now.strftime("%d %b %Y")
    unlock_str = (now + datetime.timedelta(days=365 * max(1, unlock_years_ahead))).strftime("%d %b %Y")

    colors = ["#D4AF37", "#E5C378", "#C5A059", "#DFBE74", "#F39C12"]
    
    lantern = TimeCapsuleLantern(
        id=lantern_id,
        author_alias=author_alias or "Anonymous Traveler",
        target_recipient=target_recipient or "My Future Self",
        letter_content=letter_content.strip(),
        created_at=created_str,
        unlock_date=unlock_str,
        sealed=True,
        lantern_color=random.choice(colors)
    )

    db.add_lantern(lantern)
    db.save_user_memory("time_capsules", lantern.model_dump())
    return lantern

@router.get("/whispered-walls", response_model=List[WhisperedWallMessage])
async def get_whispered_walls():
    return db.get_whispered_walls()

@router.post("/whispered-walls", response_model=WhisperedWallMessage)
async def post_whispered_message(text: str):
    if not text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    # Generate poetic reflection
    poetic_line = f"'{text.strip()}' - A quiet whisper etched into the enduring grain of The AVES."
    
    msg = WhisperedWallMessage(
        id=f"wsp-{uuid.uuid4().hex[:6]}",
        text=text.strip(),
        poetic_version=poetic_line,
        timestamp=datetime.datetime.now().strftime("%I:%M %p")
    )
    db.add_whispered_message(msg)
    return msg
