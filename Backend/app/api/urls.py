from fastapi import APIRouter
from app.services.url_service import extract_article
from app.services.verify import VerificationService
from app.schemas.url import URLRequest


verifier = VerificationService()

router = APIRouter(
    prefix="/verify",
    tags=["Verification"]
)


@router.post("/url", tags=["URL Extraction"])
async def get_url_data(request: URLRequest):

    url = request.url
    caption = request.caption

    print("=" * 50)
    print("URL RECEIVED:")
    print(url)
    print("CAPTION RECEIVED:")
    print(caption)
    print("=" * 50)

    try:
        # Extract article content
        article = await extract_article(url)

        print("=" * 50)
        print("EXTRACTION OUTPUT:")
        print(repr(article))
        print("=" * 50)


        # Check if extraction failed
        if not article or not article.get("text", "").strip():
            return {
                "verdict": "No text detected",
                "confidence": 0,
                "explanation": "No readable text was found in the article.",
                "sources": []
            }


        # Build claim from available information
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


        print("=" * 50)
        print("CLAIM SENT FOR VERIFICATION:")
        print(claim)
        print("=" * 50)


        # Verify with GPT
        result = await verifier.verify(claim)


        print("=" * 50)
        print("VERIFICATION RESULT:")
        print(result)
        print("=" * 50)


        return result


    except Exception as e:

        print("=" * 50)
        print("ERROR:")
        print(str(e))
        print("=" * 50)

        return {
            "error": str(e)
        }