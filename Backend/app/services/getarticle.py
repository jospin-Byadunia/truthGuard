import requests
from Core.config import NEWSAPI_KEY
from langdetect import detect



url = "https://newsapi.org/v2/everything"

params = {
    "q": "Ebola outbreak",
    "sortBy": "publishedAt",
    "language": "en",
    "apiKey": NEWSAPI_KEY
}

async def get_articles(query):
    params["q"] = query
    params["language"] = detect(query) 
    article_context = ""
    response =  requests.get(url, params=params)
    articles = response.json()["articles"]
    for i, article in enumerate(articles[:10]):  # Get the first 10 articles
        
       article_context += f"""
Article {i}
Title: {article.get('title')}
Description: {article.get('description')}
Source: {article.get('url')}
"""
    print(f"Fetching articles for query: {query} with language: {params['language']}")  
    print(f"Article context for query '{query}': {article_context}")
    return article_context

