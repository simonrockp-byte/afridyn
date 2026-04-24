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
  { icon: MapPin, title: 'Office Address',  val: '31 Salama Park, Lusaka, Zambia',          color: '#E8305A' },
  { icon: Phone,  title: 'Phone Numbers',   val: '+260 956 797 916\n+260 969 628 707',       color: '#D4692A' },
  { icon: Mail,   title: 'Email Address',   val: 'info@afridynengineering.com',              color: '#E8305A' },
  { icon: Clock,  title: 'Response Time',   val: 'Within 24 hours',                          color: '#D4692A' },
]

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.09)',
  color: '#fff',
} as const

function useInputFocus(color: string) {
  return {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = `${color}55`
      e.currentTarget.style.boxShadow   = `0 0 0 3px ${color}10`
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
      e.currentTarget.style.boxShadow   = 'none'
    },
  }
}

export function Contact() {
  const [status, setStatus]     = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm]         = useState({
    name: '', company: '', email: '', phone: '', service: '', message: '',
  })

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
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

  const focusOrange = useInputFocus('#D4692A')
  const focusRose   = useInputFocus('#E8305A')

  return (
    <section id="contact" className="section relative overflow-hidden" style={{ background: '#0E0E1A' }}>

      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(232,48,90,0.12) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(212,105,42,0.10) 0%, transparent 70%)', filter: 'blur(100px)' }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 xl:gap-24 items-start">

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <div className="section-label mb-5">Connect with Us</div>
            <h2
              className="font-display font-black text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}
            >
              Let&apos;s Discuss<br />
              <span className="text-gradient-fire">Your Project</span>
            </h2>
            <p className="text-base leading-relaxed text-white/50 mb-10">
              Whether you need spare parts, maintenance support, or comprehensive
              engineering consultation — our team is ready to help.
            </p>

            {/* Contact cards */}
            <div className="space-y-3 mb-8">
              {contactInfo.map(({ icon: Icon, title, val, color }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
                  className="flex items-start gap-4 p-5 rounded-2xl group transition-all duration-300 hover:border-white/12"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${color}12`, color, border: `1px solid ${color}22` }}
                  >
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-white/30 mb-1">{title}</p>
                    <p className="text-[14px] font-semibold text-white/80 whitespace-pre-line leading-snug">{val}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Credentials */}
            <div
              className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/30 mb-5">
                Regulatory Compliance
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { l: 'PACRA', v: '120261040695', color: '#E8305A' },
                  { l: 'ZPPA',  v: '137269',        color: '#D4692A' },
                  { l: 'TPIN',  v: '2004257975',    color: '#F0A040' },
                ].map(({ l, v, color }) => (
                  <div
                    key={l}
                    className="px-4 py-2.5 rounded-xl"
                    style={{ background: `${color}09`, border: `1px solid ${color}1E` }}
                  >
                    <p className="text-[10px] font-mono font-bold uppercase" style={{ color }}>{l}</p>
                    <p className="text-[10px] font-mono mt-0.5 text-white/35">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT — Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.12, ease: 'easeOut' }}
          >
            <div
              className="rounded-3xl p-8 md:p-12"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(32px)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
              }}
            >
              {status === 'success' ? (
                <div className="flex flex-col items-center text-center py-14">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ background: 'rgba(212,105,42,0.12)', border: '1px solid rgba(212,105,42,0.25)' }}
                  >
                    <CheckCircle size={36} style={{ color: '#D4692A' }} strokeWidth={1.6} />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-3">Inquiry Received</h3>
                  <p className="text-[15px] text-white/45 max-w-xs mx-auto leading-relaxed">
                    Thank you for reaching out. Our engineering team will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn btn-outline btn-lg mt-8"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="mb-2">
                    <h3 className="font-display font-bold text-2xl text-white mb-1.5">Request a Quote</h3>
                    <p className="text-[13px] text-white/35">Technical procurement and project estimates.</p>
                  </div>

                  {status === 'error' && (
                    <div
                      className="flex items-start gap-3 p-4 rounded-xl"
                      style={{ background: 'rgba(232,48,90,0.08)', border: '1px solid rgba(232,48,90,0.2)' }}
                    >
                      <AlertCircle size={18} className="shrink-0 mt-0.5" style={{ color: '#E8305A' }} strokeWidth={1.8} />
                      <p className="text-[13px] font-medium" style={{ color: '#E8305A' }}>{errorMsg}</p>
                    </div>
                  )}

                  {/* Name + Company */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Full Name *',  key: 'name',    placeholder: 'John Mwale',       required: true,  type: 'text',  focus: focusRose },
                      { label: 'Company',      key: 'company', placeholder: 'Your Company Ltd',  required: false, type: 'text',  focus: focusOrange },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="form-label">{f.label}</label>
                        <input
                          required={f.required}
                          type={f.type}
                          placeholder={f.placeholder}
                          value={(form as any)[f.key]}
                          onChange={set(f.key)}
                          className="w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all duration-200"
                          style={inputStyle}
                          {...f.focus}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Email + Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { label: 'Email Address *', key: 'email', placeholder: 'you@company.com',   required: true,  type: 'email', focus: focusOrange },
                      { label: 'Phone Number',    key: 'phone', placeholder: '+260 XXX XXX XXX',  required: false, type: 'tel',   focus: focusRose },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="form-label">{f.label}</label>
                        <input
                          required={f.required}
                          type={f.type}
                          placeholder={f.placeholder}
                          value={(form as any)[f.key]}
                          onChange={set(f.key)}
                          className="w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all duration-200"
                          style={inputStyle}
                          {...f.focus}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Service */}
                  <div>
                    <label className="form-label">Service Category *</label>
                    <select
                      required
                      value={form.service}
                      onChange={set('service')}
                      className="w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all duration-200 cursor-pointer"
                      style={{ ...inputStyle, color: form.service ? '#fff' : 'rgba(255,255,255,0.3)' }}
                      {...focusOrange}
                    >
                      <option value="" style={{ background: '#0E0E1A', color: 'rgba(255,255,255,0.4)' }}>
                        Select expertise required…
                      </option>
                      {serviceOptions.map(s => (
                        <option key={s} value={s} style={{ background: '#161624', color: '#fff' }}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="form-label">Project Description *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Detail your engineering requirements…"
                      value={form.message}
                      onChange={set('message')}
                      className="w-full px-4 py-3 rounded-xl text-[14px] outline-none resize-none transition-all duration-200"
                      style={inputStyle}
                      {...focusOrange}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={status !== 'loading' ? { scale: 1.01, y: -2 } : {}}
                    whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                    className="btn btn-cta btn-lg w-full justify-center"
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
