import type { Metadata } from 'next'
import { and, asc, isNull } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { clients, sites } from '@/db/schema'
import { getSettings } from '@/lib/admin/data'
import { DOC_META, addDays, defaultTerms, todayInLusaka } from '@/lib/admin/documents'
import { DocumentEditor } from '@/components/admin/DocumentEditor'
import { PageHeader } from '@/components/admin/ui'

export const metadata: Metadata = { title: 'New document' }

const TYPES = ['quotation', 'proforma', 'invoice', 'delivery_note'] as const
type T = (typeof TYPES)[number]

export default async function NewDocument({ searchParams }: { searchParams: Promise<{ type?: string; clientId?: string }> }) {
  const sp = await searchParams
  const type: T = (TYPES as readonly string[]).includes(sp.type ?? '') ? (sp.type as T) : 'quotation'
  const meta = DOC_META[type]
  const db = getDb()
  const [clientRows, siteRows, s] = await Promise.all([
    db.select({ id: clients.id, name: clients.name }).from(clients).where(isNull(clients.deletedAt)).orderBy(asc(clients.name)),
    db.select({ id: sites.id, clientId: sites.clientId, name: sites.name }).from(sites).where(and(isNull(sites.deletedAt))).orderBy(asc(sites.name)),
    getSettings(),
  ])
  const today = todayInLusaka()
  const second = meta.secondDate === 'validUntil' ? addDays(today, s?.quoteValidityDays ?? 30) : meta.secondDate === 'dueDate' ? addDays(today, s?.invoiceDueDays ?? 30) : null

  return (
    <>
      <PageHeader code={`${meta.series}-NEW`} title={`New ${meta.title.toLowerCase()}`} lead="A number is assigned when you save. It stays a draft until you issue it." />
      <DocumentEditor
        clients={clientRows}
        sites={siteRows}
        taxMode={s?.taxMode ?? 'TOT'}
        init={{
          type,
          clientId: clientRows.some((c) => c.id === sp.clientId) ? sp.clientId! : '',
          siteId: null,
          issueDate: today,
          secondDate: second,
          clientPoNumber: null,
          items: [],
          discount: 0,
          notes: null,
          terms: defaultTerms(type, s),
        }}
      />
    </>
  )
}
