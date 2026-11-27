import type { Metadata } from 'next'
import Link from 'next/link'
import { FilePlus2, Search } from 'lucide-react'
import { listDocuments } from '@/lib/admin/data'
import { DOC_META, DOC_TYPES, STATUS_LABELS, type DocStatus, type DocType } from '@/lib/admin/documents'
import { PageHeader, StatusBadge, Money, Empty, LinkButton, formatDate } from '@/components/admin/ui'
import { OutboxList } from '@/components/admin/offline/OfflineKit'

export const metadata: Metadata = { title: 'Documents' }

export default async function DocumentsPage({ searchParams }: { searchParams: Promise<{ type?: string; status?: string; q?: string }> }) {
  const sp = await searchParams
  const type = (DOC_TYPES as string[]).includes(sp.type ?? '') ? (sp.type as DocType) : undefined
  const status = sp.status && sp.status in STATUS_LABELS ? (sp.status as DocStatus) : undefined
  const docs = await listDocuments({ type, status, q: sp.q?.trim() || undefined })
  const tabs: { key?: DocType; label: string }[] = [{ label: 'All' }, ...DOC_TYPES.map((t) => ({ key: t, label: DOC_META[t].plural }))]
  const newType = type && DOC_META[type].creatable ? type : 'quotation'

  return (
    <>
      <PageHeader code="DOC-00" title="Documents" lead="Quotations, proformas, invoices, receipts, delivery notes and credit notes."
        actions={<LinkButton href={`/admin/documents/new?type=${newType}`} variant="copper"><FilePlus2 size={15} aria-hidden /> New {DOC_META[newType].title.toLowerCase()}</LinkButton>} />

      <OutboxList />

      <nav aria-label="Document types" className="flex gap-1 overflow-x-auto pb-2 mb-4 border-b" style={{ borderColor: 'var(--ax-line)' }}>
        {tabs.map((t) => {
          const on = t.key === type
          const href = t.key ? `/admin/documents?type=${t.key}` : '/admin/documents'
          return (
            <Link key={t.label} href={href} aria-current={on ? 'page' : undefined} className="px-3 py-2 text-[13px] whitespace-nowrap border-b-2 -mb-[10px]"
              style={{ borderColor: on ? 'var(--ax-copper)' : 'transparent', color: on ? '#fff' : 'var(--ax-dim)' }}>{t.label}</Link>
          )
        })}
      </nav>

      <form className="mb-5 flex flex-wrap gap-2" role="search">
        {type && <input type="hidden" name="type" value={type} />}
        <label htmlFor="q" className="sr-only">Search</label>
        <input id="q" name="q" defaultValue={sp.q} placeholder="Number, client or PO" className="ax-field max-w-xs" />
        <label htmlFor="status" className="sr-only">Status</label>
        <select id="status" name="status" defaultValue={status ?? ''} className="ax-field max-w-[180px]">
          <option value="">Any status</option>
          {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <button className="ax-btn ax-btn-ghost !min-h-[46px] !px-4" aria-label="Apply filters"><Search size={16} aria-hidden /></button>
      </form>

      {docs.length === 0 ? (
        <Empty action={<LinkButton href={`/admin/documents/new?type=${newType}`} variant="copper">Create one</LinkButton>}>No documents found.</Empty>
      ) : (
        <div className="ax-panel overflow-x-auto">
          <table className="w-full text-[14px] min-w-[720px]">
            <thead>
              <tr className="text-left border-b" style={{ borderColor: 'var(--ax-line)' }}>
                {['Number', 'Type', 'Client', 'Date', 'Amount', 'Status'].map((h) => (
                  <th key={h} scope="col" className={`ax-spec text-[10px] font-medium px-4 py-3 ${h === 'Amount' ? 'text-right' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {docs.map((d) => (
                <tr key={d.id} className="border-b hover:bg-[color:var(--ax-hover)]" style={{ borderColor: 'var(--ax-line)' }}>
                  <td className="px-4 py-3"><Link href={`/admin/documents/${d.id}`} className="text-white font-mono text-[13px] hover:underline underline-offset-4">{d.number}</Link></td>
                  <td className="px-4 py-3 ax-spec text-[10px]">{DOC_META[d.type].title}</td>
                  <td className="px-4 py-3 max-w-[260px] truncate">{d.clientSnapshot.name}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--ax-dim)' }}>{formatDate(d.issueDate)}</td>
                  <td className="px-4 py-3 text-right">{DOC_META[d.type].showPrices ? <Money ngwee={d.total} /> : '—'}</td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
