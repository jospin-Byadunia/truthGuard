import os
import tempfile
import httpx

from telegram import Update
from telegram.ext import ContextTypes

API_URL = "http://localhost:8000/verify/photo"


async def handle_photo(update: Update, context: ContextTypes.DEFAULT_TYPE):

    if not update.message or not update.message.photo:
        return

    processing = await update.message.reply_text(
        "🔍 Analyzing image..."
    )
    caption = update.message.caption or ""
    photo = update.message.photo[-1]

    telegram_file = await photo.get_file()

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".jpg"
    ) as temp_file:

        await telegram_file.download_to_drive(
            custom_path=temp_file.name
        )

        temp_path = temp_file.name
        print(f"Downloaded image to {temp_path}")

    try:

        async with httpx.AsyncClient(timeout=120) as client:
            with open(temp_path, "rb") as image:
                response = await client.post(
                    API_URL,
                    files={
                        "file": (
                            "image.jpg",
                            image,
                            "image/jpeg"
                        )
                    },
                    data={
                        "caption": caption
                    }
            )
                data = response.json()
                if data is None:
                    await processing.edit_text(
                        "❌ The server returned an empty response."
                    )
                    return
                print(f"Received response: {data}")

        message = f"""
🔍 Fact Check Result

✅ Verdict:
{data['verdict']}

confidence: 
{data['confidence']}%

💡 Explanation:
{data['explanation']}

🔗 Sources:
"""

        for source in data["sources"]:
            message += f"\n• {source}"

        await processing.edit_text(message)

    finally:

        if os.path.exists(temp_path):
            os.remove(temp_path)