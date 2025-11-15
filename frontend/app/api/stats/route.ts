import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username')

    if (!username) {
      return NextResponse.json({ error: 'Username required' }, { status: 400 })
    }

    const supabase = await createClient()

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('username', username)
      .eq('is_profile_public', true)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Get public projects
    const { data: projects, error: projectsError } = await supabase
      .from('side_projects')
      .select('*')
      .eq('user_id', profile.id)
      .eq('is_public', true)
      .order('created_at', { ascending: false })

    if (projectsError) {
      return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
    }

    // Calculate stats
    const stats = {
      total: projects.length,
      active: projects.filter((p) => p.status === 'active').length,
      paused: projects.filter((p) => p.status === 'paused').length,
      abandoned: projects.filter((p) => p.status === 'abandoned').length,
      shipped: projects.filter((p) => p.status === 'shipped').length,
    }

    // Get most used technologies
    const techCount: Record<string, number> = {}
    projects.forEach((project) => {
      project.tech_stack.forEach((tech: string) => {
        techCount[tech] = (techCount[tech] || 0) + 1
      })
    })

    const topTech = Object.entries(techCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }))

    return NextResponse.json({
      profile,
      projects,
      stats,
      topTech,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
