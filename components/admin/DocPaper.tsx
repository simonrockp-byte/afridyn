import { formatZMW } from '@/lib/admin/money'
import type { DocView } from '@/lib/admin/doc-view'

/** On-screen A4-style preview. Mirrors the PDF layout (same DocView). */
export function DocPaper({ view }: { view: DocView }) {
  const b = view.business
  return (
    <article className="relative bg-white text-[#0B0F14] shadow-2xl overflow-hidden" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }} aria-label={`${view.title} ${view.number}`}>
      {view.watermark && (
        <span aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center text-[110px] font-bold -rotate-[24deg]" style={{ color: 'rgba(255,106,26,0.08)' }}>{view.watermark}</span>
      )}
      <header className="flex items-center justify-between gap-4 px-6 md:px-9 py-5" style={{ background: '#0B0F14' }}>
        <div>
          <p className="text-white font-bold tracking-wide text-[15px]"><span style={{ color: '#FF6A1A' }}>AFRIDYN</span> ENGINEERING LIMITED</p>
          <p className="text-[11px] mt-1" style={{ color: '#A3AFBF' }}>Mechanical · Electrical · IT · Fibre Optics</p>
        </div>
        <p className="text-white font-bold tracking-wider text-lg md:text-2xl text-right">{view.title}</p>
      </header>
      <div className="h-1" style={{ background: '#FF6A1A' }} />
      <div className="px-6 md:px-9 py-6 text-[13px]">
        <p className="text-[11px] flex flex-wrap gap-x-4 gap-y-1 mb-5" style={{ color: '#5B6573' }}>
          {[b.phone, b.email, b.address, `TPIN ${b.tpin}`, `PACRA ${b.pacra}`, `ZPPA ${b.zppa}`].filter(Boolean).map((c) => <span key={c}>{c}</span>)}
        </p>

        <div className="flex flex-col sm:flex-row justify-between gap-5 mb-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#E05A10' }}>{view.forLabel}</p>
            <p className="font-bold text-[15px]">{view.client.name}</p>
            {view.client.contactPerson && <p style={{ color: '#5B6573' }}>Attn: {view.client.contactPerson}</p>}
            {[view.client.phone, view.client.email, view.client.address].filter(Boolean).map((x) => <p key={x} style={{ color: '#5B6573' }}>{x}</p>)}
            {view.client.tpin && <p style={{ color: '#5B6573' }}>TPIN {view.client.tpin}</p>}
            {view.site && (
              <div className="mt-3">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#E05A10' }}>Site</p>
                <p className="font-semibold">{view.site.name}</p>
                <p style={{ color: '#5B6573' }}>{[view.site.location, view.site.contactPerson, view.site.phone].filter(Boolean).join(' · ')}</p>
              </div>
            )}
          </div>
          <dl className="sm:text-right space-y-0.5">
            {view.meta.map((m) => (
              <div key={m.label} className="flex sm:justify-end gap-3"><dt style={{ color: '#5B6573' }}>{m.label}</dt><dd className="font-bold min-w-[120px]">{m.value}</dd></div>
            ))}
          </dl>
        </div>

        {view.infoLines.length > 0 && (
          <dl className="p-3 mb-4" style={{ background: '#F4F6F8' }}>
            {view.infoLines.map((l) => <div key={l.label} className="flex gap-3 py-0.5"><dt className="w-40 shrink-0" style={{ color: '#5B6573' }}>{l.label}</dt><dd className="font-semibold">{l.value}</dd></div>)}
          </dl>
        )}

        {view.rows.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px]">
              <thead>
                <tr className="text-white text-[10.5px] uppercase" style={{ background: '#0B0F14' }}>
                  <th className="text-left px-2 py-2 w-8">#</th>
                  <th className="text-left px-2 py-2">Description</th>
                  <th className="text-left px-2 py-2 w-16">Unit</th>
                  <th className="text-right px-2 py-2 w-14">Qty</th>
                  {view.showPrices && <><th className="text-right px-2 py-2 w-28">Unit price</th><th className="text-right px-2 py-2 w-28">Amount</th></>}
                </tr>
              </thead>
              <tbody>
                {view.rows.map((r, i) => (
                  <tr key={i} className="border-b" style={{ borderColor: '#E3E6EA', background: i % 2 ? '#F7F8FA' : undefined }}>
                    <td className="px-2 py-2" style={{ color: '#5B6573' }}>{i + 1}</td>
                    <td className="px-2 py-2">{r.description}</td>
                    <td className="px-2 py-2" style={{ color: '#5B6573' }}>{r.unit}</td>
                    <td className="px-2 py-2 text-right">{r.qty}</td>
                    {view.showPrices && <><td className="px-2 py-2 text-right">{formatZMW(r.unitPrice)}</td><td className="px-2 py-2 text-right">{formatZMW(r.amount)}</td></>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view.totals.length > 0 && (
          <div className="mt-3 ml-auto max-w-[280px] text-[13px]">
            {view.totals.map((t) => (
              <div key={t.label} className={`flex justify-between py-1 ${t.strong ? 'border-t-2 font-bold text-[15px] pt-2 mt-1' : ''}`} style={{ borderColor: '#0B0F14' }}>
                <span style={{ color: t.strong ? undefined : '#5B6573' }}>{t.label}</span>
                <span style={{ color: t.strong ? '#E05A10' : undefined }}>{formatZMW(t.amount)}</span>
              </div>
            ))}
          </div>
        )}

        {view.notes && <div className="mt-5"><p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#E05A10' }}>Notes</p><p className="whitespace-pre-line">{view.notes}</p></div>}

        {view.showPaymentDetails && (
          <div className="mt-5 grid sm:grid-cols-2 gap-4 border p-3" style={{ borderColor: '#E3E6EA' }}>
            {b.bank && <div><p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#E05A10' }}>Bank transfer</p><p className="whitespace-pre-line">{b.bank}</p></div>}
            {b.momo && <div><p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#E05A10' }}>Mobile money</p><p className="whitespace-pre-line">{b.momo}</p></div>}
          </div>
        )}

        {view.terms.length > 0 && (
          <div className="mt-5">
            <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#E05A10' }}>{view.termsTitle}</p>
            <ul className="list-disc pl-5 space-y-0.5" style={{ color: '#3A4250' }}>{view.terms.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </div>
        )}

        <div className="mt-10 grid sm:grid-cols-2 gap-8 text-[11px]" style={{ color: '#5B6573' }}>
          {view.signatures.map((s) => <p key={s} className="border-t pt-1.5" style={{ borderColor: '#9AA3AF' }}>{s}</p>)}
        </div>
      </div>
    </article>
  )
}
