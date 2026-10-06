import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Minelot | AI Decision Layer for Mining',
  description: 'Connect fragmented mining data and make smarter operational decisions with AI-powered insights.',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
