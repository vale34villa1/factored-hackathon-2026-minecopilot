import json
from pathlib import Path


class RAGService:
    def __init__(self):
        self.knowledge_path = Path(__file__).resolve().parents[1] / "data" / "mining_knowledge.json"

    def ingest_documents(self):
        if not self.knowledge_path.exists():
            payload = [
                {"title": "Truck dispatch", "content": "Waiting time and queue buildup reduce productivity and impact equipment utilization."},
                {"title": "Maintenance priority", "content": "Critical equipment with downtime above 8 hours should be prioritized for intervention."},
                {"title": "Fuel efficiency", "content": "Route deviation and excessive idling increase fuel use and lower operating efficiency."},
            ]
            self.knowledge_path.write_text(json.dumps(payload, indent=2))
        return {"status": "ok", "documents": json.loads(self.knowledge_path.read_text())}

    def search(self, query: str, limit: int = 3):
        docs = []
        if self.knowledge_path.exists():
            docs = json.loads(self.knowledge_path.read_text())

        lower_query = query.lower()
        matches = []
        for doc in docs:
            text = f"{doc.get('title', '')} {doc.get('content', '')}".lower()
            if lower_query in text:
                matches.append(doc)
        if not matches:
            matches = docs[:limit]
        return {"query": query, "results": matches[:limit]}
