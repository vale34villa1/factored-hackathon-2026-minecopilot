from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.analysis import router as analysis_router
from app.api.routes.chat import router as chat_router
from app.api.routes.dashboard import router as dashboard_router
from app.api.routes.health import router as health_router
from app.api.routes.rag import router as rag_router
from app.config import settings

app = FastAPI(
    title="MineCopilot AI",
    description="Conversational mining intelligence API",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, tags=["health"])
app.include_router(dashboard_router, prefix="/api/dashboard", tags=["dashboard"])
app.include_router(analysis_router, prefix="/api/analysis", tags=["analysis"])
app.include_router(chat_router, prefix="/api/chat", tags=["chat"])
app.include_router(rag_router, prefix="/api/rag", tags=["rag"])


@app.get("/")
def root():
    return {"message": "MineCopilot AI API is running."}
