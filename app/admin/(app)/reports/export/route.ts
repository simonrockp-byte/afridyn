import { AGING_BUCKETS, agingReport, monthlyReport } from '@/lib/admin/reports'
import { authErrorResponse, requireUser } from '@/lib/auth/server'

// CSV downloads for the accountant. Amounts in kwacha with 2 decimals.
const k = (ngwee: number) => (ngwee / 100).toFixed(2)
const cell = (v: string | number) => {
  const s = String(v)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}
const csv = (rows: (string | number)[][]) => '﻿' + rows.map((r) => r.map(cell).join(',')).join('\r\n')

export async function GET(request: Request) {
  try {
    await requireUser()
  } catch (e) {
    return authErrorResponse(e) ?? new Response('Error', { status: 500 })
  }
  const url = new URL(request.url)
  const kind = url.searchParams.get('kind')

  if (kind === 'monthly') {
    const year = /^\d{4}$/.test(url.searchParams.get('year') ?? '') ? Number(url.searchParams.get('year')) : new Date().getUTCFullYear()
    const { rows, totals } = await monthlyReport(year)
    const body = csv([
      ['Month', 'Invoices', 'Invoiced (K)', 'Credit notes (K)', 'Net invoiced (K)', 'Received (K)'],
      ...rows.map((r) => [r.month, r.invoiceCount, k(r.invoiced), k(r.credited), k(r.netInvoiced), k(r.received)]),
      ['Total', totals.invoiceCount, k(totals.invoiced), k(totals.credited), k(totals.netInvoiced), k(totals.received)],
    ])
    return new Response(body, { headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': `attachment; filename="afridyn-turnover-${year}.csv"` } })
  }

  if (kind === 'aging') {
    const a = await agingReport()
    const body = csv([
      ['Client', 'Invoice', 'Due date', 'Days overdue', 'Balance (K)'],
      ...a.rows.flatMap((r) => r.invoices.map((i) => [r.clientName, i.number, i.dueDate ?? '', i.daysOverdue, k(i.balance)])),
      [],
      ['Client', ...AGING_BUCKETS, 'Total (K)'],
      ...a.rows.map((r) => [r.clientName, ...r.buckets.map(k), k(r.total)]),
      ['Total', ...a.totals.map(k), k(a.grand)],
    ])
    return new Response(body, { headers: { 'content-type': 'text/csv; charset=utf-8', 'content-disposition': `attachment; filename="afridyn-unpaid-${a.asOf}.csv"` } })
  }

  return new Response('Unknown report', { status: 400 })
}
