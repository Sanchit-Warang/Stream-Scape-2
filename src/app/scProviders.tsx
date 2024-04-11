import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { Providers } from './providers'

const SCProviders = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <Providers>{children}</Providers>
    </SessionProvider>
  )
}

export default SCProviders
