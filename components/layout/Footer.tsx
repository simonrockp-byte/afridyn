import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { COMPANY, SERVICE_NAMES } from '@/lib/site'

const company = [
  { label: 'About',            id: 'about' },
  { label: 'Sectors',          id: 'sectors' },
  { label: 'Why Afridyn',      id: 'why-us' },
  { label: 'Projects',         id: 'projects' },
  { label: 'Request a quote',  id: 'contact' },
]

export function Footer() {
  // `/#id` works everywhere: on the home page the browser just scrolls to the section.
  const href = (id: string) => `/#${id}`

  return (
    <footer className="relative overflow-hidden border-t" style={{ background: '#05070A', borderColor: 'var(--ax-line)' }}>
      <div className="absolute inset-0 ax-grid opacity-60 pointer-events-none" aria-hidden />
      <div className="ax-ticks absolute top-0 inset-x-0" aria-hidden />

      <div className="container relative pt-16 md:pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Logo size="lg" />
            <p className="mt-6 max-w-sm text-[14.5px] leading-relaxed" style={{ color: 'var(--ax-dim)' }}>
              Integrated mechanical, electrical, IT and fibre optic engineering for mining,
              energy and industry across Zambia and Sub-Saharan Africa.
            </p>
            <dl className="mt-6 max-w-sm border divide-y" style={{ borderColor: 'var(--ax-line)' }}>
              {[['PACRA', COMPANY.pacra], ['ZPPA', COMPANY.zppa], ['TPIN', COMPANY.tpin]].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-4 px-3 py-2 border-[color:var(--ax-line)]">
                  <dt className="ax-spec text-[10px]" style={{ color: 'var(--ax-copper)' }}>{k}</dt>
                  <dd className="font-mono text-[13px] text-white tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-labelledby="ft-services">
            <h2 id="ft-services" className="ax-spec" style={{ color: 'var(--ax-text)' }}>Services</h2>
            <ul className="mt-5 space-y-2.5">
              {SERVICE_NAMES.map(s => (
                <li key={s}>
                  <a href={href('services')} className="text-[14px] hover:text-white transition-colors" style={{ color: 'var(--ax-dim)' }}>{s}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="ft-company">
            <h2 id="ft-company" className="ax-spec" style={{ color: 'var(--ax-text)' }}>Company</h2>
            <ul className="mt-5 space-y-2.5">
              {company.map(l => (
                <li key={l.id}>
                  <a href={href(l.id)} className="text-[14px] hover:text-white transition-colors" style={{ color: 'var(--ax-dim)' }}>{l.label}</a>
                </li>
              ))}
              <li><Link href="/shop" className="text-[14px] hover:text-white transition-colors" style={{ color: 'var(--ax-dim)' }}>Industrial supplies shop</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="ax-spec" style={{ color: 'var(--ax-text)' }}>Head office</h2>
            <address className="not-italic mt-5 space-y-4 text-[14.5px]">
              <p className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--ax-copper)' }} aria-hidden />
                <span className="text-white">{COMPANY.street}<br />{COMPANY.city}, {COMPANY.country}</span></p>
              <p className="flex gap-3"><Phone size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--ax-copper)' }} aria-hidden />
                <a href={`tel:${COMPANY.phoneE164}`} className="text-white hover:underline underline-offset-4">{COMPANY.phone}</a></p>
              <p className="flex gap-3"><Mail size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--ax-copper)' }} aria-hidden />
                <a href={`mailto:${COMPANY.email}`} className="text-white hover:underline underline-offset-4 break-all">{COMPANY.email}</a></p>
            </address>
            <p className="mt-6 inline-flex items-center gap-2.5 ax-spec text-[10px]" style={{ color: 'var(--ax-green)' }}>
              <span className="ax-led" aria-hidden /> 24/7 support line
            </p>
          </div>
        </div>

        <p className="ax-wordmark mt-16 -mb-2" aria-hidden>AFRIDYN</p>

        <div className="mt-6 pt-6 border-t flex flex-col md:flex-row gap-3 md:items-center md:justify-between" style={{ borderColor: 'var(--ax-line)' }}>
          <p className="text-[13px]" style={{ color: 'var(--ax-faint)' }}>
            © {new Date().getFullYear()} <span className="text-white">{COMPANY.name}</span>. All rights reserved.
          </p>
          <p className="ax-spec text-[10px]">DWG-AFR-001 · Rev {new Date().getFullYear()} · Lusaka, ZM</p>
        </div>
      </div>
    </footer>
  )
}
