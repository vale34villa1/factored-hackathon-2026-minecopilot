import os
from pathlib import Path

import streamlit as st

from src.data_engine import MiningDataEngine
from src.lean_engine import LeanEngine
from src.llm_agent import LLMAgent
from src.recommendation_engine import RecommendationEngine
from src.risk_engine import RiskEngine
from src.security import sanitize_user_input

st.set_page_config(
    page_title="MineCopilot AI",
    page_icon="⛏️",
    layout="wide",
    initial_sidebar_state="expanded",
)

DATA_DIR = Path(__file__).parent / "data"

st.markdown(
    """
    <style>
        .main { background: linear-gradient(180deg, #0b1220 0%, #111827 100%); }
        .stApp { color: #e5e7eb; }
        div[data-testid="stMetricLabel"] { color: #d1d5db; }
        div[data-testid="stMetricValue"] { color: #f9fafb; font-size: 2.2rem; }
        .block-container { padding-top: 1.2rem; }
        .glass {
            background: rgba(17, 24, 39, 0.7);
            border: 1px solid rgba(148, 163, 184, 0.25);
            border-radius: 16px;
            padding: 1rem 1.2rem;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.2);
        }
        .section-title {
            font-size: 1.1rem;
            font-weight: 700;
            color: #f8fafc;
            margin-bottom: 0.5rem;
        }
    </style>
    """,
    unsafe_allow_html=True,
)

st.sidebar.image(
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    use_container_width=True,
)
st.sidebar.title("MineCopilot AI")
st.sidebar.caption("Conversational Mining Intelligence")

with st.sidebar:
    st.markdown("### Site context")
    st.info(
        "This prototype is designed to support operational decision-making and should never replace qualified, site-specific engineering or safety judgment."
    )
    st.markdown("### Controls")
    use_live_llm = st.toggle("Use OpenAI for conversational reasoning", value=False)


st.title("MineCopilot AI")
st.caption("Operational intelligence for mining teams.")


@st.cache_data
def load_dashboard_context():
    data_engine = MiningDataEngine(DATA_DIR)
    summary = data_engine.compute_summary()
    risk_engine = RiskEngine(summary)
    lean_engine = LeanEngine(summary)
    recommendation_engine = RecommendationEngine(summary, risk_engine.evaluate(), lean_engine.evaluate())

    return {
        "summary": summary,
        "risks": risk_engine.evaluate(),
        "lean": lean_engine.evaluate(),
        "recommendations": recommendation_engine.generate(),
        "plans": recommendation_engine.simulation(),
    }


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
    left, right = st.columns([1.6, 1])

    with left:
        st.markdown('<div class="section-title">Operational briefing</div>', unsafe_allow_html=True)
        st.markdown(
            """
            <div class="glass">
                Productivity is below target because <b>waiting time increased</b>, equipment availability fell, and route deviation remained elevated.
                The most urgent operating risk is the maintenance backlog on key fleet assets.
            </div>
            """,
            unsafe_allow_html=True,
        )

        st.markdown("### Top risks")
        for idx, risk in enumerate(risks[:3], start=1):
            severity_color = {
                "Low": "#4ade80",
                "Medium": "#fbbf24",
                "High": "#f97316",
                "Critical": "#ef4444",
            }.get(risk["severity"], "#cbd5e1")
            st.markdown(
                f"<div class='glass'><b>{idx}. {risk['title']}</b> — <span style='color:{severity_color};'>{risk['severity']}</span><br>{risk['impact']}</div>",
                unsafe_allow_html=True,
            )

        st.markdown("### Lean waste patterns")
        for issue in lean[:3]:
            st.markdown(
                f"<div class='glass'><b>{issue['title']}</b><br>{issue['detail']}</div>",
                unsafe_allow_html=True,
            )

    with right:
        st.markdown('<div class="section-title">Recommended action</div>', unsafe_allow_html=True)
        for action in recommendations[:3]:
            st.markdown(
                f"<div class='glass'>• {action}</div>",
                unsafe_allow_html=True,
            )

        st.markdown("### Impact simulation")
        for item in plans[:3]:
            st.markdown(
                f"<div class='glass'>• {item}</div>",
                unsafe_allow_html=True,
            )

st.markdown("---")

llm_agent = LLMAgent(enable_live_llm=use_live_llm)

with st.container():
    st.markdown('<div class="section-title">Ask MineCopilot</div>', unsafe_allow_html=True)
    question = st.chat_input("Ask MineCopilot about production, risk, or next steps...")

    if question:
        clean_question = sanitize_user_input(question)
        if not clean_question:
            st.warning("Please send a valid question before requesting a recommendation.")
        else:
            response = llm_agent.answer(clean_question, summary, risks, lean, recommendations, plans)
            st.markdown(f"### Your question\n> {clean_question}")
            st.markdown(f"### MineCopilot response\n{response}")
    else:
        st.code(
            "Why did productivity decrease today?\n"
            "What is the most critical risk?\n"
            "What should we do next?\n"
            "What happens if we do nothing?"
        )

st.markdown("---")

with st.expander("Operational data context"):
    st.json(
        {
            "risk_score": summary["risk_score"],
            "productivity_delta": summary["productivity_delta"],
            "lean_waste": summary["lean_waste"],
            "availability": summary["availability"],
            "waiting_time": summary["waiting_time"],
            "route_deviation": summary["route_deviation"],
            "fuel_consumption": summary["fuel_consumption"],
            "critical_equipment": summary["critical_equipment"],
        }
    )

st.warning(
    "This prototype is intended for demonstration and decision support only; it does not replace qualified mining, safety, or engineering judgment."
)
