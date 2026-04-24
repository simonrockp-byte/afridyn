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
  { icon: MapPin, title: 'Office Address',  val: '31 Salama Park, Lusaka, Zambia', color: '#FF007F' },
  { icon: Phone,  title: 'Phone Numbers',   val: '+260 956 797 916\n+260 969 628 707', color: '#FF6B00' },
  { icon: Mail,   title: 'Email Address',   val: 'info@afridynengineering.com', color: '#FF007F' },
  { icon: Clock,  title: 'Response Time',   val: 'Within 24 hours', color: '#FF6B00' },
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
    <section id="contact" className="section relative overflow-hidden" style={{ background: '#0A0A0F' }}>

      {/* Background orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(255,0,127,0.1) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)', filter: 'blur(100px)' }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-20 items-start">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="label-chip label-chip-dark mb-8" style={{ background: 'rgba(255,107,0,0.1)', borderColor: 'rgba(255,107,0,0.25)', color: '#FF6B00' }}>
              Connect with Us
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-8" style={{ letterSpacing: '-0.04em', lineHeight: 1.05 }}>
              Let&apos;s Discuss<br />
              <span className="text-gradient-fire">Your Project</span>
            </h2>
            <p className="text-lg leading-relaxed mb-12 opacity-60" style={{ color: '#FFFFFF' }}>
              Whether you need spare parts, maintenance support, or comprehensive engineering consultation — our team is ready to help.
            </p>

            {/* Contact info cards */}
            <div className="space-y-4 mb-12">
              {contactInfo.map(({ icon: Icon, title, val, color }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-5 p-6 rounded-[28px] group transition-all duration-500"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-2 opacity-30" style={{ color: '#FFFFFF' }}>{title}</p>
                    <p className="text-base font-semibold whitespace-pre-line text-white/90">{val}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Credentials */}
            <div className="rounded-[28px] p-8" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-6 opacity-30" style={{ color: '#FFFFFF' }}>
                Regulatory Compliance
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { l: 'PACRA', v: '120261040695', color: '#FF007F' },
                  { l: 'ZPPA',  v: '137269',       color: '#FF6B00' },
                  { l: 'TPIN',  v: '2004257975',   color: '#FFCC00' },
                ].map(({ l, v, color }) => (
                  <div key={l} className="px-5 py-3 rounded-2xl" style={{ background: `${color}08`, border: `1px solid ${color}20` }}>
                    <p className="text-[10px] font-mono font-bold uppercase" style={{ color }}>{l}</p>
                    <p className="text-[10px] font-mono mt-1 opacity-40 text-white">{v}</p>
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
            <div className="rounded-[40px] p-10 md:p-14"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(30px)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
              }}>

              {status === 'success' ? (
                <div className="flex flex-col items-center text-center py-16">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
                    style={{ background: 'linear-gradient(135deg, rgba(255,0,127,0.2), rgba(255,107,0,0.2))' }}>
                    <CheckCircle size={44} style={{ color: '#FF6B00' }} />
                  </div>
                  <h3 className="font-display font-bold text-3xl text-white mb-4">Inquiry Received</h3>
                  <p className="text-lg opacity-50 max-w-xs mx-auto" style={{ color: '#FFFFFF' }}>
                    Thank you for reaching out. Our engineering team will respond within 24 hours.
                  </p>
                  <button onClick={() => setStatus('idle')}
                    className="btn btn-lg mt-10"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFFFFF' }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <h3 className="font-display font-bold text-3xl text-white mb-3">Request a Quote</h3>
                    <p className="text-sm opacity-40" style={{ color: '#FFFFFF' }}>Technical procurement and project estimates.</p>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                      <AlertCircle size={20} className="shrink-0 mt-0.5" style={{ color: '#FF007F' }} />
                      <p className="text-sm font-medium" style={{ color: '#FF007F' }}>{errorMsg}</p>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      { label: 'Full Name *', key: 'name',    placeholder: 'John Mwale',      required: true,  type: 'text' },
                      { label: 'Company',     key: 'company', placeholder: 'Your Company Ltd', required: false, type: 'text' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-[11px] font-bold uppercase tracking-widest mb-3 opacity-40" style={{ color: '#FFFFFF' }}>{f.label}</label>
                        <input
                          required={f.required} type={f.type}
                          placeholder={f.placeholder}
                          value={(form as any)[f.key]}
                          onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                          className="w-full px-5 py-4 rounded-2xl text-sm outline-none transition-all duration-300"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: '#fff',
                          }}
                          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,0,127,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(255,0,127,0.06)' }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {[
                      { label: 'Email Address *', key: 'email', placeholder: 'you@company.com',  required: true,  type: 'email' },
                      { label: 'Phone Number',    key: 'phone', placeholder: '+260 XXX XXX XXX', required: false, type: 'tel' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-[11px] font-bold uppercase tracking-widest mb-3 opacity-40" style={{ color: '#FFFFFF' }}>{f.label}</label>
                        <input
                          required={f.required} type={f.type}
                          placeholder={f.placeholder}
                          value={(form as any)[f.key]}
                          onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                          className="w-full px-5 py-4 rounded-2xl text-sm outline-none transition-all duration-300"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}
                          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,107,0,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(255,107,0,0.06)' }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest mb-3 opacity-40" style={{ color: '#FFFFFF' }}>Service Category *</label>
                    <select
                      required
                      value={form.service}
                      onChange={e => setForm({ ...form, service: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl text-sm outline-none transition-all duration-300 cursor-pointer"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: form.service ? '#fff' : 'rgba(255,255,255,0.2)' }}
                    >
                      <option value="" style={{ background: '#0A0A0F', color: 'rgba(255,255,255,0.4)' }}>Select expertise required…</option>
                      {services.map(s => (
                        <option key={s} value={s} style={{ background: '#12121A', color: '#fff' }}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest mb-3 opacity-40" style={{ color: '#FFFFFF' }}>Project Description *</label>
                    <textarea
                      required rows={5}
                      placeholder="Detail your engineering requirements…"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl text-sm outline-none resize-none transition-all duration-300"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}
                      onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,107,0,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(255,107,0,0.06)' }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none' }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={status !== 'loading' ? { scale: 1.01, y: -2 } : {}}
                    whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                    className="btn btn-lg w-full justify-center text-white"
                    style={{
                      background: status === 'loading' ? 'rgba(255,107,0,0.5)' : 'linear-gradient(135deg, #FF6B00, #FF007F)',
                      boxShadow: status === 'loading' ? 'none' : '0 10px 40px rgba(255,107,0,0.35)',
                      borderRadius: 18,
                    }}
                  >
                    {status === 'loading' ? (
                      <><Loader2 size={20} className="animate-spin" /> Transmitting…</>
                    ) : (
                      <><Send size={20} /> Submit Proposal</>
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
