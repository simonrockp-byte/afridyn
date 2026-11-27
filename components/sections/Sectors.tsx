import { Pickaxe, Factory, Zap, Server, RadioTower } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { Counter } from '@/components/motion/Counter'
import { SectionHeader } from '@/components/ui/SectionHeader'

const industries = [
  'Mining & Mineral Processing',
  'Manufacturing & Industrial',
  'Energy, Power & Water',
  'Telecommunications',
  'Infrastructure & Construction',
  'Supply Chain & Commerce',
  'Public Sector & Government',
]

const tile = 'ax-panel ax-brackets p-6 md:p-7 flex flex-col h-full transition-colors duration-300 hover:bg-[#111821]'

export function Sectors() {
  return (
    <section id="sectors" className="section relative" aria-labelledby="sectors-title" style={{ background: 'var(--ax-ink-2)' }}>
      <div className="absolute inset-0 ax-grid opacity-40 pointer-events-none" aria-hidden />
      <div className="container relative">
        <SectionHeader
          id="sectors-title"
          code="IND-00"
          eyebrow="Industries we serve"
          title="Driving growth in"
          accent="critical sectors."
        />

        <ul className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
          {/* Mining — feature tile with the one real statistic */}
          <Reveal as="li" className="md:col-span-2 md:row-span-2">
            <article className={`${tile} justify-between min-h-[22rem]`} style={{ background: 'radial-gradient(ellipse 80% 60% at 80% 20%, rgba(255,106,26,0.12), transparent 60%), linear-gradient(180deg, rgba(17,24,33,0.9), rgba(11,15,21,0.9))' }}>
              <div className="flex items-center justify-between">
                <Pickaxe size={28} strokeWidth={1.5} style={{ color: 'var(--ax-copper)' }} aria-hidden />
                <span className="ax-spec text-[10px]">IND-01</span>
              </div>
              <div>
                <p className="font-display font-bold leading-none text-white" style={{ fontSize: 'clamp(4.5rem, 10vw, 8rem)', letterSpacing: '-0.05em' }}>
                  <Counter to={60} suffix="%" />
                </p>
                <p className="ax-spec mt-2" style={{ color: 'var(--ax-copper)' }}>of our work is in mining</p>
                <h3 className="mt-6 font-display text-3xl font-semibold text-white">Mining</h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed" style={{ color: 'var(--ax-dim)' }}>
                  Maintenance, spares &amp; workforce for major African mining operations.
                </p>
              </div>
            </article>
          </Reveal>

          {[
            { Icon: Factory,    code: 'IND-02', label: 'Manufacturing',   desc: 'Operational efficiency and spare parts for production facilities.', tag: 'Multi-sector' },
            { Icon: Zap,        code: 'IND-03', label: 'Energy',          desc: 'Engineering solutions for power generation and distribution.', tag: 'Infrastructure' },
            { Icon: Server,     code: 'IND-04', label: 'Commercial / IT', desc: 'IT equipment and technical outsourcing for growing businesses.', tag: 'Enterprise grade' },
            { Icon: RadioTower, code: 'IND-05', label: 'Telecoms',        desc: 'Optical fibre installation and 24/7 network maintenance.', tag: 'Pan-African' },
          ].map((s, i) => (
            <Reveal key={s.label} as="li" delay={0.05 + i * 0.05}>
              <article className={tile}>
                <div className="flex items-center justify-between">
                  <s.Icon size={24} strokeWidth={1.5} style={{ color: 'var(--ax-cyan)' }} aria-hidden />
                  <span className="ax-spec text-[10px]">{s.code}</span>
                </div>
                <h3 className="mt-8 font-display text-xl font-semibold text-white">{s.label}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed" style={{ color: 'var(--ax-dim)' }}>{s.desc}</p>
                <span className="mt-auto pt-5 ax-spec text-[10px]" style={{ color: 'var(--ax-text)' }}>{s.tag}</span>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 flex flex-col md:flex-row md:items-center gap-5 border-t pt-8 border-[color:var(--ax-line)]">
          <h3 className="ax-spec shrink-0" style={{ color: 'var(--ax-text)' }}>Industry coverage</h3>
          <ul className="flex flex-wrap gap-2">
            {industries.map(v => (
              <li key={v} className="text-[13.5px] px-3 py-1.5 border" style={{ borderColor: 'var(--ax-line-2)', color: 'var(--ax-dim)' }}>{v}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
