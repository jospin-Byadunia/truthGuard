from services.ai_service import AIService


class VerificationService:
    def __init__(self):
        self.ai = AIService()

    async def verify(self, text: str):
        result = await self.ai.verify_news(text)

        return {
            "verdict": "Analysis Complete",
            "explanation": result
        }