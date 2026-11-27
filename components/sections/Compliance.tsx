import { ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { COMPANY } from '@/lib/site'

const PLATES = [
  { org: 'PACRA', label: 'Company registration', value: COMPANY.pacra, note: 'Patents and Companies Registration Agency' },
  { org: 'ZPPA',  label: 'Supplier registration', value: COMPANY.zppa,  note: 'Zambia Public Procurement Authority' },
  { org: 'TPIN',  label: 'Taxpayer identification', value: COMPANY.tpin, note: 'Zambia Revenue Authority' },
]

export function Compliance() {
  return (
    <section id="compliance" aria-labelledby="compliance-title" className="relative border-y overflow-hidden" style={{ borderColor: 'var(--ax-line)', background: 'linear-gradient(180deg, #0B0F15, #07090D)' }}>
      <div className="ax-ticks absolute top-0 inset-x-0" aria-hidden />
      <div className="container py-16 md:py-20">
        <div className="grid lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-3 py-2 border" style={{ borderColor: 'var(--ax-green)', color: 'var(--ax-green)' }}>
              <ShieldCheck size={18} aria-hidden />
              <span className="font-mono text-[12px] font-semibold tracking-[0.22em] uppercase">Verified supplier</span>
            </div>
            <h2 id="compliance-title" className="ax-h2 mt-6 !text-[clamp(1.75rem,3.2vw,2.6rem)]">
              Registered, compliant and <span className="ax-accent">procurement-ready.</span>
            </h2>
            <p className="ax-lead mt-4">
              Fully registered with PACRA, ZPPA and ZRA — ready for public tenders and
              corporate vendor onboarding.
            </p>
          </Reveal>

          <ul className="grid sm:grid-cols-3 gap-4">
            {PLATES.map((p, i) => (
              <Reveal key={p.org} as="li" delay={i * 0.07}>
                <div
                  className="relative h-full p-5 pt-6"
                  style={{
                    background: 'linear-gradient(145deg, #1A222D 0%, #0F141B 55%, #161D26 100%)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.6), 0 10px 30px rgba(0,0,0,0.35)',
                  }}
                >
                  {/* rivets */}
                  {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map(pos => (
                    <span key={pos} className={`absolute ${pos} w-1.5 h-1.5 rounded-full`} style={{ background: '#3A4553', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.25)' }} aria-hidden />
                  ))}
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-2xl font-bold" style={{ color: 'var(--ax-copper)' }}>{p.org}</span>
                    <span className="ax-spec text-[10px]">Reg.</span>
                  </div>
                  <p className="ax-spec text-[10px] mt-1">{p.label}</p>
                  <p className="mt-4 font-mono text-[19px] text-white tracking-[0.08em] tabular-nums break-all">{p.value}</p>
                  <p className="mt-3 text-[12.5px] leading-snug" style={{ color: 'var(--ax-faint)' }}>{p.note}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
