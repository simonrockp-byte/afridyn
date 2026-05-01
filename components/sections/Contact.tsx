'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, Send, CheckCircle, Loader2, AlertCircle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const serviceOptions = [
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
  { icon: MapPin, title: 'Office Address',  val: '31 Salama Park, Lusaka, Zambia' },
  { icon: Phone,  title: 'Phone Numbers',   val: '+260 956 797 916\n+260 969 628 707' },
  { icon: Mail,   title: 'Email Address',   val: 'info@afridynengineering.com' },
  { icon: Clock,  title: 'Response Time',   val: 'Within 24 hours' },
]

export function Contact() {
  const [status, setStatus]     = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm]         = useState({
    name: '', company: '', email: '', phone: '', service: '', message: '',
  })

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res  = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
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
    <section id="contact" className="section relative overflow-hidden" style={{ background: '#F1F5F9' }}>

      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(15,23,42,0.05) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(15,23,42,0.05) 0%, transparent 70%)', filter: 'blur(100px)' }} />

      <div className="container relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 xl:gap-20 items-start">

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            data-aos="fade-right"
          >
            <div className="section-label mb-5">Connect with Us</div>
            <h2
              className="font-display font-black text-slate-900 mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
            >
              Let&apos;s Discuss<br />
              <span className="text-gradient-dual">Your Project</span>
            </h2>
            <p className="text-[15px] leading-relaxed text-slate-500 mb-12">
              Whether you need spare parts, maintenance support, or comprehensive
              engineering consultation — our team is ready to help.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, title, val }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="flex items-start gap-5"
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-white border border-slate-200 text-slate-600 shadow-sm">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="pt-1">
                    <p className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">{title}</p>
                    <p className="text-[15px] text-slate-700 whitespace-pre-line leading-relaxed">{val}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT — Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.12, ease: 'easeOut' }}
            data-aos="fade-left"
            className="rounded-3xl p-8 md:p-10 bg-white border border-slate-200 shadow-[0_32px_80px_rgba(15,23,42,0.08)]"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center text-center py-16">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-green-500/10 border border-green-500/20">
                  <CheckCircle size={36} className="text-green-500" strokeWidth={1.6} />
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-900 mb-3">Inquiry Received</h3>
                <p className="text-[15px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Thank you for reaching out. Our engineering team will respond within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn btn-outline btn-lg mt-8"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-6">
                  <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">Request a Quote</h3>
                  <p className="text-[14px] text-slate-500">Technical procurement and project estimates.</p>
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-400" strokeWidth={1.8} />
                    <p className="text-[13px] font-medium text-red-400">{errorMsg}</p>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cf-name" className="form-label">Full Name *</label>
                    <input
                      id="cf-name"
                      required type="text" placeholder="John Mwale"
                      value={form.name} onChange={set('name')}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-company" className="form-label">Company</label>
                    <input
                      id="cf-company"
                      type="text" placeholder="Your Company Ltd"
                      value={form.company} onChange={set('company')}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cf-email" className="form-label">Email Address *</label>
                    <input
                      id="cf-email"
                      required type="email" placeholder="you@company.com"
                      value={form.email} onChange={set('email')}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-phone" className="form-label">Phone Number</label>
                    <input
                      id="cf-phone"
                      type="tel" placeholder="+260 XXX XXX XXX"
                      value={form.phone} onChange={set('phone')}
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cf-service" className="form-label">Service Category *</label>
                  <select
                    id="cf-service"
                    required
                    value={form.service}
                    onChange={set('service')}
                    className="form-input cursor-pointer appearance-none"
                    style={{ color: form.service ? '#0F172A' : '#94A3B8' }}
                  >
                    <option value="" disabled>Select expertise required…</option>
                    {serviceOptions.map(s => (
                      <option key={s} value={s} className="bg-white text-slate-900">{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="cf-message" className="form-label">Project Description *</label>
                  <textarea
                    id="cf-message"
                    required
                    rows={4}
                    placeholder="Detail your engineering requirements…"
                    value={form.message}
                    onChange={set('message')}
                    className="form-input resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={status !== 'loading' ? { scale: 1.01, y: -2 } : {}}
                  whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                  className="btn btn-cta btn-lg w-full justify-center mt-2"
                  style={status === 'loading' ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                >
                  {status === 'loading' ? (
                    <><Loader2 size={18} className="animate-spin" strokeWidth={2} /> Sending…</>
                  ) : (
                    <><Send size={17} strokeWidth={2} /> Submit Proposal</>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
