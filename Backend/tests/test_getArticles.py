import asyncio
from app.services.getarticle import get_articles


async def main():
    result = await get_articles("Mbongwana ya klima ezali lokuta")
    print(result)

if __name__ == "__main__":
    asyncio.run(main())