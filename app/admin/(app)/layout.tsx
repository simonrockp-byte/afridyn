import { redirect } from 'next/navigation'
import { Logo } from '@/components/brand/Logo'
import { getSessionUser } from '@/lib/auth/server'
import { OPEN_MODE_EMAIL } from '@/lib/auth/open-mode'
import { AdminNav } from './AdminNav'
import { SignOutButton } from './SignOutButton'
import { ConnectionBar, RegisterServiceWorker } from '@/components/admin/offline/OfflineKit'

export const dynamic = 'force-dynamic'

export default async function AdminAppLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser().catch(() => null)
  if (!user) redirect('/admin/login')

  return (
    <div className="min-h-[100svh] lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:flex flex-col border-r sticky top-0 h-[100svh]" style={{ borderColor: 'var(--ax-line)', background: 'rgba(7,9,13,0.92)' }}>
        <div className="px-5 h-[72px] flex items-center border-b" style={{ borderColor: 'var(--ax-line)' }}><Logo /></div>
        <AdminNav orientation="vertical" />
        <div className="mt-auto p-4 border-t space-y-3" style={{ borderColor: 'var(--ax-line)' }}>
          <p className="text-[13px] text-white truncate">{user.name}<span className="block ax-spec text-[10px] mt-0.5">{user.role}</span></p>
          <SignOutButton />
        </div>
      </aside>

      <div className="min-w-0 pb-20 lg:pb-0">
        <header className="lg:hidden sticky top-0 z-30 border-b h-[64px] px-4 flex items-center justify-between" style={{ borderColor: 'var(--ax-line)', background: 'rgba(7,9,13,0.95)' }}>
          <Logo />
          <SignOutButton />
        </header>
        {user.email === OPEN_MODE_EMAIL && (
          <div role="status" className="border-b px-5 py-2.5 text-center text-[13px]" style={{ borderColor: 'rgba(255,106,26,0.4)', background: 'rgba(255,106,26,0.1)', color: '#FFC9A3' }}>
            <strong className="text-white">Open test mode</strong> — anyone with the link can use this admin. Don&apos;t enter real client data yet.
          </div>
        )}
        <ConnectionBar />
        <RegisterServiceWorker />
        <main className="px-4 md:px-8 xl:px-12 py-8 md:py-10 max-w-[1400px]">{children}</main>
      </div>

      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t" style={{ borderColor: 'var(--ax-line)', background: 'rgba(7,9,13,0.97)' }} aria-label="Admin">
        <AdminNav orientation="horizontal" />
      </nav>
    </div>
  )
}
