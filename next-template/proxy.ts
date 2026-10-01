import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales } from "./lib/locales"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const loggedIn = request.cookies.get("session")?.value === "1"
  const locale = locales.find(
    (item) => pathname === `/${item}` || pathname.startsWith(`/${item}/`)
  )

  if (!locale) {
    const url = request.nextUrl.clone()
    url.pathname = loggedIn ? "/tr" : "/tr/auth/login"
    return NextResponse.redirect(url)
  }

  const loginPath = `/${locale}/auth/login`
  const onAuth = pathname === `/${locale}/auth` || pathname.startsWith(`/${locale}/auth/`)

  if (!loggedIn && !onAuth) {
    const url = request.nextUrl.clone()
    url.pathname = loginPath
    return NextResponse.redirect(url)
  }

  if (loggedIn && onAuth) {
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}`
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
