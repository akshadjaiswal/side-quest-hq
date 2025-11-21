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
import { ProjectFormData, SideProject } from '@/types'
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
    onSuccess: (newProject) => {
      // Optimistic update: immediately add new project to cache
      if (userId) {
        queryClient.setQueryData<SideProject[]>(
          ['projects', userId],
          (oldProjects) => [...(oldProjects || []), newProject]
        )
      }

      // Force refetch to ensure consistency with database
      queryClient.refetchQueries({ queryKey: ['projects'], exact: false })
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
  const { data: session } = useSession()
  const userId = session?.userId

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectFormData> }) =>
      updateProject(id, data),
    onSuccess: (updatedProject, variables) => {
      // Optimistic update: immediately update projects list cache
      if (userId) {
        queryClient.setQueryData<SideProject[]>(
          ['projects', userId],
          (oldProjects) => {
            if (!oldProjects) return oldProjects
            return oldProjects.map(p =>
              p.id === variables.id ? { ...p, ...updatedProject } : p
            )
          }
        )
      }

      // Force refetch to ensure consistency with database
      queryClient.refetchQueries({ queryKey: ['projects'], exact: false })
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
  const { data: session } = useSession()
  const userId = session?.userId

  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: (_, deletedId) => {
      // Optimistic update: immediately remove project from cache
      if (userId) {
        queryClient.setQueryData<SideProject[]>(
          ['projects', userId],
          (oldProjects) => oldProjects?.filter(p => p.id !== deletedId) || []
        )
      }

      // Force refetch to ensure consistency with database
      queryClient.refetchQueries({ queryKey: ['projects'], exact: false })
      toast.success('Project deleted successfully!')
    },
    onError: (error) => {
      toast.error('Failed to delete project')
      console.error('Delete project error:', error)
    },
  })
}
