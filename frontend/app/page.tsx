import Link from 'next/link'

const metrics = [
  { label: 'Risk Score', value: '76/100', delta: '+6 vs baseline' },
  { label: 'Productivity', value: '-8.4%', delta: 'Daily change' },
  { label: 'Lean Waste', value: '14.2%', delta: 'Process inefficiency' },
  { label: 'Availability', value: '88.4%', delta: 'Fleet uptime' },
]

const risks = [
  { title: 'Equipment availability deterioration', severity: 'High', impact: 'Fleet throughput and dispatch rate are falling.' },
  { title: 'Truck queue escalation', severity: 'High', impact: 'Productivity loss is compounded by congestion and long idle cycles.' },
  { title: 'Route deviation inefficiency', severity: 'Medium', impact: 'Fuel burn and travel distance exceed target.' },
]

const recommendations = [
  'Prioritize T-24 maintenance intervention before the next shift.',
  'Reduce truck queue pressure at the loading zone and rebalance dispatch.',
  'Review haul routes to minimize route deviation and recover energy efficiency.',
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl p-6">
        <header className="mb-8 flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">MineCopilot AI</p>
            <h1 className="mt-2 text-4xl font-bold">Conversational Mining Intelligence</h1>
          </div>
          <Link href="/chat" className="rounded-lg bg-cyan-500 px-5 py-3 font-medium text-slate-900 hover:bg-cyan-400">
            Ask MineCopilot
          </Link>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-glow">
              <p className="text-sm text-slate-400">{metric.label}</p>
              <p className="mt-3 text-3xl font-bold text-white">{metric.value}</p>
              <p className="mt-2 text-xs text-cyan-300">{metric.delta}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-4 text-xl font-semibold">Operational briefing</h2>
            <p className="mb-6 text-slate-300">
              Productivity is down because waiting time increased, equipment availability decreased, and
              route deviation remained elevated. The most urgent risk is the maintenance backlog on critical fleet assets.
            </p>

            <div className="space-y-4">
              {risks.map((risk) => (
                <div key={risk.title} className="rounded-xl border border-slate-700 bg-slate-950 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-white">{risk.title}</p>
                    <span className={risk.severity === 'High' ? 'text-red-400' : 'text-amber-400'}>{risk.severity}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{risk.impact}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-4 text-xl font-semibold">Recommended action</h2>
            <div className="space-y-3">
              {recommendations.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Ask MineCopilot</h2>
            <span className="rounded-full border border-cyan-500/50 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-wider text-cyan-300">
              Evidence-based
            </span>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <button className="rounded-xl border border-slate-700 bg-slate-950 p-4 text-left text-slate-200 hover:border-cyan-400">
              Why did productivity decrease today?
            </button>
            <button className="rounded-xl border border-slate-700 bg-slate-950 p-4 text-left text-slate-200 hover:border-cyan-400">
              What is the most critical risk?
            </button>
            <button className="rounded-xl border border-slate-700 bg-slate-950 p-4 text-left text-slate-200 hover:border-cyan-400">
              What should we do next?
            </button>
            <button className="rounded-xl border border-slate-700 bg-slate-950 p-4 text-left text-slate-200 hover:border-cyan-400">
              What happens if we do nothing?
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
