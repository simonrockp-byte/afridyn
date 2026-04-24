'use client'
import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

const services = [
  'Mechanical & Electrical Spares',
  'Maintenance Services',
  'Engineering Consultation',
  'IT Equipment Supply',
  'Optical Fibre Installation',
  'Technical Outsourcing',
  'Logistics Consultancy',
  'Clearing & Forwarding',
]

const goto = (id: string) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-24 pb-12" style={{ background: '#05050A' }}>
      {/* Blueprint Background Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] mix-blend-screen"
        style={{
          backgroundImage: 'url(/images/assets/footer-blueprint-afridyn.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" 
        style={{ background: 'linear-gradient(90deg, transparent 0%, #FF007F 30%, #FF6B00 70%, transparent 100%)' }} />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-11 h-11">
                <img src="/images/logo.png" alt="Afridyn Logo" className="w-full h-full object-contain filter brightness-0 invert" />
              </div>
              <div>
                <p className="font-display font-black text-white text-base tracking-widest">AFRIDYN</p>
                <p className="text-[9px] tracking-[.4em] font-mono opacity-40 text-white">ENGINEERING LIMITED</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-8 text-white/50 max-w-xs">
              Providing world-class engineering solutions, technical procurement, and infrastructure services across Sub-Saharan Africa.
            </p>
            <div className="flex items-center gap-3">
              {['PACRA', 'ZPPA', 'TPIN'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-mono font-bold border border-white/10 bg-white/5 text-white/40">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-display font-bold text-sm mb-8 tracking-[0.2em] uppercase">Expertise</h4>
            <ul className="space-y-4">
              {services.slice(0, 5).map(s => (
                <li key={s}>
                  <button onClick={() => goto('services')} className="text-sm text-left flex items-start gap-3 group transition-all" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    <div className="w-1 h-1 rounded-full bg-brand-pink mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:text-white group-hover:translate-x-1 transition-all">{s}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-display font-bold text-sm mb-8 tracking-[0.2em] uppercase">Company</h4>
            <ul className="space-y-4">
              {[['home', 'Home'], ['about', 'About Us'], ['why-us', 'Success Factors'], ['contact', 'Connect']].map(([id, label]) => (
                <li key={id}>
                  <button onClick={() => goto(id)} className="text-sm group flex items-start gap-3 transition-all" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    <div className="w-1 h-1 rounded-full bg-brand-orange mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:text-white group-hover:translate-x-1 transition-all">{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-display font-bold text-sm mb-8 tracking-[0.2em] uppercase">Contact</h4>
            <div className="space-y-6">
              {[
                { icon: MapPin, text: '31 Salama Park, Lusaka, Zambia' },
                { icon: Phone, text: '+260 956 797 916' },
                { icon: Mail, text: 'info@afridynengineering.com' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-4 group">
                  <Icon size={18} className="mt-0.5 shrink-0 transition-colors group-hover:text-brand-pink" style={{ color: 'rgba(255,255,255,0.2)' }} />
                  <span className="text-sm leading-relaxed transition-colors group-hover:text-white" style={{ color: 'rgba(255,255,255,0.4)' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-[11px] font-medium tracking-wide" style={{ color: 'rgba(255,255,255,0.2)' }}>
              © {new Date().getFullYear()} Afridyn Engineering Limited. High Precision Infrastructure.
            </p>
            <div className="flex items-center gap-8 text-[10px] font-mono tracking-widest" style={{ color: 'rgba(255,255,255,0.15)' }}>
              <span>PACRA: 120261040695</span>
              <span>ZPPA: 137269</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
