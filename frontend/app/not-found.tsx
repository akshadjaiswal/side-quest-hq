import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center p-8 bg-background">
      <div className="text-6xl">💀</div>
      <h1 className="text-4xl font-bold text-foreground">404</h1>
      <p className="text-foreground-secondary max-w-md">This page doesn&apos;t exist, just like most side projects.</p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  )
}
