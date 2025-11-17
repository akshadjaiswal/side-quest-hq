/**
 * GitHub OAuth Helper Functions
 *
 * Utilities for handling GitHub OAuth authentication flow.
 */

interface GitHubOAuthResponse {
  access_token: string
  token_type: string
  scope: string
}

/**
 * Generate GitHub OAuth authorization URL
 */
export function getGitHubAuthUrl(redirectUri?: string): string {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!
  const redirect = redirectUri || process.env.GITHUB_REDIRECT_URI!

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirect,
    scope: 'repo read:user user:email',
    state: generateState(),
  })

  return `https://github.com/login/oauth/authorize?${params.toString()}`
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(code: string): Promise<GitHubOAuthResponse> {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!
  const clientSecret = process.env.GITHUB_CLIENT_SECRET!

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    })

    if (!response.ok) {
      throw new Error(`GitHub OAuth error: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(`GitHub OAuth error: ${data.error_description || data.error}`)
    }

    return data as GitHubOAuthResponse
  } catch (error) {
    console.error('[OAuth] Failed to exchange code for token:', error)
    throw new Error('Failed to complete GitHub authentication')
  }
}

/**
 * Generate random state parameter for OAuth security
 */
function generateState(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}
