'use client'
import { useEffect, useRef, useState } from 'react'
import { Phone, Mail, MapPin, CheckCircle, Clock } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/contact-info'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/motion/Reveal'
import { SERVICE_EVENT } from '@/lib/events'

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

type FormStatus = 'idle' | 'whatsapp' | 'email'
const EMPTY = { name: '', company: '', email: '', phone: '', service: '', message: '' }

const contactInfo = [
  { icon: MapPin, title: 'Office address',   val: CONTACT_INFO.address, href: undefined },
  { icon: Phone,  title: 'WhatsApp / phone', val: CONTACT_INFO.phones[0], href: `tel:+${WHATSAPP_NUMBER}` },
  { icon: Mail,   title: 'Email',            val: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  { icon: Clock,  title: 'Response time',    val: 'Within 24 hours', href: undefined },
]

export function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [form, setForm]     = useState(EMPTY)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const onSelect = (e: Event) => {
      const v = (e as CustomEvent<string>).detail
      if (serviceOptions.includes(v)) setForm(f => ({ ...f, service: v }))
    }
    window.addEventListener(SERVICE_EVENT, onSelect)
    return () => window.removeEventListener(SERVICE_EVENT, onSelect)
  }, [])

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const lines = [
      `*New Inquiry — Afridyn Engineering*`,
      ``,
      `*Name:* ${form.name}`,
      form.company ? `*Company:* ${form.company}` : null,
      form.email   ? `*Email:* ${form.email}`     : null,
      form.phone   ? `*Phone:* ${form.phone}`     : null,
      `*Service:* ${form.service}`,
      ``,
      `*Message:*`,
      form.message,
    ].filter(Boolean).join('\n')

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setStatus('whatsapp')
    setForm(EMPTY)
  }

  const sendEmail = () => {
    if (!formRef.current?.reportValidity()) return
    const subject = `Quote request — ${form.service}${form.company ? ` — ${form.company}` : ''}`
    const body = [
      `Name: ${form.name}`,
      form.company ? `Company: ${form.company}` : null,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      `Service: ${form.service}`,
      '',
      form.message,
    ].filter(v => v !== null).join('\n')
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('email')
  }

  return (
    <section id="contact" className="section relative" aria-labelledby="contact-title" style={{ background: 'var(--ax-ink-2)' }}>
      <div className="absolute inset-0 ax-grid opacity-40 pointer-events-none" aria-hidden />
      <div className="container relative">
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 xl:gap-16 items-start">
          <div>
            <SectionHeader
              id="contact-title"
              code="COM-01"
              eyebrow="Connect with us"
              title="Let's discuss"
              accent="your project."
              lead="Whether you need spare parts, maintenance support, or comprehensive engineering consultation — our team is ready to help."
            />
            <ul className="border-t border-[color:var(--ax-line)]">
              {contactInfo.map(({ icon: Icon, title, val, href }) => (
                <li key={title} className="flex items-start gap-4 py-5 border-b border-[color:var(--ax-line)]">
                  <span className="w-10 h-10 grid place-items-center border shrink-0" style={{ borderColor: 'var(--ax-line-2)', color: 'var(--ax-copper)' }}>
                    <Icon size={17} strokeWidth={1.6} aria-hidden />
                  </span>
                  <div>
                    <p className="ax-spec text-[10px]">{title}</p>
                    {href
                      ? <a href={href} className="text-[16px] text-white underline decoration-[color:var(--ax-line-2)] underline-offset-4 hover:decoration-[color:var(--ax-copper)]">{val}</a>
                      : <p className="text-[16px] text-white">{val}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Reveal className="ax-panel ax-brackets p-7 md:p-10">
            {status !== 'idle' ? (
              <div className="flex flex-col items-center text-center py-14" role="status">
                <CheckCircle size={44} strokeWidth={1.4} style={{ color: 'var(--ax-green)' }} aria-hidden />
                <h3 className="font-display text-2xl font-semibold text-white mt-5">
                  {status === 'whatsapp' ? 'Opening WhatsApp…' : 'Opening your email app…'}
                </h3>
                <p className="mt-3 max-w-sm" style={{ color: 'var(--ax-dim)' }}>
                  {status === 'whatsapp'
                    ? 'Your message has been pre-filled in WhatsApp. Just hit send to reach our team instantly.'
                    : `Your request is pre-filled in a new email to ${CONTACT_INFO.email}. Just hit send.`}
                </p>
                <button onClick={() => setStatus('idle')} className="ax-btn ax-btn-ghost mt-8">Send another message</button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-white">Request a quote</h3>
                    <p className="text-[14.5px] mt-1" style={{ color: 'var(--ax-dim)' }}>
                      Send via WhatsApp for the fastest reply — or email us for formal procurement.
                    </p>
                  </div>
                  <span className="ax-spec text-[10px] hidden sm:block whitespace-nowrap" aria-hidden>RFQ-FORM</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cf-name" className="ax-label">Full name *</label>
                    <input id="cf-name" required type="text" autoComplete="name" placeholder="John Mwale" value={form.name} onChange={set('name')} className="ax-field" />
                  </div>
                  <div>
                    <label htmlFor="cf-company" className="ax-label">Company</label>
                    <input id="cf-company" type="text" autoComplete="organization" placeholder="Your Company Ltd" value={form.company} onChange={set('company')} className="ax-field" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cf-email" className="ax-label">Email *</label>
                    <input id="cf-email" required type="email" autoComplete="email" placeholder="you@company.com" value={form.email} onChange={set('email')} className="ax-field" />
                  </div>
                  <div>
                    <label htmlFor="cf-phone" className="ax-label">Phone</label>
                    <input id="cf-phone" type="tel" autoComplete="tel" placeholder="+260 XXX XXX XXX" value={form.phone} onChange={set('phone')} className="ax-field" />
                  </div>
                </div>
                <div>
                  <label htmlFor="cf-service" className="ax-label">Service category *</label>
                  <select id="cf-service" required value={form.service} onChange={set('service')} className="ax-field cursor-pointer" style={{ color: form.service ? 'var(--ax-text)' : '#8590A1' }}>
                    <option value="" disabled>Select expertise required…</option>
                    {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="cf-message" className="ax-label">Project description *</label>
                  <textarea id="cf-message" required rows={4} placeholder="Detail your engineering requirements…" value={form.message} onChange={set('message')} className="ax-field resize-none" />
                </div>

                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <button type="submit" className="ax-btn w-full text-[#06210F]" style={{ background: '#25D366' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send via WhatsApp
                  </button>
                  <button type="button" onClick={sendEmail} className="ax-btn ax-btn-ghost w-full">
                    <Mail size={16} aria-hidden /> Or email us
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
