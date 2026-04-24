'use client'
import { Settings, Wrench, Lightbulb, Monitor, Radio, Users, Truck, Anchor, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const services = [
  {
    id: 1,
    icon: Settings,
    title: 'Mechanical & Electrical Spares',
    short: 'OEM-quality components for industrial machinery and electrical systems.',
    desc: 'We source and supply high-quality mechanical and electrical spare parts and components including bearings, motors, cables, switchgear, instrumentation, and more from trusted global suppliers. Fast, reliable procurement for any industry.',
    features: ['OEM & aftermarket parts', 'Rapid procurement', 'Quality certified', 'Technical guidance'],
    accent: '#D4692A',
    sector: 'Industrial',
  },
  {
    id: 2,
    icon: Wrench,
    title: 'Maintenance Services',
    short: 'Preventive and corrective maintenance to maximise plant uptime.',
    desc: 'Our certified technicians deliver preventive, predictive, and corrective maintenance programs for mechanical and electrical systems. We are committed to reducing unplanned downtime and extending equipment lifecycle.',
    features: ['Preventive programs', 'Emergency response', 'CMMS integration', 'SLA-backed service'],
    accent: '#1F857A',
    sector: 'Mining/Industrial',
  },
  {
    id: 3,
    icon: Lightbulb,
    title: 'Engineering Consultation',
    short: 'Strategic technical advisory and project management services.',
    desc: 'Expert engineering consultants providing feasibility studies, technical specifications, project planning, risk assessment, and execution oversight across mechanical, electrical, and civil disciplines.',
    features: ['Feasibility studies', 'Project management', 'Risk assessment', 'Design & specification'],
    accent: '#D4692A',
    sector: 'Multi-sector',
  },
  {
    id: 4,
    icon: Monitor,
    title: 'IT Equipment Supply',
    short: 'Enterprise-grade hardware, servers, and infrastructure solutions.',
    desc: 'Procurement and supply of enterprise IT equipment including servers, workstations, networking devices, UPS systems, and peripherals. Fully configured, warranted, and supported from global brands.',
    features: ['Enterprise hardware', 'Network infrastructure', 'Configuration & setup', 'Warranty & support'],
    accent: '#1F857A',
    sector: 'Commercial/Industrial',
  },
  {
    id: 5,
    icon: Radio,
    title: 'Optical Fibre Services',
    short: 'Design, installation, splicing, and maintenance of fibre networks.',
    desc: 'Full-service optical fibre capabilities including network design, cable laying, fusion splicing, termination, OTDR testing, and ongoing maintenance for telecoms, industrial automation, and data centres.',
    features: ['Network design', 'Fusion splicing', 'OTDR testing', '24/7 maintenance'],
    accent: '#D4692A',
    sector: 'Telecoms/Infrastructure',
  },
  {
    id: 6,
    icon: Users,
    title: 'Technical Outsourcing',
    short: 'Qualified engineering personnel on flexible contract or permanent terms.',
    desc: 'Access specialised engineering skills on demand. We provide vetted, experienced technical personnel — engineers, technicians, and supervisors — for contract or permanent roles across all disciplines.',
    features: ['Vetted professionals', 'All disciplines', 'Flexible contracts', 'Skills transfer'],
    accent: '#1F857A',
    sector: 'All sectors',
  },
  {
    id: 7,
    icon: Truck,
    title: 'Logistics Consultancy',
    short: 'End-to-end supply chain analysis and optimisation.',
    desc: 'We analyse, design, and optimise supply chains, transportation networks, and warehouse operations. Our consultants deliver measurable cost reductions and improved delivery performance for complex operations.',
    features: ['Route optimisation', 'Cost reduction', 'Vendor management', 'KPI dashboards'],
    accent: '#D4692A',
    sector: 'Mining/Commercial',
  },
  {
    id: 8,
    icon: Anchor,
    title: 'Clearing & Forwarding',
    short: 'Seamless customs clearance and international freight management.',
    desc: 'Complete customs brokerage and freight forwarding services ensuring your goods cross borders efficiently, compliantly, and on schedule. We handle all documentation, duties, and regulatory requirements.',
    features: ['Customs clearance', 'Full documentation', 'Freight forwarding', 'Track & trace'],
    accent: '#1F857A',
    sector: 'Import/Export',
  },
]

export function Services() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="services" className="section" style={{ background: '#FFFFFF' }}>
      <div className="container">
        {/* Header */}
        <div className="max-w-2xl mb-16 reveal">
          <div className="label-chip mb-5">Our Services</div>
          <h2 className="font-display font-black text-4xl md:text-5xl mb-5" style={{ color: 'var(--navy-900)', letterSpacing: '-0.03em' }}>
            Eight Ways We<br />
            <span className="text-gradient-copper">Deliver Value</span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            From spare parts supply to optical fibre installation — comprehensive technical solutions built for Africa's most demanding operational environments.
          </p>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon
            const isActive = active === s.id
            return (
              <div
                key={s.id}
                className="reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div
                  className="relative h-full rounded-2xl overflow-hidden cursor-pointer group"
                  style={{
                    border: isActive ? `1.5px solid ${s.accent}30` : '1.5px solid var(--border)',
                    background: isActive ? `linear-gradient(145deg, ${s.accent}06, #fff)` : '#FAFAFA',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    transform: isActive ? 'translateY(-6px)' : 'none',
                    boxShadow: isActive ? `0 24px 60px rgba(0,0,0,0.08)` : '0 2px 8px rgba(0,0,0,0.02)',
                  }}
                  onClick={() => setActive(isActive ? null : s.id)}
                >
                  <div className="p-6">
                    {/* Icon */}
                    <div className="icon-box icon-box-copper mb-5" style={{ background: `${s.accent}12`, color: s.accent }}>
                      <Icon size={22} />
                    </div>

                    {/* Sector tag */}
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded mb-3 inline-block"
                      style={{ background: `${s.accent}10`, color: s.accent }}>
                      {s.sector}
                    </span>

                    <h3 className="font-display font-bold text-sm leading-snug mb-3" style={{ color: 'var(--navy-900)' }}>
                      {s.title}
                    </h3>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                      {s.short}
                    </p>

                    {/* Expandable features */}
                    {isActive && (
                      <div className="mt-2 pt-4 space-y-2" style={{ borderTop: `1px solid ${s.accent}15` }}>
                        <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
                        {s.features.map(f => (
                          <div key={f} className="flex items-center gap-2.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.accent }} />
                            {f}
                          </div>
                        ))}
                        <button
                          onClick={(e) => { e.stopPropagation(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                          className="btn btn-sm mt-4 w-full justify-center text-white"
                          style={{ background: s.accent, boxShadow: `0 4px 12px ${s.accent}30` }}
                        >
                          Request Quote
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    )}

                    {/* Toggle indicator */}
                    {!isActive && (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mt-2" style={{ color: s.accent }}>
                        <span>Learn more</span>
                        <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </div>

                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300"
                    style={{ background: s.accent, opacity: isActive ? 1 : 0.15 }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
