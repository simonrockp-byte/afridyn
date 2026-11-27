import 'server-only'
import { and, asc, desc, eq, ilike, inArray, isNull, ne, or, sql } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { clients, documents, payments, settings, sites, type DocumentRow } from '@/db/schema'
import { invoiceBalance, type DocStatus, type DocType } from './documents'

export async function getSettings() {
  const [row] = await getDb().select().from(settings).where(eq(settings.id, 1)).limit(1)
  return row ?? null
}

/** Paid + issued credit notes per invoice id. */
async function settlements(invoiceIds: string[]) {
  const db = getDb()
  const paid = new Map<string, number>()
  const credited = new Map<string, number>()
  if (!invoiceIds.length) return { paid, credited }
  const pays = await db
    .select({ documentId: payments.documentId, amount: sql<number>`sum(${payments.amount})::int` })
    .from(payments)
    .where(and(inArray(payments.documentId, invoiceIds), isNull(payments.deletedAt)))
    .groupBy(payments.documentId)
  pays.forEach((p) => paid.set(p.documentId, p.amount))
  const credits = await db
    .select({ sourceId: documents.sourceDocumentId, amount: sql<number>`sum(${documents.total})::int` })
    .from(documents)
    .where(and(eq(documents.type, 'credit_note'), inArray(documents.sourceDocumentId, invoiceIds), inArray(documents.status, ['sent']), isNull(documents.deletedAt)))
    .groupBy(documents.sourceDocumentId)
  credits.forEach((c) => c.sourceId && credited.set(c.sourceId, c.amount))
  return { paid, credited }
}

export async function invoiceSettlement(invoiceId: string) {
  const { paid, credited } = await settlements([invoiceId])
  return { paid: paid.get(invoiceId) ?? 0, credited: credited.get(invoiceId) ?? 0 }
}

/** Outstanding balance per client across issued invoices. */
export async function clientBalances(clientIds?: string[]) {
  const db = getDb()
  const where = [eq(documents.type, 'invoice'), isNull(documents.deletedAt), ne(documents.status, 'draft'), ne(documents.status, 'void')]
  if (clientIds?.length) where.push(inArray(documents.clientId, clientIds))
  const invs = await db.select({ id: documents.id, clientId: documents.clientId, total: documents.total, status: documents.status }).from(documents).where(and(...where))
  const { paid, credited } = await settlements(invs.map((i) => i.id))
  const out = new Map<string, number>()
  for (const i of invs) out.set(i.clientId, (out.get(i.clientId) ?? 0) + invoiceBalance(i.total, paid.get(i.id) ?? 0, credited.get(i.id) ?? 0, i.status))
  return out
}

export async function listClients(q?: string) {
  const db = getDb()
  const where = [isNull(clients.deletedAt)]
  if (q) where.push(or(ilike(clients.name, `%${q}%`), ilike(clients.contactPerson, `%${q}%`), ilike(clients.phone, `%${q}%`), ilike(clients.email, `%${q}%`))!)
  const rows = await db.select().from(clients).where(and(...where)).orderBy(asc(clients.name)).limit(500)
  const balances = await clientBalances(rows.map((r) => r.id))
  return rows.map((r) => ({ ...r, balance: balances.get(r.id) ?? 0 }))
}

export async function getClient(id: string) {
  const db = getDb()
  const [client] = await db.select().from(clients).where(and(eq(clients.id, id), isNull(clients.deletedAt))).limit(1)
  if (!client) return null
  const clientSites = await db.select().from(sites).where(and(eq(sites.clientId, id), isNull(sites.deletedAt))).orderBy(asc(sites.name))
  const docs = await db.select().from(documents).where(and(eq(documents.clientId, id), isNull(documents.deletedAt))).orderBy(desc(documents.issueDate), desc(documents.createdAt))
  const balance = (await clientBalances([id])).get(id) ?? 0
  return { client, sites: clientSites, documents: docs, balance }
}

export async function listDocuments(filter: { type?: DocType; status?: DocStatus; q?: string } = {}) {
  const db = getDb()
  const where = [isNull(documents.deletedAt)]
  if (filter.type) where.push(eq(documents.type, filter.type))
  if (filter.status) where.push(eq(documents.status, filter.status))
  if (filter.q) where.push(or(ilike(documents.number, `%${filter.q}%`), sql`${documents.clientSnapshot}->>'name' ilike ${`%${filter.q}%`}`, ilike(documents.clientPoNumber, `%${filter.q}%`))!)
  return db.select().from(documents).where(and(...where)).orderBy(desc(documents.createdAt)).limit(300)
}

export type DocumentBundle = NonNullable<Awaited<ReturnType<typeof getDocument>>>

export async function getDocument(id: string) {
  const db = getDb()
  const [doc] = await db.select().from(documents).where(and(eq(documents.id, id), isNull(documents.deletedAt))).limit(1)
  return doc ? bundle(doc) : null
}

export async function getDocumentByToken(token: string) {
  const db = getDb()
  const [doc] = await db.select().from(documents).where(and(eq(documents.shareToken, token), isNull(documents.deletedAt))).limit(1)
  if (!doc || doc.status === 'draft') return null
  return bundle(doc)
}

async function bundle(doc: DocumentRow) {
  const db = getDb()
  const relatedIds = [doc.sourceDocumentId, doc.convertedToId].filter(Boolean) as string[]
  const children = await db.select().from(documents).where(and(eq(documents.sourceDocumentId, doc.id), isNull(documents.deletedAt))).orderBy(asc(documents.createdAt))
  const linked = relatedIds.length ? await db.select().from(documents).where(inArray(documents.id, relatedIds)) : []
  const invoiceId = doc.type === 'invoice' ? doc.id : doc.type === 'receipt' || doc.type === 'credit_note' ? doc.sourceDocumentId : null
  const docPayments = invoiceId
    ? await db.select().from(payments).where(and(eq(payments.documentId, invoiceId), isNull(payments.deletedAt))).orderBy(asc(payments.paidAt), asc(payments.createdAt))
    : []
  const settle = doc.type === 'invoice' ? await invoiceSettlement(doc.id) : { paid: 0, credited: 0 }
  return { doc, source: linked.find((d) => d.id === doc.sourceDocumentId) ?? null, children, payments: docPayments, settle, settings: await getSettings() }
}

export async function dashboardStats() {
  const db = getDb()
  const open = await db
    .select({ type: documents.type, status: documents.status, n: sql<number>`count(*)::int`, total: sql<number>`coalesce(sum(${documents.total}),0)::int` })
    .from(documents)
    .where(isNull(documents.deletedAt))
    .groupBy(documents.type, documents.status)
  const balances = await clientBalances()
  const outstanding = [...balances.values()].reduce((a, b) => a + b, 0)
  const monthStart = new Date().toISOString().slice(0, 8) + '01'
  const [{ received }] = await db
    .select({ received: sql<number>`coalesce(sum(${payments.amount}),0)::int` })
    .from(payments)
    .where(and(isNull(payments.deletedAt), sql`${payments.paidAt} >= ${monthStart}`))
  const recent = await db.select().from(documents).where(isNull(documents.deletedAt)).orderBy(desc(documents.updatedAt)).limit(8)
  const count = (t: DocType, s: DocStatus[]) => open.filter((r) => r.type === t && s.includes(r.status)).reduce((a, r) => a + r.n, 0)
  return {
    openQuotes: count('quotation', ['draft', 'sent']),
    unpaidInvoices: count('invoice', ['sent', 'partially_paid']),
    pendingDeliveries: count('delivery_note', ['draft', 'sent']),
    outstanding,
    receivedThisMonth: received,
    recent,
  }
}
