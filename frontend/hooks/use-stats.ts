'use client'

import { useQuery } from '@tanstack/react-query'
import { UserProfile, SideProject, ProjectStats } from '@/types'

export interface StatsResponse {
  profile: UserProfile
  projects: SideProject[]
  stats: ProjectStats
  topTech: { name: string; count: number }[]
}

export async function fetchPublicProfile(username: string): Promise<StatsResponse> {
  const response = await fetch(`/api/stats?username=${username}`)
  if (!response.ok) {
    throw new Error('Failed to fetch profile')
  }
  return response.json()
}

export function usePublicProfile(username: string) {
  return useQuery({
    queryKey: ['public-profile', username],
    queryFn: () => fetchPublicProfile(username),
    enabled: !!username,
    staleTime: 3 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
  })
}
