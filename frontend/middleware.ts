/**
 * Next.js Middleware
 *
 * Handles authentication and route protection using JWT sessions.
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth/session'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/api/auth/github', '/api/auth/callback']
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith('/@')

  // Allow public routes
  if (isPublicRoute) {
    return NextResponse.next()
  }

  try {
    // Check authentication for protected routes
    const sessionCookie = request.cookies.get('sidequesthq_session')

    if (!sessionCookie) {
      // No session cookie, redirect to login
      if (pathname.startsWith('/dashboard') ||
          pathname.startsWith('/graveyard') ||
          pathname.startsWith('/settings') ||
          pathname.startsWith('/projects')) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
      return NextResponse.next()
    }

    // Verify session
    const session = await verifySession(sessionCookie.value)

    // If no valid session and trying to access protected route, redirect to login
    if (!session && (pathname.startsWith('/dashboard') ||
                     pathname.startsWith('/graveyard') ||
                     pathname.startsWith('/settings') ||
                     pathname.startsWith('/projects'))) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error('[Middleware] Error:', error)
    if (pathname.startsWith('/dashboard') ||
        pathname.startsWith('/graveyard') ||
        pathname.startsWith('/settings') ||
        pathname.startsWith('/projects')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
