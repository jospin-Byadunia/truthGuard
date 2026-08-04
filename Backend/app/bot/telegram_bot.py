from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

from app.Core.config import BOT_TOKEN, OPENAI_API_KEY
from app.services.getarticle import get_articles
from app.bot.handlers.photo import handle_photo
from app.bot.handlers.url import handle_url
from app.utils.logger import logger

import openai
import re


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


# URL detection pattern
URL_PATTERN = r"https?://[^\s]+"


# OpenAI client
client = openai.OpenAI(
    api_key=OPENAI_API_KEY
)


async def start(update, context):

    if update.message:

        logger.info(
            f"User {update.effective_user.id} started the bot"
        )

        await update.message.reply_text(
            WELCOME_MESSAGE
        )

async def help_command(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE
):

    if update.message:
        await update.message.reply_text(
            HELP_MESSAGE
        )


async def handle_message(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE
):

    if not update.message or not update.message.text:
        return


    user_text = update.message.text.strip()


    print("TEXT MESSAGE:")
    print(user_text)


    # Fetch related articles
    article_context = await get_articles(
        user_text
    )


    response = client.chat.completions.create(
        model="gpt-5.5",
        messages=[
            {
                "role": "system",
                "content": """
You are a fact-checking assistant.

Your tasks:

- Analyze news claims.
- Compare claims with provided sources.
- Determine if information is true, false, misleading, or partially true.
- Explain reasoning.
- Provide confidence percentage.

Rules:
- Do not invent sources.
- Only use provided articles as evidence.
"""
            },

            {
                "role": "user",
                "content": f"""
Claim from user:

{user_text}


Available news sources:

{article_context}


Perform fact checking.
"""
            }
        ]
    )


    await update.message.reply_text(
        response.choices[0].message.content
    )



def create_bot():

    application = Application.builder().token(
        BOT_TOKEN
    ).build()


    application.add_handler(
        MessageHandler(
            filters.Regex(URL_PATTERN),
            handle_url
        )
    )

    application.add_handler(
        MessageHandler(
            filters.PHOTO
            & filters.CaptionRegex(URL_PATTERN),
            handle_url
        )
    )

    application.add_handler(
        CommandHandler(
            "start",
            start
        )
    )


    application.add_handler(
        CommandHandler(
            "help",
            help_command
        )
    )


    application.add_handler(
        MessageHandler(
            filters.PHOTO,
            handle_photo
        )
    )


    application.add_handler(
        MessageHandler(
            filters.TEXT
            & ~filters.COMMAND
            & ~filters.Regex(URL_PATTERN),
            handle_message
        )
    )


    print("Bot is running...")

    return application



if __name__ == "__main__":

    bot = create_bot()

    bot.run_polling()