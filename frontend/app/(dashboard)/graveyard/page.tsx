'use client'

import { useProjectsByStatus } from '@/hooks/use-projects'
import { GraveyardCard } from '@/components/graveyard/graveyard-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ArrowLeft } from 'lucide-react'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function GraveyardPage() {
  const { data: abandonedProjects = [], isLoading } = useProjectsByStatus('abandoned')
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return abandonedProjects

    const query = searchQuery.toLowerCase()
    return abandonedProjects.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tech_stack.some((tech) => tech.toLowerCase().includes(query))
    )
  }, [abandonedProjects, searchQuery])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-graveyard-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">💀</div>
          <p className="text-graveyard-text">Loading graveyard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-graveyard-background">
      {/* Header with dark theme */}
      <div className="bg-graveyard-background-light border-b border-graveyard-accent/30 px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="mb-4 text-graveyard-text hover:text-graveyard-accent hover:bg-graveyard-accent/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="text-center mb-6">
            <div className="text-6xl mb-4">⚰️</div>
            <h1 className="text-5xl font-bold text-graveyard-text mb-3">
              The Graveyard
            </h1>
            <p className="text-xl text-graveyard-text/80 max-w-2xl mx-auto">
              Here lie the projects that could have been. A monument to attempts, learning, and growth.
              They may be gone, but they're not forgotten.
            </p>
          </div>

          {/* Stats */}
          <div className="text-center">
            <div className="inline-block bg-graveyard-background/50 rounded-lg px-6 py-3 border border-graveyard-accent/30">
              <span className="text-3xl font-bold text-graveyard-accent mr-2">
                {abandonedProjects.length}
              </span>
              <span className="text-graveyard-text">
                {abandonedProjects.length === 1 ? 'Project' : 'Projects'} Laid to Rest
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {abandonedProjects.length > 0 ? (
            <>
              {/* Search */}
              <div className="mb-8 max-w-xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-graveyard-text/60 w-5 h-5" />
                  <Input
                    placeholder="Search the graveyard..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-graveyard-background-light border-graveyard-accent/30 text-graveyard-text placeholder:text-graveyard-text/50"
                  />
                </div>
              </div>

              {/* Graveyard Grid */}
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <GraveyardCard
                      key={project.id}
                      project={project}
                      onClick={() => router.push(`/projects/${project.id}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-graveyard-background-light border border-graveyard-accent/30 rounded-lg p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-graveyard-text">No projects match your search</p>
                </div>
              )}
            </>
          ) : (
            <div className="bg-graveyard-background-light border border-graveyard-accent/30 rounded-lg p-12 text-center max-w-2xl mx-auto">
              <div className="text-6xl mb-4">🌱</div>
              <h2 className="text-2xl font-semibold text-graveyard-text mb-2">
                The graveyard is empty
              </h2>
              <p className="text-graveyard-text/80 mb-6">
                You haven't abandoned any projects yet. Keep building, and when you need to let go,
                this place will honor those attempts.
              </p>
              <Link href="/dashboard">
                <Button className="bg-graveyard-accent hover:bg-graveyard-accent/80 text-graveyard-background">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Footer Quote */}
      <div className="py-12 text-center">
        <p className="text-graveyard-text/60 italic text-lg max-w-2xl mx-auto">
          "Every abandoned project is a stepping stone to the one that works."
        </p>
      </div>
    </div>
  )
}
