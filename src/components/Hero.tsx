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
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "var(--bg)" }}>
      {/* Background Image Layer */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/assets/hero_industrial.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "multiply"
        }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)",
        backgroundSize: "60px 60px"
      }} />

      {/* 3D canvas */}
      <HeroCanvas />

      {/* Soft gradient overlays for legibility */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to right, #FFFFFF 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%)",
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{
        background: "linear-gradient(to top, var(--bg), transparent)",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            {/* Badge */}
            <div ref={badgeRef} className="label-chip mb-8">
              Engineering Excellence Across Africa
            </div>

            {/* Headline */}
            <h1 ref={h1Ref} className="font-display font-extrabold leading-[1.05] mb-6" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "var(--navy)", letterSpacing: "-0.03em" }}>
              Powering Africa's<br />
              <span className="text-grad-copper">Industrial</span> Future
            </h1>

            {/* Sub */}
            <p ref={subRef} className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: "var(--text-muted)" }}>
              From mechanical spares to fibre optic networks — Afridyn Engineering delivers
              world-class solutions built for Africa's most demanding environments.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 mb-16">
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
            <div ref={statsRef} className="flex flex-wrap gap-10">
              {[
                { n: "10+", label: "Years Active" },
                { n: "200+", label: "Projects Delivered" },
                { n: "ZPPA", label: "Approved Supplier" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display font-bold text-3xl text-grad-copper leading-none">{s.n}</p>
                  <p className="text-xs mt-2 tracking-wide font-semibold opacity-60" style={{ color: "var(--navy)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="hidden lg:block lg:col-span-5 relative">
             <div className="relative rounded-3xl overflow-hidden aspect-square shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                <img src="/assets/team_light.png" alt="Engineering Team" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
             </div>
             {/* Floating UI element */}
             <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl shadow-xl animate-bounce-slow">
                <p className="text-grad-teal font-bold text-lg leading-none">24/7</p>
                <p className="text-[10px] uppercase font-bold tracking-widest mt-1 opacity-50">Operational Support</p>
             </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-var(--navy) to-transparent opacity-20" />
      </div>
    </section>
  );
}
