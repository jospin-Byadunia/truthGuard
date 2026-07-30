from pydantic import BaseModel

class VerificationRequest(BaseModel):
    text: str


class VerificationResponse(BaseModel):
    verdict: str
    explanation: str