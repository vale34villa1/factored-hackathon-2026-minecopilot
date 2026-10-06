'use client'

import Link from 'next/link'
import { ArrowLeft, BarChart3, AlertTriangle, TrendingUp, Zap } from 'lucide-react'
import { useState } from 'react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition">
            <ArrowLeft className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <h1 className="text-xl font-bold text-white">Minelot Dashboard</h1>
          <Link href="/copilot" className="px-4 py-2 rounded-lg border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-white transition text-sm">
            AI Copilot
          </Link>
        </div>
      </nav>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex gap-4 border-b border-slate-800 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 font-medium transition ${
              activeTab === 'overview'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('risks')}
            className={`px-4 py-3 font-medium transition ${
              activeTab === 'risks'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Risk Assessment
          </button>
          <button
            onClick={() => setActiveTab('lean')}
            className={`px-4 py-3 font-medium transition ${
              activeTab === 'lean'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Lean Analysis
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-400 font-medium text-sm">Risk Score</h3>
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <div className="text-3xl font-bold text-white">82<span className="text-sm text-slate-400">/100</span></div>
                <p className="text-xs text-red-400 mt-2">Critical - Requires immediate action</p>
              </div>

              <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-400 font-medium text-sm">Productivity Delta</h3>
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                </div>
                <div className="text-3xl font-bold text-white">-8.4<span className="text-sm text-slate-400">%</span></div>
                <p className="text-xs text-amber-400 mt-2">Below target performance</p>
              </div>

              <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-400 font-medium text-sm">Lean Waste Score</h3>
                  <Zap className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="text-3xl font-bold text-white">31.7<span className="text-sm text-slate-400">/100</span></div>
                <p className="text-xs text-yellow-400 mt-2">High inefficiency detected</p>
              </div>

              <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-400 font-medium text-sm">Equipment Uptime</h3>
                  <BarChart3 className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-white">93<span className="text-sm text-slate-400">%</span></div>
                <p className="text-xs text-green-400 mt-2">Good performance maintained</p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-6 rounded-lg border border-slate-800 bg-slate-900/50">
              <h3 className="text-xl font-bold text-white mb-6">Top Recommendations</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border-l-4 border-red-500 bg-red-500/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-white">Prioritize T-24 Maintenance</h4>
                      <p className="text-sm text-slate-400 mt-1">Critical equipment showing failure signs. Estimated productivity impact: +4.2%. ROI: €120K annual savings.</p>
                    </div>
                    <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded text-xs font-medium whitespace-nowrap ml-4">Critical</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg border-l-4 border-amber-500 bg-amber-500/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-white">Optimize F2 Fleet Routing</h4>
                      <p className="text-sm text-slate-400 mt-1">Fleet F2 experiencing 31% queue delays. Estimated productivity impact: +2.8%. ROI: €78K annual savings.</p>
                    </div>
                    <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded text-xs font-medium whitespace-nowrap ml-4">High</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-500/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-white">Reduce Inspection Cycle Time</h4>
                      <p className="text-sm text-slate-400 mt-1">Streamline inspection process by 20%. Estimated productivity impact: +1.8%. ROI: €45K annual savings.</p>
                    </div>
                    <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded text-xs font-medium whitespace-nowrap ml-4">Medium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Risk Assessment Tab */}
        {activeTab === 'risks' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Risk Assessment</h2>
            <div className="space-y-4">
              {[
                { name: 'Equipment Failure', risk: 82, level: 'Critical' },
                { name: 'Maintenance Backlog', risk: 71, level: 'High' },
                { name: 'Safety Incident', risk: 67, level: 'High' },
                { name: 'Production Delay', risk: 54, level: 'Medium' },
                { name: 'Operator Error', risk: 38, level: 'Low' },
              ].map((item) => (
                <div key={item.name} className="p-4 rounded-lg border border-slate-800 bg-slate-900/50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-semibold">{item.name}</h4>
                    <span className={`px-3 py-1 rounded text-xs font-medium ${
                      item.level === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      item.level === 'High' ? 'bg-amber-500/20 text-amber-400' :
                      item.level === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {item.level}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className={`h-2 rounded-full ${
                      item.risk >= 70 ? 'bg-red-500' :
                      item.risk >= 50 ? 'bg-amber-500' :
                      'bg-yellow-500'
                    }`} style={{ width: `${item.risk}%` }} />
                  </div>
                  <p className="text-sm text-slate-400 mt-2">Risk Score: {item.risk}/100</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lean Analysis Tab */}
        {activeTab === 'lean' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Lean Waste Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { category: 'Waiting', waste: 35, savings: '€120K' },
                { category: 'Transportation', waste: 28, savings: '€95K' },
                { category: 'Motion', waste: 22, savings: '€78K' },
                { category: 'Overprocessing', waste: 18, savings: '€62K' },
                { category: 'Inventory', waste: 15, savings: '€52K' },
                { category: 'Defects', waste: 12, savings: '€45K' },
              ].map((item) => (
                <div key={item.category} className="p-4 rounded-lg border border-slate-800 bg-slate-900/50">
                  <h4 className="text-white font-semibold mb-3">{item.category}</h4>
                  <div className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-slate-400">Waste Level</span>
                      <span className="text-xs text-slate-300 font-medium">{item.waste}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className="h-2 rounded-full bg-amber-500" style={{ width: `${item.waste}%` }} />
                    </div>
                  </div>
                  <p className="text-sm text-cyan-400">Potential savings: {item.savings}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}