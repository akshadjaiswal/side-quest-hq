'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByStatus,
} from '@/lib/supabase/queries/projects'
import { ProjectFormData } from '@/types'
import { toast } from 'sonner'
import { useSession } from '@/hooks/use-session'

export function useProjects() {
  const { data: session } = useSession()
  const userId = session?.userId

  return useQuery({
    queryKey: ['projects', userId],
    queryFn: () => {
      if (!userId) throw new Error('Not authenticated')
      return getProjects(userId)
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
  })
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => getProjectById(id),
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  })
}

export function useProjectsByStatus(status: string) {
  const { data: session } = useSession()
  const userId = session?.userId

  return useQuery({
    queryKey: ['projects', userId, status],
    queryFn: () => {
      if (!userId) throw new Error('Not authenticated')
      return getProjectsByStatus(userId, status)
    },
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const userId = session?.userId

  return useMutation({
    mutationFn: async (projectData: ProjectFormData) => {
      if (!userId) {
        throw new Error('Not authenticated')
      }
      return createProject(userId, projectData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success('Project created successfully!')
    },
    onError: (error) => {
      toast.error('Failed to create project')
      console.error('Create project error:', error)
    },
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectFormData> }) =>
      updateProject(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['project', variables.id] })
      toast.success('Project updated successfully!')
    },
    onError: (error) => {
      toast.error('Failed to update project')
      console.error('Update project error:', error)
    },
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success('Project deleted successfully!')
    },
    onError: (error) => {
      toast.error('Failed to delete project')
      console.error('Delete project error:', error)
    },
  })
}
