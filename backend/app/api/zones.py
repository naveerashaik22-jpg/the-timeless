from typing import List, Dict, Any
from fastapi import APIRouter
from ..database.db import db

router = APIRouter(prefix="/api/zones", tags=["AVES Experiential Zones"])

@router.get("", response_model=List[Dict[str, Any]])
async def get_zones():
    return db.get_all_zones()
