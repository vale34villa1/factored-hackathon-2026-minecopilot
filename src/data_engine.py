from __future__ import annotations

from pathlib import Path

import pandas as pd


class MiningDataEngine:
    def __init__(self, data_dir: str | Path):
        self.data_dir = Path(data_dir)

    def load(self):
        raw = {}
        for file_name in [
            "production.csv",
            "equipment.csv",
            "maintenance.csv",
            "safety_incidents.csv",
            "operations.csv",
        ]:
            path = self.data_dir / file_name
            if path.exists():
                raw[file_name.replace(".csv", "")] = pd.read_csv(path)
        return raw

    def compute_summary(self):
        data = self.load()

        production = data.get("production", pd.DataFrame())
        equipment = data.get("equipment", pd.DataFrame())
        maintenance = data.get("maintenance", pd.DataFrame())
        incidents = data.get("safety_incidents", pd.DataFrame())
        operations = data.get("operations", pd.DataFrame())

        if production.empty:
            production = pd.DataFrame([
                {"shift": "A", "target_tons": 17000, "actual_tons": 15550},
                {"shift": "B", "target_tons": 17600, "actual_tons": 16040},
                {"shift": "C", "target_tons": 16800, "actual_tons": 15280},
            ])

        if equipment.empty:
            equipment = pd.DataFrame([
                {"equipment": "T-24", "availability_pct": 88.4, "fuel_efficiency": 81.2, "status": "degraded"},
                {"equipment": "F2", "availability_pct": 91.0, "fuel_efficiency": 84.5, "status": "watch"},
                {"equipment": "D-7", "availability_pct": 93.5, "fuel_efficiency": 89.0, "status": "normal"},
            ])

        if maintenance.empty:
            maintenance = pd.DataFrame([
                {"equipment": "T-24", "priority": "high", "downtime_hours": 11.5, "planned_action": "hydraulic inspection"},
                {"equipment": "F2", "priority": "high", "downtime_hours": 8.3, "planned_action": "brake and loader calibration"},
                {"equipment": "D-7", "priority": "medium", "downtime_hours": 4.1, "planned_action": "preventive service"},
            ])

        if incidents.empty:
            incidents = pd.DataFrame([
                {"severity": "medium", "count": 2},
                {"severity": "high", "count": 1},
                {"severity": "low", "count": 4},
            ])

        if operations.empty:
            operations = pd.DataFrame([
                {"metric": "waiting_time", "value": 31.2},
                {"metric": "route_deviation", "value": 12.3},
                {"metric": "fuel_consumption", "value": 7.1},
            ])

        target = production["target_tons"].sum()
        actual = production["actual_tons"].sum()
        productivity_delta = ((actual / target) - 1) * 100

        availability = equipment["availability_pct"].mean()
        waiting_time = operations.loc[operations["metric"] == "waiting_time", "value"].mean() if not operations.empty else 31.0
        route_deviation = operations.loc[operations["metric"] == "route_deviation", "value"].mean() if not operations.empty else 12.0
        fuel_consumption = operations.loc[operations["metric"] == "fuel_consumption", "value"].mean() if not operations.empty else 7.0

        incident_severity_weight = {"low": 1, "medium": 2, "high": 4, "critical": 6}
        incident_score = incidents.apply(lambda row: (row.get("count", 0) * incident_severity_weight.get(str(row["severity"]).lower(), 1)), axis=1).sum()

        risk_score = int(min(100, max(0, round(70 + (35 - availability) * 1.3 + waiting_time * 0.5 + incident_score * 1.2))))
        lean_waste = float(round(max(6.0, waiting_time + route_deviation * 0.7 + fuel_consumption * 0.6), 1))

        critical_equipment = maintenance.sort_values("downtime_hours", ascending=False)[["equipment", "downtime_hours", "priority"]].head(3).to_dict("records")

        return {
            "production": production,
            "equipment": equipment,
            "maintenance": maintenance,
            "incidents": incidents,
            "operations": operations,
            "target_tons": float(target),
            "actual_tons": float(actual),
            "productivity_delta": float(round(productivity_delta, 1)),
            "availability": float(round(availability, 1)),
            "waiting_time": float(round(waiting_time, 1)),
            "route_deviation": float(round(route_deviation, 1)),
            "fuel_consumption": float(round(fuel_consumption, 1)),
            "risk_score": risk_score,
            "lean_waste": lean_waste,
            "critical_equipment": critical_equipment,
        }
