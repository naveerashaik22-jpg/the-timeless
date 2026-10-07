from typing import List, Optional, Dict, Any
from fastapi import APIRouter, HTTPException
from ..models.order import OrderCreateRequest, OrderResponse
from ..services.order_service import order_service

router = APIRouter(prefix="/api/orders", tags=["Orders"])

@router.post("", response_model=OrderResponse)
async def create_order(request: OrderCreateRequest):
    if not request.items:
        raise HTTPException(status_code=400, detail="Cart cannot be empty when creating an order")
    order = order_service.create_order(request)
    return order

@router.get("/{order_id}")
async def get_order_status(order_id: str):
    order = order_service.get_order(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
