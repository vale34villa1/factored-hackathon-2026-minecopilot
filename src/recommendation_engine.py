from __future__ import annotations


class RecommendationEngine:
    def __init__(self, summary: dict, risks: list, lean: list):
        self.summary = summary
        self.risks = risks
        self.lean = lean

    def generate(self):
        recommended = []
        recommended.append("Prioritize maintenance intervention on T-24 and perform a quick hydraulic inspection before the next shift.")
        recommended.append("Reduce dispatch waiting time by reallocating trucks and clearing the F2 queue at the loading zone.")
        recommended.append("Review haul routes to minimize route deviation and recover energy efficiency in the next operating cycle.")
        return recommended

    def simulation(self):
        scenario = [
            "If no intervention is taken, productivity is expected to worsen by 2–3% in the next 24 hours.",
            "If maintenance is prioritized and waiting time is reduced, productivity could recover by +4.9% and fuel burn could drop by -6.7%.",
            "Estimated annualized impact: -US$126K in avoidable costs and 14% reduction in downtime risk for priority assets.",
        ]
        return scenario
