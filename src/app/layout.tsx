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
    <html
      lang="en"
      className="dark text-foreground bg-background !scroll-smooth scrollbar-track-primary-200 scrollbar-thin scrollbar-thumb-primary"
    >
      <body className={`${inter.className} scrollbar-track-primary`}>
        <SCProviders>
          <Navigation />
          {children}
        </SCProviders>
      </body>
    </html>
  )
}
