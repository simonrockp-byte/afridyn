"use client";

import { useEffect, useRef } from "react";

const certs = [
  {
    name: "PACRA",
    full: "Patents & Companies Registration Agency",
    desc: "Officially registered company in Zambia",
    icon: "🏛️",
    color: "#E67817",
  },
  {
    name: "TPIN",
    full: "Taxpayer Identification Number",
    desc: "Tax-compliant business entity",
    icon: "📜",
    color: "#1F857A",
  },
  {
    name: "ZPPA",
    full: "Zambia Public Procurement Authority",
    desc: "Approved procurement supplier",
    icon: "✅",
    color: "#14223E",
  },
  {
    name: "ISO Standards",
    full: "International Quality Standards",
    desc: "Operations aligned with ISO best practices",
    icon: "🌐",
    color: "#E67817",
  },
  {
    name: "ZRA",
    full: "Zambia Revenue Authority",
    desc: "Fully compliant with tax regulations",
    icon: "⚖️",
    color: "#1F857A",
  },
];

const milestones = [
  { year: "2013", event: "Company founded & PACRA registered" },
  { year: "2015", event: "ZPPA supplier certification achieved" },
  { year: "2018", event: "Expanded to IT & Fibre Optic services" },
  { year: "2020", event: "Launched Logistics Consultancy division" },
  { year: "2023", event: "Pan-African operations expansion" },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

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
      id="certifications"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "#14223E" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(230,120,23,0.08) 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span
            className="text-xs tracking-widest uppercase font-semibold"
            style={{ color: "#E67817", fontFamily: "var(--font-mono)" }}
          >
            Trust & Compliance
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-3 text-white"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Certifications & Credentials
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Operating with full regulatory compliance and internationally recognized certifications.
          </p>
        </div>

        {/* Cert cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {certs.map((cert, i) => (
            <div
              key={cert.name}
              className="reveal group text-center p-6 rounded-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl cursor-default"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 transition-transform group-hover:scale-110"
                style={{
                  background: `${cert.color}20`,
                  border: `1px solid ${cert.color}40`,
                }}
              >
                {cert.icon}
              </div>
              <h3
                className="font-bold text-white text-lg mb-1"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {cert.name}
              </h3>
              <p className="text-xs text-white/50 mb-2">{cert.full}</p>
              <p className="text-xs" style={{ color: cert.color }}>
                {cert.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="reveal">
          <h3
            className="text-xl font-bold text-white text-center mb-10"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Our Journey
          </h3>
          <div className="relative">
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: "linear-gradient(to bottom, #E67817, #1F857A)" }}
            />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div
                      className="inline-block p-4 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <p
                        className="font-bold text-sm mb-1"
                        style={{
                          color: i % 2 === 0 ? "#E67817" : "#1F857A",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {m.year}
                      </p>
                      <p className="text-sm text-white/70">{m.event}</p>
                    </div>
                  </div>
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0 z-10"
                    style={{
                      background: i % 2 === 0 ? "#E67817" : "#1F857A",
                      boxShadow: `0 0 16px ${i % 2 === 0 ? "#E67817" : "#1F857A"}`,
                    }}
                  />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
