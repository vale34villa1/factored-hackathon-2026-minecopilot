import Link from 'next/link'
import { ArrowRight, AlertTriangle, Zap, TrendingDown } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">⛏️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">MineCopilot Enterprise</h1>
              <p className="text-xs text-slate-400">AI Decision Layer for Mining</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/copilot" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition">
              Launch Copilot
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              Connect Fragmented Mining Data.<br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Make Smarter Decisions.</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              MineCopilot bridges your ERP, maintenance, production, and safety systems to explain risks, identify waste, simulate scenarios, and recommend the highest-impact actions—all through conversational AI.
            </p>
            <div className="flex gap-4">
              <Link href="/copilot" className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold transition shadow-lg hover:shadow-cyan-500/50">
                Start Demo <ArrowRight className="inline ml-2 w-5 h-5" />
              </Link>
              <Link href="/dashboard" className="px-6 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold transition">
                View Dashboard
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur hover:border-cyan-500/50 transition">
              <AlertTriangle className="w-8 h-8 text-red-500 mb-3" />
              <h3 className="text-white font-semibold mb-2">Risk Detection</h3>
              <p className="text-sm text-slate-400">Identify critical operational risks before they escalate</p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur hover:border-cyan-500/50 transition">
              <Zap className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="text-white font-semibold mb-2">Lean Waste</h3>
              <p className="text-sm text-slate-400">Detect and quantify operational inefficiencies</p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur hover:border-cyan-500/50 transition">
              <TrendingDown className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="text-white font-semibold mb-2">What-If Simulation</h3>
              <p className="text-sm text-slate-400">Model scenarios and predict operational outcomes</p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur hover:border-cyan-500/50 transition">
              <Zap className="w-8 h-8 text-purple-500 mb-3" />
              <h3 className="text-white font-semibold mb-2">Actionable Insights</h3>
              <p className="text-sm text-slate-400">Evidence-backed recommendations with estimated ROI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop */}
      <section className="bg-slate-900/50 border-y border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: '1', title: 'ASK', desc: 'Natural language question' },
              { step: '2', title: 'RETRIEVE', desc: 'Fetch data & documents' },
              { step: '3', title: 'REASON', desc: 'Analytical engines analyze' },
              { step: '4', title: 'SIMULATE', desc: 'Model scenarios' },
              { step: '5', title: 'RECOMMEND', desc: 'Prioritized actions' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Mining Operations?</h2>
        <p className="text-xl text-slate-300 mb-8">Experience how AI decision layers can improve your operational intelligence in less than 3 minutes.</p>
        <Link href="/copilot" className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-lg transition shadow-lg hover:shadow-cyan-500/50">
          Launch Interactive Demo <ArrowRight className="inline ml-2 w-6 h-6" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          <p>MineCopilot Enterprise MVP • Factored Hackathon 2026</p>
          <p className="mt-2">This prototype is for demonstration and decision support only. It does not replace qualified mining, safety, or engineering judgment.</p>
        </div>
      </footer>
    </div>
  )
}
