import { lineTotal } from './money'
import type { ClientRow, DocumentRow, LineItem, SiteRow, ClientSnapshot, SiteSnapshot } from '@/db/schema'

// Document rules shared by the editor, the views, the PDF and the server
// actions. Pure functions only. Adapted from Milo Motors for Afridyn's six
// document types.

export type DocType = DocumentRow['type']
export type DocStatus = DocumentRow['status']
export type Series = 'QT' | 'PF' | 'INV' | 'RC' | 'DN' | 'CN'

export const DOC_TYPES: DocType[] = ['quotation', 'proforma', 'invoice', 'receipt', 'delivery_note', 'credit_note']

export const DOC_META: Record<
  DocType,
  {
    title: string
    plural: string
    series: Series
    forLabel: string
    /** Which second date the type carries. */
    secondDate: 'validUntil' | 'dueDate' | null
    secondDateLabel: string
    totalLabel: string
    /** Delivery notes list quantities only. */
    showPrices: boolean
    /** Can be created directly from "New document" (others come from conversions). */
    creatable: boolean
  }
> = {
  quotation:     { title: 'Quotation',        plural: 'Quotations',        series: 'QT',  forLabel: 'Quotation for', secondDate: 'validUntil', secondDateLabel: 'Valid until', totalLabel: 'Total',            showPrices: true,  creatable: true },
  proforma:      { title: 'Proforma Invoice', plural: 'Proforma invoices', series: 'PF',  forLabel: 'Bill to',       secondDate: 'validUntil', secondDateLabel: 'Valid until', totalLabel: 'Total',            showPrices: true,  creatable: true },
  invoice:       { title: 'Invoice',          plural: 'Invoices',          series: 'INV', forLabel: 'Bill to',       secondDate: 'dueDate',    secondDateLabel: 'Due date',    totalLabel: 'Total due',        showPrices: true,  creatable: true },
  receipt:       { title: 'Receipt',          plural: 'Receipts',          series: 'RC',  forLabel: 'Received from', secondDate: null,         secondDateLabel: '',            totalLabel: 'Amount received',  showPrices: true,  creatable: false },
  delivery_note: { title: 'Delivery Note',    plural: 'Delivery notes',    series: 'DN',  forLabel: 'Deliver to',    secondDate: null,         secondDateLabel: '',            totalLabel: '',                 showPrices: false, creatable: true },
  credit_note:   { title: 'Credit Note',      plural: 'Credit notes',      series: 'CN',  forLabel: 'Credit to',     secondDate: null,         secondDateLabel: '',            totalLabel: 'Total credit',     showPrices: true,  creatable: false },
}

export const STATUS_LABELS: Record<DocStatus, string> = {
  draft: 'Draft',
  sent: 'Issued',
  accepted: 'Accepted',
  partially_paid: 'Part paid',
  paid: 'Paid',
  delivered: 'Delivered',
  void: 'Void',
}

/** What each type can be converted into (receipts come from payments). */
export const CONVERT_TARGETS: Record<DocType, DocType[]> = {
  quotation: ['proforma', 'invoice'],
  proforma: ['invoice'],
  invoice: ['delivery_note', 'credit_note'],
  receipt: [],
  delivery_note: [],
  credit_note: [],
}

export type PaymentMethod = 'cash' | 'bank_transfer' | 'airtel_money' | 'mtn_momo' | 'zamtel_kwacha' | 'cheque' | 'card'
export const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: 'bank_transfer', label: 'Bank transfer' },
  { value: 'cash', label: 'Cash' },
  { value: 'airtel_money', label: 'Airtel Money' },
  { value: 'mtn_momo', label: 'MTN MoMo' },
  { value: 'zamtel_kwacha', label: 'Zamtel Kwacha' },
  { value: 'cheque', label: 'Cheque' },
  { value: 'card', label: 'Card' },
]
export function paymentMethodLabel(m: string): string {
  return PAYMENT_METHODS.find((p) => p.value === m)?.label ?? m
}

export type Totals = { subtotal: number; discount: number; taxAmount: number; total: number }

/** ngwee. TOT = no tax line (Afridyn today); VAT16 for if they register. Discount is capped. */
export function computeTotals(items: Pick<LineItem, 'qty' | 'unitPrice'>[], discount: number, taxMode: 'TOT' | 'VAT16', vatRate = 0.16): Totals {
  const subtotal = items.reduce((sum, i) => sum + lineTotal(i.qty, i.unitPrice), 0)
  const cappedDiscount = Math.min(Math.max(0, Math.round(discount)), subtotal)
  const taxable = subtotal - cappedDiscount
  const taxAmount = taxMode === 'VAT16' ? Math.round(taxable * vatRate) : 0
  return { subtotal, discount: cappedDiscount, taxAmount, total: taxable + taxAmount }
}

/**
 * Invoice balance = total − payments − issued credit notes against it.
 * Void documents owe nothing.
 */
export function invoiceBalance(total: number, paid: number, credited: number, status: DocStatus): number {
  if (status === 'void') return 0
  return Math.max(0, total - paid - credited)
}

export function invoiceStatusAfter(status: DocStatus, total: number, settled: number): DocStatus {
  if (status === 'void' || status === 'draft') return status
  if (settled <= 0) return 'sent'
  return settled >= total ? 'paid' : 'partially_paid'
}

export function clientSnapshot(c: Pick<ClientRow, 'name' | 'contactPerson' | 'phone' | 'email' | 'address' | 'tpin'>): ClientSnapshot {
  const s: ClientSnapshot = { name: c.name }
  if (c.contactPerson) s.contactPerson = c.contactPerson
  if (c.phone) s.phone = c.phone
  if (c.email) s.email = c.email
  if (c.address) s.address = c.address
  if (c.tpin) s.tpin = c.tpin
  return s
}

export function siteSnapshot(site: Pick<SiteRow, 'name' | 'location' | 'contactPerson' | 'phone'> | null | undefined): SiteSnapshot | null {
  if (!site) return null
  const s: SiteSnapshot = { name: site.name }
  if (site.location) s.location = site.location
  if (site.contactPerson) s.contactPerson = site.contactPerson
  if (site.phone) s.phone = site.phone
  return s
}

export function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

/** Today in Lusaka (CAT, UTC+2, no DST). */
export function todayInLusaka(now = new Date()): string {
  return new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

export function defaultTerms(
  type: DocType,
  s: { quoteTerms?: string | null; invoiceTerms?: string | null; deliveryTerms?: string | null; receiptFooter?: string | null; quoteValidityDays?: number } | null,
): string {
  switch (type) {
    case 'quotation':
    case 'proforma':
      return (
        s?.quoteTerms ||
        [
          `Prices are valid for ${s?.quoteValidityDays ?? 30} days from the date of issue.`,
          'Prices are in Zambian Kwacha. Delivery lead times are confirmed on order.',
          'Orders are confirmed on receipt of an official purchase order or payment.',
        ].join('\n')
      )
    case 'invoice':
      return s?.invoiceTerms || ['Payment is due by the due date shown above.', 'Please quote the invoice number as your payment reference.'].join('\n')
    case 'delivery_note':
      return s?.deliveryTerms || ['Goods received in good order and condition unless noted above.', 'Please sign and keep a copy for your records.'].join('\n')
    case 'credit_note':
      return 'This credit note reduces the balance of the invoice referenced above.'
    case 'receipt':
      return s?.receiptFooter || 'Thank you for your payment.'
  }
}

/** Unguessable token for the public /d/[token] link (144 bits). */
export function newShareToken(): string {
  const bytes = new Uint8Array(18)
  crypto.getRandomValues(bytes)
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function newLineItem(): LineItem {
  return { id: crypto.randomUUID(), description: '', unit: 'each', qty: 1, unitPrice: 0 }
}

/** Normalises a Zambian phone to E.164 (+260…) where possible. */
export function normalisePhone(raw: string | null | undefined): string | null {
  if (!raw) return null
  const digits = raw.replace(/[^\d+]/g, '')
  if (/^\+\d{9,15}$/.test(digits)) return digits
  if (/^0\d{9}$/.test(digits)) return `+260${digits.slice(1)}`
  if (/^260\d{9}$/.test(digits)) return `+${digits}`
  if (/^\d{9}$/.test(digits)) return `+260${digits}`
  return raw.trim()
}
