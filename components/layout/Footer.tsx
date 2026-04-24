'use client'
import { Phone, Mail, MapPin } from 'lucide-react'

const services = [
  'Mechanical & Electrical Spares',
  'Maintenance Services',
  'Engineering Consultation',
  'IT Equipment Supply',
  'Optical Fibre Installation',
]

const companyLinks: [string, string][] = [
  ['home',    'Home'],
  ['about',   'About Us'],
  ['why-us',  'Why Afridyn'],
  ['sectors', 'Sectors'],
  ['contact', 'Contact'],
]

const goto = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-20 pb-10" style={{ background: '#05050A' }}>

      {/* Blueprint bg */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'url(/images/assets/footer-blueprint-afridyn.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Top gradient rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #E8305A 30%, #D4692A 70%, transparent)' }}
      />

      <div className="container relative z-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/images/logo.png"
                alt="Afridyn Logo"
                className="w-9 h-9 object-contain filter brightness-0 invert opacity-80"
              />
              <div>
                <p className="font-display font-black text-white text-[15px] tracking-[.1em]">AFRIDYN</p>
                <p className="text-[9px] tracking-[.38em] font-mono text-white/30 uppercase mt-0.5">Engineering Limited</p>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed text-white/40 max-w-xs mb-7">
              World-class engineering solutions, technical procurement, and
              infrastructure services across Sub-Saharan Africa.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {['PACRA', 'ZPPA', 'TPIN'].map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-[10px] font-mono font-bold"
                  style={{
                    border: '1px solid rgba(255,255,255,0.09)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-display font-bold text-[12px] mb-6 tracking-[0.18em] uppercase">
              Expertise
            </h4>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s}>
                  <button
                    onClick={() => goto('services')}
                    className="text-[13px] text-left text-white/35 hover:text-white/80 transition-colors group flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-display font-bold text-[12px] mb-6 tracking-[0.18em] uppercase">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map(([id, label]) => (
                <li key={id}>
                  <button
                    onClick={() => goto(id)}
                    className="text-[13px] text-white/35 hover:text-white/80 transition-colors group flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-current opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-display font-bold text-[12px] mb-6 tracking-[0.18em] uppercase">
              Contact
            </h4>
            <div className="space-y-4">
              {[
                { Icon: MapPin, text: '31 Salama Park, Lusaka, Zambia' },
                { Icon: Phone,  text: '+260 956 797 916' },
                { Icon: Mail,   text: 'info@afridynengineering.com' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-3 group">
                  <Icon
                    size={15}
                    strokeWidth={1.8}
                    className="mt-0.5 shrink-0 transition-colors group-hover:text-white/60"
                    style={{ color: 'rgba(255,255,255,0.2)' }}
                  />
                  <span
                    className="text-[13px] leading-relaxed transition-colors group-hover:text-white/60"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/05 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-medium tracking-wide text-white/20">
            © {new Date().getFullYear()} Afridyn Engineering Limited. All rights reserved.
          </p>
          <div
            className="flex items-center gap-6 text-[10px] font-mono tracking-widest"
            style={{ color: 'rgba(255,255,255,0.14)' }}
          >
            <span>PACRA: 120261040695</span>
            <span className="w-px h-3 bg-white/10" />
            <span>ZPPA: 137269</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
