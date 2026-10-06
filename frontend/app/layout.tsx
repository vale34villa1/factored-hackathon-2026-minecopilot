import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MineCopilot AI',
  description: 'Conversational mining intelligence dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  )
}
