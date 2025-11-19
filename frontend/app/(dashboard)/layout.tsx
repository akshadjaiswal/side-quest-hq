import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { MobileNav } from '@/components/dashboard/mobile-nav'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  const headerUser = {
    username: session.username,
    email: session.email,
    avatar_url: session.avatarUrl,
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-border lg:bg-background lg:overflow-y-auto">
        <Sidebar />
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="shrink-0">
          <Header user={headerUser} />

          {/* Mobile nav */}
          <div className="border-b border-border bg-background-secondary/70 px-4 py-3 lg:hidden">
            <MobileNav />
          </div>
        </div>

        <main className="flex-1 overflow-y-auto bg-background px-4 py-6 sm:px-6 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  )
}
