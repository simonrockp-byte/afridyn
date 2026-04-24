"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";

const VALUES = [
  { icon: "⚡", title: "Innovation", desc: "Embracing emerging technologies" },
  { icon: "🛡️", title: "Integrity", desc: "Transparent in all we do" },
  { icon: "🤝", title: "Collaboration", desc: "Stronger outcomes together" },
  { icon: "🌍", title: "Impact", desc: "Driving Africa's progress" },
];

export function MissionVision() {
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
    <section id="mission" ref={ref} className="section-pad relative overflow-hidden bg-white">
      <div className="divider-subtle absolute top-0 left-0 right-0" />
      <Container>
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="label mx-auto mb-5 reveal" style={{ display: "inline-flex" }}>Our Purpose</div>
          <h2
            className="reveal"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.875rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--slate-900)",
            }}
          >
            Mission &amp; <span className="text-copper">Vision</span>
          </h2>
        </div>

        {/* Mission / Vision split */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Mission */}
          <div
            className="reveal rounded-2xl p-10 relative overflow-hidden"
            style={{ background: "var(--navy-900)" }}
          >
            <div
              className="absolute -top-24 -right-24 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(212,121,42,0.15) 0%, transparent 70%)" }}
            />
            <div className="relative">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6"
                style={{ background: "rgba(212,121,42,0.12)", border: "1px solid rgba(212,121,42,0.2)" }}
              >
                🎯
              </div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--copper-400)",
                  marginBottom: "12px",
                }}
              >
                Our Mission
              </p>
              <h3
                className="font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.375rem", lineHeight: 1.3 }}
              >
                Power Africa's industrial sectors with engineering excellence
              </h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontSize: "0.9375rem" }}>
                To deliver exceptional engineering services that empower African industries,
                drive economic growth, and create lasting value through innovation, technical
                excellence, and an uncompromising commitment to quality.
              </p>
              <div className="flex flex-wrap gap-2 mt-7">
                {["Excellence", "Innovation", "Value Creation"].map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "4px 12px",
                      borderRadius: "100px",
                      background: "rgba(212,121,42,0.12)",
                      border: "1px solid rgba(212,121,42,0.2)",
                      color: "var(--copper-400)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Vision */}
          <div
            className="reveal rounded-2xl p-10 relative overflow-hidden"
            style={{ background: "var(--slate-900)", transitionDelay: "80ms" }}
          >
            <div
              className="absolute -top-24 -right-24 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)" }}
            />
            <div className="relative">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                🔭
              </div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "12px",
                }}
              >
                Our Vision
              </p>
              <h3
                className="font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.375rem", lineHeight: 1.3 }}
              >
                Africa's foremost engineering services company
              </h3>
              <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, fontSize: "0.9375rem" }}>
                To be the foremost engineering services company in Africa — recognised for
                transforming industrial landscapes through sustainable practices, cutting-edge
                technology, and a team of world-class engineering professionals.
              </p>
              <div className="flex flex-wrap gap-2 mt-7">
                {["Pan-African", "Sustainable", "World-Class"].map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "4px 12px",
                      borderRadius: "100px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Core values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="reveal card card-hover text-center p-7"
              style={{ cursor: "default", transitionDelay: `${i * 60}ms` }}
            >
              <span className="text-2xl block mb-3">{v.icon}</span>
              <p
                className="font-bold text-sm mb-1"
                style={{ fontFamily: "var(--font-display)", color: "var(--slate-900)" }}
              >
                {v.title}
              </p>
              <p style={{ fontSize: "12px", color: "var(--slate-400)" }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </Container>
      <div className="divider-subtle absolute bottom-0 left-0 right-0" />
    </section>
  );
}
