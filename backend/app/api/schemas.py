from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str = "ok"
    service: str = "minecopilot-api"


class DashboardSummary(BaseModel):
    risk_score: int
    productivity_delta: float
    lean_waste: float
    availability: float
    waiting_time: float
    route_deviation: float
    fuel_consumption: float
    critical_equipment: list[dict]


class ChatRequest(BaseModel):
    question: str = Field(..., min_length=1, max_length=500)


class ChatResponse(BaseModel):
    answer: str
    evidence: list[str] = []
    sources: list[str] = []


class RiskRequest(BaseModel):
    limit: int = 5


class AnalysisRequest(BaseModel):
    question: str
    risk_score: float | None = None
    productivity_delta: float | None = None


class RAGQueryRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=500)
    limit: int = 3
