import requests
import httpx
from dotenv import load_dotenv
import os

load_dotenv()

NEWSAPI_KEY = os.getenv("NEWSAPI_KEY")
URL = "https://newsapi.org/v2/everything"

from app.services.lang_service import AILanguageService
from app.utils.logger import logger
ai_service = AILanguageService()

async def detect_language(text: str) -> str:
    return (await ai_service.detect_language_gpt(text))["iso_code"].lower()


async def get_articles(query: str) -> str:
    search_query = query.replace("\n", " ").strip()[:200]
    logger.info(f"Searching NewsAPI for: {search_query}")
    language = await detect_language(search_query)
    params = {
        "q": search_query,
        "sortBy": "publishedAt",
        "language": language,
        "sortBy": "popularity",
        "pageSize": 5,
        "apiKey": NEWSAPI_KEY,
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(URL, params=params)

    response.raise_for_status()
    data = response.json()
    

    logger.info(
        f"NewsAPI status code: {response.status_code}"
    )

    if data.get("status") != "ok":
        logger.error(f"NewsAPI returned an error: {data}")
        return ""

    articles = data.get("articles", [])

    article_context = ""

    for i, article in enumerate(articles):
        article_context += f"""
Article {i + 1}
Title: {article.get('title', '')}
Description: {article.get('description', '')}
Source: {article.get('url', '')}

"""

    return article_context