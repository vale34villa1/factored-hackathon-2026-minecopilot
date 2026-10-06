'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Send, Loader, ChevronDown } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  evidence?: string[]
  sources?: string[]
}

const DEMO_SCENARIOS = [
  'Why did productivity decrease today?',
  'What is the most critical risk?',
  'What should we do next?',
  'What happens if we reduce waiting time by 15%?',
  'Give me an executive summary.',
  'Which equipment is most critical?',
  'Where are we losing the most money?',
  'Compare our sites.',
]

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setShowSuggestions(false)
    setLoading(true)

    try {
      const response = await fetch('http://localhost:8000/api/chat/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text }),
      })

      if (!response.ok) throw new Error('API error')

      const data = await response.json()
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer || 'No response generated.',
        evidence: data.evidence || [],
        sources: data.sources || [],
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Error connecting to backend. Make sure the backend is running on http://localhost:8000',
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">⛏️</span>
            </div>
            <h1 className="text-2xl font-bold text-white">MineCopilot Copilot</h1>
          </Link>
          <Link href="/dashboard" className="px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition text-sm">
            Dashboard
          </Link>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto max-w-5xl mx-auto w-full px-6 py-8">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ask MineCopilot Anything</h2>
            <p className="text-lg text-slate-400 mb-8 max-w-xl">Get evidence-based answers about your mining operations: risks, productivity, waste, and recommendations.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-2xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl rounded-tr-none'
                      : 'bg-slate-800 text-slate-100 rounded-2xl rounded-tl-none border border-slate-700'
                  } px-6 py-4`}
                >
                  <p className="mb-3">{msg.content}</p>
                  {msg.evidence && msg.evidence.length > 0 && (
                    <div className="text-sm opacity-90 border-t border-current pt-3 mt-3">
                      <p className="font-semibold mb-2">Evidence:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {msg.evidence.map((e, i) => (
                          <li key={i}>{e}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="text-xs opacity-75 mt-2 pt-2 border-t border-current">
                      <p className="font-semibold">Sources: {msg.sources.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-100 rounded-2xl rounded-tl-none px-6 py-4 border border-slate-700">
                  <div className="flex items-center gap-2">
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Analyzing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Suggestions */}
      {showSuggestions && messages.length === 0 && (
        <div className="max-w-5xl mx-auto w-full px-6 py-6">
          <p className="text-sm text-slate-400 mb-3">Try asking:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {DEMO_SCENARIOS.slice(0, 4).map((scenario, idx) => (
              <button
                key={idx}
                onClick={() => handleSubmit(scenario)}
                className="text-left p-4 rounded-lg border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/50 transition text-slate-300 hover:text-white"
              >
                {scenario}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(input)}
              placeholder="Ask about productivity, risks, waste, what-if scenarios..."
              className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-500 focus:outline-none text-white placeholder-slate-500 transition"
              disabled={loading}
            />
            <button
              onClick={() => handleSubmit(input)}
              disabled={loading || !input.trim()}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-3">💡 Tip: Ask specific questions like "Why did productivity decrease?", "What is the most critical risk?", or "What happens if we reduce waiting time by 15%?"</p>
        </div>
      </div>
    </div>
  )
}
