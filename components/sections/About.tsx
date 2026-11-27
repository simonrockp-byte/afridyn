import Image from 'next/image'
import { Zap, Shield, Target, Globe } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

const pillars = [
  { icon: Zap,    title: 'Innovation',  desc: 'Modern engineering methods and technologies applied to complex industrial challenges.' },
  { icon: Shield, title: 'Integrity',   desc: 'Transparent operations backed by full PACRA, TPIN, and ZPPA regulatory compliance.' },
  { icon: Target, title: 'Precision',   desc: 'International-standard engineering execution on every project — zero tolerance for mediocrity.' },
  { icon: Globe,  title: 'Pan-African', desc: 'Local knowledge, pan-African capability. Headquartered in Lusaka, Zambia.' },
]

export function About() {
  return (
    <section id="about" className="section relative" aria-labelledby="about-title" style={{ background: 'var(--ax-ink)' }}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-start">
          <div>
            <SectionHeader
              id="about-title"
              code="ORG-01"
              eyebrow="Corporate profile"
              title="Africa's trusted"
              accent="engineering partner."
            />
            <Reveal>
              <p className="ax-lead -mt-6">
                Afridyn Engineering Limited delivers integrated engineering services spanning
                mechanical, electrical, IT, optical fibre, and logistics across Sub-Saharan Africa.
              </p>
              <p className="ax-lead mt-4">
                Founded in Lusaka, Zambia, we are dedicated to building a resilient infrastructure
                foundation for the continent through precision and modern methodology.
              </p>
            </Reveal>

            <ul className="mt-10 grid sm:grid-cols-2 border-t border-l" style={{ borderColor: 'var(--ax-line)' }}>
              {pillars.map((p, i) => (
                <Reveal key={p.title} as="li" delay={i * 0.05} className="border-r border-b border-[color:var(--ax-line)] p-6">
                  <div>
                    <p.icon size={20} strokeWidth={1.6} style={{ color: 'var(--ax-copper)' }} aria-hidden />
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed" style={{ color: 'var(--ax-dim)' }}>{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <Reveal className="relative aspect-[4/3] overflow-hidden ax-panel ax-brackets">
              <Image
                src="/images/services/maintenance.png"
                alt="Afridyn technicians carrying out industrial maintenance"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(7,9,13,0.8), transparent 55%)' }} aria-hidden />
              <span className="absolute left-5 bottom-5 ax-spec text-[10px] px-2 py-1 bg-[#07090D]/80 border" style={{ borderColor: 'var(--ax-line-2)', color: 'var(--ax-text)' }}>
                Pan-African capability · HQ Lusaka
              </span>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Our Mission', code: 'M-01', text: 'Reliable engineering support that enhances operational efficiency and supports African industrial development.' },
                { label: 'Our Vision',  code: 'V-01', text: "To be the most trusted technical solutions provider for Africa's most demanding sectors." },
              ].map((c, i) => (
                <Reveal key={c.label} delay={i * 0.06} className="ax-panel p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="ax-spec" style={{ color: 'var(--ax-copper)' }}>{c.label}</h3>
                    <span className="ax-spec text-[10px]" aria-hidden>{c.code}</span>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-white">{c.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
