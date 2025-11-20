'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Skull, Settings, Home } from 'lucide-react'
import { motion } from 'framer-motion'

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
      <div className="flex min-h-[80px] flex-col justify-center gap-2 px-6 border-b border-border bg-background-secondary/30">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
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
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative group',
                isActive
                  ? 'bg-primary text-white shadow-md'
                  : 'text-foreground-secondary hover:bg-background-tertiary/50 hover:text-foreground'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-primary rounded-xl"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon className={cn(
                "h-5 w-5 transition-transform duration-200",
                !isActive && "group-hover:scale-110"
              )} />
              <span className="font-medium relative z-10">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-background-secondary/30">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-foreground-secondary hover:bg-background-tertiary/50 hover:text-foreground rounded-xl transition-all duration-200 group"
        >
          <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Home</span>
        </Link>
      </div>
    </div>
  )
}
