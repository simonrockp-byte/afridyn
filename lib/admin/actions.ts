'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { and, eq, isNull } from 'drizzle-orm'
import { z } from 'zod'
import { getDb } from '@/db/client'
import { auditLog, clients, documents, payments, sites, type LineItem } from '@/db/schema'
import { requireUser } from '@/lib/auth/server'
import {
  CONVERT_TARGETS,
  DOC_META,
  addDays,
  clientSnapshot,
  computeTotals,
  defaultTerms,
  invoiceStatusAfter,
  newShareToken,
  normalisePhone,
  siteSnapshot,
  todayInLusaka,
  type DocType,
} from './documents'
import { getSettings, invoiceSettlement } from './data'
import { allocateNumber } from './numbering'

// Every action re-checks the session (requireUser) — the proxy is not the gate.

const str = (v: FormDataEntryValue | null) => (typeof v === 'string' && v.trim() ? v.trim() : null)

async function audit(userId: string, deviceId: string, action: string, entity: string, entityId: string | null, details?: unknown) {
  await getDb().insert(auditLog).values({ userId, deviceId, action, entity, entityId, details: details as object })
}

function touchAdmin() {
  revalidatePath('/admin', 'layout')
}

// ─── Clients & sites ─────────────────────────────────────────────────────────

export async function saveClient(formData: FormData) {
  const user = await requireUser()
  const id = str(formData.get('id'))
  const name = str(formData.get('name'))
  if (!name) throw new Error('Client name is required.')
  const values = {
    name,
    type: (formData.get('type') === 'individual' ? 'individual' : 'company') as 'individual' | 'company',
    contactPerson: str(formData.get('contactPerson')),
    phone: normalisePhone(str(formData.get('phone'))),
    whatsapp: normalisePhone(str(formData.get('whatsapp'))),
    email: str(formData.get('email'))?.toLowerCase() ?? null,
    tpin: str(formData.get('tpin')),
    address: str(formData.get('address')),
    notes: str(formData.get('notes')),
  }
  const db = getDb()
  let clientId = id
  if (id) {
    const [row] = await db.select({ version: clients.version }).from(clients).where(eq(clients.id, id)).limit(1)
    await db.update(clients).set({ ...values, version: (row?.version ?? 1) + 1, updatedAt: new Date() }).where(eq(clients.id, id))
    await audit(user.id, user.deviceId, 'update', 'client', id)
  } else {
    const [row] = await db.insert(clients).values(values).returning({ id: clients.id })
    clientId = row.id
    await audit(user.id, user.deviceId, 'create', 'client', clientId)
  }
  touchAdmin()
  const back = str(formData.get('returnTo'))
  redirect(back && back.startsWith('/admin') ? back.replace('{id}', clientId!) : `/admin/clients/${clientId}`)
}

export async function saveSite(formData: FormData) {
  const user = await requireUser()
  const clientId = str(formData.get('clientId'))
  const name = str(formData.get('name'))
  if (!clientId || !name) throw new Error('Site name is required.')
  const id = str(formData.get('id'))
  const values = {
    clientId,
    name,
    location: str(formData.get('location')),
    contactPerson: str(formData.get('contactPerson')),
    phone: normalisePhone(str(formData.get('phone'))),
    notes: str(formData.get('notes')),
  }
  const db = getDb()
  if (id) await db.update(sites).set({ ...values, updatedAt: new Date() }).where(eq(sites.id, id))
  else await db.insert(sites).values(values)
  await audit(user.id, user.deviceId, id ? 'update' : 'create', 'site', id)
  touchAdmin()
  redirect(`/admin/clients/${clientId}`)
}

// ─── Documents ───────────────────────────────────────────────────────────────

const lineSchema = z.object({
  id: z.string().min(1),
  productId: z.string().optional(),
  sku: z.string().max(80).optional(),
  description: z.string().trim().max(1000),
  unit: z.string().trim().max(30).optional(),
  qty: z.number().nonnegative().max(1_000_000),
  unitPrice: z.number().int().nonnegative().max(1_000_000_000_00),
  deliveredQty: z.number().nonnegative().optional(),
})

const docSchema = z.object({
  id: z.string().uuid().optional(),
  type: z.enum(['quotation', 'proforma', 'invoice', 'delivery_note', 'credit_note']),
  clientId: z.string().uuid(),
  siteId: z.string().uuid().nullable().optional(),
  issueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  secondDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
  clientPoNumber: z.string().trim().max(80).nullable().optional(),
  items: z.array(lineSchema).max(200),
  discount: z.number().int().nonnegative(),
  notes: z.string().max(4000).nullable().optional(),
  terms: z.string().max(4000).nullable().optional(),
})
export type DocInput = z.infer<typeof docSchema>

/** Create or update a draft. Issued documents are locked (convert, credit or void instead). */
export async function saveDocument(input: DocInput): Promise<{ id: string } | { error: string }> {
  const user = await requireUser()
  const parsed = docSchema.safeParse(input)
  if (!parsed.success) return { error: 'Some fields are invalid. Check the lines and dates.' }
  const d = parsed.data
  const items: LineItem[] = d.items.filter((i) => i.description || i.unitPrice || i.qty).map((i) => ({ ...i, description: i.description || '—' }))
  if (!items.length) return { error: 'Add at least one line.' }

  const db = getDb()
  const s = await getSettings()
  const [client] = await db.select().from(clients).where(and(eq(clients.id, d.clientId), isNull(clients.deletedAt))).limit(1)
  if (!client) return { error: 'Choose a client.' }
  const [site] = d.siteId ? await db.select().from(sites).where(eq(sites.id, d.siteId)).limit(1) : []
  const taxMode = s?.taxMode ?? 'TOT'
  const totals = computeTotals(items, d.discount, taxMode, s?.vatRate ?? 0.16)
  const meta = DOC_META[d.type]
  const values = {
    clientId: client.id,
    siteId: site?.id ?? null,
    clientSnapshot: clientSnapshot(client),
    siteSnapshot: siteSnapshot(site),
    clientPoNumber: d.clientPoNumber || null,
    issueDate: d.issueDate,
    validUntil: meta.secondDate === 'validUntil' ? (d.secondDate ?? null) : null,
    dueDate: meta.secondDate === 'dueDate' ? (d.secondDate ?? null) : null,
    items,
    ...totals,
    taxMode,
    notes: d.notes || null,
    terms: d.terms || null,
  }

  if (!d.id && d.type === 'credit_note') return { error: 'Credit notes are created from an invoice.' }
  if (d.id) {
    const [existing] = await db.select().from(documents).where(eq(documents.id, d.id)).limit(1)
    if (!existing) return { error: 'Document not found.' }
    if (existing.status !== 'draft') return { error: 'Issued documents are locked. Void it or issue a credit note instead.' }
    await db.update(documents).set({ ...values, version: existing.version + 1, updatedAt: new Date() }).where(eq(documents.id, d.id))
    await audit(user.id, user.deviceId, 'update', 'document', d.id)
    touchAdmin()
    return { id: d.id }
  }

  const year = Number(d.issueDate.slice(0, 4))
  const number = await allocateNumber(db, user.deviceId, meta.series, year)
  const [row] = await db
    .insert(documents)
    .values({ ...values, type: d.type, number, status: 'draft', shareToken: newShareToken(), createdBy: user.id, deviceId: user.deviceId })
    .returning({ id: documents.id })
  await audit(user.id, user.deviceId, 'create', 'document', row.id, { type: d.type, number })
  touchAdmin()
  return { id: row.id }
}

async function loadDoc(id: string) {
  const [doc] = await getDb().select().from(documents).where(and(eq(documents.id, id), isNull(documents.deletedAt))).limit(1)
  if (!doc) throw new Error('Document not found.')
  return doc
}

async function refreshInvoiceStatus(invoiceId: string) {
  const db = getDb()
  const inv = await loadDoc(invoiceId)
  const { paid, credited } = await invoiceSettlement(invoiceId)
  const status = invoiceStatusAfter(inv.status, inv.total, paid + credited)
  if (status !== inv.status) await db.update(documents).set({ status, version: inv.version + 1, updatedAt: new Date() }).where(eq(documents.id, invoiceId))
}

/** Draft → issued. Credit notes then reduce their invoice's balance. */
export async function issueDocument(id: string): Promise<{ error?: string }> {
  const user = await requireUser()
  const doc = await loadDoc(id)
  if (doc.status !== 'draft') return {}
  if (doc.type === 'credit_note' && doc.sourceDocumentId) {
    const inv = await loadDoc(doc.sourceDocumentId)
    const { paid, credited } = await invoiceSettlement(inv.id)
    if (doc.total > inv.total - paid - credited) return { error: 'The credit is more than the balance still owed on the invoice. Reduce the lines, or record a refund separately.' }
  }
  await getDb().update(documents).set({ status: 'sent', sentAt: new Date(), version: doc.version + 1, updatedAt: new Date() }).where(eq(documents.id, id))
  if (doc.type === 'credit_note' && doc.sourceDocumentId) await refreshInvoiceStatus(doc.sourceDocumentId)
  await audit(user.id, user.deviceId, 'issue', 'document', id)
  touchAdmin()
  return {}
}

export async function acceptQuotation(id: string) {
  const user = await requireUser()
  const doc = await loadDoc(id)
  if (doc.type !== 'quotation' || doc.status === 'void') return
  await getDb().update(documents).set({ status: 'accepted', acceptedAt: new Date(), version: doc.version + 1, updatedAt: new Date() }).where(eq(documents.id, id))
  await audit(user.id, user.deviceId, 'accept', 'document', id)
  touchAdmin()
}

/** Copies a document forward (quote → proforma/invoice, invoice → delivery note/credit note) as a new draft. */
export async function convertDocument(id: string, target: DocType) {
  const user = await requireUser()
  const src = await loadDoc(id)
  if (!CONVERT_TARGETS[src.type].includes(target)) throw new Error('That conversion is not allowed.')
  if (src.status === 'void' || src.status === 'draft') throw new Error('Issue the document before converting it.')
  const db = getDb()
  const s = await getSettings()
  const today = todayInLusaka()
  const meta = DOC_META[target]
  const number = await allocateNumber(db, user.deviceId, meta.series, Number(today.slice(0, 4)))
  const items = src.items.map((i) => ({ ...i, id: crypto.randomUUID(), deliveredQty: target === 'delivery_note' ? i.qty : undefined }))
  const [row] = await db
    .insert(documents)
    .values({
      type: target,
      number,
      status: 'draft',
      clientId: src.clientId,
      siteId: src.siteId,
      clientSnapshot: src.clientSnapshot,
      siteSnapshot: src.siteSnapshot,
      clientPoNumber: src.clientPoNumber,
      issueDate: today,
      validUntil: meta.secondDate === 'validUntil' ? addDays(today, s?.quoteValidityDays ?? 30) : null,
      dueDate: meta.secondDate === 'dueDate' ? addDays(today, s?.invoiceDueDays ?? 30) : null,
      items,
      discount: src.discount,
      subtotal: src.subtotal,
      taxMode: src.taxMode,
      taxAmount: src.taxAmount,
      total: src.total,
      notes: src.notes,
      terms: defaultTerms(target, s),
      sourceDocumentId: src.id,
      shareToken: newShareToken(),
      createdBy: user.id,
      deviceId: user.deviceId,
    })
    .returning({ id: documents.id })
  const srcPatch: Partial<typeof documents.$inferInsert> = { convertedToId: row.id, version: src.version + 1, updatedAt: new Date() }
  if (src.type === 'quotation' && src.status === 'sent') Object.assign(srcPatch, { status: 'accepted', acceptedAt: new Date() })
  await db.update(documents).set(srcPatch).where(eq(documents.id, src.id))
  await audit(user.id, user.deviceId, 'convert', 'document', row.id, { from: src.number, to: number })
  touchAdmin()
  redirect(`/admin/documents/${row.id}/edit`)
}

const paymentSchema = z.object({
  amount: z.number().int().positive(),
  method: z.enum(['cash', 'bank_transfer', 'airtel_money', 'mtn_momo', 'zamtel_kwacha', 'cheque', 'card']),
  paidBy: z.string().trim().max(120).nullable(),
  reference: z.string().trim().max(120).nullable(),
  paidAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
})

/** Records a payment against an invoice and issues the matching receipt. */
export async function recordPayment(invoiceId: string, input: z.infer<typeof paymentSchema>): Promise<{ receiptId: string } | { error: string }> {
  const user = await requireUser()
  const parsed = paymentSchema.safeParse(input)
  if (!parsed.success) return { error: 'Enter a valid amount, method and date.' }
  const inv = await loadDoc(invoiceId)
  if (inv.type !== 'invoice' || inv.status === 'void' || inv.status === 'draft') return { error: 'Issue the invoice before recording payments.' }
  const { paid, credited } = await invoiceSettlement(invoiceId)
  const balance = Math.max(0, inv.total - paid - credited)
  if (parsed.data.amount > balance) return { error: `That is more than the balance due.` }

  const db = getDb()
  const s = await getSettings()
  const [payment] = await db
    .insert(payments)
    .values({ documentId: invoiceId, ...parsed.data, receivedBy: user.id, deviceId: user.deviceId })
    .returning({ id: payments.id })
  const number = await allocateNumber(db, user.deviceId, 'RC', Number(parsed.data.paidAt.slice(0, 4)))
  const [receipt] = await db
    .insert(documents)
    .values({
      type: 'receipt',
      number,
      status: 'paid',
      clientId: inv.clientId,
      siteId: inv.siteId,
      clientSnapshot: inv.clientSnapshot,
      siteSnapshot: inv.siteSnapshot,
      clientPoNumber: inv.clientPoNumber,
      issueDate: parsed.data.paidAt,
      items: [],
      subtotal: parsed.data.amount,
      total: parsed.data.amount,
      taxMode: inv.taxMode,
      terms: defaultTerms('receipt', s),
      sourceDocumentId: inv.id,
      paymentId: payment.id,
      shareToken: newShareToken(),
      sentAt: new Date(),
      createdBy: user.id,
      deviceId: user.deviceId,
    })
    .returning({ id: documents.id })
  await refreshInvoiceStatus(invoiceId)
  await audit(user.id, user.deviceId, 'payment', 'document', invoiceId, { amount: parsed.data.amount, receipt: number })
  touchAdmin()
  return { receiptId: receipt.id }
}

export async function markDelivered(id: string, receivedByName: string, receivedAt: string) {
  const user = await requireUser()
  const doc = await loadDoc(id)
  if (doc.type !== 'delivery_note' || doc.status === 'void') return
  const name = receivedByName.trim().slice(0, 120)
  if (!name) throw new Error('Enter who received the goods.')
  await getDb()
    .update(documents)
    .set({ status: 'delivered', receivedByName: name, receivedAt: new Date(`${receivedAt}T12:00:00+02:00`), sentAt: doc.sentAt ?? new Date(), version: doc.version + 1, updatedAt: new Date() })
    .where(eq(documents.id, id))
  await audit(user.id, user.deviceId, 'deliver', 'document', id, { receivedBy: name })
  touchAdmin()
}

export async function setCreditReason(id: string, reason: string) {
  const user = await requireUser()
  const doc = await loadDoc(id)
  if (doc.type !== 'credit_note' || doc.status !== 'draft') return
  await getDb().update(documents).set({ creditReason: reason.trim().slice(0, 500) || null, updatedAt: new Date() }).where(eq(documents.id, id))
  await audit(user.id, user.deviceId, 'update', 'document', id)
  touchAdmin()
}

/** Voids a document. Voiding a receipt also reverses its payment. */
export async function voidDocument(id: string, reason: string) {
  const user = await requireUser()
  const doc = await loadDoc(id)
  if (doc.status === 'void') return
  const db = getDb()
  await db.update(documents).set({ status: 'void', voidedAt: new Date(), voidReason: reason.trim().slice(0, 500) || null, version: doc.version + 1, updatedAt: new Date() }).where(eq(documents.id, id))
  if (doc.type === 'receipt' && doc.paymentId) {
    await db.update(payments).set({ deletedAt: new Date(), updatedAt: new Date() }).where(eq(payments.id, doc.paymentId))
  }
  if ((doc.type === 'receipt' || doc.type === 'credit_note') && doc.sourceDocumentId) await refreshInvoiceStatus(doc.sourceDocumentId)
  await audit(user.id, user.deviceId, 'void', 'document', id, { reason })
  touchAdmin()
}

/** Deletes a draft outright (tombstone). Issued documents must be voided instead. */
export async function deleteDraft(id: string) {
  const user = await requireUser()
  const doc = await loadDoc(id)
  if (doc.status !== 'draft') throw new Error('Only drafts can be deleted.')
  await getDb().update(documents).set({ deletedAt: new Date(), updatedAt: new Date() }).where(eq(documents.id, id))
  await audit(user.id, user.deviceId, 'delete', 'document', id)
  touchAdmin()
  redirect('/admin/documents')
}
