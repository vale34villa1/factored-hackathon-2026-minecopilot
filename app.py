from __future__ import annotations

import os
from pathlib import Path

import streamlit as st
import pandas as pd

from src.data_engine import MiningDataEngine
from src.risk_engine import RiskEngine
from src.lean_engine import LeanEngine
from src.recommendation_engine import RecommendationEngine
from src.llm_agent import LLMAgent


st.set_page_config(page_title="MineCopilot AI", page_icon="⛏️", layout="wide")
st.title("MineCopilot AI")
st.caption("Conversational Mining Intelligence")

DATA_DIR = Path(__file__).parent / "data"


@st.cache_data
def load_dashboard_context():
    data_engine = MiningDataEngine(DATA_DIR)
    summary = data_engine.compute_summary()
    risk_engine = RiskEngine(summary)
    lean_engine = LeanEngine(summary)
    recommendation_engine = RecommendationEngine(summary, risk_engine.evaluate(), lean_engine.evaluate())

    context = {
        "summary": summary,
        "risks": risk_engine.evaluate(),
        "lean": lean_engine.evaluate(),
        "recommendations": recommendation_engine.generate(),
        "plans": recommendation_engine.simulation(),
    }
    return context


context = load_dashboard_context()
summary = context["summary"]
risks = context["risks"]
lean = context["lean"]
recommendations = context["recommendations"]
plans = context["plans"]

col1, col2, col3, col4 = st.columns(4)
col1.metric("Risk Score", f"{summary['risk_score']}/100", "+6 vs baseline")
col2.metric("Productivity", f"{summary['productivity_delta']:.1f}%", "Daily change")
col3.metric("Lean Waste", f"{summary['lean_waste']:.1f}%", "Process inefficiency")
col4.metric("Availability", f"{summary['availability']:.1f}%", "Fleet uptime")

with st.container():
    left, right = st.columns([1.5, 1])

    with left:
        st.subheader("Operational briefing")
        st.write(
            "Productivity is down because waiting time increased, equipment availability dropped, and route deviation remained elevated. "
            "The most urgent risk is the maintenance backlog on T-24 and F2 equipment."
        )

        st.markdown("### Top risks")
        for index, risk in enumerate(risks[:3], start=1):
            st.markdown(f"{index}. **{risk['title']}** — {risk['severity']} ({risk['impact']})")

        st.markdown("### Lean waste patterns")
        for issue in lean[:3]:
            st.markdown(f"- **{issue['title']}**: {issue['detail']}")

    with right:
        st.subheader("Recommended action")
        for action in recommendations[:3]:
            st.markdown(f"- {action}")

        st.markdown("### Impact simulation")
        for item in plans[:3]:
            st.markdown(f"- {item}")


st.markdown("---")

llm_agent = LLMAgent()

question = st.chat_input("Ask MineCopilot...")
if question:
    response = llm_agent.answer(question, summary, risks, lean, recommendations, plans)
    st.markdown(f"### Your question\n> {question}")
    st.markdown(f"### MineCopilot response\n{response}")
else:
    st.markdown("### Suggested prompts")
    st.code("Why did productivity decrease today?\nWhat is the most critical risk?\nWhat should we do next?\nWhat happens if we do nothing?")

st.markdown("---")

with st.expander("Data context"):
    st.json({
        "risk_score": summary["risk_score"],
        "productivity_delta": summary["productivity_delta"],
        "lean_waste": summary["lean_waste"],
        "availability": summary["availability"],
        "waiting_time": summary["waiting_time"],
        "critical_equipment": summary["critical_equipment"],
    })
