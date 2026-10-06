'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, Zap, TrendingUp, Activity, Loader } from 'lucide-react'

interface DashboardData {
  risk_score: number
  productivity_delta: number
  lean_waste: number
  availability: number
  waiting_time: number
  route_deviation: number
  fuel_consumption: number
  critical_equipment: Array<{ equipment: string; downtime_hours: number; priority: string }>
  recommendations: string[]
}

const getRiskColor = (score: number) => {
  if (score <= 30) return 'text-green-400'
  if (score <= 60) return 'text-yellow-400'
  if (score <= 80) return 'text-orange-400'
  return 'text-red-400'
}

const getRiskBg = (score: number) => {
  if (score <= 30) return 'bg-green-500/20'
  if (score <= 60) return 'bg-yellow-500/20'
  if (score <= 80) return 'bg-orange-500/20'
  return 'bg-red-500/20'
}

const getRiskLabel = (score: number) => {
  if (score <= 30) return 'LOW'
  if (score <= 60) return 'MEDIUM'
  if (score <= 80) return 'HIGH'
  return 'CRITICAL'
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/dashboard/summary')
      if (!response.ok) throw new Error('Failed to fetch dashboard data')
      const dashData = await response.json()
      setData(dashData)
    } catch (err) {
      setError('Unable to connect to backend. Make sure it\'s running on http://localhost:8000')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">⛏️</span>
            </div>
            <h1 className="text-2xl font-bold text-white">MineCopilot Dashboard</h1>
          </Link>
          <Link href="/copilot" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition">
            Ask Copilot
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Loader className="w-12 h-12 animate-spin text-cyan-500 mx-auto mb-4" />
              <p className="text-slate-400">Loading operational data...</p>
            </div>
          </div>
        ) : error ? (
          <div className="p-6 rounded-lg border border-red-500/50 bg-red-500/10">
            <p className="text-red-400 font-semibold">Connection Error</p>
            <p className="text-red-300 text-sm mt-2">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="mt-4 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm transition"
            >
              Retry
            </button>
          </div>
        ) : data ? (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className={`p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur ${getRiskBg(data.risk_score)}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-400 text-sm font-semibold">RISK SCORE</span>
                  <AlertTriangle className={`w-5 h-5 ${getRiskColor(data.risk_score)}`} />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-bold ${getRiskColor(data.risk_score)}`}>{data.risk_score}</span>
                  <span className="text-slate-400 text-sm">/100</span>
                </div>
                <p className={`text-xs mt-2 font-semibold ${getRiskColor(data.risk_score)}`}>{getRiskLabel(data.risk_score)}</p>
              </div>

              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-400 text-sm font-semibold">PRODUCTIVITY</span>
                  <TrendingUp className="w-5 h-5 text-orange-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-orange-400">{data.productivity_delta}%</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Daily change</p>
              </div>

              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-400 text-sm font-semibold">LEAN WASTE</span>
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-amber-400">{data.lean_waste}%</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Process inefficiency</p>
              </div>

              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-400 text-sm font-semibold">AVAILABILITY</span>
                  <Activity className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-green-400">{data.availability}%</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Fleet uptime</p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Operational Metrics */}
              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur">
                <h3 className="text-lg font-semibold text-white mb-6">Operational Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-400">Waiting Time</span>
                      <span className="text-white font-semibold">{data.waiting_time}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${Math.min(data.waiting_time, 100)}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-400">Route Deviation</span>
                      <span className="text-white font-semibold">{data.route_deviation}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${Math.min(data.route_deviation, 100)}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-400">Fuel Consumption</span>
                      <span className="text-white font-semibold">{data.fuel_consumption}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${Math.min(data.fuel_consumption, 100)}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Critical Equipment */}
              <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur">
                <h3 className="text-lg font-semibold text-white mb-6">Critical Equipment</h3>
                <div className="space-y-3">
                  {data.critical_equipment.slice(0, 3).map((eq, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-slate-700 bg-slate-800/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold">{eq.equipment}</p>
                          <p className="text-xs text-slate-400 mt-1">Downtime: {eq.downtime_hours}h</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          eq.priority === 'high' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {eq.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mt-8 p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur">
              <h3 className="text-lg font-semibold text-white mb-6">Recommended Actions</h3>
              <div className="space-y-3">
                {data.recommendations.slice(0, 3).map((rec, idx) => (
                  <div key={idx} className="p-4 rounded-lg border-l-4 border-cyan-500 bg-slate-800/30">
                    <p className="text-slate-200">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 p-6 rounded-xl border border-cyan-500/50 bg-cyan-500/10 text-center">
              <p className="text-slate-300 mb-4">Want to dig deeper into these insights?</p>
              <Link href="/copilot" className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold transition">
                Ask MineCopilot →
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}
