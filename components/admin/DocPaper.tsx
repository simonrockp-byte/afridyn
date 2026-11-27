import { formatZMW } from '@/lib/admin/money'
import type { DocView } from '@/lib/admin/doc-view'
import { templateFor } from '@/lib/admin/pdf/templates'

const STAMP: Record<string, string> = { PAID: '#047857', ACCEPTED: '#047857', DELIVERED: '#047857', VOID: '#B91C1C', DRAFT: '#64748B' }

/** On-screen A4-style preview. Mirrors the PDF layout and template (same DocView). */
export function DocPaper({ view }: { view: DocView }) {
  const b = view.business
  const t = templateFor(b.template)
  const strong = view.totals.filter((x) => x.strong)
  const finalStrong = strong[strong.length - 1]
  const label = 'text-[10px] font-bold uppercase tracking-[0.14em] mb-1'
  const contact = [b.address, b.phone, b.email, 'afridyn.world'].filter(Boolean).join('  ·  ')
  const regs = `TPIN ${b.tpin}  ·  PACRA ${b.pacra}  ·  ZPPA ${b.zppa}`
  const stampColor = t.id === 'minimal' ? '#111111' : (view.watermark ? STAMP[view.watermark] : undefined) ?? t.accent

  return (
    <article
      className="relative bg-white shadow-[0_24px_60px_-20px_rgba(11,18,32,0.35)] ring-1 ring-black/5 overflow-hidden"
      style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', color: t.ink }}
      aria-label={`${view.title} ${view.number}`}
    >
      {(view.watermark === 'VOID' || view.watermark === 'DRAFT') && (
        <span aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center text-[120px] font-bold -rotate-[28deg]" style={{ color: view.watermark === 'VOID' ? 'rgba(185,28,28,0.07)' : 'rgba(100,116,139,0.08)' }}>
          {view.watermark}
        </span>
      )}

      {t.header === 'dark' ? (
        <>
          <header className="flex items-center justify-between gap-4 px-6 md:px-9 py-5" style={{ background: t.primary }}>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-mark.png" alt="" width={40} height={38} />
              <div>
                <p className="text-white font-bold tracking-wide text-[15px]"><span style={{ color: t.accent }}>AFRIDYN</span> ENGINEERING LIMITED</p>
                <p className="text-[10px] mt-1 tracking-[0.14em]" style={{ color: '#A3AFBF' }}>MECHANICAL · ELECTRICAL · IT · FIBRE OPTICS</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-bold tracking-[0.12em] text-lg md:text-2xl">{view.title}</p>
              <p className="text-[12px] font-bold mt-0.5" style={{ color: t.accent }}>{view.number}</p>
            </div>
          </header>
          <div className="h-1" style={{ background: t.accent }} />
          <div className="px-6 md:px-9 pt-3 text-[11px] leading-relaxed" style={{ color: t.muted }}><p>{contact}</p><p>{regs}</p></div>
        </>
      ) : (
        <header className="px-6 md:px-9 pt-7">
          <div className="flex items-end justify-between gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-full.png" alt={b.name} className={t.header === 'minimal' ? 'h-9 w-auto' : 'h-11 w-auto'} />
            <div className="text-right">
              <p className={`${t.header === 'minimal' ? 'font-normal tracking-[0.25em]' : 'font-bold tracking-[0.12em]'} text-lg md:text-[26px] leading-none`} style={{ color: t.primary }}>{view.title}</p>
              <p className="text-[12px] font-bold mt-1.5" style={{ color: t.accent }}>{view.number}</p>
            </div>
          </div>
          {t.header === 'minimal' ? (
            <div className="h-px mt-4" style={{ background: t.ink }} />
          ) : (
            <div className="flex mt-4 h-[3px]"><div className="w-28" style={{ background: t.accent }} /><div className="flex-1" style={{ background: t.primary }} /></div>
          )}
          <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 mt-2 text-[11px]" style={{ color: t.muted }}><p>{contact}</p><p>{regs}</p></div>
        </header>
      )}

      <div className="relative px-6 md:px-9 py-6 text-[13px]">
        {view.watermark && (
          <div aria-hidden className="pointer-events-none absolute right-[34%] top-10 -rotate-[11deg] rounded-md p-[3px] opacity-85 hidden sm:block" style={{ border: `2.5px solid ${stampColor}` }}>
            <div className="rounded px-4 py-1 text-[22px] font-bold tracking-[0.2em]" style={{ border: `1px solid ${stampColor}`, color: stampColor }}>{view.watermark}</div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between gap-5 mb-5">
          <div className="sm:w-[56%]" style={t.panel ? { background: t.panel, borderLeft: `3px solid ${t.accent}`, padding: 14 } : undefined}>
            <p className={label} style={{ color: t.label }}>{view.forLabel}</p>
            <p className="font-bold text-[15px]">{view.client.name}</p>
            {view.client.contactPerson && <p style={{ color: t.muted }}>Attn: {view.client.contactPerson}</p>}
            {[view.client.address, [view.client.phone, view.client.email].filter(Boolean).join('  ·  ')].filter(Boolean).map((x) => <p key={x} style={{ color: t.muted }}>{x}</p>)}
            {view.client.tpin && <p style={{ color: t.muted }}>TPIN {view.client.tpin}</p>}
            {view.site && (
              <div className="mt-3 pt-3 border-t" style={{ borderColor: t.line }}>
                <p className={label} style={{ color: t.label }}>Site</p>
                <p className="font-semibold">{view.site.name}</p>
                <p style={{ color: t.muted }}>{[view.site.location, view.site.contactPerson, view.site.phone].filter(Boolean).join(' · ')}</p>
              </div>
            )}
          </div>
          <div className="sm:w-[38%]">
            <dl>
              {view.meta.map((m, i) => (
                <div key={m.label} className="flex justify-between gap-3 py-1.5" style={{ borderBottom: i === view.meta.length - 1 ? undefined : `1px solid ${t.line}` }}>
                  <dt className="text-[12px]" style={{ color: t.muted }}>{m.label}</dt><dd className="font-bold text-right">{m.value}</dd>
                </div>
              ))}
            </dl>
            {finalStrong && view.type !== 'receipt' && (
              <div className="mt-3 p-3" style={t.total.bg ? { background: t.total.bg } : { border: `1.5px solid ${t.ink}` }}>
                <p className="text-[10px] uppercase tracking-[0.14em]" style={{ color: t.total.text, opacity: 0.85 }}>{finalStrong.label}</p>
                <p className="text-[22px] font-bold leading-tight" style={{ color: t.total.amount }}>{formatZMW(finalStrong.amount)}</p>
              </div>
            )}
          </div>
        </div>

        {view.infoLines.length > 0 && (
          <dl className="p-3 mb-4" style={t.panel ? { background: t.panel } : { border: `1px solid ${t.line}` }}>
            {view.infoLines.map((l) => <div key={l.label} className="flex gap-3 py-0.5"><dt className="w-40 shrink-0" style={{ color: t.muted }}>{l.label}</dt><dd className="font-semibold">{l.value}</dd></div>)}
          </dl>
        )}

        {view.rows.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px]">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.1em]" style={{ background: t.tableHead.bg ?? undefined, color: t.tableHead.text, borderBottom: t.tableHead.borderBottom ? `1.5px solid ${t.tableHead.borderBottom}` : undefined }}>
                  <th className="text-left px-2 py-2.5 w-9">#</th>
                  <th className="text-left px-2 py-2.5">Description</th>
                  <th className="text-left px-2 py-2.5 w-16">Unit</th>
                  <th className="text-right px-2 py-2.5 w-14">Qty</th>
                  {view.showPrices && <><th className="text-right px-2 py-2.5 w-28">Unit price</th><th className="text-right px-2 py-2.5 w-28">Amount</th></>}
                </tr>
              </thead>
              <tbody>
                {view.rows.map((r, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${t.line}`, background: t.zebra && i % 2 ? t.zebra : undefined }}>
                    <td className="px-2 py-2.5 tabular-nums" style={{ color: t.muted }}>{String(i + 1).padStart(2, '0')}</td>
                    <td className="px-2 py-2.5">{r.description}</td>
                    <td className="px-2 py-2.5" style={{ color: t.muted }}>{r.unit}</td>
                    <td className="px-2 py-2.5 text-right tabular-nums">{r.qty}</td>
                    {view.showPrices && <><td className="px-2 py-2.5 text-right tabular-nums">{formatZMW(r.unitPrice)}</td><td className="px-2 py-2.5 text-right font-semibold tabular-nums">{formatZMW(r.amount)}</td></>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view.totals.length > 0 && (
          <div className="mt-4 flex flex-col-reverse sm:flex-row justify-between gap-5">
            <div className="sm:max-w-[48%]">
              {view.amountInWords && (<><p className={label} style={{ color: t.label }}>Amount in words</p><p className="italic">{view.amountInWords}</p></>)}
              <p className="text-[11px] mt-2" style={{ color: t.muted }}>All amounts in Zambian Kwacha (ZMW).</p>
            </div>
            <div className="sm:w-[44%] text-[13px]">
              {view.totals.map((x) =>
                x.strong ? (
                  <div key={x.label} className="flex justify-between items-center px-3 py-2 mt-1 font-bold" style={t.total.bg ? { background: t.total.bg, color: t.total.text } : { borderTop: `1.5px solid ${t.ink}`, borderBottom: `1.5px solid ${t.ink}` }}>
                    <span>{x.label}</span><span className="text-[15px] tabular-nums" style={{ color: t.total.amount }}>{formatZMW(x.amount)}</span>
                  </div>
                ) : (
                  <div key={x.label} className="flex justify-between px-3 py-1"><span style={{ color: t.muted }}>{x.label}</span><span className="tabular-nums">{formatZMW(x.amount)}</span></div>
                ),
              )}
            </div>
          </div>
        )}

        {view.notes && <div className="mt-6"><p className={label} style={{ color: t.label }}>Notes</p><p className="whitespace-pre-line">{view.notes}</p></div>}

        {view.showPaymentDetails && (
          <div className="mt-6 grid sm:grid-cols-[150px_1fr_1fr]" style={{ border: `1px solid ${t.line}`, borderTop: `2px solid ${t.accent}` }}>
            <div className="p-3" style={{ background: t.panel ?? undefined }}><p className="font-bold" style={{ color: t.primary }}>How to pay</p><p className="text-[11px] mt-1" style={{ color: t.muted }}>Quote {view.number} as your reference.</p></div>
            {b.bank && <div className="p-3"><p className={label} style={{ color: t.label }}>Bank transfer</p><p className="whitespace-pre-line">{b.bank}</p></div>}
            {b.momo && <div className="p-3"><p className={label} style={{ color: t.label }}>Mobile money</p><p className="whitespace-pre-line">{b.momo}</p></div>}
          </div>
        )}

        {view.terms.length > 0 && (
          <div className="mt-6">
            <p className={label} style={{ color: t.label }}>{view.termsTitle}</p>
            <ol className="space-y-0.5" style={{ color: t.muted }}>
              {view.terms.map((x, i) => <li key={i} className="flex gap-2"><span className="font-bold w-4 shrink-0" style={{ color: t.accent }}>{i + 1}.</span><span>{x}</span></li>)}
            </ol>
          </div>
        )}

        <div className="mt-12 grid sm:grid-cols-2 gap-8 text-[11px]" style={{ color: t.muted }}>
          {view.signatures.map((s) => <p key={s} className="border-t pt-1.5" style={{ borderColor: t.ink }}>{s}</p>)}
        </div>
      </div>

      <footer className="px-6 md:px-9 py-2.5 flex flex-wrap justify-between gap-2 text-[10.5px]" style={t.footer.bg ? { background: t.footer.bg, color: t.footer.text } : { color: t.footer.text, borderTop: `1px solid ${t.line}` }}>
        <span>{b.name} · {b.phone} · afridyn.world</span><span>{view.number}</span>
      </footer>
    </article>
  )
}
