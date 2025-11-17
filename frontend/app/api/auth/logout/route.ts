import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()

  // Clear session cookies
  cookieStore.delete('github_token')
  cookieStore.delete('github_user')

  return NextResponse.json({ success: true })
}

export async function GET() {
  const cookieStore = await cookies()

  // Clear session cookies
  cookieStore.delete('github_token')
  cookieStore.delete('github_user')

  // Redirect to login page
  return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'))
}
