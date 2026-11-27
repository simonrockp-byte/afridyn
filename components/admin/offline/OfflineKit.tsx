'use client'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CloudOff, RefreshCw, CheckCircle2, AlertTriangle, Trash2 } from 'lucide-react'
import { OUTBOX_EVENT, listOutbox, putItem, removeItem, syncOutbox, type OutboxItem } from '@/lib/admin/outbox'

/** Registers the admin service worker (scope /admin/ only). Production builds only. */
export function RegisterServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return
    navigator.serviceWorker.register('/sw.js', { scope: '/admin/' }).catch((e) => console.warn('Service worker registration failed', e))
  }, [])
  return null
}

export function useOnline() {
  const [online, setOnline] = useState(true)
  useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    update()
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update) }
  }, [])
  return online
}

export function useOutbox() {
  const [items, setItems] = useState<OutboxItem[]>([])
  const refresh = useCallback(() => { listOutbox().then(setItems).catch(() => setItems([])) }, [])
  useEffect(() => {
    refresh()
    window.addEventListener(OUTBOX_EVENT, refresh)
    return () => window.removeEventListener(OUTBOX_EVENT, refresh)
  }, [refresh])
  return { items, refresh }
}

/**
 * Status strip at the top of the admin: offline notice, items waiting to sync,
 * and automatic sync when the connection returns (also every 30 s and on focus).
 */
export function ConnectionBar() {
  const router = useRouter()
  const online = useOnline()
  const { items } = useOutbox()
  const pending = items.filter((i) => !i.error).length
  const failed = items.filter((i) => i.error).length
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState<string | null>(null)

  const runSync = useCallback(async () => {
    if (!navigator.onLine) return
    setBusy(true)
    try {
      const r = await syncOutbox()
      if (r.needsSignIn) setNote('Sign in again to sync your offline documents.')
      else if (r.sent) { setNote(`${r.sent} offline document${r.sent === 1 ? '' : 's'} synced.`); router.refresh() }
      else setNote(null)
    } finally {
      setBusy(false)
    }
  }, [router])

  useEffect(() => {
    runSync()
    const onOnline = () => runSync()
    const onVisible = () => { if (document.visibilityState === 'visible') runSync() }
    window.addEventListener('online', onOnline)
    document.addEventListener('visibilitychange', onVisible)
    const t = window.setInterval(() => { listOutbox().then((i) => { if (i.some((x) => !x.error)) runSync() }) }, 30_000)
    return () => { window.removeEventListener('online', onOnline); document.removeEventListener('visibilitychange', onVisible); clearInterval(t) }
  }, [runSync])

  if (online && !pending && !failed && !note) return null

  return (
    <div role="status" className="border-b px-4 md:px-8 py-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]"
      style={{ borderColor: 'var(--ax-line)', background: online ? 'rgba(34,211,238,0.07)' : 'rgba(251,191,36,0.1)' }}>
      {!online && (
        <span className="inline-flex items-center gap-2" style={{ color: 'var(--ax-warn)' }}>
          <CloudOff size={15} aria-hidden /> Offline — showing saved copies. New documents are kept on this device and sync when you&apos;re back online.
        </span>
      )}
      {pending > 0 && <span style={{ color: 'var(--ax-text)' }}>{pending} waiting to sync</span>}
      {failed > 0 && <a href="/admin#outbox" className="inline-flex items-center gap-1.5 underline underline-offset-4" style={{ color: 'var(--ax-error)' }}><AlertTriangle size={14} aria-hidden /> {failed} need attention</a>}
      {note && <span className="inline-flex items-center gap-1.5" style={{ color: 'var(--ax-green)' }}><CheckCircle2 size={14} aria-hidden /> {note}</span>}
      {online && pending > 0 && (
        <button type="button" onClick={runSync} disabled={busy} className="ml-auto inline-flex items-center gap-1.5 ax-spec text-[10px] hover:text-white disabled:opacity-60">
          <RefreshCw size={12} className={busy ? 'animate-spin' : ''} aria-hidden /> {busy ? 'Syncing…' : 'Sync now'}
        </button>
      )}
    </div>
  )
}

/** Documents saved offline that haven't reached the server yet. */
export function OutboxList() {
  const { items } = useOutbox()
  const online = useOnline()
  if (!items.length) return null
  return (
    <section id="outbox" className="ax-panel p-5 md:p-6 mb-6" style={{ borderColor: 'rgba(251,191,36,0.4)' }}>
      <h2 className="ax-spec mb-1" style={{ color: 'var(--ax-text)' }}>Saved on this device ({items.length})</h2>
      <p className="text-[13px] mb-4" style={{ color: 'var(--ax-dim)' }}>
        {online ? 'These sync automatically. A number is assigned once they reach the server.' : 'You’re offline. These will sync automatically when the connection returns.'}
      </p>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.localId} className="flex flex-wrap items-center gap-3 text-[14px] border-b pb-2" style={{ borderColor: 'var(--ax-line)' }}>
            <span className="flex-1 min-w-[200px] text-white">{i.label}</span>
            <span className="text-[12px]" style={{ color: 'var(--ax-faint)' }}>{new Date(i.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}</span>
            {i.error ? (
              <>
                <span className="text-[13px] basis-full" style={{ color: 'var(--ax-error)' }}>Not saved: {i.error}</span>
                <button type="button" className="ax-btn ax-btn-ghost !min-h-[36px] !px-3" onClick={async () => { await putItem({ ...i, error: undefined }); syncOutbox() }}>
                  <RefreshCw size={13} aria-hidden /> Retry
                </button>
              </>
            ) : (
              <span className="ax-spec text-[10px]" style={{ color: 'var(--ax-warn)' }}>Waiting</span>
            )}
            <button type="button" className="ax-btn ax-btn-ghost !min-h-[36px] !px-3" onClick={() => { if (confirm('Discard this unsynced document? It will be lost.')) removeItem(i.localId) }}>
              <Trash2 size={13} aria-hidden /> Discard
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
