/**
 * Session API Route
 *
 * Returns current session data for client-side use
 */

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/session'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    return NextResponse.json({
      userId: session.userId,
      githubId: session.githubId,
      username: session.username,
      avatarUrl: session.avatarUrl,
      email: session.email,
    })
  } catch (error) {
    console.error('[Session API] Error:', error)
    return NextResponse.json({ error: 'Failed to get session' }, { status: 500 })
  }
}
