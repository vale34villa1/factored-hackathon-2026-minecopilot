class RiskService:
    def calculate_risk(self, availability: float, waiting_time: float, route_deviation: float, maintenance) -> int:
        score = 70 + (35 - availability) * 1.3 + waiting_time * 0.5 + route_deviation * 0.7
        if maintenance is not None and not maintenance.empty:
            score += len(maintenance) * 4
        return int(min(100, max(0, round(score))))

    def detect_risks(self, summary: dict):
        risks = []
        if summary.get("availability", 0) < 90:
            risks.append({"title": "Equipment availability deterioration", "severity": "High"})
        if summary.get("waiting_time", 0) > 25:
            risks.append({"title": "Truck queue escalation", "severity": "High"})
        if summary.get("route_deviation", 0) > 8:
            risks.append({"title": "Route deviation inefficiency", "severity": "Medium"})
        if not risks:
            risks.append({"title": "Operationally stable", "severity": "Low"})
        return risks
