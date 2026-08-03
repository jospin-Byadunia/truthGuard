from app.services.url_service import extract_article
import asyncio

async def main():
    url = "https://www.bbc.com/news/live/c74y9d19jd7t"
    result = await extract_article(url)
    print(result)
    
asyncio.run(main())