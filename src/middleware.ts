import authConfig from './auth.config'
import NextAuth from 'next-auth'
import {
  DEFAULT_LOGIN_REDIECT,
  apiAuthPrefix,
  privateRoutes,
  authRoutes,
  DEFAULT_PROTECT_REDIRECT,
} from './routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIECT, nextUrl))
    }
    return
  }

  if (isPrivateRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_PROTECT_REDIRECT, nextUrl))
    }
    return
  }

  return
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    '/((?!.+\\.[\\w]+$|_next).*)',
    // Re-include any files in the api or trpc folders that might have an extension
    '/(api|trpc)(.*)',
  ],
}
