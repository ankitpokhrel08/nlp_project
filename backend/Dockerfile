# Use Python 3.11 alpine for better security and smaller size
FROM python:3.11-alpine

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1
ENV FLASK_ENV=production
ENV PORT=8000

# Install system dependencies for Alpine
RUN apk add --no-cache \
    gcc \
    g++ \
    musl-dev \
    linux-headers \
    libffi-dev \
    openssl-dev

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Expose the port
EXPOSE 8000

# Create a non-root user (Alpine uses adduser)
RUN adduser -D -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Command to run the application - use Python directly for better debugging
CMD ["python", "app.py"]
