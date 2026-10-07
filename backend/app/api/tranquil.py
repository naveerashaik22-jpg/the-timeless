from typing import Dict, Any
from fastapi import APIRouter
from ..database.db import db

router = APIRouter(prefix="/api/tranquil", tags=["The Tranquil Nook"])

@router.get("/data")
async def get_tranquil_data():
    return db.get_tranquil_data()
