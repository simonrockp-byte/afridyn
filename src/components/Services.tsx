"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  { id: 1, icon: "⚙️", title: "Mechanical & Electrical Spares", short: "Premium industrial components & OEM parts", desc: "We supply high-quality mechanical and electrical spare parts for industrial equipment — genuine OEM components from leading global manufacturers, delivered fast.", color: "#D4792A", features: ["Genuine OEM parts","Fast delivery","Quality certified","Technical support"], image: "/assets/mechanical_parts.png" },
  { id: 2, icon: "🔧", title: "Maintenance Services", short: "Preventive & corrective maintenance programs", desc: "Comprehensive maintenance programs designed to reduce unplanned downtime, extend equipment lifespan, and optimise operational efficiency.", color: "#1A7A70", features: ["24/7 availability","Certified technicians","CMMS integration","SLA agreements"], image: "/assets/maintenance_service.png" },
  { id: 3, icon: "📐", title: "Engineering Consultation", short: "Strategic technical guidance & project management", desc: "Expert consultants providing feasibility studies, project planning, risk assessment, and execution oversight to achieve your engineering objectives.", color: "#D4792A", features: ["Feasibility studies","Project management","Risk assessment","Design review"], image: "/assets/consultation.png" },
  { id: 4, icon: "💻", title: "IT Equipment Supply", short: "Enterprise hardware & infrastructure solutions", desc: "Enterprise-grade IT infrastructure — servers, workstations, networking equipment and peripherals from trusted global brands, fully configured and supported.", color: "#1A7A70", features: ["Enterprise hardware","Warranty support","Configuration services","Lifecycle management"], image: "/assets/it_infrastructure.png" },
  { id: 5, icon: "🔆", title: "Optical Fibre Services", short: "High-speed fibre installation & maintenance", desc: "Design, install, and maintain optical fibre networks for telecoms, industrial automation, and data centres — reliable, high-bandwidth connectivity.", color: "#D4792A", features: ["OTDR testing","Splicing & termination","Network design","24/7 support"], image: "/assets/fibre_optics.png" },
  { id: 6, icon: "👷", title: "Technical Outsourcing", short: "Skilled engineering workforce on demand", desc: "Qualified engineering personnel on contract or permanent basis — access specialist skills without the overhead of full-time employment.", color: "#1A7A70", features: ["Vetted professionals","Flexible contracts","Quick deployment","Skills transfer"], image: "/assets/team.png" },
  { id: 7, icon: "🚛", title: "Logistics Consultancy", short: "End-to-end supply chain optimisation", desc: "Analyse and optimise supply chains, transportation networks, and warehouse operations to reduce costs and improve delivery performance.", color: "#D4792A", features: ["Route optimisation","Cost reduction","Vendor management","KPI tracking"], image: "/assets/logistics.png" },
  { id: 8, icon: "🚢", title: "Clearing & Forwarding", short: "Seamless customs clearance & freight forwarding", desc: "Full-service customs clearance and freight forwarding — ensuring your goods cross borders efficiently with complete regulatory compliance.", color: "#1A7A70", features: ["Customs clearance","Documentation","Freight forwarding","Track & trace"], image: "/assets/logistics_port.png" },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const [flipped, setFlipped] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }, { threshold: 0.05 });
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} className="section-pad relative overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none" style={{
        background: "radial-gradient(ellipse, rgba(212,121,42,0.05) 0%, transparent 70%)",
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className="max-w-2xl mb-16 reveal">
          <div className="label-chip mb-5">Our Services</div>
          <h2 className="font-display font-extrabold mb-4" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "var(--navy)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Eight Ways We Deliver<br />
            <span className="text-grad-copper">Engineering Value</span>
          </h2>
          <p style={{ color: "var(--text-muted)" }}>
            Hover any card to explore the full service. Click to get a quote.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={s.id}
              className="service-card reveal"
              style={{ height: 280, transitionDelay: `${i * 50}ms` }}
            >
              <div className="service-card-inner" style={{ transform: flipped === s.id ? "rotateY(180deg)" : "rotateY(0deg)" }}>
                {/* FRONT */}
                <div
                  className="service-card-front flex flex-col justify-between p-7 cursor-pointer"
                  style={{
                    background: "var(--off-white)",
                    border: "1px solid rgba(0,0,0,0.04)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.02)"
                  }}
                  onClick={() => setFlipped(flipped === s.id ? null : s.id)}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm" style={{ background: "#FFFFFF", border: `1px solid ${s.color}20` }}>
                      {s.icon}
                    </div>
                    <h3 className="font-display font-bold text-var(--navy) text-sm leading-snug mb-3">{s.title}</h3>
                    <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-muted)" }}>{s.short}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: s.color }}>
                    <span>Learn more</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </div>
                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: s.color, opacity: 0.1 }} />
                </div>

                {/* BACK */}
                <div
                  className="service-card-back flex flex-col justify-between p-6 cursor-pointer relative overflow-hidden"
                  style={{ background: "var(--navy)", border: `1px solid rgba(255,255,255,0.1)` }}
                  onClick={() => setFlipped(null)}
                >
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                    backgroundImage: `url(${s.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: "grayscale(100%) brightness(0.5)"
                  }} />
                  <div className="relative z-10">
                    <h3 className="font-display font-bold text-[#FFFFFF] text-xs mb-3">{s.title}</h3>
                    <p className="text-[11px] leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>{s.desc}</p>
                    <ul className="space-y-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.color }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                    className="w-full py-3 rounded-xl text-[11px] font-bold text-white mt-4 transition-all hover:scale-[1.02] shadow-lg relative z-10"
                    style={{ background: s.color }}
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
