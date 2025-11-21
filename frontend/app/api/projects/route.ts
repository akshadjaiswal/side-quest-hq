import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { ProjectFormData } from '@/types'
import { generateSlug } from '@/lib/utils/slug'
import { getSession } from '@/lib/auth/session'

/**
 * GET /api/projects
 * Fetch all projects for the authenticated user
 * Optional query params: ?status=active|paused|abandoned|shipped
 */
export async function GET(request: NextRequest) {
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

    // Get status filter from query params
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    // Build query
    let query = supabase
      .from('side_projects')
      .select('*')
      .eq('user_id', session.userId)

    // Add status filter if provided
    if (status) {
      query = query.eq('status', status)
    }

    // Fetch projects
    const { data: projects, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('[API] Error fetching projects:', error)
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: projects })
  } catch (error) {
    console.error('[API] Unexpected error in GET /api/projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/projects
 * Create a new project
 */
export async function POST(request: NextRequest) {
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

    // Parse request body
    const projectData: ProjectFormData = await request.json()

    // Generate slug
    const slug = generateSlug(projectData.name)

    // Set date fields based on status
    const now = new Date().toISOString()
    const dateFields: Record<string, string | null> = {}

    if (projectData.status === 'abandoned') {
      dateFields.abandoned_date = now
    } else if (projectData.status === 'shipped') {
      dateFields.shipped_date = now
    }

    // Create project
    const { data: newProject, error } = await supabase
      .from('side_projects')
      .insert({
        user_id: session.userId,
        slug,
        ...projectData,
        ...dateFields,
      })
      .select()
      .single()

    if (error) {
      console.error('[API] Error creating project:', error)
      return NextResponse.json(
        { error: 'Failed to create project' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: newProject }, { status: 201 })
  } catch (error) {
    console.error('[API] Unexpected error in POST /api/projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
