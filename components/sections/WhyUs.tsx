'use client'
import { CheckCircle, Award, UserCheck, Network, Gauge, HeartHandshake } from 'lucide-react'
import { motion } from 'framer-motion'

const reasons = [
  {
    icon: Award,
    title: 'Certified & Compliant',
    desc: 'Fully registered with PACRA, ZPPA-approved (Reg: 137269), and TPIN registered. We meet Zambia\'s highest procurement and regulatory standards.',
    highlight: 'ZPPA Approved',
    color: '#6AAB2E',
  },
  {
    icon: UserCheck,
    title: 'Skilled Technical Team',
    desc: 'Qualified engineers, certified technicians, and industry specialists with verifiable experience across mechanical, electrical, IT, and fibre optic domains.',
    highlight: 'Expert Personnel',
    color: '#1B4E9B',
  },
  {
    icon: Network,
    title: 'Strong Supplier Network',
    desc: 'Established relationships with global OEM suppliers and distributors, ensuring access to genuine parts, competitive pricing, and fast delivery.',
    highlight: 'Global Sourcing',
    color: '#6AAB2E',
  },
  {
    icon: Gauge,
    title: 'Operational Efficiency Focus',
    desc: 'Every service is oriented towards improving your uptime, reducing costs, and optimising performance — measured outcomes, not just completed tasks.',
    highlight: 'Results Driven',
    color: '#1B4E9B',
  },
  {
    icon: HeartHandshake,
    title: 'Customer-First Approach',
    desc: 'Responsive, accessible, and committed to building long-term partnerships. Your operational challenges are our engineering problems to solve.',
    highlight: 'Dedicated Support',
    color: '#6AAB2E',
  },
  {
    icon: CheckCircle,
    title: 'Safety & Quality Standards',
    desc: 'Our operations adhere to international safety standards and quality assurance protocols on every engagement, regardless of scope.',
    highlight: 'ISO Standards',
    color: '#1B4E9B',
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
      {/* Decorative Orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 blur-[100px]" style={{ background: 'radial-gradient(circle, #1B4E9B 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-15 blur-[100px]" style={{ background: 'radial-gradient(circle, #6AAB2E 0%, transparent 70%)' }} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(26,58,107,0.15) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(26,58,107,0.15) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          data-aos="fade-down"
          className="text-center max-w-2xl mx-auto mb-20 flex flex-col items-center"
        >
          <div className="label-chip mb-5">Success Factors</div>
          <h2
            className="font-display font-black text-slate-900 mb-6"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', letterSpacing: '-0.04em' }}
          >
            The Afridyn<br />
            <span className="text-gradient-dual">Difference</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {reasons.map((r, i) => {
            const Icon = r.icon
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: 'easeOut' }}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="group relative rounded-[2.5rem] p-10 transition-all duration-500 overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                  boxShadow: '0 8px 32px rgba(15, 23, 42, 0.05)',
                }}
              >
                {/* Hover gradient background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                  style={{ background: `linear-gradient(135deg, ${r.color}, transparent)` }}
                />

                {/* Animated corner glow */}
                <div
                  className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700"
                  style={{ background: r.color }}
                />

                <div className="relative z-10">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ 
                      background: `${r.color}15`, 
                      color: r.color, 
                      border: `1px solid ${r.color}25`,
                      boxShadow: `0 8px 20px ${r.color}20`
                    }}
                  >
                    <Icon size={30} strokeWidth={2} />
                  </div>

                  <span
                    className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase px-5 py-2 rounded-full mb-6 inline-block transition-colors duration-300 group-hover:bg-opacity-20"
                    style={{ 
                      background: `${r.color}10`, 
                      color: r.color, 
                      border: `1px solid ${r.color}20` 
                    }}
                  >
                    {r.highlight}
                  </span>

                  <h3 className="font-display font-black text-[22px] text-slate-900 mb-5 tracking-tight leading-tight">
                    {r.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-slate-500 group-hover:text-slate-900 transition-colors duration-300 font-medium">
                    {r.desc}
                  </p>
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
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="mt-16 md:mt-24 lg:mt-32 rounded-[2rem] lg:rounded-[3rem] p-8 md:p-12 lg:p-20 relative overflow-hidden group"
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.7)',
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.08)',
          }}
        >
          {/* Subtle accent gradient */}
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, #1B4E9B, #6AAB2E, #1B4E9B)' }} />

          <div className="flex flex-col lg:flex-row gap-12 items-center justify-between relative z-10">
            <div className="lg:max-w-md text-center lg:text-left">
              <h3 className="font-display font-black text-3xl text-slate-900 mb-5 tracking-tight">Extensive Industry Coverage</h3>
              <p className="text-slate-500 text-[15px] leading-relaxed">
                Our operations span across critical sectors, providing specialised engineering, maintenance, and IT solutions tailored to the unique demands of each industry.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-end gap-3 lg:max-w-xl">
              {industries.map(v => (
                <motion.span 
                  key={v} 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-5 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 bg-white hover:bg-[#EEF2F7] border border-slate-100 text-[#3D5275] hover:text-[#1A3A6B] hover:border-[#1A3A6B]/20 shadow-sm hover:shadow-md"
                >
                  {v}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
