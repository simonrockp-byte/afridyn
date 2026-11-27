import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FilePlus2, Pencil, ScrollText, MapPin } from 'lucide-react'
import { getClient } from '@/lib/admin/data'
import { saveSite } from '@/lib/admin/actions'
import { DOC_META } from '@/lib/admin/documents'
import { PageHeader, Panel, Money, StatusBadge, Empty, LinkButton, Field, formatDate } from '@/components/admin/ui'
import { SubmitButton } from '@/components/admin/SubmitButton'

export const metadata: Metadata = { title: 'Client' }

export default async function ClientDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getClient(id).catch(() => null)
  if (!data) notFound()
  const { client, sites, documents, balance } = data
  const info = [
    ['Contact', client.contactPerson],
    ['Phone', client.phone],
    ['WhatsApp', client.whatsapp],
    ['Email', client.email],
    ['TPIN', client.tpin],
    ['Address', client.address],
  ].filter(([, v]) => v) as [string, string][]

  return (
    <>
      <PageHeader
        code={`CL · ${client.type}`}
        title={client.name}
        actions={
          <>
            <LinkButton href={`/admin/documents/new?type=quotation&clientId=${client.id}`} variant="copper"><FilePlus2 size={15} aria-hidden /> Quotation</LinkButton>
            <LinkButton href={`/admin/documents/new?type=invoice&clientId=${client.id}`}>Invoice</LinkButton>
            <LinkButton href={`/admin/documents/new?type=delivery_note&clientId=${client.id}`}>Delivery note</LinkButton>
            <LinkButton href={`/admin/clients/${client.id}/statement`}><ScrollText size={15} aria-hidden /> Statement</LinkButton>
            <LinkButton href={`/admin/clients/${client.id}/edit`}><Pencil size={15} aria-hidden /> Edit</LinkButton>
          </>
        }
      />

      <div className="grid xl:grid-cols-[1fr_2fr] gap-4">
        <div className="space-y-4">
          <Panel title="Details">
            <dl className="space-y-2.5 text-[14px]">
              {info.length ? info.map(([k, v]) => (
                <div key={k} className="flex gap-3"><dt className="ax-spec text-[10px] w-20 shrink-0 pt-1">{k}</dt><dd className="text-white break-words min-w-0">{v}</dd></div>
              )) : <p style={{ color: 'var(--ax-dim)' }}>No contact details yet.</p>}
            </dl>
            {client.notes && <p className="mt-4 text-[14px] whitespace-pre-line" style={{ color: 'var(--ax-dim)' }}>{client.notes}</p>}
          </Panel>
          <Panel title="Balance owed">
            <p className="text-3xl font-display"><Money ngwee={balance} strong /></p>
            <p className="mt-1 text-[13px]" style={{ color: 'var(--ax-dim)' }}>Across issued invoices, after payments and credit notes.</p>
          </Panel>
          <Panel title={`Sites (${sites.length})`}>
            {sites.length > 0 && (
              <ul className="space-y-3 mb-5">
                {sites.map((s) => (
                  <li key={s.id} className="flex gap-3">
                    <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--ax-copper)' }} aria-hidden />
                    <div className="text-[14px]">
                      <p className="text-white">{s.name}</p>
                      <p style={{ color: 'var(--ax-dim)' }}>{[s.location, s.contactPerson, s.phone].filter(Boolean).join(' · ') || '—'}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <details className="group">
              <summary className="ax-spec text-[10px] cursor-pointer hover:text-white" style={{ color: 'var(--ax-copper)' }}>+ Add a site (mine, plant, office)</summary>
              <form action={saveSite} className="mt-4 space-y-4">
                <input type="hidden" name="clientId" value={client.id} />
                <Field label="Site name" name="name" required placeholder="e.g. Nchanga Open Pit" />
                <Field label="Location" name="location" placeholder="e.g. Chingola, Copperbelt" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Site contact" name="contactPerson" />
                  <Field label="Site phone" name="phone" type="tel" />
                </div>
                <SubmitButton>Add site</SubmitButton>
              </form>
            </details>
          </Panel>
        </div>

        <Panel title={`Documents (${documents.length})`}>
          {documents.length === 0 ? (
            <Empty action={<LinkButton href={`/admin/documents/new?type=quotation&clientId=${client.id}`} variant="copper">Create a quotation</LinkButton>}>No documents for this client yet.</Empty>
          ) : (
            <ul>
              {documents.map((d) => (
                <li key={d.id} className="border-b last:border-b-0" style={{ borderColor: 'var(--ax-line)' }}>
                  <Link href={`/admin/documents/${d.id}`} className="flex items-center gap-3 py-3 hover:bg-[color:var(--ax-hover)]">
                    <span className="font-mono text-[12px] text-white w-[140px] shrink-0">{d.number}</span>
                    <span className="hidden sm:block ax-spec text-[10px] flex-1">{DOC_META[d.type].title}</span>
                    <span className="hidden md:block text-[13px] w-[96px]" style={{ color: 'var(--ax-dim)' }}>{formatDate(d.issueDate)}</span>
                    <span className="w-[110px] text-right text-[14px]">{DOC_META[d.type].showPrices ? <Money ngwee={d.total} /> : '—'}</span>
                    <StatusBadge status={d.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </>
  )
}
