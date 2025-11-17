/**
 * GitHub OAuth Callback Route
 *
 * Handles the callback from GitHub OAuth, exchanges code for token,
 * fetches user info, and creates/updates user in database.
 */

import { NextRequest, NextResponse } from 'next/server'
import { exchangeCodeForToken } from '@/lib/github/oauth'
import { createClient } from '@/lib/supabase/server'
import { createSession, setSessionCookie } from '@/lib/auth/session'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  // Handle OAuth errors
  if (error) {
    console.error('[GitHub OAuth] Authorization error:', error)
    return NextResponse.redirect(
      new URL(`/login?error=auth_failed&message=${encodeURIComponent(error)}`, request.url)
    )
  }

  // Validate code parameter
  if (!code) {
    return NextResponse.redirect(
      new URL('/login?error=auth_failed&message=No authorization code received', request.url)
    )
  }

  try {
    // Exchange code for access token
    const tokenResponse = await exchangeCodeForToken(code)
    const accessToken = tokenResponse.access_token

    // Fetch user information from GitHub
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    const githubUser = await userResponse.json()

    // Fetch user emails
    const emailResponse = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    const emails = await emailResponse.json()
    const primaryEmail = emails.find((e: any) => e.primary)?.email || githubUser.email

    // Create Supabase client (for database only, not auth)
    const supabase = await createClient()

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('github_id', githubUser.id.toString())
      .single()

    let userId: string

    if (existingUser) {
      // Update existing user
      userId = existingUser.id
      await supabase
        .from('user_profiles')
        .update({
          username: githubUser.login,
          email: primaryEmail,
          avatar_url: githubUser.avatar_url,
          github_access_token: accessToken,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
    } else {
      // Create new user
      const { data: newUser, error: insertError } = await supabase
        .from('user_profiles')
        .insert({
          github_id: githubUser.id.toString(),
          username: githubUser.login,
          email: primaryEmail,
          avatar_url: githubUser.avatar_url,
          github_access_token: accessToken,
          bio: githubUser.bio || null,
          website_url: githubUser.blog || null,
          twitter_handle: githubUser.twitter_username || null,
        })
        .select('id')
        .single()

      if (insertError || !newUser) {
        console.error('Error creating user profile:', insertError)
        return NextResponse.redirect(new URL('/login?error=profile_creation_failed', request.url))
      }

      userId = newUser.id
    }

    // Create session token
    const sessionToken = await createSession({
      userId,
      githubId: githubUser.id,
      username: githubUser.login,
      avatarUrl: githubUser.avatar_url,
      email: primaryEmail,
    })

    // Set session cookie
    await setSessionCookie(sessionToken)

    // Redirect to dashboard on success
    return NextResponse.redirect(new URL('/dashboard', request.url))
  } catch (error: any) {
    console.error('[GitHub OAuth] Callback error:', error)
    return NextResponse.redirect(
      new URL(
        `/login?error=auth_failed&message=${encodeURIComponent(error.message || 'Authentication failed')}`,
        request.url
      )
    )
  }
}
