'use client'

import { useQuery } from '@tanstack/react-query'
import { UserProfile, SideProject, ProjectStats } from '@/types'

interface StatsResponse {
  profile: UserProfile
  projects: SideProject[]
  stats: ProjectStats
  topTech: { name: string; count: number }[]
}

export function usePublicProfile(username: string) {
  return useQuery({
    queryKey: ['public-profile', username],
    queryFn: async () => {
      const response = await fetch(`/api/stats?username=${username}`)
      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }
      return response.json() as Promise<StatsResponse>
    },
    enabled: !!username,
  })
}
