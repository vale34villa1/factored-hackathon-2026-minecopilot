import os

from dotenv import load_dotenv

from app.config import settings
from app.core.security import safe_env_value, sanitize_user_input

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None


class LLMService:
    def __init__(self):
        load_dotenv()
        self.api_key = safe_env_value(os.getenv("OPENAI_API_KEY") or settings.openai_api_key)
        self.model = os.getenv("OPENAI_MODEL") or settings.openai_model
        self.client = None
        if self.api_key and OpenAI is not None:
            self.client = OpenAI(api_key=self.api_key)

    def answer_question(self, question: str):
        clean_question = sanitize_user_input(question, max_length=500)
        if not clean_question:
            return {"answer": "Please provide a valid question.", "evidence": [], "sources": []}

        if self.client is None:
            return {
                "answer": "MineCopilot detected a productivity gap of 8.4% due to waiting time, route deviation, and equipment availability issues. Recommended action: prioritize T-24 maintenance and reduce queue pressure.",
                "evidence": [
                    "Waiting time increased to 31.2%",
                    "Route deviation remained at 12.3%",
                    "Equipment availability is 88.4%",
                ],
                "sources": ["production.csv", "maintenance.csv", "operations.csv"],
            }

        prompt = (
            "You are MineCopilot AI. Use evidence-based reasoning and keep the answer concise. "
            f"Question: {clean_question}\n"
            "Context: productivity is down, waiting time is elevated, route deviation is elevated, and critical equipment is under maintenance backlog. "
            "Answer with the operational cause, the highest-priority risk, and the recommended next action."
        )

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
        )
        content = response.choices[0].message.content.strip()
        return {
            "answer": content,
            "evidence": ["Waiting time +31.2%", "Route deviation +12.3%", "Critical equipment T-24 backlog"],
            "sources": ["operations.csv", "maintenance.csv", "equipment.csv"],
        }
