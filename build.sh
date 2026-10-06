#!/bin/bash
set -e

echo "Building MineCopilot AI..."

# Build backend
echo "[1/3] Building backend Docker image..."
docker build -f backend/Dockerfile -t minecopilot-backend:latest ./backend

# Build frontend
echo "[2/3] Building frontend Docker image..."
docker build -f frontend/Dockerfile -t minecopilot-frontend:latest ./frontend

# Start services
echo "[3/3] Starting Docker Compose services..."
docker-compose up -d

echo ""
echo "✅ MineCopilot AI is running!"
echo ""
echo "Access points:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8000"
echo "  API Docs: http://localhost:8000/docs"
echo ""
echo "Run 'docker-compose logs -f' to see logs."
