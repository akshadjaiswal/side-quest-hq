'use client'

import { useProjects } from '@/hooks/use-projects'
import { StatsOverview } from '@/components/dashboard/stats-overview'
import { ProjectGrid } from '@/components/projects/project-grid'
import { AddProjectDialog } from '@/components/dashboard/add-project-dialog'
import { GitHubImportDialog } from '@/components/github/import-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Plus, Github } from 'lucide-react'
import { useState, useMemo } from 'react'
import { ProjectStatus } from '@/types'
import { motion } from 'framer-motion'

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
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-6xl mb-4"
          >
            💀
          </motion.div>
          <p className="text-foreground-secondary font-medium mb-4">Loading your projects...</p>
          <div className="flex gap-2 justify-center">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-4">
        {/* Header */}
        <section className="flex flex-col gap-4 rounded-2xl glass border border-border/50 p-5 shadow-lg sm:flex-row sm:items-start sm:justify-between sm:p-6">
          <div className="space-y-2">
            <p className="text-sm text-foreground-tertiary font-medium">Dashboard</p>
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Your projects</h1>
            <p className="text-sm text-foreground-secondary">
              Track, reflect, and celebrate every side quest from one responsive hub.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => setImportDialogOpen(true)}
              variant="outline"
              className="w-full border-border hover:border-primary/50 transition-all duration-200 sm:w-auto group"
            >
              <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Import GitHub repos
            </Button>
            <Button
              onClick={() => setAddDialogOpen(true)}
              className="w-full bg-primary text-white hover:bg-primary-hover sm:w-auto glow-hover hover:scale-105 transition-all duration-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add project
            </Button>
          </div>
        </section>

        {projects.length > 0 ? (
          <>
            {/* Stats */}
            <StatsOverview projects={projects} />

            {/* Filters */}
            <section className="rounded-2xl glass border border-border/50 p-5 shadow-lg sm:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-tertiary" />
                  <Input
                    placeholder="Search by name, description, or tech…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-11 w-full rounded-xl border-border bg-background pl-11 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <Tabs
                  value={selectedStatus}
                  onValueChange={(value) => setSelectedStatus(value as 'all' | ProjectStatus)}
                  className="w-full md:w-auto"
                >
                  <TabsList className="flex w-full gap-2 overflow-x-auto rounded-2xl bg-background p-1 sm:grid sm:grid-cols-5">
                    {[
                      { value: 'all', label: 'All' },
                      { value: 'active', label: 'Active' },
                      { value: 'paused', label: 'Paused' },
                      { value: 'abandoned', label: 'Abandoned' },
                      { value: 'shipped', label: 'Shipped' },
                    ].map((tab) => (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="flex-1 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary sm:flex-none"
                      >
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </section>

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
          <section className="rounded-2xl border border-dashed border-border glass p-10 text-center shadow-lg sm:p-12">
            <div className="mx-auto flex max-w-lg flex-col items-center gap-4">
              <div className="text-6xl animate-bounce-subtle">💀</div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">No projects yet</h2>
                <p className="text-sm text-foreground-secondary">
                  Start by logging your first quest or import a GitHub repo to build your archive.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:flex-row">
                <Button
                  onClick={() => setAddDialogOpen(true)}
                  className="w-full bg-primary text-white hover:bg-primary-hover glow-hover hover:scale-105 transition-all duration-200"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add project
                </Button>
                <Button
                  onClick={() => setImportDialogOpen(true)}
                  variant="outline"
                  className="w-full border-border hover:border-primary/50 transition-all duration-200"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Import from GitHub
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Dialogs */}
        <AddProjectDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
        <GitHubImportDialog open={importDialogOpen} onOpenChange={setImportDialogOpen} />
    </div>
  )
}
