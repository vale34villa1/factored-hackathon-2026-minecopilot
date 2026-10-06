'use client'

import Link from 'next/link'
import { ArrowLeft, Send, BarChart3 } from 'lucide-react'
import { useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const DEMO_RESPONSES: { [key: string]: string } = {
  'productivity': 'Your productivity is down 8.4% today due to three factors: 1) Equipment T-24 showing failure signs (estimated -4.2% impact), 2) Fleet F2 experiencing 31% waiting time (-2.8% impact), 3) Route optimization issues (-1.4% impact). I recommend prioritizing T-24 maintenance immediately. Estimated ROI if fixed: +€120K annual savings.',
  'risk': 'Current operational risk score: 82/100 (CRITICAL). Breakdown: Equipment failure risk 82/100, Maintenance backlog 71/100, Safety incident potential 67/100. If left unaddressed, estimated impact within 7 days: €250K+ in losses. Action: Schedule emergency maintenance for T-24, review safety protocols, and increase inspection frequency.',
  'waste': 'Lean waste analysis shows: Waiting (35% of total waste - €120K potential), Transportation (28% - €95K), Motion (22% - €78K), Overprocessing (18% - €62K). Total identified waste: €355K annually. Quick wins: Reduce F2 queue time by 15% (+€52K), optimize routing (+€38K), streamline inspection process (+€25K).',
  'simulate': 'What-if scenario: Reduce F2 waiting time by 15%. Results: +4.9% productivity, -6.7% fuel consumption, -12% downtime risk, +€126K annual savings. Implementation cost: €15K. ROI: 742%. Timeline: 2-3 weeks. I also recommend testing this on Site B first before full deployment.',
  'recommendation': 'Top 3 priority actions: 1) Conduct emergency maintenance on T-24 (Impact: +€120K, Timeline: 3 days), 2) Optimize F2 fleet routing (Impact: +€78K, Timeline: 1 week), 3) Reduce inspection cycle time by 20% (Impact: +€45K, Timeline: 2 weeks). Total potential impact: €243K. Combined implementation cost: €35K. ROI: 594%.',
  'default': 'I\'ve analyzed your mining operations data. Key findings: Your operation is performing at 91.6% efficiency (target: 100%), with the main bottleneck being equipment maintenance (T-24 is critical). Immediate action recommended: Schedule T-24 maintenance within 24 hours. Would you like me to dive deeper into any specific area or simulate a scenario?'
}

function findBestResponse(input: string): string {
  const lower = input.toLowerCase()
  
  if (lower.includes('productivity') || lower.includes('decrease')) return DEMO_RESPONSES['productivity']
  if (lower.includes('risk')) return DEMO_RESPONSES['risk']
  if (lower.includes('waste') || lower.includes('lean')) return DEMO_RESPONSES['waste']
  if (lower.includes('simulate') || lower.includes('what if')) return DEMO_RESPONSES['simulate']
  if (lower.includes('recommend') || lower.includes('should')) return DEMO_RESPONSES['recommendation']
  
  return DEMO_RESPONSES['default']
}

export default function Copilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Welcome to Minelot AI Copilot. I can help you understand your mining operations. Ask me about productivity, risks, waste analysis, or what-if scenarios.'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return
    
    const userMsg: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Simulate response delay
    setTimeout(() => {
      const response = findBestResponse(input)
      const assistantMsg: Message = { role: 'assistant', content: response }
      setMessages(prev => [...prev, assistantMsg])
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Header */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <h1 className="text-xl font-bold text-white">Minelot AI Copilot</h1>
          <Link href="/dashboard" className="px-4 py-2 rounded-lg border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-white transition text-sm">
            <BarChart3 className="w-5 h-5" />
          </Link>
        </div>
      </nav>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto max-w-5xl mx-auto w-full px-6 py-8">
        {messages.length === 1 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ask Minelot Anything</h2>
            <p className="text-slate-400 max-w-xl mb-8">Get instant insights about your mining operations. Try: "Why did productivity decrease?", "What is the most critical risk?", "What if we reduce waiting time by 15%?"</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
              {[
                'Why did productivity decrease?',
                'What is the most critical risk?',
                'What happens if we reduce waiting time by 15%?',
                'What should we do next?'
              ].map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(q)
                    setTimeout(() => {
                      const userMsg: Message = { role: 'user', content: q }
                      setMessages(prev => [...prev, userMsg])
                      setLoading(true)
                      setTimeout(() => {
                        const response = findBestResponse(q)
                        const assistantMsg: Message = { role: 'assistant', content: response }
                        setMessages(prev => [...prev, assistantMsg])
                        setLoading(false)
                      }, 800)
                    }, 50)
                  }}
                  className="text-left p-4 rounded-lg border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/50 transition text-slate-300 hover:text-white"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl px-6 py-4 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-cyan-600 text-white rounded-tr-none'
                    : 'bg-slate-800 text-slate-100 border border-slate-700 rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-100 rounded-2xl rounded-tl-none px-6 py-4 border border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                    <span>Analyzing your data...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about productivity, risks, waste, or what-if scenarios..."
              className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-500 focus:outline-none text-white placeholder-slate-500 transition"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}