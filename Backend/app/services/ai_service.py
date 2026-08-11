from openai import AsyncOpenAI
from app.Core.config import OPENAI_API_KEY
from app.services.getarticle import get_articles
from app.utils.logger import logger
import json


class AIService:
    def __init__(self):
        self.client = AsyncOpenAI(api_key=OPENAI_API_KEY)

    async def verify_news(self, claim: str):
        logger.info(f"Verifying claim: {claim}")
        article_context = await get_articles(claim)
        logger.info("Sending verification request to GPT")
        response = await self.client.responses.create(
            model="gpt-5.5",
            input=[
                {
                    "role": "system",
                    "content": """
    You are a fact-checking assistant.
    
    Return the verification result in the language of the claim.

    Analyze news claims using the provided articles.

    Return ONLY valid JSON:

    {
        "verdict": "true | false | misleading | partially true",
        "confidence": 0-100,
        "explanation": "short explanation",
        "sources_used": [
            "source titles used"
        ]
    }

    Do not invent sources.
    """
                },
                {
                    "role": "user",
                    "content": f"""
    Claim:

    {claim}

    Articles:

    {article_context}
    """
                }
            ]
        )

        logger.info("GPT verification Completed")
        print(f"GPT response: {json.loads(response.output_text)}")
        return json.loads(response.output_text)
    
    
    async def detect_language_gpt(self, text: str):
        response = await self.client.responses.create(
            model="gpt-5.5",
            input=[
                {
                    "role": "system",
                    "content": """
    You are a language detection system.

    Return ONLY valid JSON.

    Schema:

    {
        "language_name": "...",
        "iso_code": "...",
        "confidence": 0-100
    }

    Rules:
    - Use ISO 639-1 codes whenever available (en, fr, sw, ln).
    - If the language has no ISO 639-1 code, use ISO 639-3.
    - Do not explain your answer.
    """
                },
                {
                    "role": "user",
                    "content": text
                }
            ]
        )
        return json.loads(response.output_text)
    