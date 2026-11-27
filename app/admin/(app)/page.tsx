import type { Metadata } from 'next'
import Link from 'next/link'
import { FilePlus2, UserPlus, Truck, Receipt } from 'lucide-react'
import { dashboardStats } from '@/lib/admin/data'
import { DOC_META } from '@/lib/admin/documents'
import { PageHeader, Panel, StatusBadge, Money, Empty, LinkButton, formatDate } from '@/components/admin/ui'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function Dashboard() {
  const s = await dashboardStats()
  const tiles = [
    { label: 'Outstanding (unpaid invoices)', value: <Money ngwee={s.outstanding} strong />, href: '/admin/documents?type=invoice' },
    { label: 'Received this month', value: <Money ngwee={s.receivedThisMonth} strong />, href: '/admin/documents?type=receipt' },
    { label: 'Open quotations', value: <span className="text-white font-semibold">{s.openQuotes}</span>, href: '/admin/documents?type=quotation' },
    { label: 'Deliveries pending', value: <span className="text-white font-semibold">{s.pendingDeliveries}</span>, href: '/admin/documents?type=delivery_note' },
  ]
  return (
    <>
      <PageHeader
        code="ADM-01 · Dashboard"
        title="Overview"
        actions={
          <>
            <LinkButton href="/admin/documents/new?type=quotation" variant="copper"><FilePlus2 size={15} aria-hidden /> New quotation</LinkButton>
            <LinkButton href="/admin/documents/new?type=invoice"><Receipt size={15} aria-hidden /> New invoice</LinkButton>
            <LinkButton href="/admin/documents/new?type=delivery_note"><Truck size={15} aria-hidden /> Delivery note</LinkButton>
            <LinkButton href="/admin/clients/new"><UserPlus size={15} aria-hidden /> New client</LinkButton>
          </>
        }
      />

      <ul className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-8">
        {tiles.map((t) => (
          <li key={t.label}>
            <Link href={t.href} className="ax-panel block p-5 hover:bg-[#111821] transition-colors">
              <p className="ax-spec text-[10px]">{t.label}</p>
              <p className="mt-2 text-xl md:text-2xl font-display">{t.value}</p>
            </Link>
          </li>
        ))}
      </ul>

      <Panel title="Recent activity" actions={<Link href="/admin/documents" className="ax-spec text-[10px] hover:text-white">All documents →</Link>}>
        {s.recent.length === 0 ? (
          <Empty action={<LinkButton href="/admin/clients/new" variant="copper">Add your first client</LinkButton>}>
            No documents yet. Start by adding a client, then create a quotation for them.
          </Empty>
        ) : (
          <ul className="divide-y" style={{ borderColor: 'var(--ax-line)' }}>
            {s.recent.map((d) => (
              <li key={d.id} className="border-[color:var(--ax-line)]">
                <Link href={`/admin/documents/${d.id}`} className="flex items-center gap-4 py-3 hover:bg-white/[0.02]">
                  <span className="font-mono text-[12px] text-white w-[150px] shrink-0">{d.number}</span>
                  <span className="hidden sm:block ax-spec text-[10px] w-[120px] shrink-0">{DOC_META[d.type].title}</span>
                  <span className="flex-1 min-w-0 truncate text-[14px]">{d.clientSnapshot.name}</span>
                  <span className="hidden md:block text-[13px] w-[100px]" style={{ color: 'var(--ax-dim)' }}>{formatDate(d.issueDate)}</span>
                  <span className="hidden sm:block w-[120px] text-right text-[14px]">{DOC_META[d.type].showPrices ? <Money ngwee={d.total} /> : '—'}</span>
                  <StatusBadge status={d.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </>
  )
}
