'use client'
import { CheckCircle, Award, UserCheck, Network, Gauge, HeartHandshake } from 'lucide-react'
import { motion } from 'framer-motion'

const reasons = [
  {
    icon: Award,
    title: 'Certified & Compliant',
    desc: 'Fully registered with PACRA, ZPPA-approved (Reg: 137269), and TPIN registered. We meet Zambia\'s highest procurement and regulatory standards.',
    highlight: 'ZPPA Approved',
    color: '#D4692A',
  },
  {
    icon: UserCheck,
    title: 'Skilled Technical Team',
    desc: 'Qualified engineers, certified technicians, and industry specialists with verifiable experience across mechanical, electrical, IT, and fibre optic domains.',
    highlight: 'Expert Personnel',
    color: '#E8305A',
  },
  {
    icon: Network,
    title: 'Strong Supplier Network',
    desc: 'Established relationships with global OEM suppliers and distributors, ensuring access to genuine parts, competitive pricing, and fast delivery.',
    highlight: 'Global Sourcing',
    color: '#D4692A',
  },
  {
    icon: Gauge,
    title: 'Operational Efficiency Focus',
    desc: 'Every service is oriented towards improving your uptime, reducing costs, and optimising performance — measured outcomes, not just completed tasks.',
    highlight: 'Results Driven',
    color: '#E8305A',
  },
  {
    icon: HeartHandshake,
    title: 'Customer-First Approach',
    desc: 'Responsive, accessible, and committed to building long-term partnerships. Your operational challenges are our engineering problems to solve.',
    highlight: 'Dedicated Support',
    color: '#D4692A',
  },
  {
    icon: CheckCircle,
    title: 'Safety & Quality Standards',
    desc: 'Our operations adhere to international safety standards and quality assurance protocols on every engagement, regardless of scope.',
    highlight: 'ISO Standards',
    color: '#E8305A',
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
    <section id="why-us" className="section relative overflow-hidden" style={{ background: '#080810' }}>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container relative z-10">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-12 mb-[72px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:max-w-lg"
          >
            <div className="section-label mb-5">Success Factors</div>
            <h2
              className="font-display font-black text-white"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)', letterSpacing: '-0.04em' }}
            >
              The Afridyn<br />
              <span className="text-gradient-fire">Difference</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="lg:ml-auto"
          >
            <div
              className="rounded-2xl p-7"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                maxWidth: 340,
              }}
            >
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-white/30 mb-5">
                Industry Coverage
              </p>
              <ul className="space-y-3">
                {industries.map(v => (
                  <li key={v} className="flex items-center gap-3 text-[13px] text-white/45">
                    <span className="w-1 h-1 rounded-full shrink-0 bg-copper" style={{ background: '#D4692A' }} />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((r, i) => {
            const Icon = r.icon
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: 'easeOut' }}
                className="group relative rounded-3xl p-8 transition-all duration-300 overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 0% 0%, ${r.color}0C, transparent 70%)` }}
                />

                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${r.color}12`, color: r.color, border: `1px solid ${r.color}22` }}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <span
                    className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full mb-4 inline-block"
                    style={{ background: `${r.color}10`, color: r.color, border: `1px solid ${r.color}1E` }}
                  >
                    {r.highlight}
                  </span>

                  <h3 className="font-display font-bold text-[17px] text-white mb-3 tracking-tight">{r.title}</h3>
                  <p className="text-[13px] leading-relaxed text-white/45 group-hover:text-white/65 transition-colors">{r.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
