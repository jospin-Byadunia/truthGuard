from newspaper import Article


async def extract_article(url):

    article = Article(url)

    article.download()
    article.parse()
    
    print("=" * 50)
    print("ARTICLE EXTRACTION:")
    print(article)
    print("=" * 50)

    return {
        "title": article.title,
        "text": article.text,
        "url": url
    }
    
