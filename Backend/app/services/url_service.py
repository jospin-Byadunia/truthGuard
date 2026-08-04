from newspaper import Article
from app.utils.logger import logger


async def extract_article(url):

    article = Article(url)

    article.download()
    article.parse()
    
    logger.info("Article extraction DONE")
   

    return {
        "title": article.title,
        "text": article.text,
        "url": url
    }
    
