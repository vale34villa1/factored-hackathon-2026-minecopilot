from __future__ import annotations


class RiskEngine:
    def __init__(self, summary: dict):
        self.summary = summary

    def evaluate(self):
        risks = []

        if self.summary["availability"] < 90:
            risks.append({
                "title": "Equipment availability deterioration",
                "severity": "High",
                "impact": "Fleet throughput and dispatch rate are falling.",
            })

        if self.summary["waiting_time"] > 25:
            risks.append({
                "title": "Truck queue and waiting time escalation",
                "severity": "High",
                "impact": "Productivity loss is compounded by congestion and long idle cycles.",
            })

        if self.summary["route_deviation"] > 8:
            risks.append({
                "title": "Route deviation and dispatch inefficiency",
                "severity": "Medium",
                "impact": "Fuel burn and travel distance are above target.",
            })

        if self.summary["critical_equipment"]:
            top_equipment = self.summary["critical_equipment"][0]
            risks.append({
                "title": f"Maintenance backlog on {top_equipment['equipment']}",
                "severity": "Critical",
                "impact": "Downtime is concentrated in a single fleet asset and may worsen quickly.",
            })

        if not risks:
            risks.append({
                "title": "Stable operational conditions",
                "severity": "Low",
                "impact": "No immediate escalations detected from current data.",
            })

        return risks
