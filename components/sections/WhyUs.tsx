'use client'
import { CheckCircle, Award, UserCheck, Network, Gauge, HeartHandshake } from 'lucide-react'

const reasons = [
  {
    icon: Award,
    title: 'Certified & Compliant',
    desc: 'Fully registered with PACRA, ZPPA-approved (Reg: 137269), and TPIN registered. We meet Zambia\'s highest procurement and regulatory standards — giving you complete peace of mind.',
    highlight: 'ZPPA Approved',
    color: '#FF6B00',
  },
  {
    icon: UserCheck,
    title: 'Skilled Technical Team',
    desc: 'Our team comprises qualified engineers, certified technicians, and industry specialists with verifiable experience across mechanical, electrical, IT, and fibre optic domains.',
    highlight: 'Expert Personnel',
    color: '#FF007F',
  },
  {
    icon: Network,
    title: 'Strong Supplier Network',
    desc: 'We have established relationships with global OEM suppliers and distributors, ensuring access to genuine parts, competitive pricing, and fast delivery timelines.',
    highlight: 'Global Sourcing',
    color: '#FF6B00',
  },
  {
    icon: Gauge,
    title: 'Operational Efficiency Focus',
    desc: 'Every service we deliver is oriented towards improving your uptime, reducing costs, and optimising performance — measured outcomes, not just completed tasks.',
    highlight: 'Results Driven',
    color: '#FF007F',
  },
  {
    icon: HeartHandshake,
    title: 'Customer-First Approach',
    desc: 'We are responsive, accessible, and committed to building long-term partnerships. Your operational challenges are our engineering problems to solve.',
    highlight: 'Dedicated Support',
    color: '#FF6B00',
  },
  {
    icon: CheckCircle,
    title: 'Safety & Quality Standards',
    desc: 'Safety is non-negotiable. Our operations adhere to international safety standards and quality assurance protocols on every engagement, regardless of scope.',
    highlight: 'ISO Standards',
    color: '#FF007F',
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
      <div className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      <div className="container relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-12 mb-20">
          <div className="lg:max-w-xl reveal">
            <div className="label-chip label-chip-dark mb-6">Success Factors</div>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white" style={{ letterSpacing: '-0.04em' }}>
              The Afridyn<br />
              <span className="text-gradient-fire">Difference</span>
            </h2>
          </div>
          <div className="lg:ml-auto reveal" style={{ transitionDelay: '100ms' }}>
            <div className="rounded-[32px] p-8"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', maxWidth: 360 }}>
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Industry Coverage
              </p>
              <ul className="space-y-4">
                {industries.map(v => (
                  <li key={v} className="flex items-start gap-4 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: 'var(--brand-orange)' }} />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon
            return (
              <div key={r.title} className="reveal group relative rounded-[32px] p-10 transition-all duration-500 overflow-hidden"
                style={{ 
                  transitionDelay: `${i * 100}ms`,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: `radial-gradient(circle at 0% 0%, ${r.color}10, transparent 70%)` }} />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" 
                    style={{ background: `${r.color}15`, color: r.color, border: `1px solid ${r.color}25` }}>
                    <Icon size={28} />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-4 inline-block"
                    style={{ background: `${r.color}10`, color: r.color, border: `1px solid ${r.color}20` }}>
                    {r.highlight}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white mb-4 tracking-tight">{r.title}</h3>
                  <p className="text-sm leading-relaxed opacity-50 group-hover:opacity-80 transition-opacity" style={{ color: 'rgba(255,255,255,0.8)' }}>{r.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
