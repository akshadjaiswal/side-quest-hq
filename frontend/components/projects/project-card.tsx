'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from './status-badge'
import { TechTag } from './tech-tag'
import { Progress } from '@/components/ui/progress'
import { SideProject } from '@/types'
import { formatDate } from '@/lib/utils/date'
import { Github, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface ProjectCardProps {
  project: SideProject
  onClick?: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card
      className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-border bg-background-secondary"
      onClick={onClick}
    >
      {/* Cover Image */}
      {project.cover_image_url ? (
        <div className="h-48 overflow-hidden rounded-t-lg">
          <img
            src={project.cover_image_url}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-primary/5 via-background-tertiary to-primary/10 flex items-center justify-center rounded-t-lg">
          <span className="text-6xl opacity-30">💀</span>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <StatusBadge status={project.status} />
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-foreground-secondary text-sm line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
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

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-foreground-tertiary">
            <span>Progress</span>
            <span className="font-medium">{project.progress_percentage}%</span>
          </div>
          <Progress value={project.progress_percentage} className="h-2" />
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t border-border flex items-center justify-between">
        <div className="text-xs text-foreground-tertiary">
          {project.started_date ? (
            <span>Started {formatDate(project.started_date, 'MMM yyyy')}</span>
          ) : (
            <span>No start date</span>
          )}
        </div>

        <div className="flex gap-2">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-tertiary hover:text-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-tertiary hover:text-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
