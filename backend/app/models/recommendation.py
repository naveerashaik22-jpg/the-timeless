from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from .menu import MenuItem

class MatchBreakdown(BaseModel):
    mood_score: float = 0.0
    taste_score: float = 0.0
    dietary_score: float = 0.0
    temperature_score: float = 0.0
    sweet_spice_score: float = 0.0
    budget_score: float = 0.0
    total_score: float = 0.0

class RecommendationItem(BaseModel):
    item: MenuItem
    match_score: float
    breakdown: MatchBreakdown
    why_it_matches: str
    pairing_suggestion: Optional[str] = None

class ZoneRecommendation(BaseModel):
    zone_id: str
    name: str
    tagline: str
    description: str
    seating_name: str
    ambiance: str
    why_it_fits: str
    image: str

class RecommendationResponse(BaseModel):
    mood: Optional[str]
    detected_preferences: Dict[str, Any]
    recommendations: List[RecommendationItem]
    zone_recommendation: Optional[ZoneRecommendation] = None
    summary_message: str
