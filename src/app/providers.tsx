'use client'
import { NextUIProvider } from '@nextui-org/react'
import ReactQueryProviders from '@/lib/react-query/react-query-provider'
import { Toaster } from 'react-hot-toast'
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProviders>
      <NextUIProvider>
        {children}
        <Toaster />
      </NextUIProvider>
    </ReactQueryProviders>
  )
}
