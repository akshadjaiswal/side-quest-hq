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
      <div className="bg-background-secondary border border-border rounded-lg p-12 text-center">
        <div className="text-6xl mb-4">💀</div>
        <p className="text-foreground-tertiary">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
