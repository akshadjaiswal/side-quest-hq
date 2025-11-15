import { Badge } from '@/components/ui/badge'

interface TechTagProps {
  name: string
  variant?: 'default' | 'outline'
}

export function TechTag({ name, variant = 'outline' }: TechTagProps) {
  return (
    <Badge
      variant={variant}
      className="text-xs font-mono bg-background-tertiary text-foreground-secondary border-border hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors"
    >
      {name}
    </Badge>
  )
}
