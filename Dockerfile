# 1. Lock Python to 3.10 slim
FROM python:3.10-slim

EXPOSE 8000

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# 2. Install system dependencies required by OpenCV & Paddle
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgl1 \
    libglx-mesa0 \
    libglib2.0-0 \
    libgomp1 \
    && rm -rf /var/lib/apt-get/lists/*

# Upgrade pip
RUN python -m pip install --no-cache-dir --upgrade pip

# 3. Pre-install PaddlePaddle CPU wheel
RUN python -m pip install --no-cache-dir paddlepaddle==3.3.1 -f https://www.paddlepaddle.org.cn/whl/linux/cpu-mkl/stable.html

# 4. Install remaining pip requirements
COPY requirements.txt .
RUN python -m pip install --no-cache-dir -r requirements.txt

# 5. Copy repo and set working directory to backend/
COPY . /app
WORKDIR /app/backend

# Set Python module search path to backend/
ENV PYTHONPATH=/app/backend

# 6. Non-root user setup
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

# 7. Start server pointing to app/main.py
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "-k", "uvicorn.workers.UvicornWorker", "app.main:app"]