import random
import datetime
from typing import List, Dict, Any, Optional
from ..models.order import OrderCreateRequest, OrderResponse
from ..database.db import db

class OrderService:
    @staticmethod
    def create_order(request: OrderCreateRequest) -> OrderResponse:
        now = datetime.datetime.now()
        date_str = now.strftime("%Y%m%d")
        random_suffix = f"{random.randint(1000, 9999)}"
        order_id = f"TT-{date_str}-{random_suffix}"
        
        subtotal = sum(item.price * item.quantity for item in request.items)
        tax = int(subtotal * 0.05)  # 5% GST
        total = subtotal + tax
        prep_time = max(8, min(25, 6 + len(request.items) * 3))

        order_dict = {
            "order_id": order_id,
            "status": "Order Received & Brewing",
            "created_at": now.strftime("%I:%M %p, %d %b %Y"),
            "items": [item.model_dump() for item in request.items],
            "subtotal": subtotal,
            "tax": tax,
            "total": total,
            "table_or_zone": request.table_or_zone or "The Timeless Main Lounge",
            "estimated_prep_time_minutes": prep_time,
            "message": "Your order has been received by our baristas and kitchen artisans. We will bring it directly to your seating area when ready."
        }

        db.save_order(order_dict)

        return OrderResponse(
            order_id=order_id,
            status="Order Received & Brewing",
            created_at=order_dict["created_at"],
            items=request.items,
            subtotal=subtotal,
            tax=tax,
            total=total,
            table_or_zone=order_dict["table_or_zone"],
            estimated_prep_time_minutes=prep_time,
            message=order_dict["message"]
        )

    @staticmethod
    def get_order(order_id: str) -> Optional[Dict[str, Any]]:
        return db.get_order(order_id)

order_service = OrderService()
