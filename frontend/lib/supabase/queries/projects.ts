// Supabase queries for projects
import { createClient } from '@/lib/supabase/client'
import { SideProject, ProjectFormData } from '@/types'
import { generateSlug } from '@/lib/utils/slug'

const supabase = createClient()

export async function getProjects(userId: string): Promise<SideProject[]> {
  const { data, error } = await supabase
    .from('side_projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getProjectById(id: string): Promise<SideProject | null> {
  const { data, error } = await supabase
    .from('side_projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createProject(
  userId: string,
  projectData: ProjectFormData
): Promise<SideProject> {
  const slug = generateSlug(projectData.name)

  // Set date fields based on status
  const now = new Date().toISOString()
  const dateFields: Record<string, string | null> = {}

  if (projectData.status === 'abandoned') {
    dateFields.abandoned_date = now
  } else if (projectData.status === 'shipped') {
    dateFields.shipped_date = now
  }

  const { data, error } = await supabase
    .from('side_projects')
    .insert({
      user_id: userId,
      slug,
      ...projectData,
      ...dateFields,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateProject(
  id: string,
  projectData: Partial<ProjectFormData>
): Promise<SideProject> {
  // Update date fields based on status change
  const dateFields: Record<string, string | null> = {}

  if (projectData.status === 'abandoned') {
    dateFields.abandoned_date = new Date().toISOString()
  } else if (projectData.status === 'shipped') {
    dateFields.shipped_date = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('side_projects')
    .update({
      ...projectData,
      ...dateFields,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from('side_projects').delete().eq('id', id)

  if (error) throw error
}

export async function getProjectsByStatus(
  userId: string,
  status: string
): Promise<SideProject[]> {
  const { data, error } = await supabase
    .from('side_projects')
    .select('*')
    .eq('user_id', userId)
    .eq('status', status)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}
