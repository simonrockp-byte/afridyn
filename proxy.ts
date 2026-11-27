import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth/token'

/**
 * First gate for the admin: any /admin page without a valid signed session is
 * redirected to /admin/login before it renders. Pages and API routes still
 * call requireUser() themselves (the proxy is never the only check).
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  // Login and the offline fallback (precached by the service worker) are public.
  if (pathname === '/admin/login' || pathname === '/admin/offline') return NextResponse.next()

  const claims = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)
  if (claims) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = '/admin/login'
  url.search = pathname === '/admin' ? '' : `?next=${encodeURIComponent(pathname + search)}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
