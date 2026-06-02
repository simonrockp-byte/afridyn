'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, CheckCircle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const WHATSAPP_NUMBER = '260977244549' // +260 977 244 549

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

type FormStatus = 'idle' | 'success'

const contactInfo = [
  { icon: MapPin, title: 'Office Address',  val: '31 Salama Park, Lusaka, Zambia' },
  { icon: Phone,  title: 'WhatsApp / Phone', val: '+260 977 244 549' },
  { icon: Mail,   title: 'Email Address',   val: 'info@afridynengineering.com' },
  { icon: Clock,  title: 'Response Time',   val: 'Within 24 hours' },
]

export function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [form, setForm]     = useState({
    name: '', company: '', email: '', phone: '', service: '', message: '',
  })

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const lines = [
      `*New Inquiry — Afridyn Engineering*`,
      ``,
      `*Name:* ${form.name}`,
      form.company  ? `*Company:* ${form.company}`  : null,
      form.email    ? `*Email:* ${form.email}`       : null,
      form.phone    ? `*Phone:* ${form.phone}`       : null,
      `*Service:* ${form.service}`,
      ``,
      `*Message:*`,
      form.message,
    ].filter(Boolean).join('\n')

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setStatus('success')
    setForm({ name: '', company: '', email: '', phone: '', service: '', message: '' })
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

          {/* â”€â”€ LEFT â”€â”€ */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
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
                  transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
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

          {/* â”€â”€ RIGHT — Form â”€â”€ */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.12, ease: 'easeOut' }}
            className="rounded-3xl p-8 md:p-10 bg-white border border-slate-200 shadow-[0_32px_80px_rgba(15,23,42,0.08)]"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center text-center py-16">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-green-500/10 border border-green-500/20">
                  <CheckCircle size={36} className="text-green-500" strokeWidth={1.6} />
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-900 mb-3">Opening WhatsApp…</h3>
                <p className="text-[15px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Your message has been pre-filled in WhatsApp. Just hit send to reach our team instantly.
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
                  <p className="text-[14px] text-slate-500">Fill in your details — we&apos;ll open WhatsApp with your message ready to send.</p>
                </div>

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
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-lg w-full justify-center mt-2 font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #25D366, #128C7E)',
                    boxShadow: '0 8px 24px rgba(37,211,102,0.35)',
                    borderRadius: 14,
                  }}
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Send via WhatsApp
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}





