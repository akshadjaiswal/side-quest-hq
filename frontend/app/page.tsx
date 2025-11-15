import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <span className="text-5xl">💀</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            Your side projects deserve a home,<br />
            <span className="text-foreground-tertiary">even the dead ones</span>
          </h1>

          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto mb-10">
            A beautiful platform where developers catalog all their side projects -
            active, paused, abandoned, or shipped. Honor the attempts, learn from patterns,
            and give your ideas a second chance.
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-white">
                Start Tracking Projects
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="border-border">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-background-secondary border border-border rounded-lg p-8">
            <div className="text-3xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Catalog Everything
            </h3>
            <p className="text-foreground-secondary">
              Add all your side projects with rich details - tech stack, dates, learnings,
              and why you stopped.
            </p>
          </div>

          <div className="bg-background-secondary border border-border rounded-lg p-8">
            <div className="text-3xl mb-4">⚰️</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Honor the Graveyard
            </h3>
            <p className="text-foreground-secondary">
              A special view for abandoned projects that turns your graveyard into
              a badge of honor, not shame.
            </p>
          </div>

          <div className="bg-background-secondary border border-border rounded-lg p-8">
            <div className="text-3xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              GitHub Integration
            </h3>
            <p className="text-foreground-secondary">
              Import repos automatically, detect tech stacks, and keep everything
              in sync with your GitHub profile.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to honor your attempts?
          </h2>
          <p className="text-foreground-secondary mb-6">
            Join developers who are proud of their creative journey
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-primary hover:bg-primary-hover text-white">
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
