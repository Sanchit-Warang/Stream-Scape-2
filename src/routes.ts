/**
 * Private routes that need authentication
 */
export const privateRoutes = ['/settings', '/history']

/**
 * Routes that user uses to get authenticates so authenticated users cannot acess
 */
export const authRoutes = ['/login', '/register']

/**
 * Api routes for next-auth
 */
export const apiAuthPrefix = '/api/auth'

/**
 *  default ridect after loggin in
 */
export const DEFAULT_LOGIN_REDIECT = '/settings'

/**
 * default rediect for protected routes
 */
export const DEFAULT_PROTECT_REDIRECT = '/login'
