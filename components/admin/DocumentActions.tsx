'use client'
import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Pencil, Send, CheckCircle2, ArrowRightLeft, Wallet, Truck, Ban, Trash2, Share2, Download, Link2, MessageCircle, Eye } from 'lucide-react'
import {
  acceptQuotation, convertDocument, deleteDraft, issueDocument, markDelivered, recordPayment, setCreditReason, voidDocument,
} from '@/lib/admin/actions'
import { CONVERT_TARGETS, DOC_META, PAYMENT_METHODS, todayInLusaka, type DocStatus, type DocType, type PaymentMethod } from '@/lib/admin/documents'
import { formatZMW, parseKwachaInput, toKwacha } from '@/lib/admin/money'
import type { DocView } from '@/lib/admin/doc-view'
import { buildPdfBlob, downloadBlob, openBlob, pdfFilename, sharePdf } from '@/lib/admin/pdf/share'

type Props = {
  id: string
  type: DocType
  status: DocStatus
  number: string
  balance: number
  clientName: string
  clientPhone: string | null
  shareUrl: string
  view: DocView
}

const btn = 'ax-btn !min-h-[42px] !px-4 w-full justify-start disabled:opacity-60'

export function DocumentActions(p: Props) {
  const router = useRouter()
  const [pending, start] = useTransition()
  const [msg, setMsg] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [pdfBusy, setPdfBusy] = useState(false)
  const meta = DOC_META[p.type]
  const draft = p.status === 'draft'
  const live = p.status !== 'void' && !draft

  const run = (fn: () => Promise<unknown>, done?: string) =>
    start(async () => {
      setErr(null)
      setMsg(null)
      try {
        const r = (await fn()) as { error?: string } | undefined
        if (r && typeof r === 'object' && 'error' in r && r.error) setErr(r.error)
        else {
          if (done) setMsg(done)
          router.refresh()
        }
      } catch (e) {
        // redirect() from a server action surfaces as a thrown NEXT_REDIRECT; let it through.
        if ((e as { digest?: string })?.digest?.startsWith('NEXT_REDIRECT')) throw e
        setErr((e as Error).message || 'Something went wrong.')
      }
    })

  const amountNote =
    p.type === 'invoice' ? (p.balance ? ` (${formatZMW(p.balance)} due)` : ' (paid)')
      : p.type === 'quotation' || p.type === 'proforma' ? ` (total ${formatZMW(p.balance)})`
        : p.type === 'receipt' ? ` (${formatZMW(p.balance)} received)`
          : ''
  const waText = `${meta.title} ${p.number} from Afridyn Engineering Limited${amountNote}: ${p.shareUrl}`
  const waPhone = p.clientPhone?.replace(/[^\d]/g, '')

  async function sharePdfNow(mode: 'share' | 'download' | 'preview') {
    setPdfBusy(true)
    setErr(null)
    try {
      const blob = await buildPdfBlob(p.view)
      const name = pdfFilename(p.view)
      if (mode === 'share') {
        const r = await sharePdf(blob, name, waText)
        if (r === 'unsupported') {
          downloadBlob(blob, name)
          setMsg('This browser can’t share files directly, so the PDF was downloaded. Attach it in WhatsApp, or send the link.')
        }
      } else if (mode === 'preview') openBlob(blob)
      else downloadBlob(blob, name)
    } catch {
      setErr('Could not build the PDF. Try again.')
    } finally {
      setPdfBusy(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Workflow */}
      <section className="ax-panel p-4 space-y-2">
        <h2 className="ax-spec mb-2" style={{ color: 'var(--ax-text)' }}>Actions</h2>
        {draft && (
          <>
            <Link href={`/admin/documents/${p.id}/edit`} className={`${btn} ax-btn-ghost`}><Pencil size={15} aria-hidden /> Edit draft</Link>
            <button className={`${btn} ax-btn-copper`} disabled={pending} onClick={() => run(() => issueDocument(p.id), 'Issued.')}>
              <Send size={15} aria-hidden /> Issue {meta.title.toLowerCase()}
            </button>
          </>
        )}
        {p.type === 'quotation' && p.status === 'sent' && (
          <button className={`${btn} ax-btn-ghost`} disabled={pending} onClick={() => run(() => acceptQuotation(p.id), 'Marked accepted.')}>
            <CheckCircle2 size={15} aria-hidden /> Mark accepted
          </button>
        )}
        {live && CONVERT_TARGETS[p.type].map((t) => (
          <button key={t} className={`${btn} ax-btn-ghost`} disabled={pending} onClick={() => run(() => convertDocument(p.id, t))}>
            <ArrowRightLeft size={15} aria-hidden /> Create {DOC_META[t].title.toLowerCase()}
          </button>
        ))}
        {p.type === 'invoice' && live && p.balance > 0 && <PaymentForm invoiceId={p.id} balance={p.balance} pending={pending} run={run} onReceipt={(rid) => router.push(`/admin/documents/${rid}`)} />}
        {p.type === 'delivery_note' && (p.status === 'sent' || draft) && <DeliveredForm id={p.id} pending={pending} run={run} />}
        {live && <VoidForm id={p.id} type={p.type} pending={pending} run={run} />}
        {draft && (
          <button className={`${btn} ax-btn-ghost`} disabled={pending} onClick={() => { if (confirm('Delete this draft? This can’t be undone.')) run(() => deleteDraft(p.id)) }}>
            <Trash2 size={15} aria-hidden /> Delete draft
          </button>
        )}
        {msg && <p role="status" className="text-[13px] pt-1" style={{ color: 'var(--ax-green)' }}>{msg}</p>}
        {err && <p role="alert" className="text-[13px] pt-1" style={{ color: 'var(--ax-error)' }}>{err}</p>}
      </section>

      {/* Share */}
      <section className="ax-panel p-4 space-y-2">
        <h2 className="ax-spec mb-2" style={{ color: 'var(--ax-text)' }}>Send</h2>
        <button className={`${btn} ax-btn-copper`} disabled={pdfBusy} onClick={() => sharePdfNow('share')}><Share2 size={15} aria-hidden /> {pdfBusy ? 'Building PDF…' : 'Share PDF (WhatsApp…)'}</button>
        <button className={`${btn} ax-btn-ghost`} disabled={pdfBusy} onClick={() => sharePdfNow('download')}><Download size={15} aria-hidden /> Download PDF</button>
        <button className={`${btn} ax-btn-ghost`} disabled={pdfBusy} onClick={() => sharePdfNow('preview')}><Eye size={15} aria-hidden /> Preview PDF</button>
        {!draft && (
          <>
            <a className={`${btn} ax-btn-ghost`} href={`https://wa.me/${waPhone ?? ''}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={15} aria-hidden /> WhatsApp link{waPhone ? '' : ' (choose chat)'}
            </a>
            <button className={`${btn} ax-btn-ghost`} onClick={async () => { await navigator.clipboard.writeText(p.shareUrl); setMsg('Link copied.') }}>
              <Link2 size={15} aria-hidden /> Copy client link
            </button>
          </>
        )}
        {draft && <p className="text-[12.5px]" style={{ color: 'var(--ax-faint)' }}>The client link works once the document is issued. Draft PDFs carry a DRAFT watermark.</p>}
      </section>
    </div>
  )
}

type Runner = (fn: () => Promise<unknown>, done?: string) => void

function PaymentForm({ invoiceId, balance, pending, run, onReceipt }: { invoiceId: string; balance: number; pending: boolean; run: Runner; onReceipt: (id: string) => void }) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState(String(toKwacha(balance)))
  const [method, setMethod] = useState<PaymentMethod>('bank_transfer')
  const [paidBy, setPaidBy] = useState('')
  const [reference, setReference] = useState('')
  const [paidAt, setPaidAt] = useState(todayInLusaka())
  if (!open) return <button className={`${btn} ax-btn-ghost`} onClick={() => setOpen(true)}><Wallet size={15} aria-hidden /> Record payment</button>
  return (
    <form
      className="border p-3 space-y-3"
      style={{ borderColor: 'var(--ax-line-2)' }}
      onSubmit={(e) => {
        e.preventDefault()
        const ngwee = parseKwachaInput(amount)
        if (!ngwee) return
        run(async () => {
          const r = await recordPayment(invoiceId, { amount: ngwee, method, paidBy: paidBy || null, reference: reference || null, paidAt })
          if ('receiptId' in r) onReceipt(r.receiptId)
          return r
        })
      }}
    >
      <p className="text-[13px]" style={{ color: 'var(--ax-dim)' }}>Balance due {formatZMW(balance)}. A receipt is issued automatically.</p>
      <div><label className="ax-label" htmlFor="pay-amt">Amount (K)</label><input id="pay-amt" className="ax-field" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
      <div><label className="ax-label" htmlFor="pay-m">Method</label>
        <select id="pay-m" className="ax-field" value={method} onChange={(e) => setMethod(e.target.value as PaymentMethod)}>{PAYMENT_METHODS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}</select></div>
      <div><label className="ax-label" htmlFor="pay-by">Paid by</label><input id="pay-by" className="ax-field" value={paidBy} onChange={(e) => setPaidBy(e.target.value)} placeholder="Name of payer" /></div>
      <div><label className="ax-label" htmlFor="pay-ref">Reference</label><input id="pay-ref" className="ax-field" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Bank / MoMo ref" /></div>
      <div><label className="ax-label" htmlFor="pay-d">Date paid</label><input id="pay-d" type="date" className="ax-field" value={paidAt} onChange={(e) => setPaidAt(e.target.value)} /></div>
      <div className="flex gap-2"><button className="ax-btn ax-btn-copper !min-h-[42px]" disabled={pending}>Save & issue receipt</button><button type="button" className="ax-btn ax-btn-ghost !min-h-[42px]" onClick={() => setOpen(false)}>Cancel</button></div>
    </form>
  )
}

function DeliveredForm({ id, pending, run }: { id: string; pending: boolean; run: Runner }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [date, setDate] = useState(todayInLusaka())
  if (!open) return <button className={`${btn} ax-btn-ghost`} onClick={() => setOpen(true)}><Truck size={15} aria-hidden /> Mark delivered</button>
  return (
    <form className="border p-3 space-y-3" style={{ borderColor: 'var(--ax-line-2)' }} onSubmit={(e) => { e.preventDefault(); run(() => markDelivered(id, name, date), 'Marked delivered.') }}>
      <div><label className="ax-label" htmlFor="dn-name">Received by</label><input id="dn-name" required className="ax-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name of person who signed" /></div>
      <div><label className="ax-label" htmlFor="dn-date">Date received</label><input id="dn-date" type="date" className="ax-field" value={date} onChange={(e) => setDate(e.target.value)} /></div>
      <div className="flex gap-2"><button className="ax-btn ax-btn-copper !min-h-[42px]" disabled={pending}>Confirm delivery</button><button type="button" className="ax-btn ax-btn-ghost !min-h-[42px]" onClick={() => setOpen(false)}>Cancel</button></div>
    </form>
  )
}

function VoidForm({ id, type, pending, run }: { id: string; type: DocType; pending: boolean; run: Runner }) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')
  if (!open) return <button className={`${btn} ax-btn-ghost`} onClick={() => setOpen(true)}><Ban size={15} aria-hidden /> Void…</button>
  return (
    <form className="border p-3 space-y-3" style={{ borderColor: 'var(--ax-danger)' }} onSubmit={(e) => { e.preventDefault(); run(() => voidDocument(id, reason), 'Voided.') }}>
      <p className="text-[13px]" style={{ color: 'var(--ax-dim)' }}>
        Voiding keeps the record but marks it VOID.{type === 'receipt' ? ' The payment it confirms is reversed and the invoice balance goes back up.' : ''}
      </p>
      <div><label className="ax-label" htmlFor="v-r">Reason</label><input id="v-r" required className="ax-field" value={reason} onChange={(e) => setReason(e.target.value)} /></div>
      <div className="flex gap-2"><button className="ax-btn !min-h-[42px]" style={{ background: 'var(--ax-danger)', color: 'var(--ax-on-danger)' }} disabled={pending}>Void document</button><button type="button" className="ax-btn ax-btn-ghost !min-h-[42px]" onClick={() => setOpen(false)}>Cancel</button></div>
    </form>
  )
}

export function CreditReasonForm({ id, reason }: { id: string; reason: string }) {
  const [value, setValue] = useState(reason)
  const [saved, setSaved] = useState(false)
  const [pending, start] = useTransition()
  return (
    <form className="ax-panel p-5 flex flex-col md:flex-row gap-3 md:items-end" onSubmit={(e) => { e.preventDefault(); start(async () => { await setCreditReason(id, value); setSaved(true) }) }}>
      <div className="flex-1"><label className="ax-label" htmlFor="cr">Reason for credit</label><input id="cr" className="ax-field" value={value} onChange={(e) => { setValue(e.target.value); setSaved(false) }} placeholder="e.g. 2 bearings returned — wrong size" /></div>
      <button className="ax-btn ax-btn-ghost !min-h-[46px]" disabled={pending}>{saved ? 'Saved' : 'Save reason'}</button>
    </form>
  )
}
