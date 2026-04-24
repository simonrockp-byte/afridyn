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
    <footer style={{ background: '#050510' }}>
      {/* Top accent */}
      <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent 0%, #FF2D55 30%, #CC00FF 70%, transparent 100%)' }} />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-9 h-9 overflow-hidden">
                <img src="/images/logo.png" alt="Afridyn Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-display font-black text-white text-sm tracking-widest">AFRIDYN</p>
                <p className="text-[8px] tracking-[.3em] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>ENGINEERING LIMITED</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Professional engineering and technical services for industrial, mining, and infrastructure sectors across Sub-Saharan Africa.
            </p>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold" style={{ background: 'rgba(255,45,85,0.12)', border: '1px solid rgba(255,45,85,0.25)', color: '#FF6A7A' }}>PACRA</span>
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold" style={{ background: 'rgba(255,106,0,0.12)', border: '1px solid rgba(255,106,0,0.25)', color: '#FFAD66' }}>ZPPA</span>
              <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold" style={{ background: 'rgba(204,0,255,0.12)', border: '1px solid rgba(204,0,255,0.25)', color: '#D666FF' }}>TPIN</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-display font-bold text-sm mb-5 tracking-wide uppercase">Our Services</h4>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s}>
                  <button onClick={() => goto('services')} className="text-sm text-left flex items-start gap-2 group transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    <ArrowRight size={13} className="mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#FF2D55' }} />
                    <span className="group-hover:text-white transition-colors">{s}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-display font-bold text-sm mb-5 tracking-wide uppercase">Company</h4>
            <ul className="space-y-2.5">
              {[['#about', 'About Us'], ['#why-us', 'Why Choose Us'], ['#contact', 'Contact Us'], ['#services', 'Our Services']].map(([href, label]) => (
                <li key={href}>
                  <button onClick={() => goto(href.replace('#', ''))} className="text-sm group flex items-start gap-2 transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    <ArrowRight size={13} className="mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#FF2D55' }} />
                    <span className="group-hover:text-white transition-colors">{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-display font-bold text-sm mb-5 tracking-wide uppercase">Contact</h4>
            <div className="space-y-4">
              {[
                { icon: MapPin, text: '31 Salama Park, Lusaka, Zambia', size: 14 },
                { icon: Phone, text: '+260 956 797 916', size: 14 },
                { icon: Phone, text: '+260 969 628 707', size: 14 },
                { icon: Mail, text: 'info@afridynengineering.com', size: 14 },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon size={14} className="mt-0.5 shrink-0" style={{ color: '#FF2D55' }} />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
              © {new Date().getFullYear()} Afridyn Engineering Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
              <span>PACRA: 120261040695</span>
              <span>TPIN: 2004257975</span>
              <span>ZPPA: 137269</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
