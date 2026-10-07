from typing import List, Optional
from pydantic import BaseModel, Field

class AnonymousPostcard(BaseModel):
    id: str
    theme: str
    location: str
    date: str
    message: str
    likes: int = 0
    replies_count: int = 0

class SendPostcardRequest(BaseModel):
    theme: str = "Everyday Moment"
    message: str
    location: str = "Sent from The AVES Lounge"

class TimeCapsuleLantern(BaseModel):
    id: str
    author_alias: str = "Anonymous Dreamer"
    target_recipient: str = "My Future Self"  # Future Self, Past Self, Someone Important, Unknown Stranger
    letter_content: str
    created_at: str
    unlock_date: str
    sealed: bool = True
    lantern_color: str = "#E5C378"

class WhisperedWallMessage(BaseModel):
    id: str
    text: str
    poetic_version: str
    timestamp: str
