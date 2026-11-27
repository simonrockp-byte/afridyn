'use client'
import { useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Trash2, Save, CloudOff } from 'lucide-react'
import { saveDocument, type DocInput } from '@/lib/admin/actions'
import { DOC_META, computeTotals, type DocType } from '@/lib/admin/documents'
import { formatZMW, lineTotal, parseKwachaInput, toKwacha } from '@/lib/admin/money'
import type { LineItem } from '@/db/schema'
import { enqueueDocument, isNetworkError } from '@/lib/admin/outbox'

type EditableType = 'quotation' | 'proforma' | 'invoice' | 'delivery_note' | 'credit_note'
type Row = LineItem & { priceText: string }

export type EditorInit = {
  id?: string
  type: EditableType
  number?: string
  clientId: string
  siteId: string | null
  issueDate: string
  secondDate: string | null
  clientPoNumber: string | null
  items: LineItem[]
  discount: number
  notes: string | null
  terms: string | null
}

const blankRow = (): Row => ({ id: crypto.randomUUID(), description: '', unit: 'each', qty: 1, unitPrice: 0, priceText: '' })

export function DocumentEditor({
  init,
  clients,
  sites,
  taxMode,
}: {
  init: EditorInit
  clients: { id: string; name: string }[]
  sites: { id: string; clientId: string; name: string }[]
  taxMode: 'TOT' | 'VAT16'
}) {
  const router = useRouter()
  const meta = DOC_META[init.type as DocType]
  const [clientId, setClientId] = useState(init.clientId)
  const [siteId, setSiteId] = useState(init.siteId ?? '')
  const [issueDate, setIssueDate] = useState(init.issueDate)
  const [secondDate, setSecondDate] = useState(init.secondDate ?? '')
  const [po, setPo] = useState(init.clientPoNumber ?? '')
  const [rows, setRows] = useState<Row[]>(() =>
    init.items.length ? init.items.map((i) => ({ ...i, priceText: i.unitPrice ? String(toKwacha(i.unitPrice)) : '' })) : [blankRow()],
  )
  const [discountText, setDiscountText] = useState(init.discount ? String(toKwacha(init.discount)) : '')
  const [notes, setNotes] = useState(init.notes ?? '')
  const [terms, setTerms] = useState(init.terms ?? '')
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()
  const [queued, setQueued] = useState(false)

  const clientSites = sites.filter((s) => s.clientId === clientId)
  const discount = parseKwachaInput(discountText) ?? 0
  const totals = useMemo(() => computeTotals(rows, discount, taxMode), [rows, discount, taxMode])

  const update = (id: string, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)))

  function save() {
    setError(null)
    if (!clientId) return setError('Choose a client.')
    const input: DocInput = {
      id: init.id,
      type: init.type,
      clientId,
      siteId: siteId || null,
      issueDate,
      secondDate: secondDate || null,
      clientPoNumber: po || null,
      items: rows.map(({ priceText: _p, ...r }) => ({ ...r, deliveredQty: init.type === 'delivery_note' ? r.qty : undefined })),
      discount: meta.showPrices ? discount : 0,
      notes: notes || null,
      terms: terms || null,
    }
    const clientName = clients.find((c) => c.id === clientId)?.name ?? 'client'
    const keepOffline = async () => {
      await enqueueDocument(input, `${meta.title}${init.number ? ` ${init.number}` : ''} · ${clientName}`)
      setQueued(true)
    }
    start(async () => {
      // No signal: keep it on this device; it syncs when the connection returns.
      if (!navigator.onLine) return keepOffline()
      try {
        const res = await saveDocument(input)
        if ('error' in res) setError(res.error)
        else router.push(`/admin/documents/${res.id}`)
      } catch (e) {
        if (isNetworkError(e)) await keepOffline()
        else setError('Could not save. Try again.')
      }
    })
  }

  if (queued) {
    return (
      <div className="ax-panel ax-brackets p-7 max-w-xl" role="status">
        <CloudOff size={26} style={{ color: 'var(--ax-warn)' }} aria-hidden />
        <h2 className="font-display text-2xl font-semibold text-white mt-4">Saved on this device</h2>
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: 'var(--ax-dim)' }}>
          You&apos;re offline, so this {meta.title.toLowerCase()} is stored on this phone. It will sync automatically when the
          connection returns, and gets its official number then. Keep the app open or reopen it once you have signal.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <a href={`/admin/documents/new?type=${init.type}`} className="ax-btn ax-btn-copper">Create another</a>
          <a href="/admin" className="ax-btn ax-btn-ghost">Dashboard</a>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <section className="ax-panel p-5 md:p-6 grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="client" className="ax-label">Client *</label>
          <select id="client" className="ax-field" value={clientId} onChange={(e) => { setClientId(e.target.value); setSiteId('') }}>
            <option value="">Choose a client…</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <p className="mt-1.5 text-[12.5px]" style={{ color: 'var(--ax-faint)' }}>
            Not listed? <Link className="underline underline-offset-2 hover:text-white" href={`/admin/clients/new?then=${init.type}`}>Add a new client</Link>
          </p>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="site" className="ax-label">Site (optional)</label>
          <select id="site" className="ax-field" value={siteId} onChange={(e) => setSiteId(e.target.value)} disabled={!clientSites.length}>
            <option value="">{clientSites.length ? 'No specific site' : 'No sites for this client'}</option>
            {clientSites.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="issue" className="ax-label">Date *</label>
          <input id="issue" type="date" className="ax-field" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
        </div>
        {meta.secondDate && (
          <div>
            <label htmlFor="second" className="ax-label">{meta.secondDateLabel}</label>
            <input id="second" type="date" className="ax-field" value={secondDate} onChange={(e) => setSecondDate(e.target.value)} />
          </div>
        )}
        <div>
          <label htmlFor="po" className="ax-label">Client PO / reference</label>
          <input id="po" className="ax-field" value={po} onChange={(e) => setPo(e.target.value)} placeholder="e.g. PO-45812" />
        </div>
      </section>

      <section className="ax-panel p-5 md:p-6">
        <h2 className="ax-spec mb-4" style={{ color: 'var(--ax-text)' }}>Lines</h2>
        <div className="space-y-3">
          {rows.map((r, idx) => (
            <div key={r.id} className={`grid gap-2 items-end ${meta.showPrices ? 'grid-cols-[1fr_70px_70px] md:grid-cols-[1fr_90px_80px_130px_130px_40px]' : 'grid-cols-[1fr_80px_80px_40px]'}`}>
              <div className={meta.showPrices ? 'col-span-3 md:col-span-1' : ''}>
                {idx === 0 && <span className="ax-label">Description</span>}
                <input aria-label={`Line ${idx + 1} description`} className="ax-field" value={r.description} onChange={(e) => update(r.id, { description: e.target.value })} placeholder="Item, part number or service" />
              </div>
              <div>
                {idx === 0 && <span className="ax-label">Unit</span>}
                <input aria-label={`Line ${idx + 1} unit`} className="ax-field" value={r.unit ?? ''} onChange={(e) => update(r.id, { unit: e.target.value })} />
              </div>
              <div>
                {idx === 0 && <span className="ax-label">Qty</span>}
                <input aria-label={`Line ${idx + 1} quantity`} type="number" min={0} step="any" inputMode="decimal" className="ax-field" value={r.qty} onChange={(e) => update(r.id, { qty: Math.max(0, Number(e.target.value) || 0) })} />
              </div>
              {meta.showPrices && (
                <>
                  <div>
                    {idx === 0 && <span className="ax-label">Unit price (K)</span>}
                    <input aria-label={`Line ${idx + 1} unit price`} inputMode="decimal" className="ax-field" value={r.priceText} placeholder="0.00"
                      onChange={(e) => update(r.id, { priceText: e.target.value, unitPrice: parseKwachaInput(e.target.value) ?? 0 })} />
                  </div>
                  <div className="text-right pb-3 font-mono text-[14px] text-white hidden md:block">{formatZMW(lineTotal(r.qty, r.unitPrice))}</div>
                </>
              )}
              <button type="button" aria-label={`Remove line ${idx + 1}`} onClick={() => setRows((rs) => (rs.length > 1 ? rs.filter((x) => x.id !== r.id) : [blankRow()]))}
                className="h-[46px] grid place-items-center border hover:border-[color:var(--ax-copper)]" style={{ borderColor: 'var(--ax-line-2)', color: 'var(--ax-dim)' }}>
                <Trash2 size={15} aria-hidden />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setRows((rs) => [...rs, blankRow()])} className="ax-btn ax-btn-ghost !min-h-[40px] !px-4 mt-4">
          <Plus size={15} aria-hidden /> Add line
        </button>

        {meta.showPrices && (
          <div className="mt-6 ml-auto max-w-sm space-y-2 text-[14px]">
            <div className="flex justify-between"><span style={{ color: 'var(--ax-dim)' }}>Subtotal</span><span className="font-mono">{formatZMW(totals.subtotal)}</span></div>
            <div className="flex justify-between items-center gap-3">
              <label htmlFor="discount" style={{ color: 'var(--ax-dim)' }}>Discount (K)</label>
              <input id="discount" inputMode="decimal" className="ax-field !py-2 max-w-[140px] text-right" value={discountText} onChange={(e) => setDiscountText(e.target.value)} placeholder="0.00" />
            </div>
            {taxMode === 'VAT16' && <div className="flex justify-between"><span style={{ color: 'var(--ax-dim)' }}>VAT 16%</span><span className="font-mono">{formatZMW(totals.taxAmount)}</span></div>}
            <div className="flex justify-between pt-2 border-t text-base" style={{ borderColor: 'var(--ax-line-2)' }}>
              <span className="text-white font-semibold">{meta.totalLabel}</span>
              <span className="font-mono text-white font-semibold" style={{ color: 'var(--ax-copper)' }}>{formatZMW(totals.total)}</span>
            </div>
            {taxMode === 'TOT' && <p className="text-[12px]" style={{ color: 'var(--ax-faint)' }}>Turnover tax: no VAT line on documents.</p>}
          </div>
        )}
      </section>

      <section className="ax-panel p-5 md:p-6 grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="notes" className="ax-label">Notes (shown on the document)</label>
          <textarea id="notes" rows={4} className="ax-field resize-y" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <div>
          <label htmlFor="terms" className="ax-label">Terms (one per line)</label>
          <textarea id="terms" rows={4} className="ax-field resize-y" value={terms} onChange={(e) => setTerms(e.target.value)} />
        </div>
      </section>

      {error && <p role="alert" className="px-4 py-3 border text-[14px]" style={{ borderColor: 'rgba(255,106,26,0.5)', color: 'var(--ax-error)' }}>{error}</p>}

      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={save} disabled={pending} className="ax-btn ax-btn-copper disabled:opacity-60">
          <Save size={16} aria-hidden /> {pending ? 'Saving…' : init.id ? 'Save draft' : `Create ${meta.title.toLowerCase()}`}
        </button>
        <Link href={init.id ? `/admin/documents/${init.id}` : '/admin/documents'} className="ax-btn ax-btn-ghost">Cancel</Link>
      </div>
    </div>
  )
}
