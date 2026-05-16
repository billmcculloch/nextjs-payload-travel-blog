import { NextRequest, NextResponse } from 'next/server'

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN!

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''

  let tenant = '';

  // At the root, so redirect to the signup page
  if(host.split('.').length === 1){
    return NextResponse.rewrite(new URL('/signup', req.url))
  }

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
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|.*\\.[\\w]+$).*)',
  ],
}