'use server'

import { revalidatePath } from 'next/cache'
import { and, eq, isNull } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { auditLog, documents } from '@/db/schema'

/** A client accepts a quotation from its public link. The token is the only credential. */
export async function acceptQuotationByToken(token: string): Promise<{ ok: boolean; error?: string }> {
  if (!/^[A-Za-z0-9_-]{20,40}$/.test(token)) return { ok: false, error: 'Invalid link.' }
  const db = getDb()
  const [doc] = await db.select().from(documents).where(and(eq(documents.shareToken, token), isNull(documents.deletedAt))).limit(1)
  if (!doc || doc.type !== 'quotation') return { ok: false, error: 'Quotation not found.' }
  if (doc.status !== 'sent') return { ok: doc.status === 'accepted', error: doc.status === 'accepted' ? undefined : 'This quotation can no longer be accepted.' }
  if (doc.validUntil && doc.validUntil < new Date().toISOString().slice(0, 10)) return { ok: false, error: 'This quotation has expired. Please ask us for an updated quote.' }
  await db.update(documents).set({ status: 'accepted', acceptedAt: new Date(), version: doc.version + 1, updatedAt: new Date() }).where(eq(documents.id, doc.id))
  await db.insert(auditLog).values({ action: 'accept_public', entity: 'document', entityId: doc.id })
  revalidatePath(`/d/${token}`)
  revalidatePath('/admin', 'layout')
  return { ok: true }
}
