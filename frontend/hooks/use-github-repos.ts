'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { GitHubRepo } from '@/types'
import { toast } from 'sonner'

export function useGitHubRepos() {
  return useQuery({
    queryKey: ['github-repos'],
    queryFn: async () => {
      const response = await fetch('/api/github/repos')
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch repositories')
      }
      const data = await response.json()
      return data.repos as GitHubRepo[]
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnMount: false,
  })
}

export function useImportGitHubRepos() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (params: {
      repo_ids: number[]
      default_status: string
      make_public: boolean
    }) => {
      const response = await fetch('/api/github/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to import repositories')
      }

      return response.json()
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success(`Successfully imported ${data.imported} project(s)!`)
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to import repositories')
    },
  })
}
