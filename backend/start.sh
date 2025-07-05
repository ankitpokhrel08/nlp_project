#!/bin/bash

# NepaliGPT Backend Startup Script

echo "🚀 Starting NepaliGPT Backend..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install/update dependencies
echo "📚 Installing dependencies..."
pip install -r requirements.txt

# Start the Flask application
echo "🎯 Starting Flask server..."
echo "Server will be available at: http://localhost:5001"
echo "API Documentation: http://localhost:5001/health"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python app.py
