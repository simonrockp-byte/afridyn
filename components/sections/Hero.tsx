import { ArrowRight, ArrowDownRight } from 'lucide-react'
import { HeroBackdrop } from '@/components/hero/HeroBackdrop'
import { COMPANY } from '@/lib/site'

const READOUTS = [
  { k: 'Disciplines',   v: '04' },
  { k: 'Service lines', v: '08' },
  { k: 'Base',          v: 'Lusaka, ZM' },
  { k: 'Coverage',      v: 'Sub-Saharan Africa' },
]

const TELEMETRY = [
  `PACRA ${COMPANY.pacra}`,
  `ZPPA ${COMPANY.zppa}`,
  `TPIN ${COMPANY.tpin}`,
  'Lusaka, Zambia',
  '24/7 Support',
  'Response < 24h',
  'Mechanical · Electrical · IT · Fibre Optics',
]

function Telemetry() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {TELEMETRY.map(t => (
        <li key={t} className="flex items-center gap-6 pr-6 ax-spec whitespace-nowrap" style={{ color: 'var(--ax-text)' }}>
          <span>{t}</span>
          <span style={{ color: 'var(--ax-copper)' }} aria-hidden>◆</span>
        </li>
      ))}
    </ul>
  )
  return (
    <div className="relative z-10 border-y bg-[#07090D]/90" style={{ borderColor: 'var(--ax-line)' }}>
      <div className="flex items-stretch">
        <div className="flex items-center gap-2.5 px-4 md:px-6 py-3 border-r shrink-0 bg-[#07090D]" style={{ borderColor: 'var(--ax-line)' }}>
          <span className="ax-led" aria-hidden />
          <span className="ax-spec" style={{ color: 'var(--ax-green)' }}>Systems online</span>
          <span className="ax-spec hidden sm:inline tabular-nums" style={{ color: 'var(--ax-text)' }}>LSK <span data-clock suppressHydrationWarning>--:--:--</span> CAT</span>
        </div>
        <div className="ax-ticker-wrap relative flex-1 overflow-hidden py-3" role="marquee" aria-label="Company registration and service facts">
          <div className="ax-ticker">
            {row(false)}
            {row(true)}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden" style={{ background: 'var(--ax-ink)' }} aria-labelledby="hero-title">
      <div className="relative min-h-[100svh] flex flex-col">
        <HeroBackdrop />
        <div className="ax-scan" aria-hidden />
        <div className="ax-hud ax-hud-tl hidden md:block" aria-hidden><span>15.39°S 28.32°E</span></div>
        <div className="ax-hud ax-hud-tr hidden md:block" aria-hidden><span>GRID REF · LUSAKA HQ</span></div>
        <div className="ax-hud ax-hud-bl hidden md:block" aria-hidden><span>ELEV 1,279 M</span></div>
        <div className="ax-hud ax-hud-br hidden md:block" aria-hidden><span>CAT · UTC+2</span></div>

        {/* legibility scrims (static) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden
          style={{ background: 'linear-gradient(90deg, rgba(7,9,13,0.94) 0%, rgba(7,9,13,0.7) 40%, rgba(7,9,13,0) 72%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none" aria-hidden
          style={{ background: 'linear-gradient(0deg, #07090D, transparent)' }} />

        <div className="container relative z-10 flex-1 flex items-center pt-32 pb-16 md:pt-36 md:pb-20">
          <div className="max-w-[44rem]">
            <p className="ax-spec mb-6 flex items-center gap-3">
              <span className="inline-block w-2 h-2 border rotate-45" style={{ borderColor: 'var(--ax-copper)' }} aria-hidden />
              <span data-scramble>SYS-00 / Afridyn Engineering Limited — Lusaka, ZM</span>
            </p>

            <h1
              id="hero-title"
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(2.75rem, 7.4vw, 6.25rem)', lineHeight: 0.95, letterSpacing: '-0.045em' }}
            >
              Powering Africa&apos;s <span className="ax-accent">Industrial</span> Future.
            </h1>

            <p className="ax-lead mt-7 max-w-xl text-[1.05rem] md:text-[1.15rem]">
              Mechanical, electrical, IT and fibre optic engineering for mining, manufacturing,
              energy and infrastructure — from our base in Lusaka to sites across Zambia and
              Sub-Saharan Africa.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a href="#contact" data-magnetic className="ax-btn ax-btn-copper">
                Get a Quote <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
              </a>
              <a href="#services" data-magnetic className="ax-btn ax-btn-ghost">
                Explore Services <ArrowDownRight size={16} strokeWidth={2} aria-hidden />
              </a>
            </div>

            <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 border-t max-w-2xl" style={{ borderColor: 'var(--ax-line)' }}>
              {READOUTS.map((r, i) => (
                <div key={r.k} className={`pt-4 pr-4 ${i > 0 ? 'md:border-l md:pl-4' : ''}`} style={{ borderColor: 'var(--ax-line)' }}>
                  <dt className="ax-spec text-[10px]">{r.k}</dt>
                  <dd className="font-mono text-[15px] text-white mt-1.5">{r.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <Telemetry />
      </div>
    </section>
  )
}
