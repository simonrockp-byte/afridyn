import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

function gearPath(cx: number, cy: number, teeth: number, ro: number, ri: number) {
  const step = (Math.PI * 2) / teeth
  const pts: string[] = []
  for (let i = 0; i < teeth; i++) {
    const a = i * step
    for (const [r, f] of [[ri, 0], [ro, 0.18], [ro, 0.48], [ri, 0.66]] as const) {
      const ang = a + step * f
      pts.push(`${(cx + Math.cos(ang) * r).toFixed(2)},${(cy + Math.sin(ang) * r).toFixed(2)}`)
    }
  }
  return `M${pts.join('L')}Z`
}

const IconMechanical = () => (
  <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <g className="gear"><path d={gearPath(50, 56, 14, 30, 25)} /><circle cx="50" cy="56" r="9" /><circle cx="50" cy="56" r="17" strokeOpacity=".4" /></g>
    <g className="gear-2" style={{ color: 'var(--ax-copper)' }}><path d={gearPath(88, 30, 9, 16, 12.5)} /><circle cx="88" cy="30" r="5" /></g>
  </svg>
)
const IconElectrical = () => (
  <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <rect x="38" y="38" width="44" height="44" strokeOpacity=".6" />
    <path d="M62 46 L52 62 H62 L56 76" style={{ color: 'var(--ax-copper)' }} stroke="currentColor" />
    {['M10 50 H38', 'M10 70 H38', 'M82 50 H110', 'M82 70 H110', 'M50 10 V38', 'M70 10 V38', 'M50 82 V110', 'M70 82 V110'].map(d => (
      <path key={d} d={d} strokeOpacity=".35" />
    ))}
    {['M10 50 H38', 'M82 70 H110', 'M50 10 V38', 'M70 82 V110'].map(d => (
      <path key={'t' + d} className="trace" d={d} stroke="var(--ax-cyan)" strokeWidth="2" />
    ))}
    {[[10, 50], [110, 70], [50, 10], [70, 110]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3" fill="currentColor" />)}
  </svg>
)
const IconIT = () => (
  <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    {[18, 46, 74].map(y => (
      <g key={y}>
        <rect x="22" y={y} width="76" height="22" />
        <path d={`M30 ${y + 11} H62`} strokeOpacity=".35" />
        <circle className="led" cx="74" cy={y + 11} r="2.6" fill="var(--ax-green)" stroke="none" />
        <circle className="led" cx="82" cy={y + 11} r="2.6" fill="var(--ax-cyan)" stroke="none" />
        <circle className="led" cx="90" cy={y + 11} r="2.6" fill="var(--ax-copper)" stroke="none" />
      </g>
    ))}
    <path d="M40 102 H80 M60 96 V102" strokeOpacity=".5" />
  </svg>
)
const FIBRE = 'M8 86 C 34 86, 34 34, 60 34 S 86 86, 112 86'
const IconFibre = () => (
  <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
    <path d={FIBRE} strokeOpacity=".35" strokeWidth="6" strokeLinecap="round" />
    <path d={FIBRE} strokeOpacity=".8" />
    <path className="pulse" d={FIBRE} stroke="var(--ax-cyan)" strokeWidth="3" strokeLinecap="round" />
    <circle cx="8" cy="86" r="4" fill="currentColor" /><circle cx="112" cy="86" r="4" fill="currentColor" />
    <path d="M52 24 L60 34 L68 24" strokeOpacity=".5" />
  </svg>
)

const DISCIPLINES = [
  {
    code: 'SYS-01', name: 'Mechanical', Icon: IconMechanical,
    body: 'Spares and preventive, predictive and corrective maintenance for plant machinery — bearings, motors and drive components.',
    tags: ['Spares supply', 'Maintenance', 'Consultation'],
  },
  {
    code: 'SYS-02', name: 'Electrical', Icon: IconElectrical,
    body: 'Switchgear, cables and instrumentation, plus electrical maintenance programmes that keep critical systems running.',
    tags: ['Switchgear', 'Instrumentation', 'Maintenance'],
  },
  {
    code: 'SYS-03', name: 'IT Systems', Icon: IconIT,
    body: 'Enterprise servers, workstations and networking equipment — procured, configured and supported.',
    tags: ['Servers', 'Networking', 'Configuration'],
  },
  {
    code: 'SYS-04', name: 'Fibre Optics', Icon: IconFibre,
    body: 'Network design, cable laying, fusion splicing, OTDR testing and ongoing maintenance of fibre networks.',
    tags: ['Design', 'Fusion splicing', 'OTDR testing'],
  },
]

export function Disciplines() {
  return (
    <section id="disciplines" className="section relative" aria-labelledby="disciplines-title" style={{ background: 'var(--ax-ink)' }}>
      <div className="container">
        <SectionHeader
          id="disciplines-title"
          code="SYS-00"
          eyebrow="Core disciplines"
          title="Four disciplines."
          accent="One accountable partner."
          lead="Integrated engineering capability for mining, manufacturing, energy and telecoms operators — so one supplier answers for the whole system."
        />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DISCIPLINES.map((d, i) => (
            <Reveal key={d.code} as="li" delay={i * 0.06}>
              <article
                className="ax-disc ax-panel ax-brackets group h-full min-h-[25rem] flex flex-col p-7 transition-colors duration-300 hover:bg-[#111821]"
                aria-labelledby={`disc-${i}`}
              >
                <div className="flex items-center justify-between">
                  <span className="ax-spec text-[10px]" style={{ color: 'var(--ax-copper)' }}>{d.code}</span>
                  <span className="ax-spec text-[10px]">0{i + 1}/04</span>
                </div>
                <div className="my-8 w-28 h-28 text-[color:var(--ax-text)]" style={{ color: 'var(--ax-text)' }}>
                  <d.Icon />
                </div>
                <h3 id={`disc-${i}`} className="font-display text-2xl font-semibold text-white">{d.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed" style={{ color: 'var(--ax-dim)' }}>{d.body}</p>
                <ul className="mt-auto pt-6 flex flex-wrap gap-2" aria-label={`${d.name} capabilities`}>
                  {d.tags.map(t => (
                    <li key={t} className="font-mono text-[10.5px] uppercase tracking-[0.12em] px-2.5 py-1 border" style={{ borderColor: 'var(--ax-line-2)', color: 'var(--ax-dim)' }}>
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
