from typing import List, Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Query, Header
from ..models.order import OrderCreateRequest, OrderResponse
from ..services.order_service import order_service
from .auth import verify_token

router = APIRouter(prefix="/api/orders", tags=["Orders"])

@router.post("", response_model=OrderResponse)
async def create_order(request: OrderCreateRequest, authorization: Optional[str] = Header(None)):
    if not request.items:
        raise HTTPException(status_code=400, detail="Cart cannot be empty when creating an order.")
    
    # If token is provided, verify caller identity and bind securely
    if authorization:
        token = authorization.replace("Bearer ", "").strip()
        auth_user_id = verify_token(token)
        if auth_user_id:
            request.user_id = auth_user_id

    try:
        order = order_service.create_order(request)
        return order
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Unable to process order. Please check your items and try again.")

@router.get("/my-orders", response_model=List[OrderResponse])
async def get_my_orders(
    user_id: Optional[str] = Query(None, description="Patron User ID"),
    authorization: Optional[str] = Header(None)
):
    """Returns order history for the specified authenticated patron."""
    target_user_id = user_id
    if authorization:
        token = authorization.replace("Bearer ", "").strip()
        auth_user_id = verify_token(token)
        if auth_user_id:
            target_user_id = auth_user_id

    if not target_user_id:
        return []
    return order_service.get_orders_for_user(target_user_id)

@router.get("/{order_id}")
async def get_order_status(order_id: str):
    order = order_service.get_order(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
