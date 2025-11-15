import { Badge } from '@/components/ui/badge'
import { ProjectStatus } from '@/types'
import { Activity, Pause, Skull, CheckCircle2 } from 'lucide-react'

interface StatusBadgeProps {
  status: ProjectStatus
  showIcon?: boolean
}

const statusConfig = {
  active: {
    label: 'Active',
    icon: Activity,
    className: 'bg-status-active-light text-status-active border-status-active/20',
  },
  paused: {
    label: 'Paused',
    icon: Pause,
    className: 'bg-status-paused-light text-status-paused border-status-paused/20',
  },
  abandoned: {
    label: 'Abandoned',
    icon: Skull,
    className: 'bg-status-abandoned-light text-status-abandoned border-status-abandoned/20',
  },
  shipped: {
    label: 'Shipped',
    icon: CheckCircle2,
    className: 'bg-status-shipped-light text-status-shipped border-status-shipped/20',
  },
}

export function StatusBadge({ status, showIcon = true }: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge variant="outline" className={config.className}>
      {showIcon && <Icon className="w-3 h-3 mr-1" />}
      {config.label}
    </Badge>
  )
}
