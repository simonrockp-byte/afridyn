"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function Hero() {
  const badgeRef  = useRef<HTMLDivElement>(null);
  const h1Ref     = useRef<HTMLHeadingElement>(null);
  const subRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef    = useRef<HTMLDivElement>(null);
  const statsRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [badgeRef, h1Ref, subRef, ctaRef, statsRef];
    els.forEach((r, i) => {
      const el = r.current;
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 900 + i * 140);
    });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--navy)" }}>
      {/* 3D canvas */}
      <HeroCanvas />

      {/* Deep gradient overlays for legibility */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 15% 60%, rgba(11,22,40,0.7) 0%, transparent 100%)",
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to right, rgba(11,22,40,0.95) 0%, rgba(11,22,40,0.6) 50%, rgba(11,22,40,0.1) 100%)",
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{
        background: "linear-gradient(to top, var(--navy), transparent)",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div ref={badgeRef} className="label-chip mb-8">
            Engineering Excellence Across Africa
          </div>

          {/* Headline */}
          <h1 ref={h1Ref} className="font-display font-extrabold leading-[1.05] mb-6" style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", color: "#fff", letterSpacing: "-0.02em" }}>
            Powering Africa's{" "}
            <span className="text-grad-copper">Industrial</span>
            <br />Future
          </h1>

          {/* Sub */}
          <p ref={subRef} className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: "rgba(255,255,255,0.55)" }}>
            From mechanical spares to fibre optic networks — Afridyn Engineering delivers
            world-class solutions built for Africa's most demanding environments.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-3 mb-16">
            <button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="btn-primary">
              Explore Services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="btn-ghost">
              Contact Us
            </button>
          </div>

          {/* Stats row */}
          <div ref={statsRef} className="flex flex-wrap gap-8">
            {[
              { n: "10+", label: "Years Active" },
              { n: "200+", label: "Projects Delivered" },
              { n: "8", label: "Service Lines" },
              { n: "ZPPA", label: "Approved Supplier" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display font-bold text-2xl text-grad-copper leading-none">{s.n}</p>
                <p className="text-xs mt-1.5 tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <svg className="w-5 h-5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
