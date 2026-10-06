import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MineCopilot AI | Chat',
}

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h1 className="mb-4 text-3xl font-bold">MineCopilot Chat</h1>
        <div className="rounded-xl border border-slate-700 bg-slate-950 p-4 text-slate-300">
          <p><strong>Supervisor:</strong> Why did productivity decrease today?</p>
          <p className="mt-4"><strong>MineCopilot:</strong> Productivity decreased 8.4%. The main drivers were waiting time (+31.2%), equipment availability (-11.6%), and route deviation (+12.3%). Recommended action: prioritize T-24 maintenance and reduce F2 queue pressure.</p>
        </div>
        <div className="mt-6 flex gap-3">
          <input
            className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500"
            placeholder="Ask MineCopilot..."
          />
          <button className="rounded-xl bg-cyan-500 px-5 py-3 font-medium text-slate-900">Send</button>
        </div>
      </div>
    </main>
  )
}
