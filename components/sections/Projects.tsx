import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * TODO(owner): supply 3 real projects. Per project:
 *  - image:  a site photo (≥1600px wide, landscape) → /public/images/projects/
 *  - client: client name (or "Confidential — Copperbelt mining client" if under NDA)
 *  - scope:  what Afridyn did (1–2 sentences)
 *  - result: measurable outcome (uptime, time saved, km of fibre, etc.)
 * Nothing here is invented — slots render as clearly-marked placeholders until filled.
 */
type Project = {
  /** Real site photo once supplied. */
  image?: string
  /** Stand-in photo from the company pitch deck — always labelled "Illustrative" on the page. */
  illustrative?: string
  client?: string; scope?: string; result?: string; discipline: string
}
const PROJECTS: Project[] = [
  { discipline: 'Mechanical / Mining',     illustrative: '/images/projects/mechanical.jpg' },
  { discipline: 'Electrical / Energy',     illustrative: '/images/projects/electrical.jpg' },
  { discipline: 'Fibre Optics / Telecoms', illustrative: '/images/projects/fibre-it.jpg' },
]

function Slot({ label }: { label: string }) {
  return <span className="font-mono text-[12px]" style={{ color: 'var(--ax-faint)' }}>[ {label} — pending ]</span>
}

export function Projects() {
  return (
    <section id="projects" className="section relative" aria-labelledby="projects-title" style={{ background: 'var(--ax-ink-2)' }}>
      <div className="container">
        <SectionHeader
          id="projects-title"
          code="PRJ-00"
          eyebrow="Projects & case studies"
          title="Field record."
          accent="Case studies in preparation."
          lead="Selected engagements will be published here with client approval."
        />
        <ul className="grid md:grid-cols-3 gap-4">
          {PROJECTS.map((p, i) => (
            <Reveal key={i} as="li" delay={i * 0.06}>
              <article className="group ax-panel h-full border-dashed overflow-hidden" aria-label={`Case study slot ${i + 1} (to be added)`}>
                {p.image || p.illustrative ? (
                  <div className="relative aspect-[16/10] overflow-hidden border-b" style={{ borderColor: 'var(--ax-line-2)' }}>
                    <Image
                      src={(p.image ?? p.illustrative)!}
                      alt={p.image ? `${p.discipline} project by Afridyn Engineering` : ''}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(0deg, rgba(7,9,13,0.75), transparent 55%)' }} aria-hidden />
                    {!p.image && (
                      <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-1 bg-[#07090D]/85 border" style={{ borderColor: 'var(--ax-line-2)', color: 'var(--ax-text)' }}>
                        Illustrative image
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="aspect-[16/10] grid place-items-center border-b border-dashed ax-grid" style={{ borderColor: 'var(--ax-line-2)' }}>
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon size={26} strokeWidth={1.3} style={{ color: 'var(--ax-faint)' }} aria-hidden />
                      <Slot label="Site photo" />
                    </div>
                  </div>
                )}
                <dl className="p-6 space-y-3 text-[14px]">
                  <div className="flex justify-between gap-3"><dt className="ax-spec text-[10px]">PRJ-0{i + 1}</dt><dd className="ax-spec text-[10px]" style={{ color: 'var(--ax-copper)' }}>{p.discipline}</dd></div>
                  <div><dt className="ax-spec text-[10px]">Client</dt><dd className="mt-1">{p.client ?? <Slot label="Client" />}</dd></div>
                  <div><dt className="ax-spec text-[10px]">Scope</dt><dd className="mt-1">{p.scope ?? <Slot label="Scope of work" />}</dd></div>
                  <div><dt className="ax-spec text-[10px]">Result</dt><dd className="mt-1">{p.result ?? <Slot label="Measured result" />}</dd></div>
                </dl>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** TODO(owner): add real client / partner logos (SVG, monochrome) once you have permission to display them. */
export function TrustedBy() {
  return (
    <section aria-labelledby="trusted-title" className="border-y" style={{ borderColor: 'var(--ax-line)', background: 'var(--ax-ink)' }}>
      <div className="container py-10 flex flex-col md:flex-row md:items-center gap-6">
        <h2 id="trusted-title" className="ax-spec shrink-0" style={{ color: 'var(--ax-text)' }}>Trusted by</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 flex-1" aria-label="Client logos (to be added)">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="h-14 grid place-items-center border border-dashed" style={{ borderColor: 'var(--ax-line-2)' }}>
              <span className="font-mono text-[11px]" style={{ color: 'var(--ax-faint)' }}>[ client logo ]</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
