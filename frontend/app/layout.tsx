import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MineCopilot Enterprise | AI Decision Layer for Mining',
  description: 'Connect fragmented mining data and make smarter operational decisions with AI-powered insights.',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
