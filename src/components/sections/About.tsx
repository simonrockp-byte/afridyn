"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold }
    );
    ref.current?.querySelectorAll(".reveal, .reveal-left").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let t0 = 0;
        const step = (ts: number) => {
          if (!t0) t0 = ts;
          const p = Math.min((ts - t0) / 1600, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(ease * to));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (spanRef.current) obs.observe(spanRef.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={spanRef}>{val}{suffix}</span>;
}

const PILLARS = [
  { icon: "⚡", title: "Innovation", desc: "Cutting-edge engineering tech for complex challenges" },
  { icon: "🛡️", title: "Integrity", desc: "Full PACRA, TPIN & ZPPA compliance" },
  { icon: "🎯", title: "Precision", desc: "International-standard project execution" },
  { icon: "🌍", title: "Pan-African", desc: "Capability spanning the entire continent" },
];

export function About() {
  const sectionRef = useReveal();

  return (
    <Section id="about" background="slate">
      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className="absolute inset-0 pointer-events-none"
      />
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left */}
          <div>
            <div className="label reveal mb-6" style={{ display: "inline-flex" }}>Who We Are</div>

            <h2
              className="reveal"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.875rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "var(--slate-900)",
                marginBottom: "20px",
              }}
            >
              Africa's Partner in<br />
              <span className="text-copper">Engineering Excellence</span>
            </h2>

            <p className="reveal" style={{ color: "var(--slate-500)", lineHeight: 1.75, marginBottom: "16px" }}>
              Afridyn Engineering Limited delivers integrated engineering services across
              mechanical, electrical, IT, optical fibre, and logistics sectors throughout Africa.
            </p>

            <p className="reveal" style={{ color: "var(--slate-400)", lineHeight: 1.75, marginBottom: "40px" }}>
              Registered with PACRA, TPIN, and ZPPA — our certified engineers and technicians
              have built a reputation for on-time, on-budget delivery across Zambia and the
              wider African region.
            </p>

            {/* Stats row */}
            <div className="reveal grid grid-cols-3 gap-4 mb-10">
              {[
                { n: 10, s: "+", label: "Years" },
                { n: 200, s: "+", label: "Projects" },
                { n: 50, s: "+", label: "Clients" },
              ].map((st) => (
                <div
                  key={st.label}
                  className="card text-center py-6"
                  style={{ boxShadow: "var(--shadow-sm)" }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "2rem",
                      lineHeight: 1,
                      background: "linear-gradient(135deg, var(--copper-500), var(--copper-400))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    <CountUp to={st.n} suffix={st.s} />
                  </p>
                  <p
                    style={{
                      fontSize: "10px",
                      fontFamily: "var(--font-mono)",
                      color: "var(--slate-400)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginTop: "6px",
                    }}
                  >
                    {st.label}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn btn-primary reveal"
            >
              Work With Us →
            </button>
          </div>

          {/* Right */}
          <div className="reveal space-y-4">
            {/* Image */}
            <div
              className="card overflow-hidden"
              style={{ aspectRatio: "4/3", padding: 0, boxShadow: "var(--shadow-2xl)" }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/enginee.png"
                  alt="Afridyn Engineering team"
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)" }}
                />
                {/* Badge */}
                <div
                  className="absolute bottom-5 left-5 right-5 flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "var(--shadow-lg)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
                    style={{ background: "rgba(212,121,42,0.1)" }}
                  >
                    🏆
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "var(--slate-900)" }}>
                      ZPPA Approved Supplier
                    </p>
                    <p style={{ fontSize: "11px", color: "var(--slate-400)", marginTop: "1px" }}>
                      Fully compliant & registered
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-3">
              {PILLARS.map((p) => (
                <div
                  key={p.title}
                  className="card card-hover p-5"
                  style={{ cursor: "default" }}
                >
                  <span className="text-xl block mb-3">{p.icon}</span>
                  <p
                    className="font-semibold text-sm mb-1"
                    style={{ fontFamily: "var(--font-display)", color: "var(--slate-900)" }}
                  >
                    {p.title}
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--slate-500)", lineHeight: 1.5 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
