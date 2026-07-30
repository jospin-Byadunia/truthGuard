from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

from Core.config import BOT_TOKEN, OPENAI_API_KEY
import openai
from services.getarticle import get_articles

WELCOME_MESSAGE = """
👋 Welcome to NewsGuardian!

Send me:

📰 News text

📷 Screenshot

🔗 News link

and I'll verify it.
"""

HELP_MESSAGE = """
Send me:
• News text
• A screenshot
• A news URL

I'll analyze it and explain the result.
"""

client = openai.OpenAI(api_key=OPENAI_API_KEY)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.message:
        await update.message.reply_text(WELCOME_MESSAGE)

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.message:
        await update.message.reply_text(
            "You can send me news articles or links, and I'll help you verify their authenticity."
        )


async def handle_message(update, context):
    if not update.message or not update.message.text:
        return
    user_text = update.message.text
    # Get 10 first articles from the web related to the user_text
    article_context = get_articles(user_text)
    # Add the articles to the user_text for context
    response = client.chat.completions.create(
        model="gpt-5.5",
        messages=[
             {
            "role": "system",
            "content": """
You are a fact-checking assistant.

Your task:
- Analyze news claims.
- Compare claims with provided sources.
- Determine if information is true, false, misleading, or partially true.
- Explain your reasoning.
- Provide a truth confidence percentage.

Do not invent sources.
Only use the provided articles as evidence.
"""
        },
        {
            "role": "user",
            "content": f"""
Claim from user:

{user_text}


Available news sources:

{article_context}


Now perform a fact check.
"""
        }
        ]
    )


    await update.message.reply_text(
        response.choices[0].message.content
    )


def create_bot():
    application = Application.builder().token(BOT_TOKEN).build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    return application

if __name__ == "__main__":
    bot = create_bot()
    bot.run_polling()