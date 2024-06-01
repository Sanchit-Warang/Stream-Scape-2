/*
  the Session Provider Stopped Working
  the auth() functions works only on reload but the login and signout stopped reloading
  so made a Next Session provider in client side
  the fix is in providers file
  used this for the fix https://github.com/nextauthjs/next-auth/issues/10016#issuecomment-1983672453
*/

// import { SessionProvider } from 'next-auth/react'
// import { auth } from '@/auth'
import { Providers } from './providers'

const SCProviders = async ({ children }: { children: React.ReactNode }) => {
  // const session = await auth()
  return (
    <>
    {/* <SessionProvider session={session}> */}
      <Providers>{children}</Providers>
    {/* </SessionProvider> */}
    </>
  )
}

export default SCProviders
