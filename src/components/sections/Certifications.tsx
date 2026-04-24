"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";

const CERTS = [
  { name: "PACRA", full: "Patents & Companies Registration Agency", num: "120261040695", icon: "🏛️" },
  { name: "TPIN", full: "Taxpayer Identification Number", num: "2004257975", icon: "📜" },
  { name: "ZPPA", full: "Zambia Public Procurement Authority", num: "137269", icon: "✅" },
  { name: "ZRA", full: "Zambia Revenue Authority", num: "Compliant", icon: "⚖️" },
  { name: "ISO Aligned", full: "International Quality Standards", num: "Best Practice", icon: "🌐" },
];

const MILESTONES = [
  { year: "2013", event: "Company founded & PACRA registered" },
  { year: "2015", event: "ZPPA supplier certification achieved" },
  { year: "2018", event: "Expanded to IT & Fibre Optic services" },
  { year: "2020", event: "Logistics Consultancy division launched" },
  { year: "2023", event: "Pan-African operations expansion" },
];

export function Certifications() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="certifications"
      ref={ref}
      className="section-pad relative overflow-hidden"
      style={{ background: "var(--slate-50)" }}
    >
      <Container>
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="label mx-auto mb-5 reveal" style={{ display: "inline-flex" }}>
            Compliance &amp; Trust
          </div>
          <h2
            className="reveal"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.875rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--slate-900)",
            }}
          >
            Certifications &amp;<br />
            <span className="text-copper">Credentials</span>
          </h2>
          <p className="reveal mt-4" style={{ color: "var(--slate-500)" }}>
            Fully registered and compliant with all regulatory requirements in Zambia.
          </p>
        </div>

        {/* Cert cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
          {CERTS.map((c, i) => (
            <div
              key={c.name}
              className="reveal card card-hover text-center p-7"
              style={{
                cursor: "default",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4"
                style={{
                  background: "var(--slate-100)",
                  border: "1px solid var(--slate-200)",
                }}
              >
                {c.icon}
              </div>
              <p
                className="font-bold mb-1"
                style={{ fontFamily: "var(--font-display)", color: "var(--slate-900)", fontSize: "1.0625rem" }}
              >
                {c.name}
              </p>
              <p style={{ fontSize: "11px", color: "var(--slate-400)", marginBottom: "8px", lineHeight: 1.45 }}>
                {c.full}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--copper-500)",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                {c.num}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="reveal max-w-3xl mx-auto">
          <h3
            className="text-center font-bold mb-12"
            style={{ fontFamily: "var(--font-display)", fontSize: "1.375rem", color: "var(--slate-900)" }}
          >
            Company Milestones
          </h3>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ background: "var(--slate-200)" }}
            />

            <div className="space-y-10">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  className={`flex items-center gap-0 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "pr-10 text-right" : "pl-10 text-left"}`}>
                    <div
                      className="inline-block card px-5 py-3.5"
                      style={{ boxShadow: "var(--shadow-sm)" }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "var(--copper-500)",
                          letterSpacing: "0.1em",
                          marginBottom: "4px",
                        }}
                      >
                        {m.year}
                      </p>
                      <p style={{ fontSize: "13px", color: "var(--slate-700)", fontWeight: 500 }}>
                        {m.event}
                      </p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div
                    className="w-3 h-3 rounded-full shrink-0 z-10 ring-4 ring-white"
                    style={{ background: i % 2 === 0 ? "var(--copper-500)" : "var(--navy-900)" }}
                  />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
