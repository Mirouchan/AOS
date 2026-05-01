FROM python:3.11-slim

WORKDIR /app

# ✅ install كل شيء في مرة واحدة
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    default-mysql-client \
    build-essential \
    pkg-config \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# ✅ dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ✅ copy project
COPY . .

# ✅ entrypoint
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]