import type { Metadata } from 'next'
import Link from 'next/link'
import { Download } from 'lucide-react'
import { AGING_BUCKETS, agingReport, monthlyReport, topClients } from '@/lib/admin/reports'
import { PageHeader, Panel, Money, Empty } from '@/components/admin/ui'
import { formatZMW } from '@/lib/admin/money'

export const metadata: Metadata = { title: 'Reports' }

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default async function ReportsPage({ searchParams }: { searchParams: Promise<{ year?: string }> }) {
  const sp = await searchParams
  const thisYear = new Date().getUTCFullYear()
  const year = /^\d{4}$/.test(sp.year ?? '') ? Number(sp.year) : thisYear
  const [monthly, aging, top] = await Promise.all([monthlyReport(year), agingReport(), topClients(year)])
  const max = Math.max(1, ...monthly.rows.map((r) => Math.max(r.netInvoiced, r.received)))

  return (
    <>
      <PageHeader code="RP-00" title="Reports" lead="Turnover, cash received and unpaid invoices."
        actions={
          <form className="flex gap-2">
            <label htmlFor="year" className="sr-only">Year</label>
            <select id="year" name="year" defaultValue={year} className="ax-field !py-2.5">
              {[thisYear, thisYear - 1, thisYear - 2].map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <button className="ax-btn ax-btn-ghost !min-h-[44px] !px-4">Show</button>
          </form>
        } />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
        {[
          { label: `Invoiced ${year} (net of credits)`, v: monthly.totals.netInvoiced },
          { label: `Received ${year}`, v: monthly.totals.received },
          { label: 'Unpaid now', v: aging.grand },
          { label: 'Overdue now', v: aging.grand - aging.totals[0] },
        ].map((t) => (
          <div key={t.label} className="ax-panel p-5"><p className="ax-spec text-[10px]">{t.label}</p><p className="mt-2 text-xl md:text-2xl font-display"><Money ngwee={t.v} strong /></p></div>
        ))}
      </div>

      <Panel title={`Monthly turnover · ${year}`} actions={<a href={`/admin/reports/export?kind=monthly&year=${year}`} className="ax-spec text-[10px] inline-flex items-center gap-1.5 hover:text-white"><Download size={12} aria-hidden /> CSV</a>}>
        <div className="overflow-x-auto">
          <table className="w-full text-[14px] min-w-[640px]">
            <thead>
              <tr className="text-left border-b" style={{ borderColor: 'var(--ax-line)' }}>
                {['Month', 'Invoices', 'Invoiced', 'Credit notes', 'Net invoiced', 'Received', ''].map((h, i) => (
                  <th key={h + i} scope="col" className={`ax-spec text-[10px] font-medium px-3 py-2.5 ${i >= 1 && i <= 5 ? 'text-right' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthly.rows.map((r, i) => (
                <tr key={r.month} className="border-b" style={{ borderColor: 'var(--ax-line)' }}>
                  <td className="px-3 py-2.5 text-white">{MONTHS[i]}</td>
                  <td className="px-3 py-2.5 text-right" style={{ color: 'var(--ax-dim)' }}>{r.invoiceCount || '—'}</td>
                  <td className="px-3 py-2.5 text-right">{r.invoiced ? formatZMW(r.invoiced) : '—'}</td>
                  <td className="px-3 py-2.5 text-right" style={{ color: 'var(--ax-dim)' }}>{r.credited ? formatZMW(-r.credited) : '—'}</td>
                  <td className="px-3 py-2.5 text-right text-white">{r.netInvoiced ? formatZMW(r.netInvoiced) : '—'}</td>
                  <td className="px-3 py-2.5 text-right text-white">{r.received ? formatZMW(r.received) : '—'}</td>
                  <td className="px-3 py-2.5 w-[160px]" aria-hidden>
                    <div className="h-1.5 mb-1" style={{ width: `${(r.netInvoiced / max) * 100}%`, background: 'var(--ax-copper)' }} />
                    <div className="h-1.5" style={{ width: `${(r.received / max) * 100}%`, background: 'var(--ax-cyan)' }} />
                  </td>
                </tr>
              ))}
              <tr>
                <td className="px-3 py-3 text-white font-semibold">Total</td>
                <td className="px-3 py-3 text-right">{monthly.totals.invoiceCount}</td>
                <td className="px-3 py-3 text-right">{formatZMW(monthly.totals.invoiced)}</td>
                <td className="px-3 py-3 text-right">{formatZMW(-monthly.totals.credited)}</td>
                <td className="px-3 py-3 text-right"><Money ngwee={monthly.totals.netInvoiced} strong /></td>
                <td className="px-3 py-3 text-right"><Money ngwee={monthly.totals.received} strong /></td>
                <td className="px-3 py-3 text-[11px]" style={{ color: 'var(--ax-faint)' }}><span style={{ color: 'var(--ax-copper)' }}>■</span> invoiced <span style={{ color: 'var(--ax-cyan)' }}>■</span> received</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[12.5px]" style={{ color: 'var(--ax-faint)' }}>
          For the ZRA turnover-tax return, confirm with your accountant whether to declare invoiced or received amounts. Drafts and void documents are excluded.
        </p>
      </Panel>

      <div className="grid xl:grid-cols-[2fr_1fr] gap-4 mt-4">
        <Panel title={`Unpaid invoices by age · as of ${aging.asOf}`} actions={<a href="/admin/reports/export?kind=aging" className="ax-spec text-[10px] inline-flex items-center gap-1.5 hover:text-white"><Download size={12} aria-hidden /> CSV</a>}>
          {aging.rows.length === 0 ? <Empty>No unpaid invoices. 🎉</Empty> : (
            <div className="overflow-x-auto">
              <table className="w-full text-[14px] min-w-[640px]">
                <thead>
                  <tr className="text-left border-b" style={{ borderColor: 'var(--ax-line)' }}>
                    <th scope="col" className="ax-spec text-[10px] font-medium px-3 py-2.5">Client</th>
                    {AGING_BUCKETS.map((b) => <th key={b} scope="col" className="ax-spec text-[10px] font-medium px-3 py-2.5 text-right">{b}</th>)}
                    <th scope="col" className="ax-spec text-[10px] font-medium px-3 py-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {aging.rows.map((r) => (
                    <tr key={r.clientId} className="border-b align-top" style={{ borderColor: 'var(--ax-line)' }}>
                      <td className="px-3 py-2.5">
                        <Link href={`/admin/clients/${r.clientId}`} className="text-white hover:underline underline-offset-4">{r.clientName}</Link>
                        <p className="text-[12px] mt-0.5" style={{ color: 'var(--ax-faint)' }}>
                          {r.invoices.map((i) => <Link key={i.id} href={`/admin/documents/${i.id}`} className="mr-2 hover:text-white">{i.number}</Link>)}
                        </p>
                      </td>
                      {r.buckets.map((v, i) => <td key={i} className="px-3 py-2.5 text-right" style={{ color: v ? (i >= 3 ? 'var(--st-void)' : i >= 1 ? 'var(--st-part)' : 'var(--ax-text)') : 'var(--ax-faint)' }}>{v ? formatZMW(v) : '—'}</td>)}
                      <td className="px-3 py-2.5 text-right"><Money ngwee={r.total} strong /></td>
                    </tr>
                  ))}
                  <tr>
                    <td className="px-3 py-3 text-white font-semibold">Total</td>
                    {aging.totals.map((v, i) => <td key={i} className="px-3 py-3 text-right">{formatZMW(v)}</td>)}
                    <td className="px-3 py-3 text-right"><Money ngwee={aging.grand} strong /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Panel>

        <Panel title={`Top clients · ${year}`}>
          {top.length === 0 ? <Empty>No invoices this year yet.</Empty> : (
            <ol className="space-y-3">
              {top.map((c, i) => (
                <li key={c.clientId} className="flex items-center gap-3 text-[14px]">
                  <span className="font-mono text-[12px] w-6" style={{ color: 'var(--ax-faint)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <Link href={`/admin/clients/${c.clientId}`} className="flex-1 min-w-0 truncate text-white hover:underline underline-offset-4">{c.name}</Link>
                  <span className="text-[12px]" style={{ color: 'var(--ax-dim)' }}>{c.invoices} inv.</span>
                  <Money ngwee={c.amount} strong />
                </li>
              ))}
            </ol>
          )}
        </Panel>
      </div>
    </>
  )
}
