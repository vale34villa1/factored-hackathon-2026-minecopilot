from fastapi import APIRouter

from app.api.schemas import RAGQueryRequest
from app.services.rag_service import RAGService

router = APIRouter()
rservice = RAGService()


@router.post("/search")
def search_knowledge(payload: RAGQueryRequest):
    return rservice.search(payload.query, limit=payload.limit)


@router.post("/ingest")
def ingest_documents():
    return rservice.ingest_documents()
