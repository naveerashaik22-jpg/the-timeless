import random
from typing import List, Dict, Any, Optional
from fastapi import APIRouter
from ..database.db import db

router = APIRouter(prefix="/api/tiny-tales", tags=["Tiny Tales Children & Creative Corner"])

@router.get("/events")
async def get_events():
    return db.get_events()

@router.post("/story")
async def generate_kid_story(hero_name: str = "Leo", companion: str = "A clockwork owl", setting: str = "A hidden vintage treehouse"):
    stories = [
        f"Once upon a golden morning, {hero_name} and {companion} discovered a brass key hidden inside {setting}. With a gentle turn of the lock, the ancient doors swung open to reveal a wonderland where imagination painted the sky in stars and every cookie sparkled with stardust.",
        f"In the cozy heart of {setting}, {hero_name} was building a magnificent tower when {companion} brought a message from the Moon Queen: 'Every brave builder who shares kindness receives a magical golden cape!'",
        f"Deep within {setting}, {hero_name} and {companion} set sail on a ship made of book pages and honey waffles, charting a course for the Isle of Whispering Dragons."
    ]
    return {
        "title": f"The Legend of {hero_name} and {companion}",
        "story": random.choice(stories),
        "moral": "Courage, kindness, and wonder make every ordinary day an extraordinary chapter."
    }
