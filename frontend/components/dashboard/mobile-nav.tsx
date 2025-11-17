'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Skull, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Graveyard', href: '/graveyard', icon: Skull },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-2 overflow-x-auto">
      {navItems.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex flex-1 min-w-[120px] items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium transition-colors',
              active
                ? 'bg-primary text-white'
                : 'bg-background text-foreground-secondary hover:bg-background-secondary'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
