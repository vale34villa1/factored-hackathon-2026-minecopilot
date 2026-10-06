# MineCopilot Enterprise

## The AI Decision Layer for Mining

### Problem

Large mining companies operate fragmented data systems (ERP, maintenance, production, HSE, IoT, SCADA, fleet management). Critical operational questions require manual cross-system analysis:

- Why did productivity decrease?
- What is the most critical risk?
- Where are we losing money?
- What equipment should be serviced first?
- Where are Lean waste opportunities?
- What-if simulations for decision support?

### Solution

**MineCopilot Enterprise** is an AI decision layer that:

1. **Connects** fragmented operational data
2. **Retrieves** evidence from structured data and documents
3. **Reasons** using specialized analytical agents
4. **Validates** conclusions through data and rules
5. **Simulates** scenarios and impacts
6. **Recommends** prioritized actions with ROI
7. **Maintains** transparency and traceability

### Value Proposition

"MineCopilot connects fragmented mining data and operational knowledge to explain risks, identify value leakage, simulate decisions and recommend the highest-impact action."

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       USER INTERFACE                         │
│  (React/Next.js - Conversational Copilot + Dashboard)       │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    FastAPI GATEWAY                          │
│         (Request validation, routing, auth)                 │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│              LLM ORCHESTRATOR (Router)                      │
│  • Parse intent                                             │
│  • Route to appropriate agents                              │
│  • Collect evidence                                         │
│  • Generate response                                        │
└────────────────────────┬────────────────────────────────────┘
         ┌───────────────┼───────────────┬─────────────────┐
         │               │               │                 │
    ┌────▼───────┐  ┌───▼────────┐  ┌───▼─────────┐  ┌──▼──────────┐
    │Risk Agent  │  │Lean Agent  │  │Production   │  │Maintenance │
    │            │  │            │  │Agent        │  │Agent        │
    │• Identify  │  │• Detect    │  │             │  │             │
    │  risks     │  │  waste     │  │• Analyze    │  │• Equipment  │
    │• Calculate │  │• Calculate │  │  metrics    │  │  health     │
    │  score     │  │  impact    │  │• Efficiency │  │• Backlog    │
    └────┬───────┘  └────┬───────┘  └─────┬───────┘  └──┬──────────┘
         │               │                │             │
         └───────────────┼────────────────┼─────────────┘
                         │                │
        ┌────────────────▼────────────────▼──────────────┐
        │     ANALYTICAL ENGINE LAYER                    │
        │                                                │
        │  ┌──────────────────────────────────────────┐ │
        │  │ DATA SERVICE (Pandas + DuckDB)           │ │
        │  │ • Load CSVs                              │ │
        │  │ • Query, aggregate, analyze              │ │
        │  │ • Calculate KPIs                         │ │
        │  └──────────────────────────────────────────┘ │
        │  ┌──────────────────────────────────────────┐ │
        │  │ LEAN ENGINE                              │ │
        │  │ • 8 waste categories                     │ │
        │  │ • Lean Waste Score (0-100)               │ │
        │  │ • Impact calculation                     │ │
        │  └──────────────────────────────────────────┘ │
        │  ┌──────────────────────────────────────────┐ │
        │  │ RISK ENGINE                              │ │
        │  │ • Probability × Severity × Exposure      │ │
        │  │ • Risk Score (0-100)                     │ │
        │  │ • Risk classification (LOW/MEDIUM/etc)   │ │
        │  └──────────────────────────────────────────┘ │
        │  ┌──────────────────────────────────────────┐ │
        │  │ DIGITAL TWIN / SIMULATION                │ │
        │  │ • What-if scenarios                      │ │
        │  │ • Impact modeling                        │ │
        │  │ • Production, fuel, cost estimates       │ │
        │  └──────────────────────────────────────────┘ │
        │  ┌──────────────────────────────────────────┐ │
        │  │ DECISION ENGINE                          │ │
        │  │ • Action prioritization                  │ │
        │  │ • ROI, impact, feasibility               │ │
        │  │ • Recommendation ranking                 │ │
        │  └──────────────────────────────────────────┘ │
        └────────────────────────────────────────────────┘
                         │
        ┌────────────────▼───────────────────┐
        │  DATA & KNOWLEDGE LAYER            │
        │                                    │
        │  ┌──────────────────────────────┐ │
        │  │ STRUCTURED DATA (CSVs)       │ │
        │  │ • equipment.csv              │ │
        │  │ • production.csv             │ │
        │  │ • maintenance.csv            │ │
        │  │ • safety_incidents.csv       │ │
        │  │ • fuel.csv                   │ │
        │  │ • operations.csv             │ │
        │  │ • sites.csv                  │ │
        │  └──────────────────────────────┘ │
        │  ┌──────────────────────────────┐ │
        │  │ RAG / KNOWLEDGE (FAISS)      │ │
        │  │ • Safety procedures          │ │
        │  │ • Maintenance procedures     │ │
        │  │ • Mining policies            │ │
        │  │ • Equipment manuals          │ │
        │  └──────────────────────────────┘ │
        └────────────────────────────────────┘
```

---

## Project Structure (Phase 1)

```
factored-hackathon-2026-minecopilot/
│
├── README.md                          # Project overview
├── ARCHITECTURE.md                    # Detailed architecture
├── .env.example                       # Environment template
├── .gitignore
├── requirements.txt                   # Python dependencies
├── Dockerfile
├── docker-compose.yml
│
├── backend/
│   ├── main.py                        # FastAPI entry point
│   ├── config.py                      # Configuration
│   ├── dependencies.py                # Dependency injection
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── health.py              # /health
│   │   │   ├── copilot.py             # /api/copilot (main endpoint)
│   │   │   └── evaluation.py          # /api/evaluation
│   │   └── schemas.py                 # Pydantic request/response models
│   │
│   ├── core/
│   │   ├── __init__.py
│   │   ├── security.py                # Input validation, sanitization
│   │   ├── logging.py                 # Structured logging
│   │   └── exceptions.py              # Custom exceptions
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── data_service.py            # Data loading, aggregation
│   │   ├── risk_service.py            # Risk calculation
│   │   ├── lean_service.py            # Lean waste detection
│   │   ├── production_service.py      # Production metrics
│   │   ├── simulation_service.py      # What-if scenarios
│   │   ├── recommendation_service.py  # Action prioritization
│   │   ├── rag_service.py             # RAG retrieval
│   │   └── llm_service.py             # LLM orchestrator
│   │
│   ├── agents/
│   │   ├── __init__.py
│   │   ├── base_agent.py              # Base agent class
│   │   ├── risk_agent.py              # Risk analysis agent
│   │   ├── lean_agent.py              # Lean analysis agent
│   │   ├── production_agent.py        # Production agent
│   │   ├── maintenance_agent.py       # Maintenance agent
│   │   └── cost_agent.py              # Cost analysis agent
│   │
│   ├── data/
│   │   ├── __init__.py
│   │   ├── generate_synthetic_data.py # Synthetic data generation
│   │   ├── loaders.py                 # CSV loaders
│   │   ├── equipment.csv              # Equipment data
│   │   ├── production.csv             # Production metrics
│   │   ├── maintenance.csv            # Maintenance records
│   │   ├── safety_incidents.csv       # Safety events
│   │   ├── fuel.csv                   # Fuel consumption
│   │   ├── operations.csv             # Operations log
│   │   └── sites.csv                  # Mine sites
│   │
│   ├── knowledge/
│   │   ├── __init__.py
│   │   ├── documents.py               # Knowledge base
│   │   ├── procedures/
│   │   │   ├── safety.md
│   │   │   ├── maintenance.md
│   │   │   └── mining_operations.md
│   │   └── embeddings.pkl             # Pre-computed embeddings
│   │
│   ├── engines/
│   │   ├── __init__.py
│   │   ├── risk_engine.py             # Risk calculation
│   │   ├── lean_engine.py             # Lean waste calculation
│   │   ├── simulation_engine.py       # Digital twin
│   │   └── decision_engine.py         # Action prioritization
│   │
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── cache.py                   # Caching layer
│   │   ├── metrics.py                 # Performance metrics
│   │   └── rag.py                     # RAG utilities
│   │
│   └── tests/
│       ├── __init__.py
│       ├── test_api.py
│       ├── test_services.py
│       ├── test_engines.py
│       └── test_agents.py
│
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   │
│   ├── app/
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Home page
│   │   ├── copilot/page.tsx           # Copilot interface
│   │   ├── dashboard/page.tsx         # Overview dashboard
│   │   └── api/
│   │       └── health/route.ts        # Health check
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Navigation.tsx
│   │   ├── copilot/
│   │   │   ├── CopilotChat.tsx        # Main chat interface
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── ResponsePanel.tsx      # Evidence + metrics
│   │   │   └── QuickPrompts.tsx
│   │   ├── dashboard/
│   │   │   ├── KPICard.tsx            # Metric cards
│   │   │   ├── RiskRadar.tsx          # Risk visualization
│   │   │   ├── LeanWastePanel.tsx     # Lean metrics
│   │   │   ├── EquipmentStatus.tsx    # Equipment view
│   │   │   └── ExecutiveSummary.tsx   # Summary view
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       └── Loading.tsx
│   │
│   ├── lib/
│   │   ├── api.ts                     # API client
│   │   ├── types.ts                   # TypeScript types
│   │   └── utils.ts                   # Utilities
│   │
│   ├── hooks/
│   │   ├── useChat.ts                 # Chat hook
│   │   ├── useDashboard.ts            # Dashboard data
│   │   └── useSimulation.ts           # Simulation hook
│   │
│   ├── styles/
│   │   └── globals.css                # Global styles
│   │
│   └── .env.example
│
├── evaluation/
│   ├── questions.json                 # Evaluation questions (30+)
│   ├── report.py                      # Evaluation report generation
│   └── results.json                   # Results log
│
└── docs/
    ├── ARCHITECTURE.md                # Detailed design
    ├── DATA_SCHEMA.md                 # Data dictionary
    ├── API.md                         # API specification
    ├── RAG.md                         # RAG implementation
    ├── AGENTS.md                      # Agent system
    ├── DEPLOYMENT.md                  # Deployment guide
    └── DEMO.md                        # Demo scenario walkthrough
```

---

## Core Workflow: ASK → RETRIEVE → REASON → VALIDATE → SIMULATE → RECOMMEND

### Example: "Why did productivity decrease?"

1. **ASK**: User submits question via copilot interface
2. **RETRIEVE**: 
   - Data Service loads production.csv, equipment.csv, operations.csv
   - RAG retrieves relevant procedures/policies
3. **REASON**:
   - LLM Router classifies intent → Production Agent + Lean Agent
   - Production Agent calculates productivity delta
   - Lean Agent identifies waste factors
   - Risk Agent evaluates contributing risk factors
4. **VALIDATE**:
   - Cross-check calculations
   - Verify evidence exists
   - Ensure no hallucination
5. **SIMULATE**:
   - Simulation Engine models "what if we fix X?"
   - Show projected improvements
6. **RECOMMEND**:
   - Decision Engine prioritizes actions
   - Rank by ROI, impact, feasibility
7. **HUMAN APPROVAL**:
   - Present evidence
   - Allow user to drill down
   - No automatic execution

---

## Key Features for MVP

✅ **Conversational Interface**: Ask questions in natural language  
✅ **Multi-Agent Reasoning**: Specialized agents for different domains  
✅ **Data-Driven**: All answers grounded in structured data  
✅ **Explainable**: Show evidence, calculations, data sources  
✅ **Risk Intelligence**: Detect and prioritize operational risks  
✅ **Lean Optimization**: Identify waste and efficiency opportunities  
✅ **What-If Simulation**: Model scenarios and impacts  
✅ **Multi-Site Support**: Compare and analyze across mines  
✅ **Executive Summaries**: Quick 30-second briefings  
✅ **Evaluation Framework**: Measure accuracy and grounding  

---

## Next Steps

**Phase 1**: Project skeleton + configuration  
**Phase 2**: Synthetic datasets generation  
**Phase 3**: Data services and loaders  
**Phase 4**: Risk and Lean engines  
**Phase 5**: RAG setup and knowledge base  
**Phase 6**: LLM orchestrator and agents  
**Phase 7**: Simulation engine  
**Phase 8**: Frontend UI  
**Phase 9**: Evaluation framework  
**Phase 10**: Demo scenario  

---

## Team Roles

- **Principal AI Engineer**: Architecture, quality, oversight
- **LLM/RAG Engineer**: Prompt engineering, retrieval, grounding
- **Data Engineer**: Data pipelines, loaders, integrity
- **ML Engineer**: Models, agents, optimization
- **Full-Stack Engineer**: API, frontend, deployment
- **Mining Operations Specialist**: Data interpretation, domain knowledge
- **Lean Six Sigma Specialist**: Waste detection, optimization logic
- **UX/UI Designer**: Interface, experience, accessibility
- **Cloud Architect**: Deployment, scalability, monitoring

---

READY FOR PHASE 1: Project skeleton and configuration.
