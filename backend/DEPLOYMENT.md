# 🚀 Final Deployment Steps for Coolify

## ✅ Pre-Deployment Checklist

All files are configured and ready:

- ✅ `Dockerfile` - Main production container
- ✅ `Dockerfile.optimized` - Multi-stage build option
- ✅ `Dockerfile.simple` - Fallback simple container
- ✅ `.dockerignore` - Build optimization
- ✅ `requirements.txt` - Updated with Gunicorn
- ✅ `app.py` - Production-ready (PORT env, debug=False)
- ✅ `wsgi.py` - WSGI entry point
- ✅ `nixpacks.toml` - Nixpacks configuration
- ✅ `.env.production` - Environment variables

## 🎯 Coolify Configuration

### Step 1: Create Application in Coolify

1. **Login to Coolify Dashboard**
2. **Click "New +" → "Application"**
3. **Select "Git Repository"**
4. **Connect Repository**: `ankitpokhrel08/nlp_project`
5. **Branch**: `main`

### Step 2: Application Settings

**Basic Configuration:**

- **Name**: `nlp-backend`
- **Base Directory**: `backend`
- **Build Pack**: `Docker` (recommended)
- **Port**: `8000`
- **Health Check URL**: `/health`

### Step 3: Environment Variables

Add these in Coolify Environment tab:

```env
PORT=8000
FLASK_ENV=production
PYTHONPATH=/app
PYTHONUNBUFFERED=1
TRANSFORMERS_CACHE=/app/.cache/transformers
HF_HOME=/app/.cache/huggingface
FLASK_DEBUG=0
```

### Step 4: Resource Allocation

**Important for ML Models:**

- **Memory**: 4GB minimum (8GB recommended)
- **CPU**: 2 vCPUs minimum
- **Storage**: 10GB minimum (for model downloads)
- **Timeout**: 300 seconds (models take time to load)

### Step 5: Build Configuration

**Option A - Docker (Recommended):**

- Build Pack: `Docker`
- Dockerfile: `Dockerfile` (main)
- Build Command: (leave empty, uses Dockerfile)
- Start Command: (leave empty, uses Dockerfile CMD)

**Option B - Nixpacks (Alternative):**

- Build Pack: `Nixpacks`
- Start Command: `python app.py`
- Install Command: `pip install -r requirements.txt`

**Option C - Simple Docker (Fallback):**

- Rename `Dockerfile.simple` to `Dockerfile` if main fails
- Use for minimal setup

## 🚀 Deployment Steps

### 1. Push Changes

```bash
git add .
git commit -m "Configure backend for Coolify deployment"
git push origin main
```

### 2. Deploy in Coolify

1. Click **"Deploy"** in Coolify dashboard
2. Monitor build logs for any errors
3. Wait for health check to pass (may take 2-5 minutes)

### 3. Verify Deployment

Once deployed, test the health endpoint:

```bash
curl https://your-backend-url.com/health
```

Expected response:

```json
{
  "status": "healthy",
  "model_loaded": true,
  "ner_loaded": true,
  "lemmatizer_loaded": true,
  "stemmer_loaded": true,
  "aspect_loaded": true,
  "message": "NLP Models API is running"
}
```

## 🔧 API Endpoints

After deployment, your API will be available at:

- **Health Check**: `GET /health`
- **Text Generation**: `POST /generate`
- **NER**: `POST /ner`
- **Lemmatization**: `POST /lemmatize`
- **Stemming**: `POST /stem`
- **Aspect Sentiment**: `POST /aspect-sentiment`

## 🔍 Troubleshooting

### Build Fails?

1. **Check Coolify build logs**
2. **Try alternative Dockerfiles**:
   - Rename `Dockerfile.optimized` to `Dockerfile`
   - Or use `Dockerfile.simple` for minimal setup
3. **Verify resource limits** (memory, CPU)

### Models Don't Load?

1. **Increase memory allocation** (8GB recommended)
2. **Increase timeout** to 300+ seconds
3. **Check logs** for specific model download errors

### Port Issues?

1. **Verify PORT=8000** in environment variables
2. **Check Coolify port mapping**
3. **Ensure health check uses correct port**

### Performance Issues?

1. **Use Gunicorn**: Set start command to `gunicorn --bind 0.0.0.0:8000 --workers 1 --timeout 300 wsgi:app`
2. **Increase worker memory**
3. **Monitor resource usage**

## 📝 Important Notes

1. **First deployment will be slow** (10-15 min) due to model downloads
2. **Subsequent deployments** will be faster with cached models
3. **Models require significant RAM** - don't skimp on memory allocation
4. **Health check may take 2-5 minutes** to return healthy status

## 🔄 Next Steps: Frontend Deployment

After backend is successfully deployed:

1. **Note the backend URL** from Coolify
2. **Update frontend API endpoints** to use your backend URL
3. **Deploy frontend** as separate application
4. **Update CORS settings** if needed

**Backend URL Format**: `https://nlp-backend-xxx.your-domain.com`

---

## ⚡ Quick Deploy Commands

If you need to redeploy quickly:

```bash
# In your local backend directory
git add . && git commit -m "Update backend config" && git push

# Then click "Deploy" in Coolify dashboard
```

Your backend should now be production-ready! 🎉
