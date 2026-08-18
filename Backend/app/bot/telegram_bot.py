from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

from app.Core.config import BOT_TOKEN

from app.bot.handlers.photo import handle_photo
from app.bot.handlers.url import handle_url
from app.bot.handlers.text import handle_text

from app.utils.logger import logger


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


async def start(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE
):

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


def create_bot():

    application = (
        Application
        .builder()
        .token(BOT_TOKEN)
        .build()
    )

    # -----------------------------
    # URL messages
    # -----------------------------

    application.add_handler(
        MessageHandler(
            filters.Regex(URL_PATTERN),
            handle_url
        )
    )

    # -----------------------------
    # Photo + URL caption
    # -----------------------------

    application.add_handler(
        MessageHandler(
            filters.PHOTO
            & filters.CaptionRegex(URL_PATTERN),
            handle_url
        )
    )

    # -----------------------------
    # Commands
    # -----------------------------

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

    # -----------------------------
    # Photo verification
    # -----------------------------

    application.add_handler(
        MessageHandler(
            filters.PHOTO,
            handle_photo
        )
    )

    # -----------------------------
    # Text verification
    # -----------------------------

    application.add_handler(
        MessageHandler(
            filters.TEXT
            & ~filters.COMMAND
            & ~filters.Regex(URL_PATTERN),
            handle_text
        )
    )

    logger.info("Bot is running...")

    return application


if __name__ == "__main__":

    bot = create_bot()

    bot.run_polling()