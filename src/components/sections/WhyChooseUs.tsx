"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";

const REASONS = [
  { num: "01", icon: "🏆", title: "Proven Track Record", desc: "Over a decade of successful project delivery across Zambia and the African continent, spanning mining, manufacturing, and infrastructure sectors.", stat: "10+ Years" },
  { num: "02", icon: "🎓", title: "Certified Professionals", desc: "Every engineer and technician holds qualifications from internationally recognised bodies — delivering work that meets global industry standards.", stat: "100% Certified" },
  { num: "03", icon: "⚡", title: "Rapid Response", desc: "24/7 emergency response capability ensures your operations never face prolonged downtime due to equipment or infrastructure failure.", stat: "24/7 Support" },
  { num: "04", icon: "🌍", title: "Pan-African Reach", desc: "Our strategic network and partnerships span the continent — enabling us to deliver wherever your operations are based across Africa.", stat: "Africa-Wide" },
  { num: "05", icon: "📋", title: "Fully Compliant", desc: "Registered with PACRA, TPIN, and ZPPA — we operate with full regulatory compliance and transparent, accountable business practices.", stat: "ZPPA Certified" },
  { num: "06", icon: "🔗", title: "End-to-End Solutions", desc: "From procurement to installation, maintenance, and logistics — a single trusted partner for your complete engineering project lifecycle.", stat: "Full Lifecycle" },
];

export function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.06 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="why-us" ref={ref} className="section-pad relative overflow-hidden" style={{ background: "var(--slate-50)" }}>
      <Container>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="label reveal mb-5" style={{ display: "inline-flex" }}>The Afridyn Advantage</div>
            <h2
              className="reveal"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.875rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "var(--slate-900)",
              }}
            >
              Why Industry Leaders<br />
              <span className="text-copper">Choose Afridyn</span>
            </h2>
          </div>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn btn-primary reveal shrink-0"
          >
            Start a Project →
          </button>
        </div>

        {/* Reasons — list style like Stripe/Linear */}
        <div className="space-y-3">
          {REASONS.map((r, i) => (
            <div
              key={r.num}
              className="reveal card card-hover group"
              style={{
                transitionDelay: `${i * 50}ms`,
                padding: "28px 32px",
                cursor: "default",
              }}
            >
              <div className="flex items-start gap-6">
                {/* Number */}
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--slate-300)",
                    letterSpacing: "0.05em",
                    minWidth: "28px",
                    paddingTop: "3px",
                  }}
                >
                  {r.num}
                </span>

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110"
                  style={{
                    background: "var(--slate-100)",
                    border: "1px solid var(--slate-200)",
                  }}
                >
                  {r.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3
                      className="font-bold"
                      style={{ fontFamily: "var(--font-display)", color: "var(--slate-900)", fontSize: "1rem" }}
                    >
                      {r.title}
                    </h3>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "var(--copper-500)",
                        background: "rgba(212,121,42,0.08)",
                        border: "1px solid rgba(212,121,42,0.15)",
                        padding: "3px 10px",
                        borderRadius: "100px",
                        whiteSpace: "nowrap",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {r.stat}
                    </span>
                  </div>
                  <p style={{ color: "var(--slate-500)", fontSize: "0.9375rem", lineHeight: 1.65 }}>
                    {r.desc}
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  className="w-4 h-4 shrink-0 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                  style={{ color: "var(--copper-500)", marginTop: "2px" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
