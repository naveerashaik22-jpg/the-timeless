from typing import Dict, Any, List
from fastapi import APIRouter
from ..database.db import db

router = APIRouter(prefix="/api/my-aves", tags=["My AVES Memory Journal"])

@router.get("", response_model=Dict[str, Any])
async def get_my_aves_memories():
    return db.get_user_memories()

@router.post("/save")
async def save_memory_item(category: str, item: Dict[str, Any]):
    db.save_user_memory(category, item)
    return {"status": "saved", "category": category}
