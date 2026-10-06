class LeanService:
    def calculate_lean_waste(self, waiting_time: float, route_deviation: float, fuel_consumption: float) -> float:
        return round(max(6.0, waiting_time + route_deviation * 0.7 + fuel_consumption * 0.6), 1)

    def detect_lean_waste(self, summary: dict):
        issues = []
        if summary.get("waiting_time", 0) > 25:
            issues.append({"title": "Waiting time waste", "detail": "Queueing and dispatch delays are driving productivity loss."})
        if summary.get("route_deviation", 0) > 10:
            issues.append({"title": "Routing inefficiency", "detail": "Non-optimal haul paths increase travel distance and fuel burn."})
        if not issues:
            issues.append({"title": "No major waste detected", "detail": "Current performance is within target range."})
        return issues
