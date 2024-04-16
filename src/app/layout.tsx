import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SCProviders from './scProviders'
import Navigation from '@/components/Navigation'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StreamScape',
  description: 'Watch free movies and TV shows',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark !scroll-smooth">
      <body className={inter.className}>
        <SCProviders>
          <Navigation />
          <div className="m-7 md:m-16">{children}</div>
        </SCProviders>
      </body>
    </html>
  )
}
