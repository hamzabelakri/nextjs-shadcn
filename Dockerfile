# Stage 1: Build the application
FROM node:23-alpine AS builder
 
# Set working directory
WORKDIR /app
 
# Copy package files first to leverage Docker cache
COPY package.json yarn.lock* package-lock.json* ./
 
# Install dependencies with version conflicts ignored
RUN if [ -f yarn.lock ]; then yarn install --ignore-engines; \
    elif [ -f package-lock.json ]; then npm install --legacy-peer-deps --no-audit; \
    else npm install --legacy-peer-deps --no-audit; fi
 
# Copy the rest of the application files
COPY . .
 
# Build the application
RUN npm run build
 
# Stage 2: Production image
FROM node:23-alpine AS runner
 
# Set working directory
WORKDIR /app
 
# Install dependencies only needed for production
RUN apk add --no-cache bash
 
# Copy built application from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh
 
 
# Create directory for runtime-generated files
RUN mkdir -p /app/public/runtime-config
 
# Ensure entrypoint.sh is executable
RUN chmod +x /app/entrypoint.sh
 
# Next.js collects completely anonymous telemetry data about general usage.
ENV NEXT_TELEMETRY_DISABLED 1
 
# Set the port
ENV PORT 3000
EXPOSE 3000
 
# Use entrypoint to generate runtime config
ENTRYPOINT ["/app/entrypoint.sh"]
 
# Start the application
CMD ["npm", "start"]