'use client'

import Link from 'next/link'
import { ArrowLeft, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react'
import { useState } from 'react'

export default function Analytics() {
  const [timerange, setTimerange] = useState('7d')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-xl font-bold text-white">Minelot Analytics</h1>
          <div className="flex gap-2">
            {['24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimerange(range)}
                className={`px-4 py-2 rounded transition ${
                  timerange === range
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Key Metrics */}
        <h2 className="text-2xl font-bold text-white mb-8">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 font-medium">Avg Production</h3>
              <TrendingUp className="w-5 h-5 text-cyan-500" />
            </div>
            <div className="text-3xl font-bold text-white">847<span className="text-sm text-slate-400"> tons/day</span></div>
            <p className="text-xs text-slate-400 mt-2">Target: 920 tons</p>
          </div>

          <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 font-medium">Equipment Uptime</h3>
              <BarChart3 className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-white">93<span className="text-sm text-slate-400">%</span></div>
            <p className="text-xs text-green-400 mt-2">↑ +3% from last week</p>
          </div>

          <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 font-medium">Total Downtime</h3>
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-3xl font-bold text-white">18.5<span className="text-sm text-slate-400">h</span></div>
            <p className="text-xs text-amber-400 mt-2">↑ +6% from last week</p>
          </div>

          <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-400 font-medium">Avg Cost/Ton</h3>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-white">€24.50</div>
            <p className="text-xs text-blue-400 mt-2">↓ -2% from last week</p>
          </div>
        </div>

        {/* Charts */}
        <h2 className="text-2xl font-bold text-white mb-8">Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50">
            <h3 className="text-white font-bold mb-6">Production Trend</h3>
            <div className="space-y-4">
              {[
                { day: 'Mon', value: 850 },
                { day: 'Tue', value: 812 },
                { day: 'Wed', value: 798 },
                { day: 'Thu', value: 835 },
                { day: 'Fri', value: 880 },
                { day: 'Sat', value: 915 },
                { day: 'Sun', value: 847 },
              ].map((item) => (
                <div key={item.day} className="flex items-center gap-4">
                  <div className="w-12 text-slate-400 text-sm">{item.day}</div>
                  <div className="flex-1 bg-slate-800 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      style={{ width: `${(item.value / 920) * 100}%` }}
                    />
                  </div>
                  <div className="w-16 text-right text-slate-300 text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50">
            <h3 className="text-white font-bold mb-6">Risk Distribution</h3>
            <div className="space-y-4">
              {[
                { category: 'Equipment Failure', risk: 82 },
                { category: 'Maintenance Backlog', risk: 71 },
                { category: 'Safety Incident', risk: 67 },
                { category: 'Production Delay', risk: 54 },
                { category: 'Operator Error', risk: 38 },
              ].map((item) => (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">{item.category}</span>
                    <span className="text-slate-300 text-sm font-medium">{item.risk}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.risk >= 70 ? 'bg-red-500' :
                        item.risk >= 50 ? 'bg-amber-500' :
                        'bg-yellow-500'
                      }`}
                      style={{ width: `${item.risk}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center p-8 rounded-lg border border-slate-800 bg-gradient-to-r from-cyan-600/20 to-blue-600/20">
          <h3 className="text-white font-bold text-xl mb-2">Need Personalized Insights?</h3>
          <p className="text-slate-400 mb-4">Talk to our AI Copilot to get specific recommendations based on your data</p>
          <Link href="/copilot" className="inline-block px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition">
            Launch Copilot
          </Link>
        </div>
      </div>
    </div>
  )
}
