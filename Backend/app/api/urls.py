from fastapi import APIRouter
from app.services.url_service import extract_article
from app.services.verify import VerificationService
from app.schemas.url import URLRequest
from app.utils.logger import logger


verifier = VerificationService()

router = APIRouter(
    prefix="/verify",
    tags=["Verification"]
)


@router.post("/url", tags=["URL Extraction"])
async def get_url_data(request: URLRequest):

    url = request.url
    logger.info(f"URL received: {url}")
    caption = request.caption

    try:
        # Extract article content
        article = await extract_article(url)

        # Check if extraction failed
        if not article or not article.get("text", "").strip():
            return {
                "verdict": "No text detected",
                "confidence": 0,
                "explanation": "No readable text was found in the article.",
                "sources": []
            }


        claim_parts = []

        if caption and caption.strip():
            claim_parts.append(
                f"Caption:\n{caption}"
            )

        if article.get("title") and article["title"].strip():
            claim_parts.append(
                f"Article Title:\n{article['title']}"
            )


        if not claim_parts:
            return {
                "verdict": "No relevant content found",
                "confidence": 0,
                "explanation": "No relevant content was found in the article.",
                "sources": []
            }


        claim = "\n\n".join(claim_parts)
        result = await verifier.verify(claim)
        return result


    except Exception as e:

       logger.exception(f"URL verification failed: {e}")