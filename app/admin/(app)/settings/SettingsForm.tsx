'use client'
import { useActionState } from 'react'
import { Save } from 'lucide-react'
import { saveSettings } from '@/lib/admin/settings-actions'
import type { SettingsRow } from '@/db/schema'
import { TEMPLATES, templateFor, type Template } from '@/lib/admin/pdf/templates'

function F({ label, name, value, type = 'text', placeholder, hint }: { label: string; name: string; value?: string | number | null; type?: string; placeholder?: string; hint?: string }) {
  return (
    <div>
      <label htmlFor={`s-${name}`} className="ax-label">{label}</label>
      <input id={`s-${name}`} name={name} type={type} defaultValue={value ?? ''} placeholder={placeholder} className="ax-field" />
      {hint && <p className="mt-1.5 text-[12.5px]" style={{ color: 'var(--ax-faint)' }}>{hint}</p>}
    </div>
  )
}

function T({ label, name, value, placeholder, rows = 4, hint }: { label: string; name: string; value?: string | null; placeholder?: string; rows?: number; hint?: string }) {
  return (
    <div>
      <label htmlFor={`s-${name}`} className="ax-label">{label}</label>
      <textarea id={`s-${name}`} name={name} rows={rows} defaultValue={value ?? ''} placeholder={placeholder} className="ax-field resize-y" />
      {hint && <p className="mt-1.5 text-[12.5px]" style={{ color: 'var(--ax-faint)' }}>{hint}</p>}
    </div>
  )
}

/** Tiny drawing of a document in the given template. */
function Thumb({ t }: { t: Template }) {
  const bar = (w: string, c: string, h = 3) => <div style={{ width: w, height: h, background: c, borderRadius: 1 }} />
  return (
    <div className="aspect-[1/1.25] w-full bg-white rounded-md ring-1 ring-black/10 overflow-hidden flex flex-col" aria-hidden>
      {t.header === 'dark' ? (
        <>
          <div className="flex justify-between items-center px-2.5 py-2" style={{ background: t.primary }}>{bar('38%', '#fff', 4)}{bar('22%', t.accent, 5)}</div>
          <div style={{ height: 2, background: t.accent }} />
        </>
      ) : (
        <div className="px-2.5 pt-2.5">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm" style={{ background: t.id === 'minimal' ? '#111' : '#3F6B19' }} />{bar('34px', t.primary, 4)}</div>
            {bar('26%', t.primary, 5)}
          </div>
          <div className="flex mt-1.5" style={{ height: t.header === 'minimal' ? 1 : 2 }}><div className="w-1/4" style={{ background: t.accent }} /><div className="flex-1" style={{ background: t.primary }} /></div>
        </div>
      )}
      <div className="px-2.5 pt-2 flex justify-between gap-2">
        <div className="w-[52%] p-1.5 space-y-1" style={{ background: t.panel ?? undefined, borderLeft: t.panel ? `2px solid ${t.accent}` : undefined }}>{bar('60%', t.label, 2)}{bar('90%', '#9aa3af', 2)}{bar('70%', '#c9ced6', 2)}</div>
        <div className="w-[36%] space-y-1">{bar('100%', '#d6dae0', 2)}{bar('100%', '#d6dae0', 2)}<div className="h-3.5 mt-1" style={t.total.bg ? { background: t.total.bg } : { border: '1px solid #111' }} /></div>
      </div>
      <div className="px-2.5 pt-2">
        <div className="h-2" style={{ background: t.tableHead.bg ?? undefined, borderBottom: t.tableHead.borderBottom ? `1px solid ${t.tableHead.borderBottom}` : undefined }} />
        {[0, 1, 2, 3].map((i) => <div key={i} className="h-2" style={{ background: t.zebra && i % 2 ? t.zebra : undefined, borderBottom: `1px solid ${t.line}` }} />)}
        <div className="flex justify-end mt-1.5"><div className="w-[44%] h-2.5" style={t.total.bg ? { background: t.total.bg } : { borderTop: '1px solid #111', borderBottom: '1px solid #111' }} /></div>
      </div>
      <div className="mt-auto flex justify-end px-2.5 pb-1.5"><div className="w-4 h-4" style={{ background: 'repeating-conic-gradient(#0B1220 0 25%, #fff 0 50%) 0 0/4px 4px' }} /></div>
      <div className="h-1.5" style={{ background: t.footer.bg ?? undefined, borderTop: t.footer.bg ? undefined : `1px solid ${t.line}` }} />
    </div>
  )
}

export function SettingsForm({ s, defaults }: { s: SettingsRow | null; defaults: { quote: string; invoice: string; delivery: string; receipt: string } }) {
  const [state, action, pending] = useActionState(saveSettings, null)
  return (
    <form action={action} className="space-y-4">
      <section className="ax-panel p-5 md:p-6">
        <h2 className="ax-spec mb-1" style={{ color: 'var(--ax-text)' }}>Document design</h2>
        <p className="text-[13px] mb-4" style={{ color: 'var(--ax-dim)' }}>Used for every quotation, invoice, receipt, delivery note, credit note and statement — on screen and in the PDF. Every design has the amount in words, a verification QR code and PAID / VOID stamps.</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {Object.values(TEMPLATES).map((t) => (
            <label key={t.id} className="relative cursor-pointer rounded-lg p-3 border transition-colors has-[:checked]:border-[var(--ax-copper)] has-[:checked]:bg-[color-mix(in_srgb,var(--ax-copper)_7%,transparent)] has-[:focus-visible]:outline has-[:focus-visible]:outline-2" style={{ borderColor: 'var(--ax-line)' }}>
              <input type="radio" name="documentTemplate" value={t.id} defaultChecked={templateFor(s?.documentTemplate).id === t.id} className="sr-only peer" />
              <Thumb t={t} />
              <p className="mt-3 font-semibold text-[15px] flex items-center gap-2" style={{ color: 'var(--ax-text)' }}>
                {t.name}
                <span className="hidden peer-checked:inline text-[11px] font-mono uppercase tracking-wider" style={{ color: 'var(--ax-copper)' }}>· Selected</span>
              </p>
              <p className="text-[12.5px] mt-1" style={{ color: 'var(--ax-dim)' }}>{t.blurb}</p>
            </label>
          ))}
        </div>
      </section>

      <section className="ax-panel p-5 md:p-6">
        <h2 className="ax-spec mb-4" style={{ color: 'var(--ax-text)' }}>Company details (printed on every document)</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <F label="Business name *" name="businessName" value={s?.businessName ?? 'Afridyn Engineering Limited'} />
          <F label="Tagline" name="tagline" value={s?.tagline} placeholder="Mechanical · Electrical · IT · Fibre Optics" />
          <F label="Phone" name="phone" value={s?.phone ?? '+260 977 244 549'} />
          <F label="WhatsApp" name="whatsapp" value={s?.whatsapp ?? '+260977244549'} />
          <F label="Email" name="email" type="email" value={s?.email} placeholder="info@afridyn.world" />
          <F label="Address" name="address" value={s?.address ?? '31 Salama Park, Lusaka, Zambia'} />
          <F label="TPIN" name="tpin" value={s?.tpin ?? '2004257975'} />
          <F label="PACRA no." name="pacraNumber" value={s?.pacraNumber ?? '120261040695'} />
          <F label="ZPPA no." name="zppaNumber" value={s?.zppaNumber ?? '137269'} />
        </div>
      </section>

      <section className="ax-panel p-5 md:p-6">
        <h2 className="ax-spec mb-1" style={{ color: 'var(--ax-text)' }}>How clients pay you</h2>
        <p className="text-[13px] mb-4" style={{ color: 'var(--ax-dim)' }}>Shown in a box on quotations, proformas and invoices. Leave both empty to hide it.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <T label="Bank transfer details" name="bankDetails" value={s?.bankDetails} placeholder={'Bank: …\nAccount name: Afridyn Engineering Limited\nAccount no.: …\nBranch / sort code: …'} rows={5} />
          <T label="Mobile money details" name="mobileMoneyDetails" value={s?.mobileMoneyDetails} placeholder={'MTN MoMo: …\nAirtel Money: …\nName: Afridyn Engineering Limited'} rows={5} />
        </div>
      </section>

      <section className="ax-panel p-5 md:p-6">
        <h2 className="ax-spec mb-1" style={{ color: 'var(--ax-text)' }}>Standard terms (one per line)</h2>
        <p className="text-[13px] mb-4" style={{ color: 'var(--ax-dim)' }}>Filled into new documents automatically; you can still edit them per document. Empty = the default shown greyed out.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <T label="Quotations & proformas" name="quoteTerms" value={s?.quoteTerms} placeholder={defaults.quote} />
          <T label="Invoices" name="invoiceTerms" value={s?.invoiceTerms} placeholder={defaults.invoice} />
          <T label="Delivery notes" name="deliveryTerms" value={s?.deliveryTerms} placeholder={defaults.delivery} />
          <T label="Receipt note" name="receiptFooter" value={s?.receiptFooter} placeholder={defaults.receipt} rows={2} />
        </div>
      </section>

      <section className="ax-panel p-5 md:p-6">
        <h2 className="ax-spec mb-4" style={{ color: 'var(--ax-text)' }}>Defaults</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <F label="Quotes valid for (days)" name="quoteValidityDays" type="number" value={s?.quoteValidityDays ?? 30} />
          <F label="Invoices due after (days)" name="invoiceDueDays" type="number" value={s?.invoiceDueDays ?? 30} />
          <div>
            <label htmlFor="s-taxMode" className="ax-label">Tax</label>
            <select id="s-taxMode" name="taxMode" defaultValue={s?.taxMode ?? 'TOT'} className="ax-field">
              <option value="TOT">Turnover tax — no VAT line</option>
              <option value="VAT16">VAT registered — add 16% VAT</option>
            </select>
            <p className="mt-1.5 text-[12.5px]" style={{ color: 'var(--ax-faint)' }}>Applies to new documents only. Only switch to VAT once Afridyn is VAT-registered with ZRA.</p>
          </div>
        </div>
      </section>

      <div className="flex items-center gap-4">
        <button className="ax-btn ax-btn-copper disabled:opacity-60" disabled={pending}><Save size={16} aria-hidden /> {pending ? 'Saving…' : 'Save settings'}</button>
        {state?.ok && <p role="status" className="text-[14px]" style={{ color: 'var(--ax-green)' }}>Saved.</p>}
        {state?.error && <p role="alert" className="text-[14px]" style={{ color: 'var(--ax-error)' }}>{state.error}</p>}
      </div>
    </form>
  )
}
