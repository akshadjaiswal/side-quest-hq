import { NextResponse } from 'next/server'

export async function GET() {
  const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
  const redirectUri = process.env.GITHUB_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`

  if (!githubClientId) {
    return NextResponse.json(
      { error: 'GitHub OAuth not configured' },
      { status: 500 }
    )
  }

  // GitHub OAuth authorization URL
  const params = new URLSearchParams({
    client_id: githubClientId,
    redirect_uri: redirectUri,
    scope: 'read:user user:email repo',
    state: Math.random().toString(36).substring(7), // Simple CSRF protection
  })

  const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`

  return NextResponse.redirect(authUrl)
}
