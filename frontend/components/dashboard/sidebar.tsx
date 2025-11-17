'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Skull, Settings, Home } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Graveyard', href: '/graveyard', icon: Skull },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-background border-r border-border">
      {/* Logo/Brand */}
      <div className="flex min-h-[80px] flex-col justify-center gap-2 px-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-xl">💀</span>
          </div>
          <div>
            <h1 className="font-bold text-foreground text-lg">SideQuestHQ</h1>
            <p className="text-xs text-foreground-tertiary">Your project graveyard</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-foreground-secondary hover:bg-background-tertiary hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-foreground-secondary hover:bg-background-tertiary hover:text-foreground rounded-lg transition-colors"
        >
          <Home className="h-5 w-5" />
          <span className="font-medium">Home</span>
        </Link>
      </div>
    </div>
  )
}
