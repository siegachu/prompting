# Stage 1: Build Next.js static export
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY website/frontend/package.json website/frontend/package-lock.json* ./
RUN npm install
COPY website/frontend/ ./
RUN npm run build

# Stage 2: Python runtime
FROM python:3.12-slim
WORKDIR /app

# Install Python dependencies
COPY website/backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend
COPY website/backend/ ./backend/

# Copy Next.js static export
COPY --from=frontend-build /app/frontend/out/ ./static/

# Set environment
ENV PORT=8080
ENV BASE_PATH=
ENV STATIC_DIR=/app/static

EXPOSE 8080

CMD ["python", "-m", "uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
