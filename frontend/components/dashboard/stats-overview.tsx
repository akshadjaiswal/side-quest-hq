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
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      {statCards.map((stat) => {
        const Icon = typeof stat.icon === 'string' ? null : stat.icon
        return (
          <Card key={stat.label} className="border-border bg-background-secondary">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-lg ${stat.bgColor || 'bg-primary/10'} flex items-center justify-center`}
                >
                  {Icon ? (
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  ) : (
                    <span className="text-2xl">{stat.icon as string}</span>
                  )}
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-foreground-tertiary">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
