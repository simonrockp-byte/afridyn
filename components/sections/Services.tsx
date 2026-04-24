'use client'
import {
  Settings, Wrench, Lightbulb, Monitor,
  Radio, Users, Truck, Anchor, ArrowRight,
} from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

const services = [
  {
    id: 1, icon: Settings,
    title: 'Mechanical & Electrical Spares',
    short: 'OEM-quality components for industrial machinery and electrical systems.',
    desc:  'We source and supply high-quality mechanical and electrical spare parts including bearings, motors, cables, switchgear, and instrumentation.',
    features: ['OEM & aftermarket parts', 'Rapid procurement', 'Quality certified', 'Technical guidance'],
    accent: '#334155', sector: 'Industrial',
    image: '/images/services/spares.png',
  },
  {
    id: 2, icon: Wrench,
    title: 'Maintenance Services',
    short: 'Preventive and corrective maintenance to maximise plant uptime.',
    desc:  'Our certified technicians deliver preventive, predictive, and corrective maintenance programs for mechanical and electrical systems.',
    features: ['Preventive programs', 'Emergency response', 'CMMS integration', 'SLA-backed service'],
    accent: '#475569', sector: 'Mining / Industrial',
    image: '/images/services/maintenance.png',
  },
  {
    id: 3, icon: Lightbulb,
    title: 'Engineering Consultation',
    short: 'Strategic technical advisory and project management services.',
    desc:  'Expert engineering consultants providing feasibility studies, technical specifications, and execution oversight.',
    features: ['Feasibility studies', 'Project management', 'Risk assessment', 'Design & specification'],
    accent: '#334155', sector: 'Multi-sector',
    image: '/images/services/consultation.png',
  },
  {
    id: 4, icon: Monitor,
    title: 'IT Equipment Supply',
    short: 'Enterprise-grade hardware, servers, and infrastructure solutions.',
    desc:  'Procurement and supply of enterprise IT equipment including servers, workstations, and networking devices.',
    features: ['Enterprise hardware', 'Network infrastructure', 'Configuration & setup', 'Warranty & support'],
    accent: '#475569', sector: 'Commercial / Industrial',
    image: '/images/services/it_supply.png',
  },
  {
    id: 5, icon: Radio,
    title: 'Optical Fibre Services',
    short: 'Design, installation, splicing, and maintenance of fibre networks.',
    desc:  'Full-service capabilities including network design, cable laying, fusion splicing, and maintenance.',
    features: ['Network design', 'Fusion splicing', 'OTDR testing', '24/7 maintenance'],
    accent: '#334155', sector: 'Telecoms / Infrastructure',
    image: '/images/services/fibre.png',
  },
  {
    id: 6, icon: Users,
    title: 'Technical Outsourcing',
    short: 'Qualified engineering personnel on flexible contract terms.',
    desc:  'Access specialised engineering skills on demand — vetted, experienced technical personnel across all disciplines.',
    features: ['Vetted professionals', 'All disciplines', 'Flexible contracts', 'Skills transfer'],
    accent: '#475569', sector: 'All Sectors',
    image: '/images/services/technical_outsourcing.png',
  },
  {
    id: 7, icon: Truck,
    title: 'Logistics Consultancy',
    short: 'End-to-end supply chain analysis and optimisation.',
    desc:  'We analyse, design, and optimise supply chains and transportation networks for maximum efficiency.',
    features: ['Route optimisation', 'Cost reduction', 'Vendor management', 'KPI dashboards'],
    accent: '#334155', sector: 'Mining / Commercial',
    image: '/images/services/logistics.png',
  },
  {
    id: 8, icon: Anchor,
    title: 'Clearing & Forwarding',
    short: 'Seamless customs clearance and international freight management.',
    desc:  'Complete customs brokerage and freight forwarding ensuring goods cross borders efficiently.',
    features: ['Customs clearance', 'Full documentation', 'Freight forwarding', 'Track & trace'],
    accent: '#475569', sector: 'Import / Export',
    image: '/images/services/maintenance.png',
  },
]

function ServiceCard({
  s,
  i,
  active,
  setActive,
}: {
  s: (typeof services)[0]
  i: number
  active: number | null
  setActive: (id: number | null) => void
}) {
  const Icon = s.icon
  const isActive = active === s.id

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <div
        onClick={() => setActive(isActive ? null : s.id)}
        className="relative h-full rounded-3xl cursor-pointer group transition-all duration-400 overflow-hidden flex flex-col"
        style={{
          border: isActive
            ? `1px solid ${s.accent}40`
            : '1px solid rgba(255,255,255,0.07)',
          background: isActive
            ? `linear-gradient(160deg, ${s.accent}08 0%, rgba(14,14,26,0.95) 60%)`
            : 'rgba(14,14,26,0.6)',
          boxShadow: isActive ? `0 24px 60px ${s.accent}12` : 'none',
        }}
      >
        {/* Image */}
        <div className="relative h-52 w-full overflow-hidden shrink-0">
          <img
            src={s.image}
            alt={s.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={e => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E1A] via-[#0E0E1A]/30 to-transparent" />

          {/* Icon badge */}
          <div
            className="absolute bottom-5 left-5 w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-xl border transition-transform duration-300 group-hover:-translate-y-1"
            style={{
              background: `${s.accent}18`,
              borderColor: `${s.accent}35`,
              color: s.accent,
            }}
          >
            <Icon size={22} strokeWidth={1.8} />
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-7">
          {/* Sector tag */}
          <span
            className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full self-start mb-5"
            style={{
              background: `${s.accent}10`,
              color: s.accent,
              border: `1px solid ${s.accent}20`,
            }}
          >
            {s.sector}
          </span>

          <h3 className="font-display font-bold text-[17px] leading-snug mb-3 text-white tracking-tight">
            {s.title}
          </h3>
          <p className="text-[13px] leading-relaxed text-white/50 group-hover:text-white/70 transition-colors mb-4 flex-1">
            {s.short}
          </p>

          {/* Expandable detail */}
          <motion.div
            initial={false}
            animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="pt-5 space-y-5 mt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-[13px] leading-relaxed text-white/55">{s.desc}</p>
              <ul className="space-y-2.5">
                {s.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-[13px] text-white/60">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: s.accent }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={e => {
                  e.stopPropagation()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn btn-lg w-full justify-center text-white mt-2"
                style={{
                  background: `linear-gradient(135deg, ${s.accent}CC, ${s.accent})`,
                  boxShadow: `0 6px 20px ${s.accent}30`,
                }}
              >
                Request Consultation
                <ArrowRight size={16} strokeWidth={2} />
              </button>
            </div>
          </motion.div>

          {/* Expand hint */}
          {!isActive && (
            <div
              className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.25em] mt-3 group-hover:gap-3 transition-all"
              style={{ color: s.accent }}
            >
              <span>Learn more</span>
              <ArrowRight size={13} strokeWidth={2.5} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function Services() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section
      id="services"
      className="section relative overflow-hidden"
      style={{ background: '#080810' }}
    >
      {/* Ambient orbs */}
      <div
        className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(51,65,85,0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(71,85,105,0.06) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-20 flex flex-col items-center"
        >
          <div className="label-chip label-chip-dark mx-auto mb-5">Advanced Technical Solutions</div>
          <h2
            className="font-display font-black text-white text-center mb-6 w-full"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', letterSpacing: '-0.04em' }}
          >
            Technical<br />
            <span
              className="text-gradient-fire"
              style={{
                backgroundSize: '200% auto',
                animation: 'fireShift 4s ease-in-out infinite',
              }}
            >
              Capability
            </span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed text-center">
            Robust engineering, maintenance, and IT infrastructure solutions
            across Sub-Saharan Africa's critical sectors.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <ServiceCard
              key={s.id}
              s={s}
              i={i}
              active={active}
              setActive={setActive}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
