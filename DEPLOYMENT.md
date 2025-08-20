# 🚀 Production Deployment Guide

> Complete guide for deploying the Nepali NLP Platform in production environments

## 📋 Quick Deployment Options

### Option 1: Coolify (Recommended for Production)

```bash
# Deploy backend
1. Create application in Coolify
2. Set base directory: backend
3. Use Docker build pack
4. Deploy

# Deploy frontend
1. Create application in Coolify
2. Set base directory: frontend
3. Use Docker build pack
4. Deploy
```

### Option 2: Docker Compose (Local Development)

```bash
# Clone and deploy locally
git clone https://github.com/ankitpokhrel08/nlp_project.git
cd nlp_project

# Deploy all services
docker-compose up -d

# Check status
docker-compose ps
```

### Option 3: Individual Services

```bash
# Deploy backend only
cd backend && docker build -t nepali-nlp-backend .
docker run -d -p 8000:8000 nepali-nlp-backend

# Deploy frontend only
cd frontend && docker build -t nepali-nlp-frontend .
docker run -d -p 8009:8009 nepali-nlp-frontend
```

## ☁️ Coolify Deployment (Production)

### 🔧 Why Coolify?

- **Automatic SSL**: Let's Encrypt certificates handled automatically
- **Traefik Proxy**: Built-in reverse proxy (no Nginx needed)
- **Git Integration**: Deploy directly from GitHub
- **Zero Downtime**: Blue-green deployments
- **Domain Management**: Custom domains with SSL

### 🏗️ Coolify Architecture

```
Internet → Traefik (Coolify) → Your Applications
                ↓
            Auto SSL (Let's Encrypt)
```

### 🚀 Deployment Steps

**Backend Deployment:**

1. **Create Application**

   - Repository: `ankitpokhrel08/nlp_project`
   - Base Directory: `backend`
   - Build Pack: Docker
   - Port: 8007

2. **Environment Variables**

   ```env
   PORT=8007
   FLASK_ENV=production
   PYTHONPATH=/app
   PYTHONUNBUFFERED=1
   TRANSFORMERS_CACHE=/app/.cache/transformers
   HF_HOME=/app/.cache/huggingface
   FLASK_DEBUG=0
   ```

3. **Resource Allocation**

   - Memory: 4GB minimum (8GB recommended)
   - CPU: 2 vCPUs minimum
   - Storage: 10GB minimum (for model downloads)
   - Timeout: 300 seconds

4. **Health Check Configuration**
   - Health Check URL: `/health`
   - Interval: 30 seconds

**Frontend Deployment:**

1. **Create Application**

   - Repository: `ankitpokhrel08/nlp_project`
   - Base Directory: `frontend`
   - Build Pack: Docker
   - Port: 8009

2. **Environment Variables**

   ```env
   VITE_API_BASE_URL=https://nlp-backend.itclub.asmitphuyal.com.np
   PORT=8009
   ```

   ```env
   PORT=8009
   VITE_API_BASE_URL=https://nlp-backend.itclub.asmitphuyal.com.np:8007
   ```

### 🔗 Service Communication

- Backend: `https://nlp-backend.itclub.asmitphuyal.com.np:8007`
- Frontend: `https://frontend-6zz4.onrender.com`
- Frontend calls backend via HTTPS (no SSL issues)

## 🐳 Local Development

### Docker Compose Setup

The `docker-compose.yml` is designed for local development only:

```yaml
services:
  backend:
    ports: ["8000:8000"]
  frontend:
    ports: ["8009:8009"]
    environment:
      - VITE_API_BASE_URL=http://backend:8000
```

**Access URLs:**

- Frontend: http://localhost:8009
- Backend API: http://localhost:8000

## � Configuration Files

### Required Files for Coolify

| File                       | Service  | Purpose              |
| -------------------------- | -------- | -------------------- |
| `backend/Dockerfile`       | Backend  | Container definition |
| `frontend/Dockerfile`      | Frontend | Container definition |
| `backend/requirements.txt` | Backend  | Python dependencies  |
| `frontend/package.json`    | Frontend | Node.js dependencies |

### Optional Files

| File                 | Purpose               | Note                      |
| -------------------- | --------------------- | ------------------------- |
| `docker-compose.yml` | Local development     | Not used by Coolify       |
| `.env.production`    | Environment variables | Set in Coolify UI instead |

## 📊 Service Architecture

### Production (Coolify)

```
Internet
    ↓
[Traefik Proxy] (Automatic SSL)
    ↓
[Frontend] ←→ [Backend API]
             ↓
         [NLP Models]
```

### Local Development

```
localhost:8009 (Frontend) → localhost:8000 (Backend API)
```

## 🔒 Security

### Coolify Handles

- ✅ SSL Certificate management
- ✅ Reverse proxy configuration
- ✅ Domain routing
- ✅ HTTPS redirects

### Your Responsibility

- ✅ Environment variables security
- ✅ API rate limiting (application level)
- ✅ Input validation
- ✅ CORS configuration

## � Deployment Commands

### Coolify Deployment

```bash
# Trigger deployment
git push origin main

# Check deployment status in Coolify UI
# View logs in Coolify UI
```

### Local Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🎯 Success Checklist

### After Coolify Deployment

- [ ] Backend health check: `https://nlp-backend.itclub.asmitphuyal.com.np:8007/health`
- [ ] Frontend loads: `https://your-frontend-domain.com`
- [ ] API calls work from frontend
- [ ] SSL certificates active
- [ ] No CORS errors

### Performance Targets

- [ ] Page load time < 3 seconds
- [ ] API response time < 2 seconds
- [ ] Model loading < 30 seconds
- [ ] Memory usage stable

---

**🎉 Congratulations!** Your Nepali NLP Platform is deployed and ready!

**Important**: Coolify uses Traefik, not Nginx. No additional reverse proxy configuration needed.
