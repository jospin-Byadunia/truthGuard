import time
import traceback

from app.services.ai_service import AIService

from app.utils.cache import (
    create_cache_key,
    get_cached,
    set_cached,
)

from app.database.repository import save_verification


class VerificationService:

    def __init__(self):
        self.ai = AIService()

    async def verify(
        self,
        claim: str,
        platform: str = "api",
        request_type: str = "text",
    ):

        start_time = time.perf_counter()

        try:

            cache_key = create_cache_key(claim)

            # Check cache
            cached_result = get_cached(cache_key)

            if cached_result is not None:

                print("CACHE HIT")

                return cached_result

            print("CACHE MISS")

            # AI verification
            result = await self.ai.verify_news(claim)

            if not isinstance(result, dict):

                raise ValueError(
                    "AI service returned an invalid response."
                )

            execution_time = (
                time.perf_counter() - start_time
            )

            final_result = {
                "verdict": result.get(
                    "verdict",
                    "Unknown"
                ),

                "confidence": result.get(
                    "confidence",
                    0
                ),

                "explanation": result.get(
                    "explanation",
                    ""
                ),

                "sources": result.get(
                    "sources",
                    []
                ),

                "ocr_text": claim,
            }

            # Save in cache
            set_cached(
                cache_key,
                final_result
            )

            # Save in database
            save_verification(
                platform=platform,
                request_type=request_type,
                claim=claim,
                verdict=final_result["verdict"],
                confidence=final_result["confidence"],
                explanation=final_result["explanation"],
                sources=final_result["sources"],
                execution_time=execution_time,
            )

            return final_result

        except Exception as e:

            traceback.print_exc()

            return {
                "verdict": "Error",
                "confidence": 0,
                "explanation": str(e),
                "sources": [],
                "ocr_text": claim,
            }