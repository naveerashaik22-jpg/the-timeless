from fastapi import APIRouter
from ..models.mood import DetectedPreferences
from ..models.recommendation import RecommendationResponse, RecommendationItem
from ..services.recommender import recommender

router = APIRouter(prefix="/api/recommend", tags=["Recommendation Engine"])

@router.post("", response_model=RecommendationResponse)
async def get_recommendations(preferences: DetectedPreferences):
    recs = recommender.recommend(preferences, limit=3)
    zone = recommender.recommend_zone(preferences)
    
    summary = f"Curated {len(recs)} personalized selections matching your {preferences.mood or 'current'} mood."
    
    return RecommendationResponse(
        mood=preferences.mood,
        detected_preferences=preferences.model_dump(),
        recommendations=recs,
        zone_recommendation=zone,
        summary_message=summary
    )
