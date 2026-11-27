'use client'
import { useActionState } from 'react'
import { Save } from 'lucide-react'
import { saveSettings } from '@/lib/admin/settings-actions'
import type { SettingsRow } from '@/db/schema'

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

export function SettingsForm({ s, defaults }: { s: SettingsRow | null; defaults: { quote: string; invoice: string; delivery: string; receipt: string } }) {
  const [state, action, pending] = useActionState(saveSettings, null)
  return (
    <form action={action} className="space-y-4">
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
        {state?.error && <p role="alert" className="text-[14px]" style={{ color: '#FFB27A' }}>{state.error}</p>}
      </div>
    </form>
  )
}
