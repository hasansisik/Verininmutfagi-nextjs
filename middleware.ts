import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const userRole = request.cookies.get('userRole')?.value
    const { pathname } = request.nextUrl

    // Protected dashboard routes
    if (pathname.startsWith('/dashboard')) {
        // Check if user is authenticated and is an admin
        if (!token || userRole !== 'admin') {
            // Redirect to home page if not authorized
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/dashboard/:path*',
}
