import random
import datetime
from typing import List, Dict, Any, Optional
from ..models.order import OrderCreateRequest, OrderResponse, CartItem
from ..database.db import db

class OrderService:
    @staticmethod
    def create_order(request: OrderCreateRequest) -> OrderResponse:
        now = datetime.datetime.now()
        date_str = now.strftime("%Y%m%d")
        random_suffix = f"{random.randint(1000, 9999)}"
        order_id = f"TT-{date_str}-{random_suffix}"
        
        # Authoritative server-side pricing and availability validation
        validated_items: List[CartItem] = []
        subtotal = 0
        for item in request.items:
            menu_item = db.get_menu_item_by_id(item.item_id)
            if menu_item:
                if not menu_item.availability:
                    raise ValueError(f"'{menu_item.name}' is currently sold out and unavailable.")
                auth_price = menu_item.price
                auth_name = menu_item.name
                auth_cat = menu_item.category
                auth_img = menu_item.image
            else:
                # Fallback for custom culinary creations (e.g. Custom Kitchen cookies)
                auth_price = item.price
                auth_name = item.name
                auth_cat = item.category
                auth_img = item.image

            validated_item = CartItem(
                item_id=item.item_id,
                name=auth_name,
                price=auth_price,
                quantity=item.quantity,
                category=auth_cat,
                image=auth_img or item.image,
                customization_notes=item.customization_notes
            )
            validated_items.append(validated_item)
            subtotal += auth_price * item.quantity

        tax = int(round(subtotal * 0.05))  # 5% GST
        total = subtotal + tax
        prep_time = max(8, min(25, 6 + len(validated_items) * 3))

        order_dict = {
            "order_id": order_id,
            "user_id": request.user_id,
            "customer_name": request.customer_name or "Guest Traveler",
            "status": "Order Received & Brewing",
            "created_at": now.strftime("%I:%M %p, %d %b %Y"),
            "items": [item.model_dump() for item in validated_items],
            "subtotal": subtotal,
            "tax": tax,
            "total": total,
            "table_or_zone": request.table_or_zone or "The Timeless Main Lounge",
            "estimated_prep_time_minutes": prep_time,
            "special_instructions": request.special_instructions,
            "applied_mood": request.applied_mood,
            "message": "Your order has been received by our baristas and kitchen artisans. We will bring it directly to your seating area when ready."
        }

        db.save_order(order_dict)

        return OrderResponse(
            order_id=order_id,
            user_id=request.user_id,
            customer_name=order_dict["customer_name"],
            status="Order Received & Brewing",
            created_at=order_dict["created_at"],
            items=validated_items,
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

    @staticmethod
    def get_orders_for_user(user_id: Optional[str]) -> List[OrderResponse]:
        if not user_id:
            return []
        raw_orders = db.get_orders_by_user(user_id)
        responses = []
        for o in raw_orders:
            items = [CartItem(**it) for it in o.get("items", [])]
            responses.append(OrderResponse(
                order_id=o["order_id"],
                user_id=o.get("user_id"),
                customer_name=o.get("customer_name") or "Guest Traveler",
                status=o.get("status", "Completed"),
                created_at=o.get("created_at", ""),
                items=items,
                subtotal=o.get("subtotal", 0),
                tax=o.get("tax", 0),
                total=o.get("total", 0),
                table_or_zone=o.get("table_or_zone", "The Timeless Main Lounge"),
                estimated_prep_time_minutes=o.get("prep_time", 12),
                message=o.get("message", "Order archived.")
            ))
        return responses

order_service = OrderService()
