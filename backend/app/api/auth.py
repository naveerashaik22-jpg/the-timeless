import hmac
import hashlib
import time
import os
from typing import Optional, Dict, Any, List
from fastapi import APIRouter, HTTPException, Header, Depends
from pydantic import BaseModel, EmailStr
from ..database.sqlite_db import sqlite_db
from ..services.order_service import order_service

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

SECRET_KEY = os.getenv("SECRET_KEY", "the-aves-vintage-sanctuary-secret-key-2026")

def generate_token(user_id: str) -> str:
    timestamp = str(int(time.time()))
    payload = f"{user_id}:{timestamp}"
    signature = hmac.new(SECRET_KEY.encode(), payload.encode(), hashlib.sha256).hexdigest()
    return f"{user_id}.{timestamp}.{signature}"

def verify_token(token: str) -> Optional[str]:
    try:
        parts = token.split(".")
        if len(parts) != 3:
            return None
        user_id, timestamp, signature = parts
        # Allow tokens for 30 days
        if int(time.time()) - int(timestamp) > 30 * 86400:
            return None
        payload = f"{user_id}:{timestamp}"
        expected_sig = hmac.new(SECRET_KEY.encode(), payload.encode(), hashlib.sha256).hexdigest()
        if hmac.compare_digest(signature, expected_sig):
            return user_id
        return None
    except Exception:
        return None

# --- REQUEST / RESPONSE SCHEMAS ---
class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class GuestSessionRequest(BaseModel):
    guest_name: Optional[str] = "Guest Traveler"

class UpdatePreferencesRequest(BaseModel):
    preferences: Dict[str, Any]

class AddMemoryRequest(BaseModel):
    statement: str
    category: Optional[str] = "Taste Pattern"

class ToggleFavoriteRequest(BaseModel):
    item_id: str

def format_user_profile(user_data: Dict[str, Any], token: Optional[str] = None) -> Dict[str, Any]:
    user_id = user_data["id"]
    favorites = sqlite_db.get_user_favorites(user_id)
    memories = sqlite_db.get_user_memories(user_id)
    return {
        "id": user_id,
        "name": user_data["name"],
        "email": user_data["email"],
        "avatar": user_data.get("avatar") or "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        "member_since": user_data.get("member_since") or "Autumn 2026 • Verified Patron",
        "is_guest": bool(user_data.get("is_guest", 0)),
        "preferences": user_data.get("preferences") or {},
        "favorites": favorites,
        "memories": memories,
        "token": token or generate_token(user_id)
    }

# --- ROUTES ---
@router.post("/register")
async def register(req: RegisterRequest):
    if not req.name.strip():
        raise HTTPException(status_code=400, detail="Name cannot be empty.")
    if "@" not in req.email or "." not in req.email:
        raise HTTPException(status_code=400, detail="Please enter a valid email address.")
    if len(req.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters.")

    existing = sqlite_db.get_user_by_email(req.email)
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email already exists. Please sign in.")

    new_user = sqlite_db.create_user(
        email=req.email,
        password=req.password,
        name=req.name,
        is_guest=False
    )
    token = generate_token(new_user["id"])
    return format_user_profile(new_user, token)

@router.post("/login")
async def login(req: LoginRequest):
    if not req.email or not req.password:
        raise HTTPException(status_code=400, detail="Please provide both email and password.")

    user = sqlite_db.get_user_by_email(req.email)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    if not sqlite_db.verify_password(req.password, user["password_hash"], user["salt"]):
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    token = generate_token(user["id"])
    return format_user_profile(user, token)

@router.post("/guest")
async def create_guest_session(req: GuestSessionRequest):
    guest_name = req.guest_name.strip() if req.guest_name else "Guest Traveler"
    random_hex = os.urandom(3).hex()
    guest_email = f"guest_{random_hex}@aves.tabletop"
    guest_user = sqlite_db.create_user(
        email=guest_email,
        password=os.urandom(16).hex(),
        name=guest_name,
        is_guest=True
    )
    token = generate_token(guest_user["id"])
    return format_user_profile(guest_user, token)

@router.get("/me")
async def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authentication token required.")

    token = authorization.replace("Bearer ", "").strip()
    user_id = verify_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Session expired or invalid. Please sign in again.")

    user = sqlite_db.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Patron profile not found.")

    return format_user_profile(user, token)

@router.put("/preferences")
async def update_preferences(req: UpdatePreferencesRequest, authorization: Optional[str] = Header(None)):
    token = (authorization or "").replace("Bearer ", "").strip()
    user_id = verify_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    sqlite_db.update_user_preferences(user_id, req.preferences)
    user = sqlite_db.get_user_by_id(user_id)
    return format_user_profile(user, token)

@router.post("/favorites/toggle")
async def toggle_favorite(req: ToggleFavoriteRequest, authorization: Optional[str] = Header(None)):
    token = (authorization or "").replace("Bearer ", "").strip()
    user_id = verify_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    is_favorited = sqlite_db.toggle_user_favorite(user_id, req.item_id)
    return {"item_id": req.item_id, "is_favorited": is_favorited}

@router.post("/memories")
async def add_memory(req: AddMemoryRequest, authorization: Optional[str] = Header(None)):
    token = (authorization or "").replace("Bearer ", "").strip()
    user_id = verify_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    mem = sqlite_db.add_user_memory(user_id, req.statement, req.category or "Taste Pattern")
    return mem

@router.delete("/memories/{memory_id}")
async def delete_memory(memory_id: str, authorization: Optional[str] = Header(None)):
    token = (authorization or "").replace("Bearer ", "").strip()
    user_id = verify_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    success = sqlite_db.delete_user_memory(memory_id, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="Memory not found or already deleted.")
    return {"status": "deleted", "id": memory_id}
