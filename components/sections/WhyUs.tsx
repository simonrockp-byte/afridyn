'use client'
import { CheckCircle, Award, UserCheck, Network, Gauge, HeartHandshake } from 'lucide-react'
import { motion } from 'framer-motion'

const reasons = [
  {
    icon: Award,
    title: 'Certified & Compliant',
    desc: 'Fully registered with PACRA, ZPPA-approved (Reg: 137269), and TPIN registered. We meet Zambia\'s highest procurement and regulatory standards.',
    highlight: 'ZPPA Approved',
    color: '#334155',
  },
  {
    icon: UserCheck,
    title: 'Skilled Technical Team',
    desc: 'Qualified engineers, certified technicians, and industry specialists with verifiable experience across mechanical, electrical, IT, and fibre optic domains.',
    highlight: 'Expert Personnel',
    color: '#475569',
  },
  {
    icon: Network,
    title: 'Strong Supplier Network',
    desc: 'Established relationships with global OEM suppliers and distributors, ensuring access to genuine parts, competitive pricing, and fast delivery.',
    highlight: 'Global Sourcing',
    color: '#334155',
  },
  {
    icon: Gauge,
    title: 'Operational Efficiency Focus',
    desc: 'Every service is oriented towards improving your uptime, reducing costs, and optimising performance — measured outcomes, not just completed tasks.',
    highlight: 'Results Driven',
    color: '#475569',
  },
  {
    icon: HeartHandshake,
    title: 'Customer-First Approach',
    desc: 'Responsive, accessible, and committed to building long-term partnerships. Your operational challenges are our engineering problems to solve.',
    highlight: 'Dedicated Support',
    color: '#334155',
  },
  {
    icon: CheckCircle,
    title: 'Safety & Quality Standards',
    desc: 'Our operations adhere to international safety standards and quality assurance protocols on every engagement, regardless of scope.',
    highlight: 'ISO Standards',
    color: '#475569',
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
    <section id="why-us" className="section relative overflow-hidden" style={{ background: '#F8FAFC' }}>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,1) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(15,23,42,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-20 flex flex-col items-center"
        >
          <div className="label-chip mb-5">Success Factors</div>
          <h2
            className="font-display font-black text-slate-900 mb-6"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', letterSpacing: '-0.04em' }}
          >
            The Afridyn<br />
            <span
              className="text-gradient-fire"
            >
              Difference
            </span>
          </h2>
        </motion.div>

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
                className="group relative rounded-3xl p-8 transition-all duration-300 overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 0% 0%, ${r.color}06, transparent 70%)` }}
                />

                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${r.color}08`, color: r.color, border: `1px solid ${r.color}15` }}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <span
                    className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full mb-4 inline-block"
                    style={{ background: `${r.color}06`, color: r.color, border: `1px solid ${r.color}10` }}
                  >
                    {r.highlight}
                  </span>

                  <h3 className="font-display font-bold text-[17px] text-slate-900 mb-3 tracking-tight">{r.title}</h3>
                  <p className="text-[13px] leading-relaxed text-slate-500 group-hover:text-slate-700 transition-colors">{r.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Industry Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-16 rounded-3xl p-8 lg:p-12 relative overflow-hidden group bg-white border border-slate-200"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between relative z-10">
            <div className="lg:max-w-md text-center lg:text-left">
              <h3 className="font-display font-bold text-2xl text-slate-900 mb-3">Extensive Industry Coverage</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed">
                Our operations span across critical sectors, providing specialised engineering, maintenance, and IT solutions tailored to the unique demands of each industry.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-end gap-3 lg:max-w-xl">
              {industries.map(v => (
                <span 
                  key={v} 
                  className="px-4 py-2 rounded-full text-[12px] font-medium transition-all duration-300 hover:bg-slate-100 border border-slate-200 text-slate-600"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
