'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, Send, CheckCircle, Loader2, AlertCircle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

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

const contactInfo = [
  { icon: MapPin, title: 'Office Address',  val: '31 Salama Park, Lusaka, Zambia', color: '#FF2D55' },
  { icon: Phone,  title: 'Phone Numbers',   val: '+260 956 797 916\n+260 969 628 707', color: '#FF6A00' },
  { icon: Mail,   title: 'Email Address',   val: 'info@afridynengineering.com', color: '#CC00FF' },
  { icon: Clock,  title: 'Response Time',   val: 'Within 24 hours', color: '#0D7A6F' },
]

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
    <section id="contact" className="section relative overflow-hidden" style={{ background: '#0A0A1A' }}>

      {/* Background orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,45,85,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(204,0,255,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,45,85,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(204,0,255,0.02) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="label-chip label-chip-dark mb-6" style={{ background: 'rgba(255,45,85,0.12)', borderColor: 'rgba(255,45,85,0.25)', color: '#FF6A7A' }}>
              Get In Touch
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-6" style={{ letterSpacing: '-0.04em', lineHeight: 1.05 }}>
              Let&apos;s Discuss<br />
              <span className="text-gradient-fire">Your Project</span>
            </h2>
            <p className="text-base leading-relaxed mb-12" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Whether you need spare parts, maintenance support, or comprehensive engineering consultation — our team is ready to help.
            </p>

            {/* Contact info cards */}
            <div className="space-y-4 mb-10">
              {contactInfo.map(({ icon: Icon, title, val, color }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4 p-4 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}15`, color }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono font-bold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{title}</p>
                    <p className="text-sm font-medium whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.75)' }}>{val}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Credentials */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Regulatory Credentials
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { l: 'PACRA', v: '120261040695', color: '#FF2D55' },
                  { l: 'ZPPA',  v: '137269',       color: '#FF6A00' },
                  { l: 'TPIN',  v: '2004257975',   color: '#CC00FF' },
                ].map(({ l, v, color }) => (
                  <div key={l} className="px-3 py-2 rounded-xl" style={{ background: `${color}10`, border: `1px solid ${color}20` }}>
                    <p className="text-[9px] font-mono font-bold uppercase" style={{ color }}>{l}</p>
                    <p className="text-[9px] font-mono mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-3xl p-8 md:p-10"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
              }}>

              {status === 'success' ? (
                <div className="flex flex-col items-center text-center py-16">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ background: 'linear-gradient(135deg, rgba(255,45,85,0.2), rgba(255,106,0,0.2))' }}>
                    <CheckCircle size={36} style={{ color: '#FF6A00' }} />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-3">Message Sent!</h3>
                  <p className="text-base max-w-xs mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Thank you for reaching out. Our team will respond within 24 hours.
                  </p>
                  <button onClick={() => setStatus('idle')}
                    className="btn btn-lg mt-8"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)' }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white mb-2">Request a Quote</h3>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>All inquiries handled confidentially within 24 hours.</p>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                      <AlertCircle size={18} className="shrink-0 mt-0.5" style={{ color: '#FF2D55' }} />
                      <p className="text-sm" style={{ color: '#FF2D55' }}>{errorMsg}</p>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Full Name *', key: 'name',    placeholder: 'John Mwale',      required: true,  type: 'text' },
                      { label: 'Company',     key: 'company', placeholder: 'Your Company Ltd', required: false, type: 'text' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-[12px] font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>{f.label}</label>
                        <input
                          required={f.required} type={f.type}
                          placeholder={f.placeholder}
                          value={(form as any)[f.key]}
                          onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                          style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: '#fff',
                          }}
                          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,45,85,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,45,85,0.08)' }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Email Address *', key: 'email', placeholder: 'you@company.com',  required: true,  type: 'email' },
                      { label: 'Phone Number',    key: 'phone', placeholder: '+260 XXX XXX XXX', required: false, type: 'tel' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-[12px] font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>{f.label}</label>
                        <input
                          required={f.required} type={f.type}
                          placeholder={f.placeholder}
                          value={(form as any)[f.key]}
                          onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}
                          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,106,0,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,106,0,0.08)' }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>Service Required *</label>
                    <select
                      required
                      value={form.service}
                      onChange={e => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: form.service ? '#fff' : 'rgba(255,255,255,0.3)' }}
                    >
                      <option value="" style={{ background: '#0A0A1A', color: 'rgba(255,255,255,0.5)' }}>Select a service…</option>
                      {services.map(s => (
                        <option key={s} value={s} style={{ background: '#0F0F1F', color: '#fff' }}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>Message / Project Details *</label>
                    <textarea
                      required rows={5}
                      placeholder="Describe your engineering challenge or requirements…"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}
                      onFocus={e => { e.currentTarget.style.borderColor = 'rgba(204,0,255,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(204,0,255,0.08)' }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={status !== 'loading' ? { scale: 1.02, y: -2 } : {}}
                    whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                    className="btn btn-lg w-full justify-center text-white"
                    style={{
                      background: status === 'loading' ? 'rgba(255,45,85,0.5)' : 'linear-gradient(135deg, #FF2D55, #FF6A00)',
                      boxShadow: status === 'loading' ? 'none' : '0 8px 30px rgba(255,45,85,0.35)',
                      borderRadius: 14,
                    }}
                  >
                    {status === 'loading' ? (
                      <><Loader2 size={18} className="animate-spin" /> Sending…</>
                    ) : (
                      <><Send size={18} /> Send Message</>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
