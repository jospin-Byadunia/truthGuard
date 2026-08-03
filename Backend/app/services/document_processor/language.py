from langdetect import detect
from langdetect.lang_detect_exception import LangDetectException

def detect_language(text: str) -> str:
    if not text or not text.strip():
        return "en"

    try:
        return detect(text)
    except LangDetectException:
        return "en"