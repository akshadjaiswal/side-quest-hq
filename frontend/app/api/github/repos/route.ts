import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { GitHubClient } from '@/lib/github/client'

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const accessToken = session.provider_token
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
