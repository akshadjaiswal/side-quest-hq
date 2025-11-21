'use client'

import { useSession } from '@/hooks/use-session'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * Hook to get the appropriate redirect URL based on auth state
 * Returns '/dashboard' if logged in, '/login' if not
 */
export function useAuthRedirect() {
  const { data: session, isLoading } = useSession()
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading) {
      setRedirectUrl(session ? '/dashboard' : '/login')
    }
  }, [session, isLoading])

  return {
    redirectUrl,
    isLoading,
    isAuthenticated: !!session,
  }
}

/**
 * Hook to handle smart navigation based on auth state
 * Navigates to dashboard if authenticated, login if not
 */
export function useSmartNavigation() {
  const router = useRouter()
  const { redirectUrl, isLoading, isAuthenticated } = useAuthRedirect()

  const navigate = () => {
    if (redirectUrl) {
      router.push(redirectUrl)
    }
  }

  return {
    navigate,
    isLoading,
    isAuthenticated,
    destination: redirectUrl,
  }
}
