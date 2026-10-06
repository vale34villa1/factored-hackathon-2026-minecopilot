import json
from pathlib import Path

import pandas as pd

from app.services.lean_service import LeanService
from app.services.recommendation_service import RecommendationService
from app.services.risk_service import RiskService


class DataService:
    def __init__(self, data_dir: str | None = None):
        base_dir = Path(__file__).resolve().parents[2]
        self.data_dir = Path(data_dir) if data_dir else base_dir / "data"
        self.risk_service = RiskService()
        self.lean_service = LeanService()
        self.recommendation_service = RecommendationService()

    def _read_csv(self, file_name: str) -> pd.DataFrame:
        path = self.data_dir / file_name
        if not path.exists():
            return pd.DataFrame()
        return pd.read_csv(path)

    def _safe_mean(self, df: pd.DataFrame, key: str, default: float) -> float:
        if df.empty or key not in df.columns:
            return float(default)
        series = pd.to_numeric(df[key], errors="coerce")
        values = series.dropna()
        if values.empty:
            return float(default)
        return float(values.mean())

    def build_summary(self):
        production = self._read_csv("production.csv")
        equipment = self._read_csv("equipment.csv")
        maintenance = self._read_csv("maintenance.csv")
        incidents = self._read_csv("safety_incidents.csv")
        operations = self._read_csv("operations.csv")

        if production.empty:
            production = pd.DataFrame([
                {"shift": "A", "target_tons": 17000, "actual_tons": 15550},
                {"shift": "B", "target_tons": 17600, "actual_tons": 16040},
                {"shift": "C", "target_tons": 16800, "actual_tons": 15280},
            ])

        if equipment.empty:
            equipment = pd.DataFrame([
                {"equipment": "T-24", "availability_pct": 88.4, "status": "degraded"},
                {"equipment": "F2", "availability_pct": 91.0, "status": "watch"},
                {"equipment": "D-7", "availability_pct": 93.5, "status": "normal"},
            ])

        if maintenance.empty:
            maintenance = pd.DataFrame([
                {"equipment": "T-24", "priority": "high", "downtime_hours": 11.5},
                {"equipment": "F2", "priority": "high", "downtime_hours": 8.3},
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
        availability = round(self._safe_mean(equipment, "availability_pct", 90.0), 1)
        waiting_time = round(self._safe_mean(operations[operations["metric"] == "waiting_time"], "value", 31.0), 1)
        route_deviation = round(self._safe_mean(operations[operations["metric"] == "route_deviation"], "value", 12.0), 1)
        fuel_consumption = round(self._safe_mean(operations[operations["metric"] == "fuel_consumption"], "value", 7.1), 1)

        risk_score = self.risk_service.calculate_risk(availability, waiting_time, route_deviation, maintenance)
        lean_waste = self.lean_service.calculate_lean_waste(waiting_time, route_deviation, fuel_consumption)
        recommendations = self.recommendation_service.get_recommendations({
            "availability": availability,
            "waiting_time": waiting_time,
            "route_deviation": route_deviation,
            "fuel_consumption": fuel_consumption,
        })

        return {
            "risk_score": risk_score,
            "productivity_delta": productivity_delta,
            "lean_waste": lean_waste,
            "availability": availability,
            "waiting_time": waiting_time,
            "route_deviation": route_deviation,
            "fuel_consumption": fuel_consumption,
            "critical_equipment": maintenance.head(3).to_dict("records"),
            "recommendations": recommendations,
        }

    def get_risks(self):
        summary = self.build_summary()
        return self.risk_service.detect_risks(summary)

    def get_lean(self):
        summary = self.build_summary()
        return self.lean_service.detect_lean_waste(summary)

    def get_recommendations(self):
        summary = self.build_summary()
        return self.recommendation_service.get_recommendations(summary)

    def get_equipment(self):
        equipment = self._read_csv("equipment.csv")
        if equipment.empty:
            equipment = pd.DataFrame([
                {"equipment": "T-24", "availability_pct": 88.4, "status": "degraded"},
                {"equipment": "F2", "availability_pct": 91.0, "status": "watch"},
            ])
        return equipment.to_dict("records")

    def score_risk(self, question: str):
        summary = self.build_summary()
        return {"risk_score": summary["risk_score"], "question": question}

    def score_lean(self, question: str):
        summary = self.build_summary()
        return {"lean_waste": summary["lean_waste"], "question": question}

    def simulate_scenario(self, question: str):
        summary = self.build_summary()
        return {
            "question": question,
            "if_we_act": "Productivity may recover +4.9% and fuel may reduce by 6.7%.",
            "if_we_do_nothing": "Productivity may continue to decline by 2–3% in the next shift.",
            "summary": summary,
        }
