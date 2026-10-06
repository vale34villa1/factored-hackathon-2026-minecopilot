from fastapi import APIRouter

from app.services.data_service import DataService

router = APIRouter()
service = DataService()


@router.get("/summary")
def get_dashboard_summary():
    return service.build_summary()


@router.get("/risks")
def get_risks():
    return service.get_risks()


@router.get("/lean")
def get_lean():
    return service.get_lean()


@router.get("/recommendations")
def get_recommendations():
    return service.get_recommendations()


@router.get("/equipment")
def get_equipment():
    return service.get_equipment()
