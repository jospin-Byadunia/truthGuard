# 1. Lock Python to 3.10 slim
FROM python:3.10-slim

EXPOSE 8000

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 2. Install system dependencies required by OpenCV & Paddle (Updated for modern Debian)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgl1 \
    libglx-mesa0 \
    libglib2.0-0 \
    libgomp1 \
    && rm -rf /var/lib/apt-get/lists/*

# Upgrade pip
RUN python -m pip install --no-cache-dir --upgrade pip

# 3. Pre-install PaddlePaddle CPU wheel directly from official mirror
RUN python -m pip install --no-cache-dir paddlepaddle==2.6.1 -f https://www.paddlepaddle.org.cn/whl/linux/cpu-mkl/stable.html

# 4. Install remaining pip requirements
COPY requirements.txt .
RUN python -m pip install --no-cache-dir -r requirements.txt

WORKDIR /app
COPY . /app

# 5. Non-root user setup
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

# 6. Start server (Adjust entry path if main.py is in root vs Backend/)
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "-k", "uvicorn.workers.UvicornWorker", "Backend.main:app"]