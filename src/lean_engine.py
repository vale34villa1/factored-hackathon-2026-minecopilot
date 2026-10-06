from __future__ import annotations


class LeanEngine:
    def __init__(self, summary: dict):
        self.summary = summary

    def evaluate(self):
        patterns = []

        if self.summary["waiting_time"] > 25:
            patterns.append({
                "title": "Waiting time waste",
                "detail": "Queue time is driving the biggest operational inefficiency in the current shift.",
            })

        if self.summary["route_deviation"] > 10:
            patterns.append({
                "title": "Routing waste",
                "detail": "Deviation from optimal haul paths increases cycle time and fuel consumption.",
            })

        if self.summary["fuel_consumption"] > 6:
            patterns.append({
                "title": "Fuel consumption variance",
                "detail": "Energy efficiency is below the expected operating range for the current fleet profile.",
            })

        if not patterns:
            patterns.append({
                "title": "No major Lean waste detected",
                "detail": "Current operations are relatively balanced against target performance.",
            })

        return patterns
