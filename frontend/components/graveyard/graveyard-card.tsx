'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { SideProject } from '@/types'
import { formatDate, getYearFromDate } from '@/lib/utils/date'
import { TechTag } from '@/components/projects/tech-tag'

interface GraveyardCardProps {
  project: SideProject
  onClick?: () => void
}

export function GraveyardCard({ project, onClick }: GraveyardCardProps) {
  const startYear = getYearFromDate(project.started_date)
  const endYear = getYearFromDate(project.abandoned_date)

  return (
    <Card
      className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-graveyard-background-light border-graveyard-accent/30 text-graveyard-text overflow-hidden relative"
      onClick={onClick}
    >
      {/* Sepia Overlay Effect */}
      <div className="absolute inset-0 bg-graveyard-sepia/5 pointer-events-none" />

      {/* Tombstone Header */}
      <CardHeader className="relative pb-4 text-center border-b border-graveyard-accent/20">
        <div className="text-5xl mb-3">💀</div>
        <div className="text-sm uppercase tracking-wider text-graveyard-accent font-semibold">
          RIP
        </div>
        <h3 className="text-2xl font-bold mt-2 group-hover:text-graveyard-accent transition-colors">
          {project.name}
        </h3>
        <div className="text-lg font-mono mt-2 text-graveyard-text/80">
          {startYear} - {endYear}
        </div>
      </CardHeader>

      <CardContent className="relative pt-6 space-y-4">
        {/* Quote-style Description */}
        <div className="italic text-center text-graveyard-text/90 border-l-2 border-graveyard-accent/40 pl-4">
          "{project.description}"
        </div>

        {/* Why Stopped */}
        {project.why_stopped && (
          <div className="bg-graveyard-background/50 rounded-lg p-4">
            <p className="text-xs uppercase tracking-wider text-graveyard-accent mb-2">
              Cause of Death
            </p>
            <p className="text-sm text-graveyard-text/90">{project.why_stopped}</p>
          </div>
        )}

        {/* What Learned */}
        {project.what_learned && (
          <div className="bg-graveyard-background/50 rounded-lg p-4">
            <p className="text-xs uppercase tracking-wider text-graveyard-accent mb-2">
              Final Words
            </p>
            <p className="text-sm text-graveyard-text/90">{project.what_learned}</p>
          </div>
        )}

        {/* Tech Stack */}
        {project.tech_stack.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-wider text-graveyard-accent mb-2">
              Technologies Used
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech_stack.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded bg-graveyard-accent/20 text-graveyard-text font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="relative pt-4 border-t border-graveyard-accent/20 text-center">
        <p className="text-xs text-graveyard-text/60 w-full">
          "May this project rest in peace, for it served its purpose as a learning journey"
        </p>
      </CardFooter>
    </Card>
  )
}
