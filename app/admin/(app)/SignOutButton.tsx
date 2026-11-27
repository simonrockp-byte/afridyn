'use client'
import { LogOut } from 'lucide-react'
import { listOutbox } from '@/lib/admin/outbox'

export function SignOutButton() {
  return (
    <button
      type="button"
      className="ax-btn ax-btn-ghost !min-h-[40px] !px-4"
      onClick={async () => {
        const waiting = (await listOutbox().catch(() => [])).length
        if (waiting && !confirm(`${waiting} document${waiting === 1 ? ' is' : 's are'} saved on this device but not synced yet. They stay on this device and sync after you sign in again. Sign out anyway?`)) return
        await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
        // Forget cached admin pages on this device (they contain client data).
        navigator.serviceWorker?.controller?.postMessage({ type: 'afridyn-clear-admin-cache' })
        await Promise.all(['afridyn-admin-pages', 'afridyn-admin-rsc'].map((c) => caches?.delete(c).catch(() => false)))
        window.location.assign('/admin/login')
      }}
    >
      <LogOut size={15} aria-hidden /> Sign out
    </button>
  )
}
