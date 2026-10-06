# MineCopilot AI

A full-stack mining intelligence platform with a React/Next.js frontend and Python/FastAPI backend.

## Quick start

### Docker

```bash
cp .env.example .env

docker-compose up --build
```

Open:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Docs: http://localhost:8000/docs

### Local backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Local frontend

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

## Notes

This project is an MVP designed for demo and operational decision support. It does not replace qualified mining, safety, or engineering judgment.
