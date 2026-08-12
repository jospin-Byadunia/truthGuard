import os
import httpx
from dotenv import load_dotenv

from app.services.lang_service import AILanguageService
from app.utils.logger import logger

load_dotenv()

FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY")
FIRECRAWL_URL = "https://api.firecrawl.dev/v2/search"

ai_service = AILanguageService()


async def detect_language(text: str) -> str:
    return (await ai_service.detect_language_gpt(text))["iso_code"].lower()


async def get_articles(query: str, limit: int = 5) -> str:
    search_query = query.replace("\n", " ").strip()[:200]
    logger.info(f"Searching Firecrawl for: {search_query}")

    # Detect language ISO code (e.g., 'en', 'fr')
    iso_lang = await detect_language(search_query)

    headers = {
        "Authorization": f"Bearer {FIRECRAWL_API_KEY}",
        "Content-Type": "application/json",
    }

    # Firecrawl POST search parameters
    payload = {
        "query": search_query,
        "limit": limit,
        "sources": ["web"],
        "scrapeOptions": {
            "onlyMainContent": True,
            "formats": ["markdown"],
        },
    }

    # ISO 639-1 code conversion to uppercase country/region fallback if required by location-sensitive queries
    if iso_lang:
        payload["country"] = iso_lang.upper()

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                FIRECRAWL_URL, json=payload, headers=headers, timeout=30.0
            )

        logger.info(f"Firecrawl API status code: {response.status_code}")
        response.raise_for_status()

        data = response.json()

        if not data.get("success", False):
            logger.error(f"Firecrawl returned an error: {data}")
            return ""

        # Extract articles/results list
        results = data.get("data", {}).get("web", []) or data.get("data", [])

        article_context = ""

        for i, item in enumerate(results):
            title = item.get("title", "No Title")
            url = item.get("url", "")
            description = item.get("description", "")
            content = item.get("markdown", "") or item.get("snippet", "")

            # Truncate scraped page body to avoid overwhelming prompt context windows
            truncated_content = content[:500] if content else description

            article_context += f"""
Article {i + 1}
Title: {title}
Description: {description}
Content Summary: {truncated_content}
Source: {url}

"""

        return article_context

    except httpx.HTTPStatusError as e:
        logger.error(f"HTTP error occurred while calling Firecrawl: {e}")
        return ""
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}")
        return ""