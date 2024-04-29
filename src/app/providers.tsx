'use client'
import { NextUIProvider } from '@nextui-org/react'
import ReactQueryProviders from '@/lib/react-query/react-query-provider'
import { Toaster } from 'react-hot-toast'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(
    process.env.NEXT_PUBLIC_POSTHOG_KEY
      ? process.env.NEXT_PUBLIC_POSTHOG_KEY
      : '',
    {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    }
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProviders>
      <NextUIProvider>
        <PostHogProvider client={posthog}>
          {children}
          <Toaster />
        </PostHogProvider>
      </NextUIProvider>
    </ReactQueryProviders>
  )
}
