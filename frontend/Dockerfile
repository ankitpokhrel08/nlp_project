# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including serve)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install serve globally for production
RUN npm install -g serve@14.2.1

# Copy built application from build stage
COPY --from=build /app/dist ./dist

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S frontend -u 1001
USER frontend

# Expose port
EXPOSE 8009

# Start the application using serve
CMD ["serve", "-s", "dist", "-l", "8009", "-n"]
