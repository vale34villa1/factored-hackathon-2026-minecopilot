from fastapi import APIRouter

from app.api.schemas import AnalysisRequest
from app.services.data_service import DataService

router = APIRouter()
service = DataService()


@router.post("/risk-score")
def get_risk_score(payload: AnalysisRequest):
    return service.score_risk(payload.question)


@router.post("/lean-waste")
def get_lean_waste(payload: AnalysisRequest):
    return service.score_lean(payload.question)


@router.post("/simulate")
def simulate_case(payload: AnalysisRequest):
    return service.simulate_scenario(payload.question)
