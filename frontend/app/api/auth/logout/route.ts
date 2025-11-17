/**
 * Logout Route
 *
 * Logs out the current user and clears session.
 */

import { NextRequest, NextResponse } from 'next/server'
import { clearSession } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  try {
    // Clear session cookie
    await clearSession()

    return NextResponse.json({ success: true, message: 'Logged out successfully' })
  } catch (error) {
    console.error('[Logout] Error:', error)
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Clear session cookie
    await clearSession()

    // Redirect to login page
    return NextResponse.redirect(new URL('/login', request.url))
  } catch (error) {
    console.error('[Logout] Error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
