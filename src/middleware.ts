import { NextRequest, NextResponse } from 'next/server'

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN!

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''

  let tenant = '';

  if (host.endsWith(ROOT_DOMAIN)) {
    tenant = host.replace(`.${ROOT_DOMAIN}`, '')
  } else if (host.includes('localhost')) {
    tenant = host.split('.')[0]
  }

  const requestHeaders = new Headers(req.headers)

  requestHeaders.set('x-tenant', tenant)


  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - Common static root files (favicon.ico, robots.txt, sitemap.xml, manifest.json)
     * - Any path containing a file extension (e.g., .png, .jpg, .svg)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|.*\\.[\\w]+$).*)',
  ],
}