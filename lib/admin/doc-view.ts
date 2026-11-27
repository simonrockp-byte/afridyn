import { DOC_META, paymentMethodLabel, type DocStatus, type DocType } from './documents'
import { lineTotal } from './money'
import type { ClientSnapshot, DocumentRow, PaymentRow, SettingsRow, SiteSnapshot } from '@/db/schema'

// Everything a printed document shows, computed once and used by both the
// on-screen preview and the PDF so they can never disagree (Milo pattern).

export type Business = {
  name: string
  phone: string
  email: string
  address: string
  tpin: string
  pacra: string
  zppa: string
  bank: string
  momo: string
}

export type DocView = {
  title: string
  number: string
  type: DocType
  status: DocStatus
  business: Business
  forLabel: string
  client: ClientSnapshot
  site: SiteSnapshot | null
  meta: { label: string; value: string }[]
  showPrices: boolean
  rows: { description: string; unit: string; qty: string; unitPrice: number; amount: number }[]
  totals: { label: string; amount: number; strong?: boolean }[]
  infoLines: { label: string; value: string }[]
  notes: string | null
  termsTitle: string
  terms: string[]
  showPaymentDetails: boolean
  signatures: [string, string]
  watermark: string | null
}

export function businessFrom(s: SettingsRow | null | undefined): Business {
  return {
    name: s?.businessName || 'Afridyn Engineering Limited',
    phone: s?.phone || '+260 977 244 549',
    email: s?.email || '',
    address: s?.address || '31 Salama Park, Lusaka, Zambia',
    tpin: s?.tpin || '2004257975',
    pacra: s?.pacraNumber || '120261040695',
    zppa: s?.zppaNumber || '137269',
    bank: s?.bankDetails || '',
    momo: s?.mobileMoneyDetails || '',
  }
}

export function formatDocDate(iso: string | Date | null | undefined): string {
  if (!iso) return ''
  const s = typeof iso === 'string' ? iso.slice(0, 10) : iso.toISOString().slice(0, 10)
  return new Date(`${s}T00:00:00Z`).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

function qtyText(q: number): string {
  return Number.isInteger(q) ? String(q) : q.toFixed(2).replace(/0$/, '')
}

export function buildDocView(args: {
  doc: DocumentRow
  settings: SettingsRow | null
  payments: PaymentRow[]
  source: DocumentRow | null
  settle: { paid: number; credited: number }
}): DocView {
  const { doc, settings, payments, source, settle } = args
  const m = DOC_META[doc.type]
  const business = businessFrom(settings)

  const meta: DocView['meta'] = [
    { label: `${m.title} no.`, value: doc.number },
    { label: doc.type === 'receipt' ? 'Date paid' : 'Date', value: formatDocDate(doc.issueDate) },
  ]
  if (doc.validUntil && m.secondDate === 'validUntil') meta.push({ label: 'Valid until', value: formatDocDate(doc.validUntil) })
  if (doc.dueDate && m.secondDate === 'dueDate') meta.push({ label: 'Due date', value: formatDocDate(doc.dueDate) })
  if (doc.clientPoNumber) meta.push({ label: 'Your ref / PO', value: doc.clientPoNumber })
  if (source && doc.type !== 'receipt') meta.push({ label: `Ref ${DOC_META[source.type].title.toLowerCase()}`, value: source.number })

  const rows = doc.items.map((i) => ({
    description: i.description,
    unit: i.unit ?? '',
    qty: qtyText(doc.type === 'delivery_note' ? (i.deliveredQty ?? i.qty) : i.qty),
    unitPrice: i.unitPrice,
    amount: lineTotal(i.qty, i.unitPrice),
  }))

  const totals: DocView['totals'] = []
  const infoLines: DocView['infoLines'] = []

  if (doc.type === 'receipt') {
    const payment = payments.find((p) => p.id === doc.paymentId)
    if (payment) {
      infoLines.push({ label: 'Payment method', value: paymentMethodLabel(payment.method) })
      if (payment.paidBy) infoLines.push({ label: 'Paid by', value: payment.paidBy })
      if (payment.reference) infoLines.push({ label: 'Reference', value: payment.reference })
    }
    if (source) {
      infoLines.push({ label: 'For invoice', value: source.number })
      const upToThis = payments
        .filter((p) => !payment || p.paidAt < payment.paidAt || (p.paidAt === payment.paidAt && p.createdAt <= payment.createdAt))
        .reduce((a, p) => a + p.amount, 0)
      totals.push({ label: 'Invoice total', amount: source.total })
      totals.push({ label: 'Amount received', amount: doc.total, strong: true })
      totals.push({ label: 'Balance remaining', amount: Math.max(0, source.total - upToThis) })
    } else {
      totals.push({ label: 'Amount received', amount: doc.total, strong: true })
    }
  } else if (doc.type === 'delivery_note') {
    if (doc.receivedByName) infoLines.push({ label: 'Received by', value: doc.receivedByName })
    if (doc.receivedAt) infoLines.push({ label: 'Received on', value: formatDocDate(doc.receivedAt) })
  } else {
    if (doc.type === 'credit_note') {
      if (source) infoLines.push({ label: 'Credit against invoice', value: source.number })
      if (doc.creditReason) infoLines.push({ label: 'Reason', value: doc.creditReason })
    }
    totals.push({ label: 'Subtotal', amount: doc.subtotal })
    if (doc.discount) totals.push({ label: 'Discount', amount: -doc.discount })
    if (doc.taxMode === 'VAT16') totals.push({ label: `VAT ${Math.round((settings?.vatRate ?? 0.16) * 100)}%`, amount: doc.taxAmount })
    totals.push({ label: m.totalLabel, amount: doc.total, strong: true })
    if (doc.type === 'invoice' && (settle.paid || settle.credited)) {
      if (settle.paid) totals.push({ label: 'Paid', amount: -settle.paid })
      if (settle.credited) totals.push({ label: 'Credited', amount: -settle.credited })
      totals.push({ label: 'Balance due', amount: Math.max(0, doc.total - settle.paid - settle.credited), strong: true })
    }
  }

  const terms = (doc.terms ?? '').split('\n').map((l) => l.trim()).filter(Boolean)
  const signatures: [string, string] =
    doc.type === 'quotation' || doc.type === 'proforma'
      ? ['Accepted by (name, signature, date)', `For ${business.name}`]
      : doc.type === 'delivery_note'
        ? ['Received in good order by (name, signature, date)', `Delivered by, for ${business.name}`]
        : ['Customer signature', `For ${business.name}`]

  return {
    title: m.title.toUpperCase(),
    number: doc.number,
    type: doc.type,
    status: doc.status,
    business,
    forLabel: m.forLabel,
    client: doc.clientSnapshot,
    site: doc.siteSnapshot,
    meta,
    showPrices: m.showPrices,
    rows,
    totals,
    infoLines,
    notes: doc.notes,
    termsTitle: doc.type === 'receipt' ? 'Note' : 'Terms & conditions',
    terms,
    showPaymentDetails: (doc.type === 'invoice' || doc.type === 'proforma' || doc.type === 'quotation') && Boolean(business.bank || business.momo),
    signatures,
    watermark: doc.status === 'void' ? 'VOID' : doc.status === 'draft' ? 'DRAFT' : doc.type === 'receipt' ? 'PAID' : null,
  }
}
