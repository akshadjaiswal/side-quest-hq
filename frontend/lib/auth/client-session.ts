/**
 * Client-side session utilities
 * For use in client components and hooks
 */

'use client'

/**
 * Get user ID from session via API
 */
export async function getUserId(): Promise<string | null> {
  try {
    const response = await fetch('/api/auth/session')
    if (!response.ok) return null

    const data = await response.json()
    return data.userId || null
  } catch (error) {
    console.error('[Client Session] Error fetching user ID:', error)
    return null
  }
}

/**
 * Get full session data from API
 */
export async function getSessionData() {
  try {
    const response = await fetch('/api/auth/session')
    if (!response.ok) return null

    return await response.json()
  } catch (error) {
    console.error('[Client Session] Error fetching session:', error)
    return null
  }
}
