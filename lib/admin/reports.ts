import 'server-only'
import { and, eq, gte, inArray, isNull, lte, ne } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { documents, payments } from '@/db/schema'
import { invoiceBalance, todayInLusaka } from './documents'

export type MonthRow = { month: string; invoiced: number; credited: number; netInvoiced: number; received: number; invoiceCount: number }

/**
 * Per month of `year`:
 *  - invoiced: issued (non-draft, non-void) invoices by issue date
 *  - credited: issued credit notes by issue date
 *  - received: payments by date paid (payments on void invoices excluded)
 */
export async function monthlyReport(year: number): Promise<{ rows: MonthRow[]; totals: Omit<MonthRow, 'month'> }> {
  const db = getDb()
  const from = `${year}-01-01`
  const to = `${year}-12-31`
  const docs = await db
    .select({ type: documents.type, issueDate: documents.issueDate, total: documents.total })
    .from(documents)
    .where(and(inArray(documents.type, ['invoice', 'credit_note']), isNull(documents.deletedAt), ne(documents.status, 'draft'), ne(documents.status, 'void'), gte(documents.issueDate, from), lte(documents.issueDate, to)))
  const voidInvoices = await db.select({ id: documents.id }).from(documents).where(and(eq(documents.type, 'invoice'), eq(documents.status, 'void')))
  const voidIds = new Set(voidInvoices.map((v) => v.id))
  const pays = await db
    .select({ documentId: payments.documentId, paidAt: payments.paidAt, amount: payments.amount })
    .from(payments)
    .where(and(isNull(payments.deletedAt), gte(payments.paidAt, from), lte(payments.paidAt, to)))

  const rows: MonthRow[] = Array.from({ length: 12 }, (_, i) => ({ month: `${year}-${String(i + 1).padStart(2, '0')}`, invoiced: 0, credited: 0, netInvoiced: 0, received: 0, invoiceCount: 0 }))
  for (const d of docs) {
    const r = rows[Number(d.issueDate.slice(5, 7)) - 1]
    if (d.type === 'invoice') { r.invoiced += d.total; r.invoiceCount += 1 } else r.credited += d.total
  }
  for (const p of pays) {
    if (voidIds.has(p.documentId)) continue
    rows[Number(p.paidAt.slice(5, 7)) - 1].received += p.amount
  }
  rows.forEach((r) => (r.netInvoiced = r.invoiced - r.credited))
  const totals = rows.reduce(
    (t, r) => ({ invoiced: t.invoiced + r.invoiced, credited: t.credited + r.credited, netInvoiced: t.netInvoiced + r.netInvoiced, received: t.received + r.received, invoiceCount: t.invoiceCount + r.invoiceCount }),
    { invoiced: 0, credited: 0, netInvoiced: 0, received: 0, invoiceCount: 0 },
  )
  return { rows, totals }
}

export const AGING_BUCKETS = ['Not yet due', '1–30 days', '31–60 days', '61–90 days', '90+ days'] as const
export type AgingRow = { clientId: string; clientName: string; buckets: number[]; total: number; invoices: { id: string; number: string; dueDate: string | null; balance: number; daysOverdue: number }[] }

/** Unpaid invoice balances by client, bucketed by days past the due date (as of today, Lusaka time). */
export async function agingReport(): Promise<{ rows: AgingRow[]; totals: number[]; grand: number; asOf: string }> {
  const db = getDb()
  const asOf = todayInLusaka()
  const invs = await db
    .select()
    .from(documents)
    .where(and(eq(documents.type, 'invoice'), isNull(documents.deletedAt), inArray(documents.status, ['sent', 'partially_paid'])))
  const ids = invs.map((i) => i.id)
  const paid = new Map<string, number>()
  const credited = new Map<string, number>()
  if (ids.length) {
    for (const p of await db.select({ documentId: payments.documentId, amount: payments.amount }).from(payments).where(and(inArray(payments.documentId, ids), isNull(payments.deletedAt))))
      paid.set(p.documentId, (paid.get(p.documentId) ?? 0) + p.amount)
    for (const c of await db.select({ src: documents.sourceDocumentId, total: documents.total }).from(documents).where(and(eq(documents.type, 'credit_note'), eq(documents.status, 'sent'), inArray(documents.sourceDocumentId, ids), isNull(documents.deletedAt))))
      if (c.src) credited.set(c.src, (credited.get(c.src) ?? 0) + c.total)
  }
  const byClient = new Map<string, AgingRow>()
  const day = (iso: string) => Date.parse(`${iso}T00:00:00Z`) / 86_400_000
  for (const inv of invs) {
    const balance = invoiceBalance(inv.total, paid.get(inv.id) ?? 0, credited.get(inv.id) ?? 0, inv.status)
    if (balance <= 0) continue
    const due = inv.dueDate ?? inv.issueDate
    const overdue = Math.floor(day(asOf) - day(due))
    const bucket = overdue <= 0 ? 0 : overdue <= 30 ? 1 : overdue <= 60 ? 2 : overdue <= 90 ? 3 : 4
    const row = byClient.get(inv.clientId) ?? { clientId: inv.clientId, clientName: inv.clientSnapshot.name, buckets: [0, 0, 0, 0, 0], total: 0, invoices: [] }
    row.buckets[bucket] += balance
    row.total += balance
    row.invoices.push({ id: inv.id, number: inv.number, dueDate: inv.dueDate, balance, daysOverdue: Math.max(0, overdue) })
    byClient.set(inv.clientId, row)
  }
  const rows = [...byClient.values()].sort((a, b) => b.total - a.total)
  const totals = [0, 1, 2, 3, 4].map((i) => rows.reduce((s, r) => s + r.buckets[i], 0))
  return { rows, totals, grand: totals.reduce((a, b) => a + b, 0), asOf }
}

/** Clients ranked by net invoiced (invoices − credit notes) in `year`. */
export async function topClients(year: number, limit = 10) {
  const db = getDb()
  const docs = await db
    .select({ clientId: documents.clientId, name: documents.clientSnapshot, type: documents.type, total: documents.total })
    .from(documents)
    .where(and(inArray(documents.type, ['invoice', 'credit_note']), isNull(documents.deletedAt), ne(documents.status, 'draft'), ne(documents.status, 'void'), gte(documents.issueDate, `${year}-01-01`), lte(documents.issueDate, `${year}-12-31`)))
  const m = new Map<string, { clientId: string; name: string; amount: number; invoices: number }>()
  for (const d of docs) {
    const r = m.get(d.clientId) ?? { clientId: d.clientId, name: d.name.name, amount: 0, invoices: 0 }
    if (d.type === 'invoice') { r.amount += d.total; r.invoices += 1 } else r.amount -= d.total
    m.set(d.clientId, r)
  }
  return [...m.values()].sort((a, b) => b.amount - a.amount).slice(0, limit)
}
