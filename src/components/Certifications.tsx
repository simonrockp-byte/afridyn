"use client";

import { useEffect, useRef } from "react";

const certs = [
  { name: "PACRA", full: "Patents & Companies Registration Agency", icon: "🏛️", color: "#D4792A" },
  { name: "TPIN", full: "Taxpayer Identification Number", icon: "📜", color: "#1A7A70" },
  { name: "ZPPA", full: "Zambia Public Procurement Authority", icon: "✅", color: "#D4792A" },
  { name: "ZRA", full: "Zambia Revenue Authority", icon: "⚖️", color: "#1A7A70" },
  { name: "ISO Aligned", full: "International Quality Standards", icon: "🌐", color: "#D4792A" },
];

const milestones = [
  { year: "2013", event: "Company founded & PACRA registered", side: "left" },
  { year: "2015", event: "ZPPA supplier certification achieved", side: "right" },
  { year: "2018", event: "Expanded to IT & Fibre Optic services", side: "left" },
  { year: "2020", event: "Logistics Consultancy division launched", side: "right" },
  { year: "2023", event: "Pan-African operations expansion", side: "left" },
];

export default function Certifications() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add("visible"); }, { threshold: 0.05 });
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="certifications" ref={ref} className="section-pad relative overflow-hidden" style={{ background: "var(--navy)" }}>
      <div className="divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <div className="label-chip mx-auto mb-5" style={{ display: "inline-flex" }}>Compliance & Trust</div>
          <h2 className="font-display font-extrabold" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", letterSpacing: "-0.02em" }}>
            Certifications &<br /><span className="text-grad-copper">Credentials</span>
          </h2>
        </div>

        {/* Cert strip */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {certs.map((c, i) => (
            <div key={c.name} className="reveal card-lift flex items-center gap-4 px-6 py-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", transitionDelay: `${i * 60}ms`, minWidth: 220 }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0" style={{ background: `${c.color}15`, border: `1px solid ${c.color}25` }}>{c.icon}</div>
              <div>
                <p className="font-display font-bold text-white text-sm">{c.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.38)" }}>{c.full}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="reveal">
          <h3 className="font-display font-bold text-white text-xl text-center mb-12">Company Milestones</h3>
          <div className="relative max-w-2xl mx-auto">
            {/* Centre line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: "linear-gradient(to bottom, #D4792A, #1A7A70)" }} />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <div key={m.year} className={`flex items-center ${m.side === "left" ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`flex-1 ${m.side === "left" ? "pr-10 text-right" : "pl-10 text-left"}`}>
                    <div className="inline-block rounded-xl px-5 py-3.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <p className="font-mono-custom text-xs font-bold mb-1" style={{ color: i % 2 === 0 ? "#D4792A" : "#22A090" }}>{m.year}</p>
                      <p className="text-sm text-white/70">{m.event}</p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="w-3 h-3 rounded-full shrink-0 z-10" style={{ background: i % 2 === 0 ? "#D4792A" : "#22A090", boxShadow: `0 0 12px ${i % 2 === 0 ? "#D4792A" : "#22A090"}80` }} />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
