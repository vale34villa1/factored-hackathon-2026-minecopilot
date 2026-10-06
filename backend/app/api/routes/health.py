from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("/")
def healthcheck():
    return {"status": "ok", "service": "minecopilot-api"}
