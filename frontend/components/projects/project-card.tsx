'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from './status-badge'
import { TechTag } from './tech-tag'
import { Progress } from '@/components/ui/progress'
import { SideProject } from '@/types'
import { formatDate } from '@/lib/utils/date'
import { Github, ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  project: SideProject
  onClick?: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const placeholder = (
    <div className="flex h-40 items-center justify-center rounded-t-2xl bg-gradient-to-br from-primary/5 via-background-tertiary to-primary/10 sm:h-48">
      <span className="text-5xl text-foreground-tertiary/30">💀</span>
    </div>
  )

  return (
    <Card
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background-secondary/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      onClick={onClick}
    >
      {project.cover_image_url ? (
        <div className="h-40 overflow-hidden rounded-t-2xl sm:h-48">
          <img
            src={project.cover_image_url}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        placeholder
      )}

      <CardHeader className="space-y-3 pb-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-lg font-semibold text-foreground sm:text-xl">
            {project.name}
          </h3>
          <StatusBadge status={project.status} />
        </div>
        <p className="line-clamp-3 text-sm text-foreground-secondary">{project.description}</p>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 pb-4 pt-4">
        {project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tech_stack.slice(0, 4).map((tech) => (
              <TechTag key={tech} name={tech} />
            ))}
            {project.tech_stack.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.tech_stack.length - 4}
              </Badge>
            )}
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-foreground-tertiary">
            <span>Progress</span>
            <span className="font-medium text-foreground">{project.progress_percentage}%</span>
          </div>
          <Progress value={project.progress_percentage} className="h-2 rounded-full" />
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-border px-6 py-4 text-xs text-foreground-tertiary">
        <span>
          {project.started_date ? `Started ${formatDate(project.started_date, 'MMM yyyy')}` : 'No start date'}
        </span>
        <div className="flex gap-3">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-tertiary transition-colors hover:text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-tertiary transition-colors hover:text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
