from fastapi import APIRouter, UploadFile, File, HTTPException,Form
from pathlib import Path
import shutil
import uuid

from app.services.document_processor.ocr import OCRService
from app.services.verify import VerificationService


router = APIRouter(prefix="/verify", tags=["Verification"])

ocr = OCRService()
verifier = VerificationService()

UPLOAD_DIR = Path("storage/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/photo")
async def verify_photo(file: UploadFile = File(...),
    caption: str = Form("")):
    # Accept only images
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")

    # Unique filename
    filename = f"{uuid.uuid4()}_{file.filename}"
    image_path = UPLOAD_DIR / filename

    # Save uploaded image
    with image_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        extracted_text = await ocr.extract_text(str(image_path))

        print("=" * 50)
        print("OCR OUTPUT:")
        print(repr(extracted_text))
        print("=" * 50)

        # Stop if nothing was extracted and no caption exists
        if not extracted_text.strip() and not caption.strip():
            return {
                "verdict": "No text detected",
                "confidence": 0,
                "explanation": "No readable text was found in the image and no caption was provided.",
                "sources": [],
                "ocr_text": ""
            }

        # Build the claim
        claim_parts = []

        if caption.strip():
            claim_parts.append(f"Caption:\n{caption}")

        if extracted_text.strip():
            claim_parts.append(f"Image Text:\n{extracted_text}")

        claim = "\n\n".join(claim_parts)

        print("=" * 50)
        print("CLAIM:")
        print(claim)
        print("=" * 50)

        # Verify
        result = await verifier.verify(claim)
        print("=" * 50)
        print("VERIFICATION RESULT:")
        print(result)
        print("=" * 50)

        return result

    finally:
        # Always clean up
        if image_path.exists():
            image_path.unlink()