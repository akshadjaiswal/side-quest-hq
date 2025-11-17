'use client'

import { Card, CardContent } from '@/components/ui/card'
import { SideProject } from '@/types'
import { calculateProjectStats } from '@/lib/utils/stats'
import { Activity, Pause, Skull, CheckCircle2, LucideIcon } from 'lucide-react'

interface StatsOverviewProps {
  projects: SideProject[]
}

export function StatsOverview({ projects }: StatsOverviewProps) {
  const stats = calculateProjectStats(projects)

  const statCards: Array<{
    label: string
    value: number
    icon: string | LucideIcon
    color: string
    bgColor?: string
  }> = [
    {
      label: 'Total Projects',
      value: stats.total,
      icon: '📊',
      color: 'text-foreground',
    },
    {
      label: 'Active',
      value: stats.active,
      icon: Activity,
      color: 'text-status-active',
      bgColor: 'bg-status-active-light',
    },
    {
      label: 'Paused',
      value: stats.paused,
      icon: Pause,
      color: 'text-status-paused',
      bgColor: 'bg-status-paused-light',
    },
    {
      label: 'Shipped',
      value: stats.shipped,
      icon: CheckCircle2,
      color: 'text-status-shipped',
      bgColor: 'bg-status-shipped-light',
    },
    {
      label: 'Graveyard',
      value: stats.abandoned,
      icon: Skull,
      color: 'text-status-abandoned',
      bgColor: 'bg-status-abandoned-light',
    },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {statCards.map((stat) => {
        const Icon = typeof stat.icon === 'string' ? null : stat.icon
        return (
          <Card key={stat.label} className="border-border bg-background-secondary/70 shadow-sm">
            <CardContent className="flex items-center gap-3 p-4 sm:p-5">
              <div
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${stat.bgColor || 'bg-primary/10'}`}
              >
                {Icon ? (
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                ) : (
                  <span className="text-2xl">{stat.icon as string}</span>
                )}
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-foreground-tertiary">
                  {stat.label}
                </p>
                <p className="text-2xl font-semibold text-foreground sm:text-3xl">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
