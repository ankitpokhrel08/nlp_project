# NLP Project Frontend

This is our Software Engineering project to show all Thesis NLP project in one place and use them as a whole!

## Deployment on Coolify

This frontend is configured for deployment on Coolify with the following features:

### Configuration

- **Port Binding**: Configured to bind to `0.0.0.0` for external access
- **Environment Variables**: Supports `VITE_API_BASE_URL` for backend configuration
- **Docker Support**: Includes optimized Dockerfile for production deployment

### Environment Variables

Create a `.env` file or set environment variables in Coolify:

```env
VITE_API_BASE_URL=https://your-backend-url.com
PORT=8009
```

### Deployment Commands

The application uses the following commands:

- `npm run build` - Builds the production application
- `npm start` - Serves the built application using serve
- `npm run dev` - Development server (binds to 0.0.0.0)

### Port Configuration

- Default port: 8009 (configurable via PORT environment variable)
- The application is configured to bind to `0.0.0.0` for Coolify compatibility

### API Configuration

The frontend is configured to connect to the backend API. Update the `VITE_API_BASE_URL` environment variable to point to your deployed backend.
