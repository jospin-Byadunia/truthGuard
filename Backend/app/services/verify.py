from app.services.ai_service import AIService
import traceback
from app.utils.logger import logger


class VerificationService:

    def __init__(self):
        self.ai = AIService()

    async def verify(self, claim: str):

        try:
            result = await self.ai.verify_news(claim)
            if result is None:
                return {
                    "verdict": "Error",
                    "confidence": 0,
                    "explanation": "AI service returned no response.",
                    "sources": [],
                    "claim": claim,
                }

            return {
                "verdict": result.get("verdict", "Unknown"),
                "confidence": result.get("confidence", 0),
                "explanation": result.get("explanation", ""),
                "sources": result.get("sources", []),
                "claim": claim,
            }

        except Exception as e:

            traceback.print_exc()

            return {
                "verdict": "Error",
                "confidence": 0,
                "explanation": str(e),
                "sources": [],
                "claim": claim,
            }