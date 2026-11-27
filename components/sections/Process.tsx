import { SectionHeader } from '@/components/ui/SectionHeader'

/** How an engagement runs — describes the service lines already offered (no new claims). */
const STEPS = [
  { code: 'STEP-01', title: 'Assess',   body: 'Site visit and requirement capture with your engineers: equipment, constraints, downtime windows.' },
  { code: 'STEP-02', title: 'Specify',  body: 'Technical specifications, bills of quantities and feasibility, so procurement starts from the right part numbers.' },
  { code: 'STEP-03', title: 'Source',   body: 'OEM and aftermarket procurement through our supplier network, with clearing, forwarding and logistics handled.' },
  { code: 'STEP-04', title: 'Deliver',  body: 'Installation, splicing, configuration and commissioning by qualified technicians on your site.' },
  { code: 'STEP-05', title: 'Maintain', body: 'Preventive and corrective maintenance programmes, with 24/7 support to keep plant and networks running.' },
]

export function Process() {
  return (
    <section id="process" className="section relative overflow-hidden" aria-labelledby="process-title" style={{ background: 'var(--ax-ink)' }}>
      <div className="container">
        <SectionHeader
          id="process-title"
          code="OPS-00"
          eyebrow="How we deliver"
          title="From site survey"
          accent="to steady state."
          lead="One team carries the job from the first site visit to long-term maintenance, so there are no hand-offs and no gaps in accountability."
        />

        {/* Desktop: horizontal track */}
        <div className="relative hidden lg:block">
          <div className="absolute left-0 right-0 top-[11px] h-px" style={{ background: 'var(--ax-line)' }} aria-hidden />
          <div className="ax-process-line absolute left-0 right-0 top-[11px] h-px" style={{ background: 'linear-gradient(90deg, var(--ax-copper), var(--ax-cyan))' }} aria-hidden />
          <ol className="relative grid grid-cols-5 gap-6">
            {STEPS.map(s => (
              <li key={s.code} className="ax-step">
                <span className="ax-step-node block w-[23px] h-[23px] rounded-full border-2" style={{ borderColor: 'var(--ax-copper)', background: 'var(--ax-ink)' }} aria-hidden />
                <p className="ax-spec text-[10px] mt-6" style={{ color: 'var(--ax-copper)' }}>{s.code}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed" style={{ color: 'var(--ax-dim)' }}>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile / tablet: vertical track */}
        <div className="relative lg:hidden pl-10">
          <div className="absolute left-[11px] top-2 bottom-2 w-px" style={{ background: 'var(--ax-line)' }} aria-hidden />
          <div className="ax-process-vline absolute left-[11px] top-2 bottom-2 w-px" style={{ background: 'linear-gradient(180deg, var(--ax-copper), var(--ax-cyan))' }} aria-hidden />
          <ol className="space-y-10">
            {STEPS.map(s => (
              <li key={s.code} className="ax-step relative">
                <span className="ax-step-node absolute -left-10 top-0.5 block w-[23px] h-[23px] rounded-full border-2" style={{ borderColor: 'var(--ax-copper)', background: 'var(--ax-ink)' }} aria-hidden />
                <p className="ax-spec text-[10px]" style={{ color: 'var(--ax-copper)' }}>{s.code}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed" style={{ color: 'var(--ax-dim)' }}>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/** Giant outlined discipline names streaming in opposite directions (pure CSS). */
export function KineticBand() {
  const a = ['Mechanical', 'Electrical', 'IT Systems', 'Fibre Optics']
  const b = ['Mining', 'Energy', 'Manufacturing', 'Telecoms', 'Infrastructure']
  const row = (items: string[], hidden: boolean) =>
    items.map(t => (
      <span key={t + hidden} aria-hidden={hidden || undefined}>{t}<em aria-hidden>◆</em></span>
    ))
  return (
    <section className="ax-kinetic" aria-label="Disciplines and sectors">
      <div className="ax-kinetic-row ax-kinetic-a">{row(a, false)}{row(a, true)}</div>
      <div className="ax-kinetic-row ax-kinetic-b" aria-hidden>{row(b, true)}{row(b, true)}</div>
    </section>
  )
}
