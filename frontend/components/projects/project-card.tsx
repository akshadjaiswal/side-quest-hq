'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from './status-badge'
import { TechTag } from './tech-tag'
import { Progress } from '@/components/ui/progress'
import { SideProject } from '@/types'
import { formatDate } from '@/lib/utils/date'
import { Github, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  project: SideProject
  onClick?: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const placeholder = (
    <div className="flex h-40 items-center justify-center rounded-t-2xl bg-gradient-to-br from-primary/5 via-background-tertiary to-primary/10 sm:h-48 relative overflow-hidden">
      <div className="absolute inset-0 shimmer"></div>
      <span className="text-5xl text-foreground-tertiary/30 relative z-10">💀</span>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="group flex h-full flex-col overflow-hidden rounded-2xl glass border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl cursor-pointer"
        onClick={onClick}
      >
        {project.cover_image_url ? (
          <div className="h-40 overflow-hidden rounded-t-2xl sm:h-48">
            <img
              src={project.cover_image_url}
              alt={project.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ) : (
          placeholder
        )}

        <CardHeader className="space-y-3 pb-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-lg font-semibold text-foreground sm:text-xl group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <StatusBadge status={project.status} />
          </div>
          <p className="line-clamp-3 text-sm text-foreground-secondary leading-relaxed">
            {project.description}
          </p>
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
              <span className="font-semibold text-foreground">{project.progress_percentage}%</span>
            </div>
            <div className="relative overflow-hidden rounded-full h-2 bg-background-tertiary">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress_percentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-primary-hover rounded-full"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t border-border/50 px-6 py-4 text-xs text-foreground-tertiary bg-background-secondary/30">
          <span>
            {project.started_date ? `Started ${formatDate(project.started_date, 'MMM yyyy')}` : 'No start date'}
          </span>
          <div className="flex gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground-tertiary transition-all duration-200 hover:text-foreground hover:scale-110"
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
                className="text-foreground-tertiary transition-all duration-200 hover:text-foreground hover:scale-110"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
