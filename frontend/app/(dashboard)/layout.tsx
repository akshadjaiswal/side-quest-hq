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
    <div className="min-h-screen bg-background">
      <div className="flex w-full flex-col lg:flex-row">
        {/* Sidebar desktop */}
        <aside className="hidden lg:block lg:w-64 lg:flex-shrink-0">
          <Sidebar />
        </aside>

        {/* Main */}
        <div className="flex min-h-screen flex-1 flex-col border-border lg:border-l">
          <Header user={headerUser} />

          {/* Mobile nav */}
          <div className="border-b border-border bg-background-secondary/70 px-4 py-3 lg:hidden">
            <MobileNav />
          </div>

          <main className="flex-1 bg-background px-4 py-6 sm:px-6 lg:px-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
