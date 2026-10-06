# MineCopilot AI — Full-Stack Production Demo

A complete production-ready mining operations intelligence platform with:
- **Frontend**: React/Next.js with TypeScript, Tailwind CSS, real-time dashboards
- **Backend**: Python/FastAPI with async handlers, RAG, LLM agents
- **Data Layer**: Pandas + SQLite + Vector database integration
- **LLM Reasoning**: OpenAI GPT-4 + specialized mining agents
- **DevOps**: Docker Compose, automated tests, CI/CD ready

## Quick Start

### Local development (Docker Compose)

```bash
# Clone and setup
git clone https://github.com/vale34villa1/factored-hackathon-2026-minecopilot.git
cd factored-hackathon-2026-minecopilot

# Copy environment file
cp .env.example .env
# Edit .env with your OpenAI API key

# Start services
docker-compose up -d

# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Without Docker

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    MineCopilot AI                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────┐          ┌──────────────────┐       │
│  │   React/Next.js  │          │   Python FastAPI │       │
│  │   TypeScript     │◄────────►│   Async Workers  │       │
│  │   Tailwind CSS   │          │                  │       │
│  └──────────────────┘          └──────────────────┘       │
│         ▲                              │                   │
│         │                              ▼                   │
│         │                    ┌──────────────────┐          │
│         │                    │  RAG Engine      │          │
│         │                    │  Vector DB       │          │
│         │                    │  Document Store  │          │
│         │                    └──────────────────┘          │
│         │                              │                   │
│         │                              ▼                   │
│         │                    ┌──────────────────┐          │
│         │                    │  LLM Agents      │          │
│         │                    │  Risk Engine     │          │
│         │                    │  Lean Engine     │          │
│         │                    │  OpenAI GPT-4    │          │
│         │                    └──────────────────┘          │
│         │                              │                   │
│         │                              ▼                   │
│         └──────────────────────────────────────────┐       │
│                                                    ▼       │
│                                    ┌──────────────────┐   │
│                                    │  Data Layer      │   │
│                                    │  SQLite DB       │   │
│                                    │  CSV Data        │   │
│                                    │  Pandas Engine   │   │
│                                    └──────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
factored-hackathon-2026-minecopilot/
├── docker-compose.yml                  # Multi-container orchestration
├── .env.example                        # Environment template
├── README.md                           # This file
│
├── frontend/                           # React/Next.js application
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── public/
│   └── src/
│       ├── pages/
│       │   ├── index.tsx              # Dashboard home
│       │   ├── api/                   # API route handlers
│       │   ├── risk.tsx               # Risk analysis view
│       │   ├── production.tsx         # Production metrics
│       │   └── maintenance.tsx        # Maintenance tracking
│       ├── components/
│       │   ├── dashboard/             # Dashboard widgets
│       │   ├── charts/                # Chart components
│       │   ├── chat/                  # Chat interface
│       │   ├── layout/                # Layout + navigation
│       │   └── common/                # Reusable UI bits
│       ├── hooks/
│       │   ├── useApi.ts              # API fetching hook
│       │   ├── useWebSocket.ts        # Real-time updates
│       │   └── useOperationalData.ts  # Data fetching
│       ├── lib/
│       │   ├── api.ts                 # API client
│       │   ├── types.ts               # Shared TypeScript types
│       │   └── utils.ts               # Utilities
│       ├── styles/
│       │   └── globals.css            # Global styles
│       └── context/
│           └── DashboardContext.tsx   # React context
│
├── backend/                            # Python FastAPI application
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── main.py                        # FastAPI app entry point
│   ├── config.py                      # Configuration
│   ├── .env.example
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── health.py              # Health check endpoint
│   │   │   ├── dashboard.py           # Dashboard data endpoint
│   │   │   ├── chat.py                # Chat / LLM endpoint
│   │   │   ├── analysis.py            # Risk & Lean analysis
│   │   │   └── streaming.py           # WebSocket streaming
│   │   └── schemas.py                 # Request/response models
│   │
│   ├── core/
│   │   ├── __init__.py
│   │   ├── security.py                # Input validation, sanitization
│   │   ├── logging.py                 # Structured logging
│   │   └── exceptions.py              # Custom exceptions
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── data_service.py            # Data access & summary
│   │   ├── risk_service.py            # Risk evaluation
│   │   ├── lean_service.py            # Lean waste analysis
│   │   ├── recommendation_service.py  # Recommendations
│   │   ├── rag_service.py             # RAG engine
│   │   ├── llm_service.py             # LLM orchestration
│   │   └── agent_service.py           # Specialized agents
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   ├── database.py                # SQLite setup
│   │   └── schemas.py                 # ORM models
│   │
│   ├── data/
│   │   ├── production.csv
│   │   ├── equipment.csv
│   │   ├── maintenance.csv
│   │   ├── safety_incidents.csv
│   │   ├── operations.csv
│   │   └── mining_knowledge.json      # RAG knowledge base
│   │
│   ├── agents/
│   │   ├── __init__.py
│   │   ├── base_agent.py              # Base agent class
│   │   ├── risk_agent.py              # Risk analysis agent
│   │   ├── lean_agent.py              # Lean analysis agent
│   │   ├── maintenance_agent.py       # Maintenance agent
│   │   └── recommendation_agent.py    # Recommendation agent
│   │
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_health.py             # Health endpoint tests
│   │   ├── test_dashboard.py          # Dashboard tests
│   │   ├── test_services.py           # Service layer tests
│   │   ├── test_agents.py             # Agent tests
│   │   └── test_rag.py                # RAG tests
│   │
│   └── utils/
│       ├── __init__.py
│       ├── csv_loader.py              # CSV data loading
│       ├── cache.py                   # In-memory caching
│       └── metrics.py                 # Performance metrics
│
├── docs/                               # Documentation
│   ├── ARCHITECTURE.md                # System design
│   ├── API.md                         # API specification
│   ├── RAG.md                         # RAG implementation
│   ├── AGENTS.md                      # Agent system
│   ├── DEPLOYMENT.md                  # Deployment guide
│   └── DEVELOPMENT.md                 # Development workflow
│
├── .github/
│   └── workflows/
│       ├── test.yml                   # CI tests
│       └── deploy.yml                 # CD deploy
│
└── docker-compose.yml
```

## API Endpoints

### Health & Status
- `GET /health` — Health check
- `GET /status` — System status

### Dashboard Data
- `GET /api/dashboard/summary` — Operational summary (KPIs)
- `GET /api/dashboard/risks` — Risk evaluation
- `GET /api/dashboard/lean` — Lean waste patterns
- `GET /api/dashboard/recommendations` — Recommended actions
- `GET /api/dashboard/equipment` — Equipment status

### Analysis
- `POST /api/analysis/risk-score` — Calculate risk score
- `POST /api/analysis/lean-waste` — Detect Lean waste
- `POST /api/analysis/simulate` — Simulate what-if scenarios

### Chat / LLM
- `POST /api/chat/ask` — Ask MineCopilot (request/response)
- `WS /ws/chat/stream` — Real-time chat streaming

### RAG
- `POST /api/rag/search` — Search knowledge base
- `POST /api/rag/ingest` — Ingest documents

## Key Features

### 1. Real-time Dashboards
- Live KPI metrics (Risk, Productivity, Lean Waste, Availability)
- Risk heatmaps and trend charts
- Equipment status at a glance
- Maintenance backlog tracking

### 2. Conversational Assistant
- Ask questions in natural language
- Grounded in operational data via RAG
- Specialized mining agents for context
- What-if simulation capabilities

### 3. Intelligent Analysis
- **Risk Engine**: Detects equipment degradation, safety risks, production anomalies
- **Lean Engine**: Identifies waste in waiting time, routing, fuel consumption
- **Recommendation Engine**: Prioritizes actions and simulates impact
- **LLM Agents**: Specialized reasoning for different mining domains

### 4. RAG (Retrieval-Augmented Generation)
- Embeds mining knowledge base (equipment specs, maintenance procedures, safety protocols)
- Retrieves relevant context for LLM prompts
- Grounds responses in operational data and domain knowledge

### 5. Production Ready
- Comprehensive error handling
- Input validation and sanitization
- Rate limiting and security headers
- Async/concurrent processing
- Structured logging
- Automated tests (unit + integration)
- Docker orchestration
- Environment-based configuration

## Environment Setup

```bash
# Copy template
cp .env.example .env

# Edit .env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini
DATABASE_URL=sqlite:///./data.db
RAG_VECTOR_DB=milvus  # or 'faiss' for local
LOG_LEVEL=INFO
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
```

## Testing

```bash
# Backend tests
cd backend
pip install pytest pytest-asyncio
pytest tests/ -v

# Frontend tests
cd frontend
npm test

# Integration tests
cd backend
pytest tests/test_integration.py -v
```

## Deployment

### Docker Compose (local/staging)
```bash
docker-compose up -d
```

### Production (Kubernetes)
See `docs/DEPLOYMENT.md` for Helm charts and production configuration.

## Performance Optimizations

### Backend
- Async SQLAlchemy queries
- Request-level caching
- Vector DB indexing for RAG
- Batch processing for data ingestion
- Connection pooling

### Frontend
- Server-side rendering (Next.js SSR)
- Incremental Static Regeneration (ISR)
- Code splitting and lazy loading
- WebSocket for real-time updates
- Optimized images and fonts

## Monitoring & Logging

- Structured JSON logging (Python)
- Request tracing (FastAPI middleware)
- Performance metrics (Prometheus-compatible endpoints)
- Error tracking (built-in, can integrate Sentry)

## Roadmap

- [ ] Multi-tenancy support
- [ ] Advanced RAG with semantic search
- [ ] Custom agent training
- [ ] Mobile app (React Native)
- [ ] Real-time alerting system
- [ ] Integration with mining equipment APIs
- [ ] Advanced analytics & ML models

## Tech Stack

**Frontend:**
- React 18+
- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui (component library)
- Zustand (state management)
- TanStack Query (data fetching)
- WebSocket (real-time)

**Backend:**
- Python 3.11+
- FastAPI
- Uvicorn (ASGI server)
- SQLAlchemy (ORM)
- Pydantic (validation)
- OpenAI SDK
- Pandas + NumPy (data processing)
- Milvus / FAISS (vector DB)
- Pytest (testing)

**DevOps:**
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- SQLite (development)
- PostgreSQL (production)

## Team

Hackathon Team — MineCopilot AI 2026

## Disclaimer

This prototype is for demonstration and decision support only. It does not replace qualified mining, safety, or engineering judgment.

## License

MIT
