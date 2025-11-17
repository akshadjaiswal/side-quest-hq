import { cookies } from 'next/headers'

export interface GitHubUser {
  id: number
  login: string
  avatar_url: string
  email: string
}

/**
 * Get the current authenticated user from session cookies
 * Use this in Server Components and API routes
 */
export async function getCurrentUser(): Promise<GitHubUser | null> {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get('github_user')

  if (!userCookie?.value) {
    return null
  }

  try {
    return JSON.parse(userCookie.value) as GitHubUser
  } catch {
    return null
  }
}

/**
 * Get the GitHub access token from session cookies
 * Use this in Server Components and API routes when you need to make GitHub API calls
 */
export async function getGitHubToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const tokenCookie = cookieStore.get('github_token')

  return tokenCookie?.value || null
}

/**
 * Client-side hook to get user from cookies
 * Note: This requires 'use client' directive
 */
export function getUserFromCookies(): GitHubUser | null {
  if (typeof window === 'undefined') {
    return null
  }

  const cookies = document.cookie.split(';')
  const userCookie = cookies.find(c => c.trim().startsWith('github_user='))

  if (!userCookie) {
    return null
  }

  try {
    const value = userCookie.split('=')[1]
    return JSON.parse(decodeURIComponent(value)) as GitHubUser
  } catch {
    return null
  }
}
