import { ArrowRight, Phone } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { COMPANY } from '@/lib/site'

export function CTA() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden" style={{ background: 'var(--ax-ink)' }}>
      <div className="container py-16 md:py-20">
        <Reveal className="ax-panel ax-brackets relative overflow-hidden px-7 py-12 md:px-14 md:py-16 flex flex-col md:flex-row md:items-center gap-8"
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden
            style={{ background: 'radial-gradient(ellipse 60% 120% at 100% 50%, rgba(255,106,26,0.16), transparent 60%)' }} />
          <div className="relative flex-1">
            <p className="ax-eyebrow">Start a conversation</p>
            <h2 id="cta-title" className="ax-h2 mt-4 !text-[clamp(1.8rem,3.6vw,2.9rem)]">
              Ready to solve your <span className="ax-accent">engineering challenge?</span>
            </h2>
            <p className="ax-lead mt-3">Talk to our team today. We respond within 24 hours, every time.</p>
          </div>
          <div className="relative flex flex-col sm:flex-row gap-3 shrink-0">
            <a href="#contact" className="ax-btn ax-btn-copper">Request a Quote <ArrowRight size={16} aria-hidden /></a>
            <a href={`tel:${COMPANY.phoneE164}`} className="ax-btn ax-btn-ghost"><Phone size={15} aria-hidden /> Call {COMPANY.phone}</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
