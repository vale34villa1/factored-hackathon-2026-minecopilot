import Link from 'next/link'
import { ArrowRight, AlertTriangle, Zap, TrendingDown, BarChart3, Cpu } from 'lucide-react'

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
              <h1 className="text-xl font-bold text-white">Minelot</h1>
              <p className="text-xs text-slate-400">AI Decision Layer for Mining</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="px-4 py-2 text-slate-300 hover:text-white transition font-medium">
              Dashboard
            </Link>
            <Link href="/analytics" className="px-4 py-2 text-slate-300 hover:text-white transition font-medium">
              Analytics
            </Link>
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
              Connect Fragmented Mining Data<br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Make Smarter Decisions</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Minelot bridges your ERP, maintenance, production, and safety systems to explain risks, identify waste, simulate scenarios, and recommend the highest-impact actions—all through conversational AI.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/copilot" className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold transition shadow-lg hover:shadow-xl">
                Start Demo <ArrowRight className="inline ml-2 w-5 h-5" />
              </Link>
              <Link href="#features" className="px-6 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold transition">
                Learn More
              </Link>
              <Link href="/dashboard" className="px-6 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold transition">
                View Dashboard
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur hover:border-cyan-500/50 transition hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer">
              <AlertTriangle className="w-8 h-8 text-red-500 mb-3" />
              <h3 className="text-white font-semibold mb-2">Risk Detection</h3>
              <p className="text-sm text-slate-400">Identify critical operational risks before they escalate</p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur hover:border-cyan-500/50 transition hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer">
              <Zap className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="text-white font-semibold mb-2">Lean Waste</h3>
              <p className="text-sm text-slate-400">Detect and quantify operational inefficiencies</p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur hover:border-cyan-500/50 transition hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer">
              <TrendingDown className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="text-white font-semibold mb-2">What-If Simulation</h3>
              <p className="text-sm text-slate-400">Model scenarios and predict operational outcomes</p>
            </div>
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur hover:border-cyan-500/50 transition hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer">
              <Cpu className="w-8 h-8 text-purple-500 mb-3" />
              <h3 className="text-white font-semibold mb-2">AI Insights</h3>
              <p className="text-sm text-slate-400">Evidence-backed recommendations with estimated ROI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-slate-900/50 border-y border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-slate-800 bg-slate-950/50">
              <BarChart3 className="w-10 h-10 text-cyan-500 mb-4" />
              <h4 className="text-white font-bold mb-2">Real-Time Dashboards</h4>
              <p className="text-slate-400">Monitor KPIs, risks, and recommendations at a glance with beautiful visualizations</p>
            </div>
            <div className="p-6 rounded-lg border border-slate-800 bg-slate-950/50">
              <Zap className="w-10 h-10 text-amber-500 mb-4" />
              <h4 className="text-white font-bold mb-2">Instant Analysis</h4>
              <p className="text-slate-400">Get answers in seconds through natural language conversations with AI</p>
            </div>
            <div className="p-6 rounded-lg border border-slate-800 bg-slate-950/50">
              <Cpu className="w-10 h-10 text-blue-500 mb-4" />
              <h4 className="text-white font-bold mb-2">Multi-System Integration</h4>
              <p className="text-slate-400">Connect ERP, SAP, maintenance, production, HSE, IoT, and SCADA systems seamlessly</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-white mb-12 text-center">How Minelot Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            { step: '1', title: 'ASK', desc: 'Ask in natural language' },
            { step: '2', title: 'RETRIEVE', desc: 'Fetch data & documents' },
            { step: '3', title: 'REASON', desc: 'Analytical engines analyze' },
            { step: '4', title: 'SIMULATE', desc: 'Model scenarios' },
            { step: '5', title: 'RECOMMEND', desc: 'Prioritized actions' },
          ].map((item) => (
            <div key={item.step} className="text-center p-6 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-cyan-500/50 transition">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">{item.step}</span>
              </div>
              <h4 className="text-white font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">Platform Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">+30%</div>
              <p className="text-slate-300">Improvement in Decision Speed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">9</div>
              <p className="text-slate-300">Lean Waste Categories Detected</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">24/7</div>
              <p className="text-slate-300">Operational Support</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">100%</div>
              <p className="text-slate-300">Evidence-Based Decisions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Mining Operations?</h2>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">Experience how AI decision layers can improve your operational intelligence in less than 3 minutes.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/copilot" className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-lg transition shadow-lg hover:shadow-xl">
            Launch Interactive Demo <ArrowRight className="inline ml-2 w-6 h-6" />
          </Link>
          <Link href="/dashboard" className="inline-block px-8 py-4 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-lg transition">
            View Analytics
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          <p>Minelot MVP • Factored Hackathon 2026</p>
          <p className="mt-2">This prototype is for demonstration and decision support only. It does not replace qualified mining, safety, or engineering judgment.</p>
        </div>
      </footer>
    </div>
  )
}
