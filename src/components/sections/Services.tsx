"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";

const SERVICES = [
  { num: "01", icon: "⚙️", title: "Mechanical & Electrical Spares", short: "Premium OEM parts & industrial components", desc: "We supply genuine OEM mechanical and electrical spare parts from leading global manufacturers — delivered fast, quality certified, with full technical support.", color: "#D4792A", features: ["Genuine OEM parts", "Fast delivery", "Quality certified", "Technical support"] },
  { num: "02", icon: "🔧", title: "Maintenance Services", short: "Preventive & corrective maintenance programs", desc: "Comprehensive maintenance programs designed to reduce unplanned downtime, extend equipment lifespan, and optimise operational efficiency.", color: "#0A1628", features: ["24/7 availability", "Certified technicians", "CMMS integration", "SLA agreements"] },
  { num: "03", icon: "📐", title: "Engineering Consultation", short: "Strategic technical guidance & project oversight", desc: "Expert consultants providing feasibility studies, project planning, risk assessment, and execution oversight to achieve your engineering objectives.", color: "#D4792A", features: ["Feasibility studies", "Project management", "Risk assessment", "Design review"] },
  { num: "04", icon: "💻", title: "IT Equipment Supply", short: "Enterprise hardware & infrastructure solutions", desc: "Enterprise-grade IT infrastructure — servers, workstations, networking equipment and peripherals from trusted global brands, fully configured.", color: "#0A1628", features: ["Enterprise hardware", "Warranty support", "Configuration services", "Lifecycle management"] },
  { num: "05", icon: "🔆", title: "Optical Fibre Services", short: "High-speed fibre installation & maintenance", desc: "Design, install, and maintain optical fibre networks for telecoms, industrial automation, and data centres — delivering reliable, high-bandwidth connectivity.", color: "#D4792A", features: ["OTDR testing", "Splicing & termination", "Network design", "24/7 support"] },
  { num: "06", icon: "👷", title: "Technical Outsourcing", short: "Skilled engineering workforce on demand", desc: "Qualified engineering personnel on contract or permanent basis — access specialist skills without the overhead of full-time employment.", color: "#0A1628", features: ["Vetted professionals", "Flexible contracts", "Quick deployment", "Skills transfer"] },
  { num: "07", icon: "🚛", title: "Logistics Consultancy", short: "End-to-end supply chain optimisation", desc: "Analyse and optimise supply chains, transportation networks, and warehouse operations to reduce costs and improve delivery performance.", color: "#D4792A", features: ["Route optimisation", "Cost reduction", "Vendor management", "KPI tracking"] },
  { num: "08", icon: "🚢", title: "Clearing & Forwarding", short: "Seamless customs clearance & freight forwarding", desc: "Full-service customs clearance and freight forwarding — ensuring your goods cross borders efficiently with complete regulatory compliance.", color: "#0A1628", features: ["Customs clearance", "Documentation", "Freight forwarding", "Track & trace"] },
];

export function Services() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.06 }
    );
    ref.current?.querySelectorAll(".reveal, .service-card").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} className="section-pad relative overflow-hidden bg-white">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="label reveal mb-5" style={{ display: "inline-flex" }}>Our Services</div>
          <h2
            className="reveal"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.875rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--slate-900)",
              marginBottom: "16px",
            }}
          >
            Eight Ways We Deliver<br />
            <span className="text-copper">Engineering Value</span>
          </h2>
          <p className="reveal" style={{ color: "var(--slate-500)" }}>
            Hover any card to see the full service details. Click to request a quote.
          </p>
        </div>

        {/* 4-col flip card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <div
              key={s.num}
              className="service-card reveal"
              style={{ height: 270, transitionDelay: `${i * 45}ms` }}
            >
              <div className="service-card-inner">
                {/* FRONT */}
                <div
                  className="service-card-front flex flex-col justify-between p-6"
                  style={{
                    background: "var(--slate-50)",
                    border: "1px solid var(--slate-200)",
                  }}
                >
                  <div>
                    {/* Number + icon row */}
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                        style={{ background: "white", border: "1px solid var(--slate-200)", boxShadow: "var(--shadow-xs)" }}
                      >
                        {s.icon}
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          color: "var(--slate-300)",
                          fontWeight: 700,
                        }}
                      >
                        {s.num}
                      </span>
                    </div>
                    <h3
                      className="font-bold text-sm leading-snug mb-2"
                      style={{ fontFamily: "var(--font-display)", color: "var(--slate-900)" }}
                    >
                      {s.title}
                    </h3>
                    <p style={{ fontSize: "12px", color: "var(--slate-500)", lineHeight: 1.55 }}>
                      {s.short}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                    style={{ color: s.color, fontFamily: "var(--font-mono)" }}
                  >
                    Learn more
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: s.color, opacity: 0.15, borderRadius: "0 0 16px 16px" }}
                  />
                </div>

                {/* BACK */}
                <div
                  className="service-card-back flex flex-col justify-between p-5"
                  style={{
                    background: s.color === "#D4792A" ? "var(--navy-900)" : "var(--copper-500)",
                  }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">{s.icon}</span>
                      <h3 className="font-bold text-xs text-white leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                        {s.title}
                      </h3>
                    </div>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", lineHeight: 1.55, marginBottom: "14px" }}>
                      {s.desc}
                    </p>
                    <ul className="space-y-1.5">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2" style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)" }}>
                          <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="w-full py-2.5 rounded-lg text-xs font-bold text-white mt-3 transition-all hover:opacity-90"
                    style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}
                  >
                    Request Quote →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 reveal">
          <p style={{ color: "var(--slate-500)" }}>
            Need a custom solution? Let's discuss your specific requirements.
          </p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn btn-primary shrink-0"
          >
            Discuss a Project →
          </button>
        </div>
      </Container>
    </section>
  );
}
