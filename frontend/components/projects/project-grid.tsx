'use client'

import { SideProject } from '@/types'
import { ProjectCard } from './project-card'
import { useRouter } from 'next/navigation'

interface ProjectGridProps {
  projects: SideProject[]
  emptyMessage?: string
}

export function ProjectGrid({
  projects,
  emptyMessage = 'No projects found',
}: ProjectGridProps) {
  const router = useRouter()

  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-background-secondary/60 px-6 py-10 text-center shadow-sm sm:px-8 sm:py-12">
        <div className="text-5xl sm:text-6xl mb-4">💀</div>
        <p className="text-sm text-foreground-tertiary">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => router.push(`/projects/${project.id}`)}
        />
      ))}
    </div>
  )
}
