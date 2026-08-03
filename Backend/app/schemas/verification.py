from pydantic import BaseModel

class VerificationRequest(BaseModel):
    claim: str


class VerificationResponse(BaseModel):
    verdict: str
    explanation: str
    confidence: float = None