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
                frame = pd.read_csv(path)
                raw[file_name.replace(".csv", "")] = frame
        return raw

    def _safe_numeric_series(self, frame: pd.DataFrame, column: str, default: float) -> float:
        if frame.empty or column not in frame.columns:
            return float(default)
        series = pd.to_numeric(frame[column], errors="coerce")
        if series.empty or series.isna().all():
            return float(default)
        return float(series.mean())

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

        target = float(pd.to_numeric(production["target_tons"], errors="coerce").sum())
        actual = float(pd.to_numeric(production["actual_tons"], errors="coerce").sum())
        productivity_delta = float(round(((actual / target) - 1) * 100, 1)) if target else 0.0

        availability = float(round(self._safe_numeric_series(equipment, "availability_pct", 90.0), 1))
        waiting_time = float(round(self._safe_numeric_series(operations[operations["metric"] == "waiting_time"], "value", 31.0), 1))
        route_deviation = float(round(self._safe_numeric_series(operations[operations["metric"] == "route_deviation"], "value", 12.0), 1))
        fuel_consumption = float(round(self._safe_numeric_series(operations[operations["metric"] == "fuel_consumption"], "value", 7.1), 1))

        incident_severity_weight = {"low": 1, "medium": 2, "high": 4, "critical": 6}
        incident_score = 0.0
        if not incidents.empty:
            levels = incidents["severity"].astype(str).str.lower()
            counts = pd.to_numeric(incidents["count"], errors="coerce").fillna(0)
            weights = levels.map(incident_severity_weight).fillna(1)
            incident_score = float((counts * weights).sum())

        risk_score = int(min(100, max(0, round(70 + (35 - availability) * 1.3 + waiting_time * 0.5 + incident_score * 1.2))))
        lean_waste = float(round(max(6.0, waiting_time + route_deviation * 0.7 + fuel_consumption * 0.6), 1))

        critical_equipment = maintenance.copy()
        if not critical_equipment.empty:
            critical_equipment = critical_equipment.sort_values("downtime_hours", ascending=False)[["equipment", "downtime_hours", "priority"]].head(3).to_dict("records")
        else:
            critical_equipment = []

        return {
            "production": production,
            "equipment": equipment,
            "maintenance": maintenance,
            "incidents": incidents,
            "operations": operations,
            "target_tons": target,
            "actual_tons": actual,
            "productivity_delta": productivity_delta,
            "availability": availability,
            "waiting_time": waiting_time,
            "route_deviation": route_deviation,
            "fuel_consumption": fuel_consumption,
            "risk_score": risk_score,
            "lean_waste": lean_waste,
            "critical_equipment": critical_equipment,
        }
