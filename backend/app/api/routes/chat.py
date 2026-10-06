from fastapi import APIRouter

from app.api.schemas import ChatRequest, ChatResponse
from app.services.llm_service import LLMService

router = APIRouter()
llm_service = LLMService()


@router.post("/ask", response_model=ChatResponse)
def ask_chat(request: ChatRequest):
    answer = llm_service.answer_question(request.question)
    return ChatResponse(**answer)
