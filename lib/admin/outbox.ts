'use client'

import type { DocInput } from './actions'

// Offline outbox: documents saved with no signal wait here (IndexedDB on this
// device) and are sent to /api/admin/documents when the connection returns.
// Tiny hand-rolled IndexedDB wrapper — no dependency.

export type OutboxItem = {
  localId: string
  createdAt: number
  label: string // e.g. "Quotation · TEST — Demo Mining Ltd"
  input: DocInput
  attempts: number
  error?: string // set when the server rejected it (needs a human)
  syncedAs?: { id: string; at: number }
}

const DB = 'afridyn-admin'
const STORE = 'outbox'
export const OUTBOX_EVENT = 'afridyn-outbox-changed'

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'localId' })
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function tx<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open()
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode)
    const req = fn(t.objectStore(STORE))
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
    t.oncomplete = () => db.close()
  })
}

const changed = () => window.dispatchEvent(new Event(OUTBOX_EVENT))

export async function listOutbox(): Promise<OutboxItem[]> {
  if (typeof indexedDB === 'undefined') return []
  const items = await tx<OutboxItem[]>('readonly', (s) => s.getAll() as IDBRequest<OutboxItem[]>)
  return items.sort((a, b) => a.createdAt - b.createdAt)
}

export async function enqueueDocument(input: DocInput, label: string): Promise<OutboxItem> {
  const localId = crypto.randomUUID()
  // New documents are created on the server with this same id, so a retry after a lost reply is a no-op.
  const item: OutboxItem = { localId, createdAt: Date.now(), label, input: input.id ? input : { ...input, createId: localId }, attempts: 0 }
  await tx('readwrite', (s) => s.put(item))
  changed()
  return item
}

export async function putItem(item: OutboxItem) {
  await tx('readwrite', (s) => s.put(item))
  changed()
}

export async function removeItem(localId: string) {
  await tx('readwrite', (s) => s.delete(localId))
  changed()
}

let syncing: Promise<SyncResult> | null = null
export type SyncResult = { sent: number; failed: number; needsSignIn: boolean; offline: boolean }

/**
 * Sends pending items oldest-first. Stops on a network failure (try again
 * later) or a 401 (session expired). Server-rejected items keep an error for
 * review instead of retrying forever. Synced items are removed.
 */
export function syncOutbox(): Promise<SyncResult> {
  if (syncing) return syncing
  syncing = (async () => {
    const result: SyncResult = { sent: 0, failed: 0, needsSignIn: false, offline: false }
    const items = (await listOutbox()).filter((i) => !i.error)
    for (const item of items) {
      let res: Response
      try {
        res = await fetch('/api/admin/documents', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(item.input),
          credentials: 'same-origin',
        })
      } catch {
        result.offline = true
        break
      }
      if (res.status === 401) {
        result.needsSignIn = true
        break
      }
      const data = (await res.json().catch(() => ({}))) as { id?: string; error?: string }
      if (res.ok && data.id) {
        await removeItem(item.localId)
        result.sent++
      } else if (res.status >= 500) {
        await putItem({ ...item, attempts: item.attempts + 1 })
        result.failed++
        break
      } else {
        await putItem({ ...item, attempts: item.attempts + 1, error: data.error ?? `Rejected (${res.status})` })
        result.failed++
      }
    }
    return result
  })().finally(() => {
    syncing = null
  })
  return syncing
}

/** True when an error from a server action / fetch means "no connection". */
export function isNetworkError(e: unknown): boolean {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return true
  const msg = (e as Error)?.message ?? ''
  return e instanceof TypeError || /fetch|network|Failed to/i.test(msg)
}
