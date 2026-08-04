# 📰 AI Fact Check Bot

An AI-powered fact-checking chatbot that helps users verify the credibility of news, images, and URLs.

The bot can detect:

- ✅ False or misleading information
- 🤖 AI-generated content
- 📰 Old news presented as current
- 🖼️ Images containing misleading text
- 🔗 News articles shared via URLs

---

# Features

- Telegram Bot
- FastAPI REST API
- OCR using PaddleOCR
- News verification using NewsAPI
- AI-powered reasoning with OpenAI GPT
- URL verification
- Image verification
- Caption support
- Multi-language support
- Modular architecture

---

# Project Structure

```text
app/
│
├── api/
├── bot/
├── services/
├── storage/
├── utils/
├── Core/
└── main.py
```

---

# Tech Stack

### Backend

- Python 3.13
- FastAPI
- Uvicorn

### AI

- OpenAI GPT
- NewsAPI

### OCR

- PaddleOCR

### Messaging

- python-telegram-bot

### HTTP

- httpx
- requests

---

# Installation

Clone the repository

```bash
git clone https://github.com/jospin-Byadunia/truthGuard.git

cd truthGuard
```

Create a virtual environment

```bash
python -m venv env
```

Activate it

Windows

```bash
env\Scripts\activate
```

Linux

```bash
source env/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

---

# Environment Variables

Create a `.env` file.

```text
OPENAI_API_KEY=

NEWSAPI_KEY=

BOT_TOKEN=
```

---

# Running the Backend

```bash
uvicorn app.main:app --reload
```

---

# Running the Telegram Bot

```bash
python -m app.bot.telegram_bot
```

---

# API Endpoints

## Verify Text

```
POST /verify
```

## Verify Image

```
POST /verify/photo
```

## Verify URL

```
POST /verify/url
```

---

# Verification Pipeline

```
Telegram / whatsapp / webapp
↓

Photo / Text / URL

↓

OCR (if image)

↓

NewsAPI Search

↓

OpenAI Analysis

↓

Structured JSON Response

↓

Reply
```

---

# Future Improvements

- WhatsApp integration
- Reverse image search
- Video verification
- Deepfake detection
- Multilingual OCR
- User authentication
- Verification history dashboard
- Redis caching
- PostgreSQL
- Docker
- CI/CD
- Kubernetes deployment

---

# License

MIT License