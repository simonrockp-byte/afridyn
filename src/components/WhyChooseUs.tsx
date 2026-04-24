"use client";

import { useEffect, useRef } from "react";

const reasons = [
  { icon: "🏆", title: "Proven Track Record", desc: "Over a decade of successful project delivery across Zambia and Africa, with a portfolio spanning multiple industries and sectors.", stat: "10+ Years", color: "#D4792A" },
  { icon: "🎓", title: "Certified Professionals", desc: "Our engineers and technicians hold qualifications from internationally recognised bodies — delivering work to global standards.", stat: "100% Certified", color: "#1A7A70" },
  { icon: "⚡", title: "Rapid Response", desc: "24/7 emergency response capability ensures your operations never face prolonged downtime due to equipment or infrastructure failure.", stat: "24/7", color: "#D4792A" },
  { icon: "🌍", title: "Pan-African Reach", desc: "Our network and strategic partnerships span the continent, enabling us to deliver services wherever your operations are based.", stat: "Africa-Wide", color: "#1A7A70" },
  { icon: "📋", title: "Fully Compliant", desc: "Registered with PACRA, TPIN, and ZPPA — operating with full regulatory compliance and transparent business practices.", stat: "ZPPA Certified", color: "#D4792A" },
  { icon: "🔗", title: "Integrated Solutions", desc: "From procurement to installation, maintenance, and logistics — a single reliable partner for your complete project lifecycle.", stat: "End-to-End", color: "#1A7A70" },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add("visible"); }, { threshold: 0.05 });
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="why-us" ref={ref} className="section-pad relative overflow-hidden" style={{ background: "var(--navy-2)" }}>
      <div className="divider absolute top-0 left-0 right-0" />

      {/* Glow accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none" style={{
        background: "radial-gradient(ellipse, rgba(212,121,42,0.05) 0%, transparent 70%)",
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="label-chip mb-5 reveal">The Afridyn Advantage</div>
            <h2 className="font-display font-extrabold reveal" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Why Industry Leaders<br />
              <span className="text-grad-copper">Choose Afridyn</span>
            </h2>
          </div>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="btn-primary shrink-0 reveal">
            Start a Project →
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="reveal group relative rounded-xl p-7 overflow-hidden card-lift"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", transitionDelay: `${i * 60}ms` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                background: `radial-gradient(circle at 30% 30%, ${r.color}08 0%, transparent 70%)`
              }} />

              <div className="relative">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ background: `${r.color}12`, border: `1px solid ${r.color}20` }}>
                    {r.icon}
                  </div>
                  <span className="font-mono-custom text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${r.color}10`, color: r.color, border: `1px solid ${r.color}20` }}>
                    {r.stat}
                  </span>
                </div>
                <h3 className="font-display font-bold text-white mb-2.5">{r.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{r.desc}</p>

                {/* Bottom accent line */}
                <div className="mt-6 h-px w-0 group-hover:w-full transition-all duration-700 rounded-full" style={{ background: `linear-gradient(90deg, ${r.color}, transparent)` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
