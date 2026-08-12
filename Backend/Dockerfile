FROM python:3.11-slim

EXPOSE 8000

ENV MAKEFLAGS="-j1"
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_ROOT_USER_ACTION=ignore

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgl1 \
    libglx-mesa0 \
    libglib2.0-0 \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN python -m pip install --no-cache-dir --upgrade pip

RUN python -m pip install --no-cache-dir \
    --only-binary=:all: \
    paddlepaddle==3.3.1 \
    -f https://www.paddlepaddle.org.cn/whl/linux/cpu-mkl/stable.html

COPY requirements.txt .

RUN python -m pip install --no-cache-dir -r requirements.txt

COPY . /app

ENV PYTHONPATH=/app

RUN adduser -u 5678 --disabled-password --gecos "" appuser \
    && chown -R appuser /app

USER appuser

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]