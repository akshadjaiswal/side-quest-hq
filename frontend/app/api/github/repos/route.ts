import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { GitHubClient } from '@/lib/github/client'
import { getSession } from '@/lib/auth/session'

export async function GET() {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch GitHub token from user_profiles table
    const supabase = await createClient()
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('github_access_token')
      .eq('id', session.userId)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      )
    }

    const accessToken = profile.github_access_token
    if (!accessToken) {
      return NextResponse.json(
        { error: 'GitHub token not found. Please reconnect your GitHub account.' },
        { status: 400 }
      )
    }

    const githubClient = new GitHubClient(accessToken)
    const repos = await githubClient.getUserRepos()

    return NextResponse.json({ repos })
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    )
  }
}
