// Statistics and analytics utilities
import { SideProject, ProjectStats, ProjectStatus } from '@/types'

export function calculateProjectStats(projects: SideProject[]): ProjectStats {
  return {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    paused: projects.filter(p => p.status === 'paused').length,
    abandoned: projects.filter(p => p.status === 'abandoned').length,
    shipped: projects.filter(p => p.status === 'shipped').length,
  }
}

export function getMostUsedTechnologies(projects: SideProject[], limit = 10): { name: string; count: number }[] {
  const techCount: Record<string, number> = {}

  projects.forEach(project => {
    project.tech_stack.forEach(tech => {
      techCount[tech] = (techCount[tech] || 0) + 1
    })
  })

  return Object.entries(techCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

export function getStatusPercentage(projects: SideProject[], status: ProjectStatus): number {
  if (projects.length === 0) return 0
  const count = projects.filter(p => p.status === status).length
  return Math.round((count / projects.length) * 100)
}

export function getAverageProjectLifespan(projects: SideProject[]): number {
  const projectsWithDates = projects.filter(p =>
    p.started_date && (p.last_worked_date || p.shipped_date || p.abandoned_date)
  )

  if (projectsWithDates.length === 0) return 0

  const lifespans = projectsWithDates.map(project => {
    const startDate = new Date(project.started_date!)
    const endDate = new Date(
      project.shipped_date || project.abandoned_date || project.last_worked_date!
    )
    return (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) // Days
  })

  const average = lifespans.reduce((sum, days) => sum + days, 0) / lifespans.length
  return Math.round(average)
}

export function getCompletionRate(projects: SideProject[]): number {
  if (projects.length === 0) return 0
  const averageProgress = projects.reduce((sum, p) => sum + p.progress_percentage, 0) / projects.length
  return Math.round(averageProgress)
}
