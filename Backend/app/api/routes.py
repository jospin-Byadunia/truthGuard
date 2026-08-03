#create POST /verify
from fastapi import APIRouter

from app.schemas.verification import (
    VerificationRequest,
    VerificationResponse
)

from app.services.verify import VerificationService

router = APIRouter()

verifier = VerificationService()


@router.post(
    "/verify",
    response_model=VerificationResponse
)
async def verify_news(request: VerificationRequest):

    result = await verifier.verify(request.text)

    return VerificationResponse(
        verdict=result["verdict"],
        explanation=result["explanation"]
    )