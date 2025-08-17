#!/bin/bash

# Set environment variables
export PYTHONPATH=/app
export FLASK_ENV=production

# Start the application with proper error handling
echo "Starting NLP Backend Service..."

# Check if we can import the required modules
python -c "
try:
    import app
    print('App module imported successfully')
except Exception as e:
    print(f'Error importing app: {e}')
    exit(1)
"

# Start the application
if command -v gunicorn &> /dev/null; then
    echo "Starting with Gunicorn..."
    exec gunicorn --bind 0.0.0.0:${PORT:-8000} --workers 1 --timeout 300 --preload wsgi:app
else
    echo "Starting with Python directly..."
    exec python app.py
fi
