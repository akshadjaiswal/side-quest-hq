'use client'

import { useParams } from 'next/navigation'
import { usePublicProfile } from '@/hooks/use-stats'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProjectGrid } from '@/components/projects/project-grid'
import { TechTag } from '@/components/projects/tech-tag'
import { ExternalLink, Github, Twitter } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { ProjectStatus } from '@/types'

export default function PublicProfilePage() {
  const params = useParams()
  const username = (params.username as string).replace('@', '')

  const { data, isLoading, error } = usePublicProfile(username)
  const [selectedStatus, setSelectedStatus] = useState<'all' | ProjectStatus>('all')

  const filteredProjects = useMemo(() => {
    if (!data?.projects) return []
    if (selectedStatus === 'all') return data.projects
    return data.projects.filter((p) => p.status === selectedStatus)
  }, [data?.projects, selectedStatus])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">💀</div>
          <p className="text-foreground-tertiary">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Profile not found</h2>
          <p className="text-foreground-tertiary mb-6">
            This profile doesn't exist or is set to private
          </p>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const { profile, projects, stats, topTech } = data
  const userInitials = profile.username.slice(0, 2).toUpperCase()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background-secondary border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <Avatar className="w-32 h-32">
              <AvatarImage src={profile.avatar_url || undefined} alt={profile.username} />
              <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
                {userInitials}
              </AvatarFallback>
            </Avatar>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-foreground mb-2">{profile.username}</h1>
              {profile.bio && (
                <p className="text-lg text-foreground-secondary mb-4">{profile.bio}</p>
              )}

              {/* Links */}
              <div className="flex gap-3 justify-center md:justify-start">
                {profile.website_url && (
                  <a
                    href={profile.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground-tertiary hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
                {profile.github_id && (
                  <a
                    href={`https://github.com/${profile.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground-tertiary hover:text-foreground transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {profile.twitter_handle && (
                  <a
                    href={`https://twitter.com/${profile.twitter_handle.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground-tertiary hover:text-foreground transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            <Card className="border-border bg-background">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                <p className="text-sm text-foreground-tertiary">Projects</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-background">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-status-active">{stats.active}</p>
                <p className="text-sm text-foreground-tertiary">Active</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-background">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-status-paused">{stats.paused}</p>
                <p className="text-sm text-foreground-tertiary">Paused</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-background">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-status-shipped">{stats.shipped}</p>
                <p className="text-sm text-foreground-tertiary">Shipped</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-background">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-status-abandoned">{stats.abandoned}</p>
                <p className="text-sm text-foreground-tertiary">Graveyard</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Top Technologies */}
        {topTech.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Top Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {topTech.map((tech) => (
                <div key={tech.name} className="flex items-center gap-1">
                  <TechTag name={tech.name} />
                  <span className="text-xs text-foreground-tertiary">×{tech.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        <div>
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-semibold text-foreground">Projects</h2>

            <Tabs
              value={selectedStatus}
              onValueChange={(v) => setSelectedStatus(v as 'all' | ProjectStatus)}
              className="w-full md:w-auto"
            >
              <TabsList className="h-auto flex w-full flex-wrap gap-2 rounded-2xl bg-background-secondary/60 p-1 md:flex-nowrap md:justify-end">
                <TabsTrigger
                  value="all"
                  className="flex-1 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary md:flex-none"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="active"
                  className="flex-1 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary md:flex-none"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value="paused"
                  className="flex-1 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary md:flex-none"
                >
                  Paused
                </TabsTrigger>
                <TabsTrigger
                  value="abandoned"
                  className="flex-1 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary md:flex-none"
                >
                  Abandoned
                </TabsTrigger>
                <TabsTrigger
                  value="shipped"
                  className="flex-1 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary md:flex-none"
                >
                  Shipped
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ProjectGrid
            projects={filteredProjects}
            emptyMessage={
              selectedStatus === 'all'
                ? 'No public projects yet'
                : `No ${selectedStatus} projects`
            }
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-foreground-tertiary mb-4">
            Want to catalog your own side projects?
          </p>
          <Link href="/login">
            <Button className="bg-primary hover:bg-primary-hover text-white">
              Create Your Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
