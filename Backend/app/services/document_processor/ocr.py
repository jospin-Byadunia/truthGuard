from paddleocr import PaddleOCR


class OCRService:
    def __init__(self, lang: str = "en"):
        self.ocr = PaddleOCR(
    lang=lang,
    enable_mkldnn=False
)

    async def extract_text(self, image_path: str) -> str:
        result = self.ocr.predict(image_path)

        lines = []

        for page in result:
            for text in page["rec_texts"]:
                lines.append(text)

        return "\n".join(lines)