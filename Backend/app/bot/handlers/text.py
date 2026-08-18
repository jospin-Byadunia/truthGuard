from telegram import Update
from telegram.ext import ContextTypes

from app.services.verify import VerificationService
from app.utils.logger import logger


# Create the verification service once
verifier = VerificationService()


async def handle_text(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE
):
    """
    Handle normal text messages and send them
    to the verification service.
    """

    if not update.message or not update.message.text:
        return

    user_text = update.message.text.strip()

    if not user_text:
        return

    logger.info(
        f"Text verification request from user "
        f"{update.effective_user.id}: {user_text[:100]}"
    )

    try:
        # All verification logic happens inside verify.py
        result = await verifier.verify(user_text)

        # Protect against an unexpected None response
        if not result:
            await update.message.reply_text(
                "❌ Sorry, I could not verify this information right now."
            )
            return

        verdict = result.get("verdict", "Unknown")
        confidence = result.get("confidence", 0)
        explanation = result.get("explanation", "")
        sources = result.get("sources", [])

        # Build Telegram response
        response = (
            f"🔎 Verification Result\n\n"
            f"📌 Verdict: {verdict}\n"
            f"📊 Confidence: {confidence}%\n\n"
            f"💡 Explanation:\n"
            f"{explanation}"
        )

        # Add sources if available
        if sources:
            response += "\n\n🔗 Sources:\n"

            for source in sources:
                response += f"• {source}\n"

        await update.message.reply_text(response)

    except Exception as e:
        logger.exception(
            f"Error verifying text message: {e}"
        )

        await update.message.reply_text(
            "❌ An error occurred while verifying your message. "
            "Please try again later."
        )