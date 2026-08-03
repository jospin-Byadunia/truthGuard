from telegram import Update
from telegram.ext import ContextTypes
import httpx

API_URL = "http://localhost:8000/verify/url"


async def handle_url(update: Update, context: ContextTypes.DEFAULT_TYPE):

    if not update.message or not update.message.text:
        return

    url = update.message.text.strip()
    caption = update.message.caption or ""

    try:
        async with httpx.AsyncClient(timeout=30) as client:

            response = await client.post(
                API_URL,
                json={
                    "url": url,
                    "claim": caption
                }
            )

            response.raise_for_status()

            data = response.json()

            print(f"Received response: {data}")

            message = f"""
✅ URL verification successful!

🔗 URL:
{url}

📄 Article:
{data.get("article_text", "N/A")}

explanation:
{data.get("explanation", "N/A")}

⚖️ Verdict:
{data.get("verdict", "N/A")}
"""

            await update.message.reply_text(message)

    except httpx.HTTPError as e:
        await update.message.reply_text(
            f"❌ Error verifying URL: {str(e)}"
        )