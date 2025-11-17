import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no_code`)
  }

  try {
    // Exchange code for GitHub access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_REDIRECT_URI || `${origin}/auth/callback`,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error || !tokenData.access_token) {
      console.error('GitHub OAuth error:', tokenData)
      return NextResponse.redirect(`${origin}/login?error=github_token_error`)
    }

    // Fetch user data from GitHub
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    const githubUser = await userResponse.json()

    // Fetch user emails
    const emailResponse = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    const emails = await emailResponse.json()
    const primaryEmail = emails.find((e: any) => e.primary)?.email || githubUser.email

    // Create or update user in Supabase
    const supabase = await createClient()

    // Check if user already exists
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('github_id', githubUser.id.toString())
      .single()

    if (existingProfile) {
      // Update existing user
      await supabase
        .from('user_profiles')
        .update({
          username: githubUser.login,
          email: primaryEmail,
          avatar_url: githubUser.avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq('github_id', githubUser.id.toString())
    } else {
      // Create new user
      await supabase
        .from('user_profiles')
        .insert({
          github_id: githubUser.id.toString(),
          username: githubUser.login,
          email: primaryEmail,
          avatar_url: githubUser.avatar_url,
          bio: githubUser.bio || null,
          website_url: githubUser.blog || null,
          twitter_handle: githubUser.twitter_username || null,
        })
    }

    // Create session (using cookies)
    const response = NextResponse.redirect(`${origin}${next}`)

    // Set session cookie with user data
    response.cookies.set('github_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    response.cookies.set('github_user', JSON.stringify({
      id: githubUser.id,
      login: githubUser.login,
      avatar_url: githubUser.avatar_url,
      email: primaryEmail,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.redirect(`${origin}/login?error=auth_callback_error`)
  }
}
