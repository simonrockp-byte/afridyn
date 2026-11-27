import { CheckCircle, Award, UserCheck, Network, Gauge, HeartHandshake } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

const reasons = [
  {
    icon: Award, title: 'Certified & Compliant', highlight: 'ZPPA Approved',
    desc: "Fully registered with PACRA, ZPPA-approved (Reg: 137269), and TPIN registered. We meet Zambia's highest procurement and regulatory standards.",
  },
  {
    icon: UserCheck, title: 'Skilled Technical Team', highlight: 'Expert Personnel',
    desc: 'Qualified engineers, certified technicians, and industry specialists with verifiable experience across mechanical, electrical, IT, and fibre optic domains.',
  },
  {
    icon: Network, title: 'Strong Supplier Network', highlight: 'Global Sourcing',
    desc: 'Established relationships with global OEM suppliers and distributors, ensuring access to genuine parts, competitive pricing, and fast delivery.',
  },
  {
    icon: Gauge, title: 'Operational Efficiency Focus', highlight: 'Results Driven',
    desc: 'Every service is oriented towards improving your uptime, reducing costs, and optimising performance — measured outcomes, not just completed tasks.',
  },
  {
    icon: HeartHandshake, title: 'Customer-First Approach', highlight: 'Dedicated Support',
    desc: 'Responsive, accessible, and committed to building long-term partnerships. Your operational challenges are our engineering problems to solve.',
  },
  {
    // TODO(owner): previously labelled "ISO Standards" — no ISO certificate number/standard exists in the codebase.
    // Restore an ISO label only once the certificate (standard, number, certifying body) is supplied.
    icon: CheckCircle, title: 'Safety & Quality Standards', highlight: 'QA Protocols',
    desc: 'Our operations adhere to international safety standards and quality assurance protocols on every engagement, regardless of scope.',
  },
]

export function WhyUs() {
  return (
    <section id="why-us" className="section relative" aria-labelledby="why-title" style={{ background: 'var(--ax-ink)' }}>
      <div className="container">
        <SectionHeader
          id="why-title"
          code="QA-00"
          eyebrow="Success factors"
          title="The Afridyn"
          accent="difference."
        />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[color:var(--ax-line)]">
          {reasons.map((r, i) => (
            <Reveal key={r.title} as="li" delay={(i % 3) * 0.05} className="border-r border-b border-[color:var(--ax-line)]">
              <article className="group h-full p-7 md:p-8 transition-colors duration-300 hover:bg-[#0E141B]">
                <div className="flex items-center justify-between">
                  <r.icon size={22} strokeWidth={1.5} style={{ color: 'var(--ax-copper)' }} aria-hidden />
                  <span className="font-mono text-[11px]" style={{ color: 'var(--ax-faint)' }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="ax-spec text-[10px] mt-6" style={{ color: 'var(--ax-cyan)' }}>{r.highlight}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">{r.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed" style={{ color: 'var(--ax-dim)' }}>{r.desc}</p>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
