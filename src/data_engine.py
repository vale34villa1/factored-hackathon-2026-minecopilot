from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv

from src.security import safe_env_value, sanitize_user_input

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None


class LLMAgent:
    def __init__(self, enable_live_llm: bool = False):
        load_dotenv(Path(__file__).resolve().parents[1] / ".env")
        self.enable_live_llm = enable_live_llm
        self.api_key = safe_env_value(os.getenv("OPENAI_API_KEY"))
        self.model_name = safe_env_value(os.getenv("MODEL_NAME")) or "gpt-4o-mini"
        self.client = None

        if self.enable_live_llm and self.api_key and OpenAI is not None:
            self.client = OpenAI(api_key=self.api_key)

    def answer(self, question: str, summary: dict, risks: list, lean: list, recommendations: list, plans: list) -> str:
        safe_question = sanitize_user_input(question, max_length=500)
        if not safe_question:
            return "The question is empty or invalid. Please provide a clear operational question."

        q = safe_question.lower()

        if "productivity" in q and ("decrease" in q or "drop" in q or "fall" in q):
            return (
                "Productivity decreased {delta:.1f}% today. "
                "The key drivers were waiting time (+{waiting_time:.1f}%), route deviation (+{route_deviation:.1f}%), and equipment availability (-{availability_loss:.1f}%). "
                "Recommended action: prioritize T-24 maintenance and reduce F2 queue pressure."
            ).format(
                delta=abs(summary["productivity_delta"]),
                waiting_time=summary["waiting_time"],
                route_deviation=summary["route_deviation"],
                availability_loss=max(0.0, 100.0 - summary["availability"]),
            )

        if "risk" in q or "critical" in q:
            top_risk = risks[0]
            return f"The most critical risk is: {top_risk['title']}. This is a {top_risk['severity']} issue because {top_risk['impact']}"

        if "what should we do" in q or "recommend" in q or "next" in q or "action" in q:
            return " ".join(recommendations[:3])

        if "do nothing" in q or "if we don't act" in q or "simulation" in q:
            return " ".join(plans[:2])

        if self.client:
            prompt = self._build_prompt(safe_question, summary, risks, lean, recommendations, plans)
            try:
                response = self.client.chat.completions.create(
                    model=self.model_name,
                    messages=[{"role": "user", "content": prompt}],
                    temperature=0.2,
                )
                return response.choices[0].message.content.strip()
            except Exception:
                pass

        return (
            "MineCopilot identified a productivity gap of "
            f"{abs(summary['productivity_delta']):.1f}% with the highest risk in equipment maintenance and waiting time. "
            "The recommended response is to prioritize T-24 maintenance and reduce queue pressure at the loading zone."
        )

    def _build_prompt(self, question: str, summary: dict, risks: list, lean: list, recommendations: list, plans: list) -> str:
        return (
            "You are MineCopilot AI, a mining operations assistant operating in a decision-support context. "
            "Answer using evidence, remain operational and concise, and avoid unsupported claims. "
            f"Question: {question}\n"
            f"Summary: risk_score={summary['risk_score']}, productivity_delta={summary['productivity_delta']}, "
            f"lean_waste={summary['lean_waste']}, availability={summary['availability']}, waiting_time={summary['waiting_time']}, "
            f"route_deviation={summary['route_deviation']}, fuel_consumption={summary['fuel_consumption']}.\n"
            f"Risks: {risks}\n"
            f"Lean patterns: {lean}\n"
            f"Recommendations: {recommendations}\n"
            f"Simulation: {plans}\n"
            "Keep the response brief, evidence-based, and action-oriented."
        )
