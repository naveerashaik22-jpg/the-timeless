from typing import Optional, List
from fastapi import APIRouter, Query, HTTPException
from ..models.menu import MenuItem, MenuResponse
from ..database.db import db

router = APIRouter(prefix="/api/menu", tags=["Menu"])

@router.get("", response_model=MenuResponse)
async def get_menu(
    category: Optional[str] = Query(None, description="Filter by category"),
    dietary: Optional[str] = Query(None, description="Filter by dietary tag (e.g. vegetarian, vegan)"),
    search: Optional[str] = Query(None, description="Search in name or description")
):
    items = db.get_all_menu()

    if category:
        items = [i for i in items if i.category.lower() == category.lower()]

    if dietary:
        d = dietary.lower()
        items = [i for i in items if any(d in t.lower() for t in i.dietary_tags)]

    if search:
        s = search.lower()
        items = [
            i for i in items
            if s in i.name.lower() or s in i.description.lower() or any(s in ing.lower() for ing in i.ingredients)
        ]

    categories = list(dict.fromkeys(item.category for item in db.get_all_menu()))

    return MenuResponse(
        items=items,
        total=len(items),
        categories=categories
    )

@router.get("/{item_id}", response_model=MenuItem)
async def get_menu_item(item_id: str):
    item = db.get_menu_item_by_id(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return item
