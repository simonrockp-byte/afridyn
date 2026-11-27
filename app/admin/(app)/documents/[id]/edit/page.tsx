import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { asc, isNull } from 'drizzle-orm'
import { getDb } from '@/db/client'
import { clients, sites } from '@/db/schema'
import { getDocument } from '@/lib/admin/data'
import { DOC_META } from '@/lib/admin/documents'
import { DocumentEditor } from '@/components/admin/DocumentEditor'
import { PageHeader } from '@/components/admin/ui'
import { CreditReasonForm } from '@/components/admin/DocumentActions'

export const metadata: Metadata = { title: 'Edit document' }

export default async function EditDocument({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const b = await getDocument(id).catch(() => null)
  if (!b) notFound()
  const { doc } = b
  if (doc.status !== 'draft') redirect(`/admin/documents/${id}`)
  const meta = DOC_META[doc.type]


  const db = getDb()
  const [clientRows, siteRows] = await Promise.all([
    db.select({ id: clients.id, name: clients.name }).from(clients).where(isNull(clients.deletedAt)).orderBy(asc(clients.name)),
    db.select({ id: sites.id, clientId: sites.clientId, name: sites.name }).from(sites).where(isNull(sites.deletedAt)).orderBy(asc(sites.name)),
  ])
  return (
    <>
      <PageHeader code={doc.number} title={`Edit ${meta.title.toLowerCase()}`} lead={doc.type === 'credit_note' ? 'Keep only the lines (and quantities) you are crediting, then issue it.' : 'Drafts can be changed freely. Once issued, a document is locked.'} />
      {doc.type === 'credit_note' && <div className="mb-4"><CreditReasonForm id={doc.id} reason={doc.creditReason ?? ''} /></div>}
      <DocumentEditor
        clients={clientRows}
        sites={siteRows}
        taxMode={doc.taxMode}
        init={{
          id: doc.id,
          type: doc.type as 'quotation' | 'proforma' | 'invoice' | 'delivery_note' | 'credit_note',
          number: doc.number,
          clientId: doc.clientId,
          siteId: doc.siteId,
          issueDate: doc.issueDate,
          secondDate: meta.secondDate === 'validUntil' ? doc.validUntil : meta.secondDate === 'dueDate' ? doc.dueDate : null,
          clientPoNumber: doc.clientPoNumber,
          items: doc.items,
          discount: doc.discount,
          notes: doc.notes,
          terms: doc.terms,
        }}
      />
    </>
  )
}
