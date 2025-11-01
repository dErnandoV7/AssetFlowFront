import { NextRequest, NextResponse } from "next/server"
import { MiddlewareConfig } from "next/server"

const publicRouter = [
    { path: "/login", whenAuthenticated: "redirect" },
    { path: "/register", whenAuthenticated: "redirect" }
] as const

const REDIRECT_PATH_WHEN_NO_AUTHENTICATED = "/login"

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const token = req.cookies.get("token")
    const publicRoute = publicRouter.find((route) => route.path === path)

    if (token && publicRoute && publicRoute.whenAuthenticated == "redirect") {
        const redirectUrl = req.nextUrl.clone()

        redirectUrl.pathname = "/"

        return NextResponse.redirect(redirectUrl)
    }

    if (!token && !publicRoute) {
        const redirectUrl = req.nextUrl.clone()

        redirectUrl.pathname = REDIRECT_PATH_WHEN_NO_AUTHENTICATED

        return NextResponse.redirect(redirectUrl)
    }

    if (!token && publicRoute) {
        return NextResponse.next()
    }

    if (token && !publicRoute) {
        return NextResponse.next()
    }

    return NextResponse.next()

}

export const config: MiddlewareConfig = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}