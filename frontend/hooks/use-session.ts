'use client'

import { useQuery } from '@tanstack/react-query'

interface SessionResponse {
  userId: string
  githubId: number
  username: string
  avatarUrl: string
  email: string | null
}

export function useSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const response = await fetch('/api/auth/session', {
        credentials: 'include',
      })

      if (!response.ok) {
        // Return null instead of throwing error when not authenticated
        // This allows components to gracefully handle unauthenticated state
        return null
      }

      return (await response.json()) as SessionResponse
    },
    staleTime: 5 * 60 * 1000, // keep session data fresh for 5 minutes
    gcTime: 30 * 60 * 1000,
    retry: false,
  })
}
