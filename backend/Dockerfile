# Use Python 3.11 slim for better compatibility with Coolify
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1
ENV FLASK_ENV=production
ENV PORT=8080

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies with optimizations for faster deployment
RUN pip install --no-cache-dir --timeout 1000 --retries 3 \
    --index-url https://download.pytorch.org/whl/cpu \
    torch==2.5.1 && \
    pip install --no-cache-dir --timeout 1000 -r requirements.txt

# Copy the application code
COPY . .

# Create cache directories for models
RUN mkdir -p /app/.cache/transformers /app/.cache/huggingface

# Expose the port
EXPOSE 8080

# Health check for Coolify
HEALTHCHECK --interval=30s --timeout=30s --start-period=120s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# Command to run the application
CMD ["python", "app.py"]
