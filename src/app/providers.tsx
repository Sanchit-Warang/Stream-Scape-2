'use client'
/*
  workaround for https://github.com/nextauthjs/next-auth/issues/10016#issuecomment-1983672453
  the workaround can be understood by the comments below
*/


import { NextUIProvider } from '@nextui-org/react'
import ReactQueryProviders from '@/lib/react-query/react-query-provider'
import { Toaster } from 'react-hot-toast'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

// Next Session imports
import { Session } from "next-auth";
import {
    SessionProvider as NextSessionProvider,
    getSession
} from "next-auth/react";
import { usePathname } from "next/navigation";
import {
    ReactNode,
    useCallback,
    useEffect,
    useState
} from "react";
// Next Session imports done





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

  // Next Session Fix
  const [ session, setSession ] = useState<Session | null>(null);
    const pathName = usePathname();

    const fetchSession = useCallback(async () => {
        try {
            const sessionData = await getSession();
            setSession(sessionData);
        } catch (error) {
            setSession(null);

            if (process.env.NODE_ENV === "development") {
                console.error(error);
            }
        }
    }, []);

    useEffect(() => {
        fetchSession().finally();
    }, [fetchSession, pathName]);

    //Next Session fix end


  return (
    <NextSessionProvider session={session}>
    <ReactQueryProviders>
      <NextUIProvider>
        <PostHogProvider client={posthog}>
          {children}
          <Toaster />
        </PostHogProvider>
      </NextUIProvider>
    </ReactQueryProviders>
    </NextSessionProvider>
  )
}
