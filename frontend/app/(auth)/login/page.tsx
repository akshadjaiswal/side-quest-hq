'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GithubIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const handleGithubLogin = () => {
    // Redirect to our custom GitHub OAuth endpoint
    window.location.href = '/api/auth/github'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-2xl">💀</span>
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">
            Welcome to SideQuestHQ
          </CardTitle>
          <CardDescription className="text-foreground-tertiary">
            Your side projects deserve a home, even the dead ones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleGithubLogin}
            className="w-full bg-primary hover:bg-primary-hover text-white"
            size="lg"
          >
            <GithubIcon className="mr-2 h-5 w-5" />
            Continue with GitHub
          </Button>

          <p className="mt-6 text-sm text-center text-foreground-tertiary">
            By continuing, you agree to catalog all your side projects,
            including the abandoned ones.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
