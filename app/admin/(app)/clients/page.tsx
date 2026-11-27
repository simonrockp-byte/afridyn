import type { Metadata } from 'next'
import Link from 'next/link'
import { Search, UserPlus } from 'lucide-react'
import { listClients } from '@/lib/admin/data'
import { PageHeader, Money, Empty, LinkButton } from '@/components/admin/ui'

export const metadata: Metadata = { title: 'Clients' }

export default async function ClientsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const rows = await listClients(q?.trim() || undefined)
  return (
    <>
      <PageHeader code="CL-00" title="Clients" lead="Companies and people you quote, invoice and deliver to." actions={<LinkButton href="/admin/clients/new" variant="copper"><UserPlus size={15} aria-hidden /> New client</LinkButton>} />
      <form className="mb-5 flex gap-2 max-w-lg" role="search">
        <label htmlFor="q" className="sr-only">Search clients</label>
        <input id="q" name="q" defaultValue={q} placeholder="Search name, contact, phone or email" className="ax-field" />
        <button className="ax-btn ax-btn-ghost !min-h-[46px] !px-4" aria-label="Search"><Search size={16} aria-hidden /></button>
      </form>
      {rows.length === 0 ? (
        <Empty action={<LinkButton href="/admin/clients/new" variant="copper">Add a client</LinkButton>}>{q ? 'No clients match that search.' : 'No clients yet.'}</Empty>
      ) : (
        <div className="ax-panel overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="text-left border-b" style={{ borderColor: 'var(--ax-line)' }}>
                {['Client', 'Contact', 'Phone', 'TPIN', 'Balance'].map((h) => (
                  <th key={h} scope="col" className={`ax-spec text-[10px] font-medium px-4 py-3 ${h === 'Balance' ? 'text-right' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="border-b hover:bg-[color:var(--ax-hover)]" style={{ borderColor: 'var(--ax-line)' }}>
                  <td className="px-4 py-3"><Link href={`/admin/clients/${c.id}`} className="text-white hover:underline underline-offset-4">{c.name}</Link></td>
                  <td className="px-4 py-3" style={{ color: 'var(--ax-dim)' }}>{c.contactPerson ?? '—'}</td>
                  <td className="px-4 py-3 font-mono text-[13px]" style={{ color: 'var(--ax-dim)' }}>{c.phone ?? '—'}</td>
                  <td className="px-4 py-3 font-mono text-[13px]" style={{ color: 'var(--ax-dim)' }}>{c.tpin ?? '—'}</td>
                  <td className="px-4 py-3 text-right">{c.balance ? <Money ngwee={c.balance} strong /> : <span style={{ color: 'var(--ax-faint)' }}>—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
