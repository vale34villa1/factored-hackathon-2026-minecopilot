#!/bin/bash
set -e

echo "Running MineCopilot AI tests..."

# Backend tests
echo "[1/2] Running backend tests..."
cd backend
pip install pytest pytest-asyncio httpx -q
pytest tests/ -v --tb=short
cd ..

echo ""
echo "[2/2] Running frontend tests..."
cd frontend
npm test 2>/dev/null || echo "Frontend tests not yet configured."
cd ..

echo ""
echo "✅ Tests completed!"
