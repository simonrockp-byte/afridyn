import type { Metadata } from 'next'
import { CloudOff } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { OutboxList } from '@/components/admin/offline/OfflineKit'
import { RetryButton } from './RetryButton'

// Static fallback served by the service worker for admin pages that haven't
// been opened on this device yet while offline. Precached at install.
export const dynamic = 'force-static'
export const metadata: Metadata = { title: 'Offline' }

export default function OfflinePage() {
  return (
    <main className="min-h-[100svh] px-5 py-12">
      <div className="max-w-xl mx-auto">
        <div className="mb-8"><Logo /></div>
        <div className="ax-panel ax-brackets p-7">
          <CloudOff size={28} style={{ color: '#FCD34D' }} aria-hidden />
          <h1 className="font-display text-2xl font-semibold text-white mt-4">You&apos;re offline</h1>
          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: 'var(--ax-dim)' }}>
            This page hasn&apos;t been opened on this device yet, so there&apos;s no saved copy. Pages you&apos;ve opened before — the dashboard,
            documents, clients and the “new document” screens — still work offline.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <RetryButton />
            <a href="/admin" className="ax-btn ax-btn-ghost">Dashboard</a>
            <a href="/admin/documents/new?type=quotation" className="ax-btn ax-btn-ghost">New quotation</a>
          </div>
        </div>
        <div className="mt-6"><OutboxList /></div>
      </div>
    </main>
  )
}
