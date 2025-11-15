// GitHub API client wrapper
import { GitHubRepo } from '@/types'

export class GitHubClient {
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  private async fetchGitHub(endpoint: string) {
    const response = await fetch(`https://api.github.com${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        Accept: 'application/vnd.github+json',
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    return response.json()
  }

  async getUserRepos(): Promise<GitHubRepo[]> {
    const repos = await this.fetchGitHub('/user/repos?per_page=100&sort=updated')

    return repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      language: repo.language,
      topics: repo.topics || [],
      archived: repo.archived,
      private: repo.private,
    }))
  }

  async getRepoContent(owner: string, repo: string, path: string) {
    try {
      return await this.fetchGitHub(`/repos/${owner}/${repo}/contents/${path}`)
    } catch (error) {
      return null
    }
  }

  async detectTechStack(owner: string, repo: string): Promise<string[]> {
    const techStack: string[] = []

    try {
      // Check for package.json (Node.js projects)
      const packageJson = await this.getRepoContent(owner, repo, 'package.json')
      if (packageJson) {
        const content = JSON.parse(atob(packageJson.content))
        const deps = { ...content.dependencies, ...content.devDependencies }

        // Detect popular frameworks/libraries
        if (deps['next']) techStack.push('Next.js')
        if (deps['react']) techStack.push('React')
        if (deps['vue']) techStack.push('Vue')
        if (deps['@angular/core']) techStack.push('Angular')
        if (deps['express']) techStack.push('Express')
        if (deps['tailwindcss']) techStack.push('Tailwind CSS')
        if (deps['typescript']) techStack.push('TypeScript')
        if (deps['@supabase/supabase-js']) techStack.push('Supabase')
        if (deps['prisma']) techStack.push('Prisma')
        if (deps['mongoose']) techStack.push('MongoDB')
      }

      // Check for requirements.txt (Python projects)
      const requirements = await this.getRepoContent(owner, repo, 'requirements.txt')
      if (requirements) {
        techStack.push('Python')
        const content = atob(requirements.content)
        if (content.includes('django')) techStack.push('Django')
        if (content.includes('flask')) techStack.push('Flask')
        if (content.includes('fastapi')) techStack.push('FastAPI')
      }

      // Check for go.mod (Go projects)
      const goMod = await this.getRepoContent(owner, repo, 'go.mod')
      if (goMod) {
        techStack.push('Go')
      }

      // Check for Cargo.toml (Rust projects)
      const cargoToml = await this.getRepoContent(owner, repo, 'Cargo.toml')
      if (cargoToml) {
        techStack.push('Rust')
      }
    } catch (error) {
      console.error('Error detecting tech stack:', error)
    }

    return techStack
  }
}

export async function getGitHubAccessToken(userId: string): Promise<string | null> {
  // This will get the access token from Supabase session
  // Supabase stores provider tokens when using OAuth
  try {
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()

    const { data: { session } } = await supabase.auth.getSession()

    return session?.provider_token || null
  } catch (error) {
    console.error('Error getting GitHub token:', error)
    return null
  }
}
