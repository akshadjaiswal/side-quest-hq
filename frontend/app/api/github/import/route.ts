import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { GitHubClient } from '@/lib/github/client'
import { generateSlug } from '@/lib/utils/slug'
import { getSession } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { repo_ids, default_status = 'active', make_public = true } = body

    if (!Array.isArray(repo_ids) || repo_ids.length === 0) {
      return NextResponse.json({ error: 'No repositories selected' }, { status: 400 })
    }

    // Fetch GitHub token from user_profiles table
    const supabase = await createClient()
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('github_access_token')
      .eq('id', session.userId)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 })
    }

    const accessToken = profile.github_access_token
    if (!accessToken) {
      return NextResponse.json({ error: 'GitHub token not found' }, { status: 400 })
    }

    const githubClient = new GitHubClient(accessToken)
    const allRepos = await githubClient.getUserRepos()

    const selectedRepos = allRepos.filter((repo) => repo_ids.includes(repo.id))
    const importedProjects = []

    for (const repo of selectedRepos) {
      // Detect tech stack
      const [owner, repoName] = repo.full_name.split('/')
      const techStack = await githubClient.detectTechStack(owner, repoName)

      // Add language if available
      if (repo.language && !techStack.includes(repo.language)) {
        techStack.unshift(repo.language)
      }

      // Add topics as tech stack
      repo.topics.slice(0, 5).forEach((topic) => {
        const capitalizedTopic = topic.charAt(0).toUpperCase() + topic.slice(1)
        if (!techStack.includes(capitalizedTopic)) {
          techStack.push(capitalizedTopic)
        }
      })

      const slug = generateSlug(repo.name)

      // Determine if repo is abandoned (no activity in 6 months)
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
      const lastPush = new Date(repo.pushed_at)
      const isOldRepo = lastPush < sixMonthsAgo

      const status = repo.archived
        ? 'abandoned'
        : isOldRepo && default_status === 'active'
        ? 'paused'
        : default_status

      const { data, error } = await supabase
        .from('side_projects')
        .insert({
          user_id: session.userId,
          name: repo.name,
          slug,
          description: repo.description || `Imported from GitHub: ${repo.name}`,
          status,
          tech_stack: techStack.slice(0, 10), // Limit to 10
          github_url: repo.html_url,
          github_repo_id: repo.id,
          is_from_github: true,
          is_public: make_public,
          started_date: repo.created_at,
          last_worked_date: repo.pushed_at,
          ...(status === 'abandoned' && { abandoned_date: repo.pushed_at }),
          progress_percentage: repo.archived ? 0 : 50,
        })
        .select()
        .single()

      if (!error && data) {
        importedProjects.push(data)
      }
    }

    return NextResponse.json({
      success: true,
      imported: importedProjects.length,
      projects: importedProjects,
    })
  } catch (error) {
    console.error('Error importing GitHub repos:', error)
    return NextResponse.json({ error: 'Failed to import repositories' }, { status: 500 })
  }
}
