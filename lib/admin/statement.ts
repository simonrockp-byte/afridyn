import 'server-only'
import { and, asc, eq, inArray, isNull, ne } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { documents, payments } from '@/db/schema'
import { paymentMethodLabel } from './documents'

export type StatementLine = { date: string; ref: string; description: string; debit: number; credit: number; balance: number }
export type Statement = { from: string; to: string; opening: number; lines: StatementLine[]; closing: number; totalDebit: number; totalCredit: number }

/**
 * Client statement: issued invoices are debits; payments and issued credit
 * notes are credits. Void documents and their payments are excluded.
 */
export async function buildStatement(clientId: string, from: string, to: string): Promise<Statement> {
  const db = getDb()
  const invs = await db
    .select()
    .from(documents)
    .where(and(eq(documents.clientId, clientId), eq(documents.type, 'invoice'), isNull(documents.deletedAt), ne(documents.status, 'draft'), ne(documents.status, 'void')))
    .orderBy(asc(documents.issueDate))
  const invIds = invs.map((i) => i.id)
  const invNumber = new Map(invs.map((i) => [i.id, i.number]))
  const pays = invIds.length
    ? await db.select().from(payments).where(and(inArray(payments.documentId, invIds), isNull(payments.deletedAt))).orderBy(asc(payments.paidAt))
    : []
  const credits = await db
    .select()
    .from(documents)
    .where(and(eq(documents.clientId, clientId), eq(documents.type, 'credit_note'), eq(documents.status, 'sent'), isNull(documents.deletedAt)))

  type Ev = { date: string; order: number; ref: string; description: string; debit: number; credit: number }
  const events: Ev[] = [
    ...invs.map((i) => ({ date: i.issueDate, order: 0, ref: i.number, description: `Invoice${i.clientPoNumber ? ` · PO ${i.clientPoNumber}` : ''}`, debit: i.total, credit: 0 })),
    ...pays.map((p) => ({ date: p.paidAt, order: 1, ref: invNumber.get(p.documentId) ?? '', description: `Payment · ${paymentMethodLabel(p.method)}${p.reference ? ` · ${p.reference}` : ''}`, debit: 0, credit: p.amount })),
    ...credits.map((c) => ({ date: c.issueDate, order: 2, ref: c.number, description: `Credit note${c.sourceDocumentId && invNumber.get(c.sourceDocumentId) ? ` · ${invNumber.get(c.sourceDocumentId)}` : ''}`, debit: 0, credit: c.total })),
  ].sort((a, b) => a.date.localeCompare(b.date) || a.order - b.order)

  let opening = 0
  for (const e of events) if (e.date < from) opening += e.debit - e.credit
  let running = opening
  const lines: StatementLine[] = []
  let totalDebit = 0
  let totalCredit = 0
  for (const e of events) {
    if (e.date < from || e.date > to) continue
    running += e.debit - e.credit
    totalDebit += e.debit
    totalCredit += e.credit
    lines.push({ date: e.date, ref: e.ref, description: e.description, debit: e.debit, credit: e.credit, balance: running })
  }
  return { from, to, opening, lines, closing: running, totalDebit, totalCredit }
}
