import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDocument } from '@/lib/admin/data'
import { DOC_META, invoiceBalance, paymentMethodLabel } from '@/lib/admin/documents'
import { buildDocView } from '@/lib/admin/doc-view'
import { SITE_URL } from '@/lib/site'
import { DocPaper } from '@/components/admin/DocPaper'
import { DocumentActions } from '@/components/admin/DocumentActions'
import { PageHeader, Panel, StatusBadge, Money, formatDate } from '@/components/admin/ui'

export const metadata: Metadata = { title: 'Document' }

export default async function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const b = await getDocument(id).catch(() => null)
  if (!b) notFound()
  const { doc, source, children, payments, settle, settings } = b
  const meta = DOC_META[doc.type]
  const view = buildDocView({ doc, settings, payments, source, settle })
  const balance = doc.type === 'invoice' ? invoiceBalance(doc.total, settle.paid, settle.credited, doc.status) : doc.total
  const related = [...(source ? [source] : []), ...children]

  return (
    <>
      <PageHeader
        code={`${meta.title} · ${doc.number}`}
        title={doc.clientSnapshot.name}
        lead={`${meta.title} dated ${formatDate(doc.issueDate)}${doc.siteSnapshot ? ` · ${doc.siteSnapshot.name}` : ''}`}
        actions={<StatusBadge status={doc.status} />}
      />
      {doc.status === 'void' && doc.voidReason && (
        <p className="mb-4 px-4 py-3 border text-[14px]" style={{ borderColor: 'var(--ax-danger)', color: 'var(--ax-danger)' }}>Voided: {doc.voidReason}</p>
      )}

      <div className="grid xl:grid-cols-[minmax(0,1fr)_320px] gap-5 items-start">
        <div className="space-y-4 min-w-0">
          <DocPaper view={view} />

          {(related.length > 0 || payments.length > 0) && (
            <div className="grid md:grid-cols-2 gap-4">
              {related.length > 0 && (
                <Panel title="Linked documents">
                  <ul className="space-y-2 text-[14px]">
                    {related.map((r) => (
                      <li key={r.id} className="flex items-center justify-between gap-3">
                        <Link href={`/admin/documents/${r.id}`} className="text-white hover:underline underline-offset-4 font-mono text-[13px]">{r.number}</Link>
                        <span className="ax-spec text-[10px] flex-1">{DOC_META[r.type].title}</span>
                        <StatusBadge status={r.status} />
                      </li>
                    ))}
                  </ul>
                </Panel>
              )}
              {payments.length > 0 && (
                <Panel title="Payments">
                  <ul className="space-y-2 text-[14px]">
                    {payments.map((p) => (
                      <li key={p.id} className="flex justify-between gap-3">
                        <span style={{ color: 'var(--ax-dim)' }}>{formatDate(p.paidAt)} · {paymentMethodLabel(p.method)}{p.paidBy ? ` · ${p.paidBy}` : ''}</span>
                        <Money ngwee={p.amount} strong />
                      </li>
                    ))}
                  </ul>
                </Panel>
              )}
            </div>
          )}
        </div>

        <div className="xl:sticky xl:top-6">
          <DocumentActions
            id={doc.id}
            type={doc.type}
            status={doc.status}
            number={doc.number}
            balance={balance}
            clientName={doc.clientSnapshot.name}
            clientPhone={doc.clientSnapshot.phone ?? null}
            shareUrl={`${SITE_URL}/d/${doc.shareToken}`}
            view={view}
          />
          <p className="mt-3 text-[12.5px]"><Link href={`/admin/clients/${doc.clientId}`} className="hover:text-white underline underline-offset-4" style={{ color: 'var(--ax-dim)' }}>Open client →</Link></p>
        </div>
      </div>
    </>
  )
}
