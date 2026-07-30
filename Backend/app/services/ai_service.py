from openai import AsyncOpenAI
from Core.config import OPENAI_API_KEY
from services.getarticle import get_articles


class AIService:
    def __init__(self):
        self.client = AsyncOpenAI(api_key=OPENAI_API_KEY)

    async def verify_news(self, text: str):
        article_context = await get_articles(text)

        response = await self.client.responses.create(
            model="gpt-5.5",
            input=[
                             {
            "role": "system",
            "content": """
You are a fact-checking assistant.

Your task:
- Analyze news claims.
- Compare claims with provided sources.
- Determine if information is true, false, misleading, or partially true.
- Explain your reasoning.
- Provide a truth confidence percentage.

Do not invent sources.
Only use the provided articles as evidence.
"""
        },
        {
            "role": "user",
            "content": f"""
Claim from user:

{text}


Available news sources:

{article_context}


Now perform a fact check.
"""
        }
            ]
        )

        return response.output_text