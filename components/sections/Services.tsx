'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'

export const SERVICE_EVENT = 'afridyn:select-service'

const services = [
  {
    title: 'Mechanical & Electrical Spares',
    form:  'Mechanical & Electrical Spares Supply',
    short: 'OEM-quality components for industrial machinery and electrical systems.',
    desc:  'We source and supply high-quality mechanical and electrical spare parts including bearings, motors, cables, switchgear, and instrumentation.',
    features: ['OEM & aftermarket parts', 'Rapid procurement', 'Quality certified', 'Technical guidance'],
    sector: 'Industrial',
    image: '/images/services/spares.png',
  },
  {
    title: 'Maintenance Services',
    form:  'Mechanical & Electrical Maintenance Services',
    short: 'Preventive and corrective maintenance to maximise plant uptime.',
    desc:  'Our certified technicians deliver preventive, predictive, and corrective maintenance programs for mechanical and electrical systems.',
    features: ['Preventive programs', 'Emergency response', 'CMMS integration', 'SLA-backed service'],
    sector: 'Mining / Industrial',
    image: '/images/services/maintenance.png',
  },
  {
    title: 'Engineering Consultation',
    form:  'Engineering Project Consultation',
    short: 'Strategic technical advisory and project management services.',
    desc:  'Expert engineering consultants providing feasibility studies, technical specifications, and execution oversight.',
    features: ['Feasibility studies', 'Project management', 'Risk assessment', 'Design & specification'],
    sector: 'Multi-sector',
    image: '/images/services/consultation.png',
  },
  {
    title: 'IT Equipment Supply',
    form:  'IT Equipment Supply',
    short: 'Enterprise-grade hardware, servers, and infrastructure solutions.',
    desc:  'Procurement and supply of enterprise IT equipment including servers, workstations, and networking devices.',
    features: ['Enterprise hardware', 'Network infrastructure', 'Configuration & setup', 'Warranty & support'],
    sector: 'Commercial / Industrial',
    image: '/images/services/it_supply.png',
  },
  {
    title: 'Optical Fibre Services',
    form:  'Optical Fibre Installation & Splicing',
    short: 'Design, installation, splicing, and maintenance of fibre networks.',
    desc:  'Full-service capabilities including network design, cable laying, fusion splicing, and maintenance.',
    features: ['Network design', 'Fusion splicing', 'OTDR testing', '24/7 maintenance'],
    sector: 'Telecoms / Infrastructure',
    image: '/images/services/fibre.png',
  },
  {
    title: 'Technical Outsourcing',
    form:  'Technical Outsourcing Services',
    short: 'Qualified engineering personnel on flexible contract terms.',
    desc:  'Access specialised engineering skills on demand — vetted, experienced technical personnel across all disciplines.',
    features: ['Vetted professionals', 'All disciplines', 'Flexible contracts', 'Skills transfer'],
    sector: 'All Sectors',
    image: '/images/services/technical_outsourcing.png',
  },
  {
    title: 'Logistics Consultancy',
    form:  'Logistics & Supply Chain Consultancy',
    short: 'End-to-end supply chain analysis and optimisation.',
    desc:  'We analyse, design, and optimise supply chains and transportation networks for maximum efficiency.',
    features: ['Route optimisation', 'Cost reduction', 'Vendor management', 'KPI dashboards'],
    sector: 'Mining / Commercial',
    image: '/images/services/logistics.png',
  },
  {
    title: 'Clearing & Forwarding',
    form:  'Clearing & Forwarding Advisory',
    short: 'Seamless customs clearance and international freight management.',
    desc:  'Complete customs brokerage and freight forwarding ensuring goods cross borders efficiently.',
    features: ['Customs clearance', 'Full documentation', 'Freight forwarding', 'Track & trace'],
    sector: 'Import / Export',
    image: '/images/services/clearing_forwarding.png',
  },
]

export function Services() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = services.length
    const next =
      e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (i + 1) % n :
      e.key === 'ArrowUp'   || e.key === 'ArrowLeft'  ? (i - 1 + n) % n :
      e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1
    if (next < 0) return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="services" className="section relative" aria-labelledby="services-title" style={{ background: 'var(--ax-ink-2)' }}>
      <div className="absolute inset-0 ax-grid opacity-40 pointer-events-none" aria-hidden />
      <div className="container relative">
        <SectionHeader
          id="services-title"
          code="SVC-00"
          eyebrow="Services"
          title="Technical capability,"
          accent="end to end."
          lead="Eight service lines covering supply, maintenance, advisory, people and logistics. Select a service to see the scope."
        />

        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-4 lg:gap-6 items-start">
          {/* Tab list */}
          <div role="tablist" aria-label="Services" aria-orientation="vertical" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 border" style={{ borderColor: 'var(--ax-line)' }}>
            {services.map((s, i) => {
              const on = i === active
              return (
                <button
                  key={s.title}
                  ref={el => { tabs.current[i] = el }}
                  role="tab"
                  id={`svc-tab-${i}`}
                  aria-selected={on}
                  aria-controls={`svc-panel-${i}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => {
                    setActive(i)
                    if (window.innerWidth < 1024) {
                      requestAnimationFrame(() => document.getElementById(`svc-panel-${i}`)?.scrollIntoView({ block: 'start' }))
                    }
                  }}
                  onKeyDown={e => onKey(e, i)}
                  className="relative text-left flex items-center gap-4 px-5 py-4 border-b transition-colors"
                  style={{
                    borderColor: 'var(--ax-line)',
                    background: on ? 'rgba(255,106,26,0.08)' : 'transparent',
                  }}
                >
                  <span className="absolute left-0 top-0 bottom-0 w-[2px] transition-opacity" style={{ background: 'var(--ax-copper)', opacity: on ? 1 : 0 }} aria-hidden />
                  <span className="font-mono text-[11px] tracking-[0.14em] w-14 shrink-0" style={{ color: on ? 'var(--ax-copper)' : 'var(--ax-faint)' }}>
                    SVC-{String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-display font-semibold text-[16px] text-white lg:truncate">{s.title}</span>
                    <span className="hidden sm:block text-[13px] truncate" style={{ color: 'var(--ax-dim)' }}>{s.short}</span>
                  </span>
                  <ArrowRight size={16} aria-hidden className="shrink-0 transition-transform" style={{ color: on ? 'var(--ax-copper)' : 'var(--ax-faint)', transform: on ? 'translateX(2px)' : 'none' }} />
                </button>
              )
            })}
          </div>

          {/* Panels (all in DOM for indexing; inactive ones hidden) */}
          <div className="lg:sticky lg:top-24">
            {services.map((s, i) => (
              <div
                key={s.title}
                role="tabpanel"
                id={`svc-panel-${i}`}
                aria-labelledby={`svc-tab-${i}`}
                hidden={i !== active}
                tabIndex={0}
                className="ax-panel ax-brackets"
              >
                <div className="relative aspect-[16/8] overflow-hidden border-b" style={{ borderColor: 'var(--ax-line)' }}>
                  <Image
                    src={s.image}
                    alt={`${s.title} — Afridyn Engineering`}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(7,9,13,0.85), rgba(7,9,13,0.1) 60%)' }} aria-hidden />
                  <span className="absolute left-5 bottom-4 ax-spec text-[10px] px-2 py-1 bg-[#07090D]/80 border" style={{ borderColor: 'var(--ax-line-2)', color: 'var(--ax-text)' }}>
                    Sector · {s.sector}
                  </span>
                  <span className="absolute right-5 bottom-4 ax-spec text-[10px]" style={{ color: 'var(--ax-copper)' }}>
                    SVC-{String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="p-7 md:p-9">
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-white">{s.title}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed" style={{ color: 'var(--ax-dim)' }}>{s.desc}</p>
                  <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {s.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-[15px] text-white">
                        <span className="w-5 h-5 grid place-items-center border shrink-0" style={{ borderColor: 'var(--ax-cyan)', color: 'var(--ax-cyan)' }}>
                          <Check size={12} strokeWidth={3} aria-hidden />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    onClick={() => window.dispatchEvent(new CustomEvent(SERVICE_EVENT, { detail: s.form }))}
                    className="ax-btn ax-btn-copper mt-8"
                  >
                    Request Consultation <ArrowRight size={16} aria-hidden />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
