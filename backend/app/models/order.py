from typing import List, Optional
from pydantic import BaseModel, Field

class CartItem(BaseModel):
    item_id: str
    name: str
    price: int
    quantity: int = Field(ge=1, default=1)
    category: str
    image: Optional[str] = None
    customization_notes: Optional[str] = None

class OrderCreateRequest(BaseModel):
    items: List[CartItem]
    user_id: Optional[str] = None
    customer_name: Optional[str] = "Guest Traveler"
    table_or_zone: Optional[str] = "The Timeless Main Lounge"
    special_instructions: Optional[str] = None
    applied_mood: Optional[str] = None

class OrderResponse(BaseModel):
    order_id: str
    user_id: Optional[str] = None
    customer_name: Optional[str] = "Guest Traveler"
    status: str
    created_at: str
    items: List[CartItem]
    subtotal: int
    tax: int
    total: int
    table_or_zone: str
    estimated_prep_time_minutes: int
    message: str
