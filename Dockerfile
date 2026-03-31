# Multi-stage build for Employee Engagement Survey App
# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image with Cloudflare Wrangler
FROM node:18-alpine

WORKDIR /app

# Install Wrangler globally
RUN npm install -g wrangler

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/wrangler.toml ./
COPY --from=builder /app/schema.sql ./
COPY --from=builder /app/functions ./functions

# Expose port for Wrangler dev server
EXPOSE 8788

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8788', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["wrangler", "pages", "dev", "dist", "--port", "8788", "--binding", "DB"]
