import uuid
import datetime
from typing import List, Dict, Any
from fastapi import APIRouter
from ..models.retro import RetroEra, PhotoBoothTemplate, PhotoBoothCaptureRequest
from ..database.db import db

router = APIRouter(prefix="/api/retro", tags=["Retro Memory Studio"])

@router.get("/closet", response_model=List[RetroEra])
async def get_retro_closet():
    return [RetroEra(**era) for era in db.get_retro_eras()]

@router.get("/templates", response_model=List[PhotoBoothTemplate])
async def get_photo_booth_templates():
    return [PhotoBoothTemplate(**tpl) for tpl in db.get_photo_booth_templates()]

@router.post("/capture")
async def capture_photo_booth_strip(request: PhotoBoothCaptureRequest):
    strip_id = f"retro-{uuid.uuid4().hex[:8]}"
    now = datetime.datetime.now().strftime("%d %b %Y, %I:%M %p")
    
    photo_strip = {
        "strip_id": strip_id,
        "template_id": request.template_id,
        "era_name": request.era_name,
        "caption": request.custom_caption or "A moment preserved across eras",
        "created_at": now,
        "image_url": request.image_url or "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
        "stamp": "RETRO PHOTO STUDIO • THE AVES ARCHIVES"
    }

    db.save_user_memory("photo_strips", photo_strip)
    return photo_strip
