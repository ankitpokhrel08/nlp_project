# 🚀 Coolify Deployment Guide for Frontend

This guide provides step-by-step instructions for deploying the Nepali NLP Platform frontend to Coolify.

## ✅ Pre-deployment Checklist

- [x] Frontend points to secure backend: `https://nlp-backend.itclub.asmitphuyal.com.np`
- [x] Production environment variables configured
- [x] Dockerfile optimized for production
- [x] Vite config supports flexible hosting
- [x] Build optimization enabled

## 🔧 Coolify Configuration

### Application Settings

```yaml
Name: nlp-frontend
Application Type: Git Repository
Repository: ankitpokhrel08/nlp_project
Branch: main
Base Directory: frontend
Build Pack: Docker
Port: 8009
Health Check URL: /
```

### Environment Variables

Set these in the Coolify UI under Environment Variables:

```env
# Core Configuration
PORT=8009
NODE_ENV=production

# API Configuration (Direct to backend - no proxy needed)
VITE_API_BASE_URL=https://nlp-backend.itclub.asmitphuyal.com.np

# Build Configuration
VITE_BUILD_MODE=production
```

### Domain Configuration

1. Set your custom domain in Coolify
2. Enable SSL (handled automatically by Coolify)
3. Ensure HTTPS is enforced

## 🚀 Deployment Steps

1. **Push to Repository**
   ```bash
   git add .
   git commit -m "feat: optimize frontend for Coolify deployment"
   git push origin main
   ```

2. **Create Application in Coolify**
   - Login to your Coolify dashboard
   - Create new application with settings above
   - Set environment variables

3. **Deploy**
   - Trigger deployment from Coolify UI
   - Monitor build logs
   - Verify deployment success

## 🔍 Verification

After deployment, verify:

- [ ] Frontend loads successfully
- [ ] API calls work to backend
- [ ] All models are accessible (lemmatizer, NER, stemmer, aspect)
- [ ] SSL certificate is valid
- [ ] Responsive design works

## 🛠️ Key Features for Coolify

- **Flexible Host Support**: `allowedHosts: "all"` for any domain
- **Direct API Calls**: No proxy needed in production
- **Optimized Build**: Chunked bundles for faster loading
- **Security**: Non-root user in Docker container
- **SSL Ready**: HTTPS endpoints throughout

## 📊 Production URLs

- **Backend API**: https://nlp-backend.itclub.asmitphuyal.com.np
- **Frontend**: [Your Coolify domain]

## 🔧 Troubleshooting

If you encounter issues:

1. **Check environment variables** in Coolify UI
2. **Verify backend connectivity** by testing API endpoints
3. **Review build logs** in Coolify dashboard
4. **Check SSL certificates** are valid

## 📝 Notes

- Coolify handles SSL certificates automatically via Let's Encrypt
- No additional reverse proxy configuration needed
- Traefik is used by Coolify for routing
- Health checks ensure service availability
