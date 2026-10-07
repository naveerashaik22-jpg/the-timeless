from typing import List, Optional, Dict, Any, Literal
from pydantic import BaseModel, Field

class DetectedPreferences(BaseModel):
    mood: Optional[str] = None
    mood_confidence: float = 0.0
    dietary: Optional[str] = None  # vegetarian, vegan, non-veg, gluten-free, etc.
    taste: Optional[str] = None  # sweet, savoury, spicy, mild, refreshing, etc.
    temperature: Optional[str] = None  # hot, cold, room
    sweetness: Optional[str] = None  # low, medium, high, zero
    spice: Optional[str] = None  # mild, medium, spicy, fiery
    heaviness: Optional[str] = None  # light, medium, filling
    beverage_type: Optional[str] = None  # coffee, tea, cooler, elixir, herbal
    dessert_preference: Optional[bool] = None
    activity: Optional[str] = None  # reading, working, chatting, relaxing, celebrating
    budget: Optional[int] = None
    allergies: List[str] = Field(default_factory=list)

class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str
    timestamp: Optional[str] = None
    extracted_preferences: Optional[DetectedPreferences] = None
    recommendations: Optional[List[Dict[str, Any]]] = None
    zone_recommendation: Optional[Dict[str, Any]] = None
    follow_up_question: Optional[str] = None

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = "default-session"
    history: List[ChatMessage] = Field(default_factory=list)
    current_preferences: Optional[DetectedPreferences] = None

class ChatResponse(BaseModel):
    session_id: str
    reply: str
    mood: Optional[str] = None
    preferences: DetectedPreferences
    recommendations: List[Dict[str, Any]] = Field(default_factory=list)
    zone_recommendation: Optional[Dict[str, Any]] = None
    follow_up_question: Optional[str] = None
    is_faq: bool = False
    is_safety_redirect: bool = False
