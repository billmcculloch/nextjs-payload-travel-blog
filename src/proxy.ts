import { NextRequest, NextResponse } from 'next/server'

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN!

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') ?? ''
  const pathname = req.nextUrl.pathname

  // Strip port in dev (localhost:3000 → localhost)
  const currentHost = hostname
    .replace(`:3000`, '')
    .replace(`:3001`, '')

  // Root domain or www — serve normally
  if (
    currentHost === ROOT_DOMAIN ||
    currentHost === `www.${ROOT_DOMAIN}` ||
    currentHost === 'localhost'
  ) {
    return NextResponse.next()
  }

  // Extract tenant slug from subdomain
  const tenantSlug = currentHost.replace(`.${ROOT_DOMAIN}`, '')

  // Rewrite to /sites/[tenant]/[...path]
  // The browser still sees slug.yourdomain.com
  return NextResponse.rewrite(
    new URL(`/sites/${tenantSlug}${pathname}`, req.url)
  )
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}