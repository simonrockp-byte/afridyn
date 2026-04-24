'use client'
import { Settings, Wrench, Lightbulb, Monitor, Radio, Users, Truck, Anchor, ArrowRight } from 'lucide-react'
import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const services = [
  {
    id: 1,
    icon: Settings,
    title: 'Mechanical & Electrical Spares',
    short: 'OEM-quality components for industrial machinery and electrical systems.',
    desc: 'We source and supply high-quality mechanical and electrical spare parts and components including bearings, motors, cables, switchgear, instrumentation, and more from trusted global suppliers.',
    features: ['OEM & aftermarket parts', 'Rapid procurement', 'Quality certified', 'Technical guidance'],
    accent: '#FF2D55',
    sector: 'Industrial',
  },
  {
    id: 2,
    icon: Wrench,
    title: 'Maintenance Services',
    short: 'Preventive and corrective maintenance to maximise plant uptime.',
    desc: 'Our certified technicians deliver preventive, predictive, and corrective maintenance programs for mechanical and electrical systems. We are committed to reducing unplanned downtime.',
    features: ['Preventive programs', 'Emergency response', 'CMMS integration', 'SLA-backed service'],
    accent: '#FF6A00',
    sector: 'Mining/Industrial',
  },
  {
    id: 3,
    icon: Lightbulb,
    title: 'Engineering Consultation',
    short: 'Strategic technical advisory and project management services.',
    desc: 'Expert engineering consultants providing feasibility studies, technical specifications, project planning, and execution oversight across all disciplines.',
    features: ['Feasibility studies', 'Project management', 'Risk assessment', 'Design & specification'],
    accent: '#CC00FF',
    sector: 'Multi-sector',
  },
  {
    id: 4,
    icon: Monitor,
    title: 'IT Equipment Supply',
    short: 'Enterprise-grade hardware, servers, and infrastructure solutions.',
    desc: 'Procurement and supply of enterprise IT equipment including servers, workstations, networking devices, and peripherals fully supported from global brands.',
    features: ['Enterprise hardware', 'Network infrastructure', 'Configuration & setup', 'Warranty & support'],
    accent: '#0D7A6F',
    sector: 'Commercial/Industrial',
  },
  {
    id: 5,
    icon: Radio,
    title: 'Optical Fibre Services',
    short: 'Design, installation, splicing, and maintenance of fibre networks.',
    desc: 'Full-service capabilities including network design, cable laying, fusion splicing, termination, and OTDR testing for industrial and data centres.',
    features: ['Network design', 'Fusion splicing', 'OTDR testing', '24/7 maintenance'],
    accent: '#FF2D55',
    sector: 'Telecoms/Infrastructure',
  },
  {
    id: 6,
    icon: Users,
    title: 'Technical Outsourcing',
    short: 'Qualified engineering personnel on flexible contract terms.',
    desc: 'Access specialised engineering skills on demand. We provide vetted, experienced technical personnel for roles across all disciplines.',
    features: ['Vetted professionals', 'All disciplines', 'Flexible contracts', 'Skills transfer'],
    accent: '#FF6A00',
    sector: 'All sectors',
  },
  {
    id: 7,
    icon: Truck,
    title: 'Logistics Consultancy',
    short: 'End-to-end supply chain analysis and optimisation.',
    desc: 'We analyse, design, and optimise supply chains. Our consultants deliver measurable cost reductions for complex operations.',
    features: ['Route optimisation', 'Cost reduction', 'Vendor management', 'KPI dashboards'],
    accent: '#CC00FF',
    sector: 'Mining/Commercial',
  },
  {
    id: 8,
    icon: Anchor,
    title: 'Clearing & Forwarding',
    short: 'Seamless customs clearance and international freight management.',
    desc: 'Complete customs brokerage and freight forwarding ensuring your goods cross borders efficiently, compliantly, and on schedule.',
    features: ['Customs clearance', 'Full documentation', 'Freight forwarding', 'Track & trace'],
    accent: '#0D7A6F',
    sector: 'Import/Export',
  },
]

function ServiceCard({ s, i, active, setActive }: any) {
  const Icon = s.icon
  const isActive = active === s.id
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse hover tilt effect logic
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: any) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className="h-full"
    >
      <div
        onClick={() => setActive(isActive ? null : s.id)}
        className="relative h-full rounded-2xl p-6 cursor-pointer group transition-all duration-500 overflow-hidden"
        style={{
          border: isActive ? `1.5px solid ${s.accent}40` : '1px solid rgba(0,0,0,0.08)',
          background: isActive 
            ? `linear-gradient(145deg, rgba(255,255,255,1), ${s.accent}08)` 
            : 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: isActive 
            ? `0 24px 60px ${s.accent}15` 
            : '0 8px 30px rgba(0,0,0,0.03)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Layered Content */}
        <div style={{ transform: 'translateZ(50px)' }} className="relative z-10">
          {/* Icon Container */}
          <div className="icon-box mb-5 relative" style={{ 
            background: `${s.accent}15`, 
            color: s.accent,
            transformStyle: 'preserve-3d'
          }}>
            <Icon size={24} style={{ transform: 'translateZ(20px)' }} />
          </div>

          {/* Sector label */}
          <div className="flex items-center gap-2 mb-3">
             <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded"
              style={{ background: `${s.accent}10`, color: s.accent }}>
              {s.sector}
            </span>
          </div>

          <h3 className="font-display font-bold text-lg leading-snug mb-3" style={{ color: 'var(--navy-900)' }}>
            {s.title}
          </h3>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)', opacity: 0.8 }}>
            {s.short}
          </p>

          {/* Expanded Content */}
          <motion.div
            initial={false}
            animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-black/[0.05] space-y-4">
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
              <div className="space-y-2">
                {s.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.accent }} />
                    {f}
                  </div>
                ))}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn btn-sm w-full justify-center text-white mt-2"
                style={{ background: s.accent, boxShadow: `0 4px 12px ${s.accent}30` }}
              >
                Request Quote
                <ArrowRight size={13} />
              </button>
            </div>
          </motion.div>

          {/* Static Indicator */}
          {!isActive && (
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider mt-2 group-hover:gap-3 transition-all" style={{ color: s.accent }}>
              <span>Discover More</span>
              <ArrowRight size={12} />
            </div>
          )}
        </div>

        {/* Dynamic Background Element */}
        <div 
          className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" 
          style={{ background: s.accent }}
        />
        
        {/* Glow effect that follows mouse */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${s.accent}08, transparent 40%)`
          }}
        />
      </div>
    </motion.div>
  )
}

export function Services() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="services" className="section relative overflow-hidden" 
      style={{ background: '#F8FAFC' }}>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-50/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-orange-50/50 to-transparent pointer-events-none" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-20"
        >
          <div className="label-chip mb-6" style={{ 
            background: 'rgba(0,0,0,0.04)', 
            borderColor: 'rgba(0,0,0,0.08)',
            color: 'var(--navy-700)'
          }}>
            Strategic Solutions
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl mb-6" style={{ color: 'var(--navy-900)', letterSpacing: '-0.04em' }}>
            Eight Ways We<br />
            <span className="text-gradient-fire">Deliver Value</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl">
            From industrial procurement to precision infrastructure — we provide the technical foundation for Sub-Saharan Africa's industrial growth.
          </p>
        </motion.div>

        {/* 4-column grid with 3D tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
