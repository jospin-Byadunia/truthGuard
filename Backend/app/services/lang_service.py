from openai import AsyncOpenAI
from app.Core.config import OPENAI_API_KEY
import json


class AILanguageService:
    def __init__(self):
        self.client = AsyncOpenAI(api_key=OPENAI_API_KEY)
    
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
    