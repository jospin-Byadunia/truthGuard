import httpx

from telegram import Update
from telegram.ext import ContextTypes
from app.Core.config import API_URL




async def handle_text(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE
):

    if not update.message or not update.message.text:
        return

    user_text = update.message.text.strip()

    if not user_text:
        return

    # Show processing message
    processing = await update.message.reply_text(
        "🔍 Verifying your news..."
    )

    try:

        async with httpx.AsyncClient(
            timeout=120
        ) as client:

            response = await client.post(
                API_URL,
                json={
                    "claim": user_text
                }
            )

            # Check HTTP status
            response.raise_for_status()

            data = response.json()

            if not data:

                await processing.edit_text(
                    "❌ The server returned an empty response."
                )

                return

            print(
                f"Received verification response: {data}"
            )

        # Extract response safely
        verdict = data.get(
            "verdict",
            "Unknown"
        )

        confidence = data.get(
            "confidence",
            0
        )

        explanation = data.get(
            "explanation",
            "No explanation available."
        )

        sources = data.get(
            "sources",
            []
        )

        message = f"""
🔍 Fact Check Result

📌 Verdict:
{verdict}

📊 Confidence:
{confidence}%

💡 Explanation:
{explanation}

🔗 Sources:
"""

        if sources:

            for source in sources:
                message += f"\n• {source}"

        else:

            message += "\nNo sources available."

        await processing.edit_text(
            message
        )

    except httpx.TimeoutException:

        await processing.edit_text(
            "⏱️ The verification server took too long to respond. "
            "Please try again."
        )

    except httpx.HTTPStatusError as e:

        print(
            f"API HTTP error: {e}"
        )

        await processing.edit_text(
            "❌ The verification server returned an error."
        )

    except Exception as e:

        print(
            f"Text verification error: {e}"
        )

        await processing.edit_text(
            "❌ Something went wrong while verifying "
            "your message."
        )