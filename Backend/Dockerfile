# 1. Lock Python to 3.11 slim
FROM python:3.11-slim
EXPOSE 8000
ENV MAKEFLAGS="-j1"
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_ROOT_USER_ACTION=ignore

# 2. Install system dependencies required by OpenCV & Paddle
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgl1 \
    libglx-mesa0 \
    libglib2.0-0 \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Set primary working directory early
WORKDIR /app

# Upgrade pip
RUN python -m pip install --no-cache-dir --upgrade pip

# 3. Pre-install PaddlePaddle CPU wheel
RUN python -m pip install --no-cache-dir --only-binary=:all: paddlepaddle==3.3.1 -f https://www.paddlepaddle.org.cn/whl/linux/cpu-mkl/stable.html

# 4. Copy and install Python dependencies (Cached layer)
# Adjust path if requirements.txt is in backend/ e.g., COPY backend/requirements.txt .
COPY requirements.txt .
RUN python -m pip install --no-cache-dir -r requirements.txt

# 5. Copy full codebase and configure environment
COPY . /app
WORKDIR /app/backend
ENV PYTHONPATH=/app/backend

# 6. Non-root user setup
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

# 7. Start server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]