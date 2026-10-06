# MineCopilot AI

A full-stack mining intelligence platform with a React/Next.js frontend and Python/FastAPI backend.

## Overview

MineCopilot AI brings together operational data, risk analysis, Lean waste detection, and conversational reasoning to help mining teams understand what is happening, why it is happening, and what to do next.

## Stack

- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: Python + FastAPI
- Data: Pandas + CSV and knowledge base JSON
- AI: optional OpenAI integration with grounded prompts
- Deployment: Docker + docker-compose

## Run locally

```bash
cp .env.example .env

docker-compose up --build
```

Then open:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API docs: http://localhost:8000/docs

## Backend quick start

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Frontend quick start

```bash
cd frontend
npm install
npm run dev
```

## Demo prompts

- Why did productivity decrease today?
- What is the most critical risk?
- What should we do next?
- What happens if we do nothing?

## Security

- Chat input is sanitized
- Secrets are configured through environment variables
- The app is designed for demonstration and decision support

## Disclaimer

This prototype is for decision support only and does not replace qualified mining, safety, or engineering judgment.
