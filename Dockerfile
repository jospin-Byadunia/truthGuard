# 1. Base Image
FROM python:3.10-slim

EXPOSE 8000

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 2. System Dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgl1 \
    libglx-mesa0 \
    libglib2.0-0 \
    libgomp1 \
    && rm -rf /var/lib/apt-get/lists/*

RUN python -m pip install --no-cache-dir --upgrade pip

# 3. PaddlePaddle CPU Installation
RUN python -m pip install --no-cache-dir paddlepaddle==3.3.1 -f https://www.paddlepaddle.org.cn/whl/linux/cpu-mkl/stable.html

# 4. Copy and Install Requirements
COPY requirements.txt .
RUN python -m pip install --no-cache-dir -r requirements.txt

# 5. Set Working Directory & Copy Backend Code
WORKDIR /app
COPY . /app

# Set PYTHONPATH to /app/backend so "from app.api.routes import router" resolves cleanly
ENV PYTHONPATH=/app/backend

# 6. Non-Root User Setup
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

# 7. Start Command (points directly to backend.main:app)
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "-k", "uvicorn.workers.UvicornWorker", "backend.main:app"]