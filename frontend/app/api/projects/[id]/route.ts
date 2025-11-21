import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ProjectFormData } from '@/types'
import { getSession } from '@/lib/auth/session'

/**
 * GET /api/projects/[id]
 * Fetch a single project by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication using custom JWT session
    const session = await getSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = await createClient()
    const { id } = await params

    // Fetch project
    const { data: project, error } = await supabase
      .from('side_projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('[API] Error fetching project:', error)
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Check if user owns the project or if it's public
    if (project.user_id !== session.userId && !project.is_public) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    return NextResponse.json({ data: project })
  } catch (error) {
    console.error('[API] Unexpected error in GET /api/projects/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/projects/[id]
 * Update a project
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication using custom JWT session
    const session = await getSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = await createClient()
    const { id } = await params

    // Parse request body
    const projectData: Partial<ProjectFormData> = await request.json()

    // Update date fields based on status change
    const dateFields: Record<string, string | null> = {}

    if (projectData.status === 'abandoned') {
      dateFields.abandoned_date = new Date().toISOString()
    } else if (projectData.status === 'shipped') {
      dateFields.shipped_date = new Date().toISOString()
    }

    // Update project (RLS will ensure user owns it)
    const { data: updatedProject, error } = await supabase
      .from('side_projects')
      .update({
        ...projectData,
        ...dateFields,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', session.userId) // Ensure user owns the project
      .select()
      .single()

    if (error) {
      console.error('[API] Error updating project:', error)
      return NextResponse.json(
        { error: 'Failed to update project' },
        { status: 500 }
      )
    }

    if (!updatedProject) {
      return NextResponse.json(
        { error: 'Project not found or unauthorized' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: updatedProject })
  } catch (error) {
    console.error('[API] Unexpected error in PUT /api/projects/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/projects/[id]
 * Delete a project
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication using custom JWT session
    const session = await getSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = await createClient()
    const { id } = await params

    // Delete project (RLS will ensure user owns it)
    const { error } = await supabase
      .from('side_projects')
      .delete()
      .eq('id', id)
      .eq('user_id', session.userId) // Ensure user owns the project

    if (error) {
      console.error('[API] Error deleting project:', error)
      return NextResponse.json(
        { error: 'Failed to delete project' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('[API] Unexpected error in DELETE /api/projects/[id]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
