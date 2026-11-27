import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getClient, getSettings } from '@/lib/admin/data'
import { buildStatement } from '@/lib/admin/statement'
import { businessFrom } from '@/lib/admin/doc-view'
import { todayInLusaka, addDays } from '@/lib/admin/documents'
import { PageHeader, Money, Empty, formatDate } from '@/components/admin/ui'
import { StatementDownload } from './StatementDownload'

export const metadata: Metadata = { title: 'Statement' }

const isDate = (v?: string) => !!v && /^\d{4}-\d{2}-\d{2}$/.test(v)

export default async function StatementPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ from?: string; to?: string }> }) {
  const { id } = await params
  const sp = await searchParams
  const data = await getClient(id).catch(() => null)
  if (!data) notFound()
  const to = isDate(sp.to) ? sp.to! : todayInLusaka()
  const from = isDate(sp.from) ? sp.from! : addDays(to, -90)
  const st = await buildStatement(id, from, to)
  const settings = await getSettings()
  const c = data.client
  const view = {
    business: businessFrom(settings),
    client: { name: c.name, contactPerson: c.contactPerson, phone: c.phone, email: c.email, address: c.address, tpin: c.tpin },
    ...st,
  }

  return (
    <>
      <PageHeader code="ST · Statement of account" title={c.name} lead={`${formatDate(from)} – ${formatDate(to)}`} actions={<StatementDownload view={view} />} />
      <form className="mb-5 flex flex-wrap items-end gap-3">
        <div><label htmlFor="from" className="ax-label">From</label><input id="from" name="from" type="date" defaultValue={from} className="ax-field" /></div>
        <div><label htmlFor="to" className="ax-label">To</label><input id="to" name="to" type="date" defaultValue={to} className="ax-field" /></div>
        <button className="ax-btn ax-btn-ghost !min-h-[46px]">Update</button>
        <Link href={`/admin/clients/${id}`} className="ax-btn ax-btn-ghost !min-h-[46px]">Back to client</Link>
      </form>

      <div className="ax-panel overflow-x-auto">
        <table className="w-full text-[14px] min-w-[720px]">
          <thead>
            <tr className="text-left border-b" style={{ borderColor: 'var(--ax-line)' }}>
              {['Date', 'Reference', 'Description', 'Debit', 'Credit', 'Balance'].map((h, i) => (
                <th key={h} scope="col" className={`ax-spec text-[10px] font-medium px-4 py-3 ${i >= 3 ? 'text-right' : ''}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b" style={{ borderColor: 'var(--ax-line)' }}>
              <td className="px-4 py-3" colSpan={5}><span className="text-white">Opening balance</span></td>
              <td className="px-4 py-3 text-right"><Money ngwee={st.opening} strong /></td>
            </tr>
            {st.lines.map((l, i) => (
              <tr key={i} className="border-b" style={{ borderColor: 'var(--ax-line)' }}>
                <td className="px-4 py-3" style={{ color: 'var(--ax-dim)' }}>{formatDate(l.date)}</td>
                <td className="px-4 py-3 font-mono text-[13px] text-white">{l.ref}</td>
                <td className="px-4 py-3">{l.description}</td>
                <td className="px-4 py-3 text-right">{l.debit ? <Money ngwee={l.debit} /> : ''}</td>
                <td className="px-4 py-3 text-right">{l.credit ? <Money ngwee={l.credit} /> : ''}</td>
                <td className="px-4 py-3 text-right"><Money ngwee={l.balance} /></td>
              </tr>
            ))}
            <tr>
              <td className="px-4 py-4 text-white font-semibold" colSpan={5}>Amount due</td>
              <td className="px-4 py-4 text-right text-lg"><span style={{ color: 'var(--ax-copper)' }}><Money ngwee={st.closing} strong /></span></td>
            </tr>
          </tbody>
        </table>
      </div>
      {st.lines.length === 0 && <div className="mt-4"><Empty>No invoices, payments or credits in this period.</Empty></div>}
    </>
  )
}
