# Use a stable slim base to keep package resolution predictable on build servers
FROM python:3.11-slim-bookworm

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV FLASK_ENV=production
ENV PORT=8007

# Install only runtime tools needed by healthcheck to reduce build time
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies with a single resolver pass.
RUN pip install --no-cache-dir --timeout 1000 --retries 3 \
    --extra-index-url https://download.pytorch.org/whl/cpu \
    -r requirements.txt

# Copy the application code
COPY . .

# Create cache directories for models
RUN mkdir -p /app/.cache/transformers /app/.cache/huggingface

# Expose the port
EXPOSE 8007

# Health check for Coolify
HEALTHCHECK --interval=30s --timeout=30s --start-period=180s --retries=5 \
    CMD sh -c 'curl -fsS http://127.0.0.1:${PORT:-8007}/health || exit 1'

# Command to run the application
CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:${PORT:-8007} --workers ${GUNICORN_WORKERS:-1} --threads ${GUNICORN_THREADS:-1} --timeout ${GUNICORN_TIMEOUT:-300} app:app"]
