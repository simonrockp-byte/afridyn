'use client'
import { CheckCircle, Award, UserCheck, Network, Gauge, HeartHandshake } from 'lucide-react'

const reasons = [
  {
    icon: Award,
    title: 'Certified & Compliant',
    desc: 'Fully registered with PACRA, ZPPA-approved (Reg: 137269), and TPIN registered. We meet Zambia\'s highest procurement and regulatory standards — giving you complete peace of mind.',
    highlight: 'ZPPA Approved',
    color: '#D4692A',
  },
  {
    icon: UserCheck,
    title: 'Skilled Technical Team',
    desc: 'Our team comprises qualified engineers, certified technicians, and industry specialists with verifiable experience across mechanical, electrical, IT, and fibre optic domains.',
    highlight: 'Expert Personnel',
    color: '#1F857A',
  },
  {
    icon: Network,
    title: 'Strong Supplier Network',
    desc: 'We have established relationships with global OEM suppliers and distributors, ensuring access to genuine parts, competitive pricing, and fast delivery timelines.',
    highlight: 'Global Sourcing',
    color: '#D4692A',
  },
  {
    icon: Gauge,
    title: 'Operational Efficiency Focus',
    desc: 'Every service we deliver is oriented towards improving your uptime, reducing costs, and optimising performance — measured outcomes, not just completed tasks.',
    highlight: 'Results Driven',
    color: '#1F857A',
  },
  {
    icon: HeartHandshake,
    title: 'Customer-First Approach',
    desc: 'We are responsive, accessible, and committed to building long-term partnerships. Your operational challenges are our engineering problems to solve.',
    highlight: 'Dedicated Support',
    color: '#D4692A',
  },
  {
    icon: CheckCircle,
    title: 'Safety & Quality Standards',
    desc: 'Safety is non-negotiable. Our operations adhere to international safety standards and quality assurance protocols on every engagement, regardless of scope.',
    highlight: 'ISO Standards',
    color: '#1F857A',
  },
]

const industries = [
  'Mining & Mineral Processing',
  'Manufacturing & Industrial',
  'Energy, Power & Water',
  'Telecommunications',
  'Infrastructure & Construction',
  'Supply Chain & Commerce',
  'Public Sector & Government',
]

export function WhyUs() {
  return (
    <section id="why-us" className="section" style={{ background: 'var(--navy-900)' }}>
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      <div className="container relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-16">
          <div className="lg:max-w-xl reveal">
            <div className="label-chip label-chip-dark mb-5">Why Choose Us</div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white" style={{ letterSpacing: '-0.03em' }}>
              The Afridyn<br />
              <span className="text-gradient-copper">Difference</span>
            </h2>
          </div>
          <div className="lg:ml-auto reveal" style={{ transitionDelay: '100ms' }}>
            <div className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', maxWidth: 320 }}>
              <p className="text-xs font-mono font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Industry Sectors Served
              </p>
              <ul className="space-y-2.5">
                {industries.map(v => (
                  <li key={v} className="flex items-start gap-3 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: '#D4692A' }} />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r, i) => {
            const Icon = r.icon
            return (
              <div key={r.title} className="reveal card-dark rounded-2xl p-7 group"
                style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="icon-box icon-box-lg mb-6" style={{ background: `${r.color}15`, color: r.color }}>
                  <Icon size={26} />
                </div>
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded mb-3 inline-block"
                  style={{ background: `${r.color}15`, color: r.color }}>
                  {r.highlight}
                </span>
                <h3 className="font-display font-bold text-base text-white mb-3">{r.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{r.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
