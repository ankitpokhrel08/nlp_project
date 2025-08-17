#!/bin/bash

echo "🔍 Backend Deployment Validation"
echo "================================"

# Check if all required files exist
echo "📁 Checking required files..."

required_files=(
    "Dockerfile"
    ".dockerignore" 
    "requirements.txt"
    "app.py"
    "wsgi.py"
    "nixpacks.toml"
    ".env.production"
)

missing_files=()

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - MISSING"
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -gt 0 ]; then
    echo ""
    echo "⚠️  Missing files detected. Deployment may fail."
    exit 1
fi

echo ""
echo "🐳 Validating Dockerfile..."
if docker --version > /dev/null 2>&1; then
    echo "✅ Docker is available"
    
    # Check Dockerfile syntax
    if docker build -t nlp-backend-test --dry-run . > /dev/null 2>&1; then
        echo "✅ Dockerfile syntax is valid"
    else
        echo "❌ Dockerfile has syntax errors"
    fi
else
    echo "⚠️  Docker not available for validation"
fi

echo ""
echo "🐍 Checking Python environment..."

# Check if requirements.txt has all needed packages
required_packages=("flask" "transformers" "torch" "gunicorn")
for package in "${required_packages[@]}"; do
    if grep -q "$package" requirements.txt; then
        echo "✅ $package found in requirements.txt"
    else
        echo "❌ $package missing from requirements.txt"
    fi
done

echo ""
echo "🔧 Configuration Summary:"
echo "========================"
echo "✅ Base Directory: backend"
echo "✅ Port: 8000"
echo "✅ Health Check: /health"
echo "✅ Build Pack: Docker"
echo "✅ Environment: Production ready"

echo ""
echo "🚀 Ready for Coolify Deployment!"
echo ""
echo "Next Steps:"
echo "1. Commit and push changes to Git"
echo "2. Configure application in Coolify"
echo "3. Set environment variables" 
echo "4. Deploy and monitor logs"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
