'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react'

const services = [
  'Mechanical & Electrical Spares Supply',
  'Mechanical & Electrical Maintenance Services',
  'Engineering Project Consultation',
  'IT Equipment Supply',
  'Optical Fibre Installation & Splicing',
  'Technical Outsourcing Services',
  'Logistics & Supply Chain Consultancy',
  'Clearing & Forwarding Advisory',
  'General Inquiry',
]

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', service: '', message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send message')
      setStatus('success')
      setForm({ name: '', company: '', email: '', phone: '', service: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="section" style={{ background: '#FFFFFF' }}>
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

          {/* LEFT */}
          <div className="reveal">
            <div className="label-chip mb-6">Get In Touch</div>
            <h2 className="font-display font-black text-4xl md:text-5xl mb-6" style={{ color: 'var(--navy-900)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Let's Discuss<br />
              <span className="text-gradient-copper">Your Project</span>
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
              Whether you need spare parts, maintenance support, or comprehensive engineering consultation — our team is ready to help. Contact us for a detailed quote.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { icon: MapPin, title: 'Office Address', val: '31 Salama Park, Lusaka, Zambia', color: '#D4692A' },
                { icon: Phone, title: 'Phone Numbers', val: '+260 956 797 916\n+260 969 628 707', color: '#1F857A' },
                { icon: Mail, title: 'Email Address', val: 'info@afridynengineering.com', color: '#D4692A' },
              ].map(({ icon: Icon, title, val, color }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="icon-box shrink-0" style={{ background: `${color}10`, color }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--navy-900)' }}>{title}</p>
                    <p className="text-sm whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>{val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Credentials banner */}
            <div className="rounded-2xl p-5" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Regulatory Status</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { l: 'PACRA', v: '120261040695', bg: 'rgba(212,105,42,0.08)', bc: 'rgba(212,105,42,0.2)', c: '#D4692A' },
                  { l: 'ZPPA', v: '137269', bg: 'rgba(31,133,122,0.08)', bc: 'rgba(31,133,122,0.2)', c: '#1F857A' },
                  { l: 'TPIN', v: '2004257975', bg: 'rgba(15,23,42,0.05)', bc: 'var(--border)', c: 'var(--text-secondary)' },
                ].map(({ l, v, bg, bc, c }) => (
                  <div key={l} className="px-3 py-2 rounded-lg" style={{ background: bg, border: `1px solid ${bc}` }}>
                    <p className="text-[9px] font-mono font-bold uppercase" style={{ color: c }}>{l}</p>
                    <p className="text-[9px] font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="reveal" style={{ transitionDelay: '100ms' }}>
            <div className="rounded-2xl p-8" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>

              {status === 'success' ? (
                <div className="flex flex-col items-center text-center py-12">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(31,133,122,0.1)' }}>
                    <CheckCircle size={32} style={{ color: '#1F857A' }} />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--navy-900)' }}>Message Sent!</h3>
                  <p className="text-sm max-w-xs mx-auto" style={{ color: 'var(--text-secondary)' }}>
                    Thank you for reaching out. Our team will respond within 24 hours.
                  </p>
                  <button onClick={() => setStatus('idle')} className="btn btn-outline btn-sm mt-6">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display font-bold text-xl mb-6" style={{ color: 'var(--navy-900)' }}>Request a Quote</h3>

                  {status === 'error' && (
                    <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
                      <AlertCircle size={18} className="shrink-0 mt-0.5" style={{ color: '#DC2626' }} />
                      <p className="text-sm" style={{ color: '#DC2626' }}>{errorMsg}</p>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input required className="form-input" placeholder="John Mwale"
                        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="form-label">Company</label>
                      <input className="form-input" placeholder="Your Company Ltd"
                        value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Email Address *</label>
                      <input required type="email" className="form-input" placeholder="you@company.com"
                        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="form-label">Phone Number</label>
                      <input className="form-input" placeholder="+260 XXX XXX XXX"
                        value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Service Required *</label>
                    <select required className="form-input"
                      value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                      <option value="">Select a service…</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Message / Project Details *</label>
                    <textarea required rows={5} className="form-input resize-none"
                      placeholder="Describe your engineering challenge or requirements…"
                      value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                  </div>

                  <button type="submit" disabled={status === 'loading'}
                    className="btn btn-primary btn-lg w-full justify-center"
                    style={{ opacity: status === 'loading' ? 0.8 : 1 }}>
                    {status === 'loading' ? (
                      <><Loader2 size={18} className="animate-spin" /> Sending…</>
                    ) : (
                      <><Send size={18} /> Send Message</>
                    )}
                  </button>
                  <p className="text-[11px] text-center" style={{ color: 'var(--text-muted)' }}>
                    We respond within 24 hours. All inquiries are handled confidentially.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
