"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    id: 1,
    title: "Mechanical & Electrical Spares",
    shortDesc: "Premium industrial components and spare parts",
    fullDesc:
      "We supply high-quality mechanical and electrical spare parts for industrial equipment, ensuring minimal downtime and maximum operational efficiency. Our extensive inventory covers a wide range of components from leading global manufacturers.",
    icon: "⚙️",
    color: "#E67817",
    bg: "from-orange-900/40 to-orange-800/20",
    features: ["Genuine OEM parts", "Fast delivery", "Quality certified", "Technical support"],
  },
  {
    id: 2,
    title: "Maintenance Services",
    shortDesc: "Preventive & corrective maintenance solutions",
    fullDesc:
      "Our experienced maintenance teams provide comprehensive preventive and corrective maintenance services for industrial facilities, reducing unplanned downtime and extending equipment lifespan.",
    icon: "🔧",
    color: "#1F857A",
    bg: "from-teal-900/40 to-teal-800/20",
    features: ["24/7 availability", "Certified technicians", "CMMS integration", "SLA agreements"],
  },
  {
    id: 3,
    title: "Engineering Consultation",
    shortDesc: "Expert technical guidance and project management",
    fullDesc:
      "Our engineering consultants provide strategic technical advice, feasibility studies, project planning, and execution oversight to help organizations achieve their engineering objectives efficiently.",
    icon: "📐",
    color: "#14223E",
    bg: "from-navy-900/40 to-blue-900/20",
    features: ["Feasibility studies", "Project management", "Risk assessment", "Design review"],
  },
  {
    id: 4,
    title: "IT Equipment Supply",
    shortDesc: "Servers, networking, and computing solutions",
    fullDesc:
      "We supply and install enterprise-grade IT infrastructure including servers, workstations, networking equipment, and peripherals from trusted global brands, backed by full technical support.",
    icon: "💻",
    color: "#E67817",
    bg: "from-orange-900/40 to-orange-800/20",
    features: ["Enterprise hardware", "Warranty support", "Configuration services", "Lifecycle management"],
  },
  {
    id: 5,
    title: "Optical Fibre Services",
    shortDesc: "High-speed fibre optic installation & maintenance",
    fullDesc:
      "We design, install, and maintain optical fibre networks for telecommunications, industrial automation, and data centers. Our certified team delivers reliable, high-bandwidth connectivity solutions.",
    icon: "🔆",
    color: "#1F857A",
    bg: "from-teal-900/40 to-teal-800/20",
    features: ["OTDR testing", "Splicing & termination", "Network design", "24/7 support"],
  },
  {
    id: 6,
    title: "Technical Outsourcing",
    shortDesc: "Skilled engineering workforce solutions",
    fullDesc:
      "We provide qualified engineering personnel on contract or permanent basis, enabling companies to access specialized skills and expertise without the overhead of permanent employment.",
    icon: "👷",
    color: "#14223E",
    bg: "from-blue-900/40 to-navy-900/20",
    features: ["Vetted professionals", "Flexible contracts", "Quick deployment", "Skills transfer"],
  },
  {
    id: 7,
    title: "Logistics Consultancy",
    shortDesc: "End-to-end supply chain optimization",
    fullDesc:
      "Our logistics consultants analyze and optimize supply chains, transportation networks, and warehouse operations to reduce costs and improve delivery performance across African markets.",
    icon: "🚛",
    color: "#E67817",
    bg: "from-orange-900/40 to-orange-800/20",
    features: ["Route optimization", "Cost reduction", "Vendor management", "KPI tracking"],
  },
  {
    id: 8,
    title: "Clearing & Forwarding",
    shortDesc: "Seamless customs clearance and freight forwarding",
    fullDesc:
      "We handle all aspects of customs clearance and freight forwarding, ensuring your goods move efficiently through borders with full regulatory compliance and minimal delays.",
    icon: "🚢",
    color: "#1F857A",
    bg: "from-teal-900/40 to-teal-800/20",
    features: ["Customs clearance", "Documentation", "Freight forwarding", "Track & trace"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [flipped, setFlipped] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.05 }
    );
    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "#14223E" }}
    >
      {/* Background particles */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(230,120,23,0.15) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span
            className="text-xs tracking-widest uppercase font-semibold"
            style={{ color: "#E67817", fontFamily: "var(--font-mono)" }}
          >
            What We Do
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-3 text-white"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/60">
            Comprehensive engineering solutions designed to drive operational excellence
            and sustainable growth across industries.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, idx) => (
            <div
              key={svc.id}
              className="service-card reveal"
              style={{
                height: "280px",
                transitionDelay: `${idx * 60}ms`,
              }}
              onClick={() => setFlipped(flipped === svc.id ? null : svc.id)}
            >
              <div
                className="service-card-inner"
                style={{
                  transform: flipped === svc.id ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front */}
                <div
                  className="service-card-front flex flex-col justify-between p-6 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, rgba(20,34,62,0.9), rgba(20,34,62,0.7))`,
                    border: `1px solid rgba(255,255,255,0.1)`,
                  }}
                >
                  <div>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                      style={{ background: `${svc.color}20`, border: `1px solid ${svc.color}40` }}
                    >
                      {svc.icon}
                    </div>
                    <h3
                      className="font-bold text-white mb-2"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {svc.title}
                    </h3>
                    <p className="text-sm text-white/60">{svc.shortDesc}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: svc.color }}>
                    <span>Click to learn more</span>
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Back */}
                <div
                  className="service-card-back flex flex-col justify-between p-6 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${svc.color}20, rgba(20,34,62,0.95))`,
                    border: `1px solid ${svc.color}40`,
                  }}
                >
                  <div>
                    <h3
                      className="font-bold text-white mb-3 text-sm"
                      style={{ fontFamily: "var(--font-outfit)" }}
                    >
                      {svc.title}
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed mb-4">
                      {svc.fullDesc}
                    </p>
                    <ul className="space-y-1">
                      {svc.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-white/80">
                          <span className="w-1 h-1 rounded-full" style={{ background: svc.color }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-3 py-2 px-4 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: svc.color }}
                  >
                    Get a Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
