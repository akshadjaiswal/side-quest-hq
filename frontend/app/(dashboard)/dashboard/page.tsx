'use client'

import { useProjects } from '@/hooks/use-projects'
import { StatsOverview } from '@/components/dashboard/stats-overview'
import { ProjectGrid } from '@/components/projects/project-grid'
import { AddProjectDialog } from '@/components/dashboard/add-project-dialog'
import { GitHubImportDialog } from '@/components/github/import-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Search, Plus, Github } from 'lucide-react'
import { useState, useMemo } from 'react'
import { ProjectStatus } from '@/types'

export default function DashboardPage() {
  const { data: projects = [], isLoading } = useProjects()
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [importDialogOpen, setImportDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<'all' | ProjectStatus>('all')

  const filteredProjects = useMemo(() => {
    let filtered = projects

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((p) => p.status === selectedStatus)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tech_stack.some((tech) => tech.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [projects, selectedStatus, searchQuery])

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">💀</div>
          <p className="text-foreground-tertiary">Loading your projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Your Projects</h1>
            <p className="text-foreground-tertiary mt-1">
              Track, manage, and honor all your creative attempts
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setImportDialogOpen(true)}
              variant="outline"
              className="border-border"
            >
              <Github className="w-5 h-5 mr-2" />
              Import from GitHub
            </Button>
            <Button
              onClick={() => setAddDialogOpen(true)}
              className="bg-primary hover:bg-primary-hover text-white"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Project
            </Button>
          </div>
        </div>

        {projects.length > 0 ? (
          <>
            {/* Stats */}
            <StatsOverview projects={projects} />

            {/* Filters */}
            <div className="mb-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground-tertiary w-5 h-5" />
                <Input
                  placeholder="Search projects by name, description, or tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Tabs value={selectedStatus} onValueChange={(v) => setSelectedStatus(v as any)}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="paused">Paused</TabsTrigger>
                  <TabsTrigger value="abandoned">Abandoned</TabsTrigger>
                  <TabsTrigger value="shipped">Shipped</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Projects Grid */}
            <ProjectGrid
              projects={filteredProjects}
              emptyMessage={
                searchQuery || selectedStatus !== 'all'
                  ? 'No projects match your filters'
                  : 'No projects yet'
              }
            />
          </>
        ) : (
          <div className="bg-background-secondary border border-border rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">💀</div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">No projects yet</h2>
            <p className="text-foreground-tertiary mb-6">
              Start by adding your first project to begin cataloging your creative journey
            </p>
            <Button
              onClick={() => setAddDialogOpen(true)}
              className="bg-primary hover:bg-primary-hover text-white"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Project
            </Button>
          </div>
        )}

        {/* Dialogs */}
        <AddProjectDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
        <GitHubImportDialog open={importDialogOpen} onOpenChange={setImportDialogOpen} />
      </div>
    </div>
  )
}
