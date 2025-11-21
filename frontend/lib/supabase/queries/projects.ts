// API client for project operations
// Now using Next.js API routes instead of direct Supabase calls for better security
import { SideProject, ProjectFormData } from '@/types'

export async function getProjects(userId: string): Promise<SideProject[]> {
  const response = await fetch('/api/projects', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to fetch projects')
  }

  const { data } = await response.json()
  return data || []
}

export async function getProjectById(id: string): Promise<SideProject | null> {
  const response = await fetch(`/api/projects/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to fetch project')
  }

  const { data } = await response.json()
  return data
}

export async function createProject(
  userId: string,
  projectData: ProjectFormData
): Promise<SideProject> {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(projectData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to create project')
  }

  const { data } = await response.json()
  return data
}

export async function updateProject(
  id: string,
  projectData: Partial<ProjectFormData>
): Promise<SideProject> {
  const response = await fetch(`/api/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(projectData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to update project')
  }

  const { data } = await response.json()
  return data
}

export async function deleteProject(id: string): Promise<void> {
  const response = await fetch(`/api/projects/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to delete project')
  }
}

export async function getProjectsByStatus(
  userId: string,
  status: string
): Promise<SideProject[]> {
  const response = await fetch(`/api/projects?status=${status}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to fetch projects by status')
  }

  const { data } = await response.json()
  return data || []
}
