from fastapi import APIRouter, HTTPException
from ..models.mood import ChatRequest, ChatResponse
from ..services.ai_service import ai_service

router = APIRouter(prefix="/api/chat", tags=["Chat & Mood Assistant"])

@router.post("", response_model=ChatResponse)
async def chat_with_companion(request: ChatRequest):
    try:
        response = ai_service.process_chat(
            message=request.message,
            session_id=request.session_id or "default-session",
            history=request.history,
            current_preferences=request.current_preferences
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in chat processing: {str(e)}")
