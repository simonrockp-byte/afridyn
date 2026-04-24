"use client";

import { useEffect, useRef } from "react";

export default function MissionVision() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add("visible"); }, { threshold: 0.08 });
    ref.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="mission" ref={ref} className="section-pad relative overflow-hidden" style={{ background: "var(--navy-3)" }}>
      <div className="divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <div className="label-chip mx-auto mb-5" style={{ display: "inline-flex" }}>Our Purpose</div>
          <h2 className="font-display font-extrabold" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", letterSpacing: "-0.02em" }}>
            Mission & <span className="text-grad-teal">Vision</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Mission */}
          <div className="reveal rounded-2xl overflow-hidden relative p-10" style={{ background: "rgba(212,121,42,0.05)", border: "1px solid rgba(212,121,42,0.12)" }}>
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,121,42,0.1) 0%, transparent 70%)" }} />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6" style={{ background: "rgba(212,121,42,0.12)", border: "1px solid rgba(212,121,42,0.2)" }}>🎯</div>
              <p className="font-mono-custom text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#D4792A" }}>Our Mission</p>
              <h3 className="font-display font-bold text-white text-xl mb-4 leading-snug">Deliver engineering solutions that power Africa's industries</h3>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                To deliver exceptional engineering services that empower African industries,
                drive economic growth, and create lasting value through innovation, technical
                excellence, and an uncompromising commitment to quality.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {["Excellence","Innovation","Value Creation"].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(212,121,42,0.1)", border: "1px solid rgba(212,121,42,0.2)", color: "#D4792A" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="reveal rounded-2xl overflow-hidden relative p-10" style={{ background: "rgba(26,122,112,0.05)", border: "1px solid rgba(26,122,112,0.15)", transitionDelay: "100ms" }}>
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(26,122,112,0.1) 0%, transparent 70%)" }} />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6" style={{ background: "rgba(26,122,112,0.12)", border: "1px solid rgba(26,122,112,0.2)" }}>🔭</div>
              <p className="font-mono-custom text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#22A090" }}>Our Vision</p>
              <h3 className="font-display font-bold text-white text-xl mb-4 leading-snug">Africa's foremost engineering services company</h3>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                To be the foremost engineering services company in Africa — recognised for
                transforming industrial landscapes through sustainable practices, cutting-edge
                technology, and a team of world-class engineering professionals.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {["Pan-African","Sustainable","World-Class"].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(26,122,112,0.1)", border: "1px solid rgba(26,122,112,0.2)", color: "#22A090" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Core values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "⚡", title: "Innovation", desc: "Embracing technology" },
            { icon: "🛡️", title: "Integrity", desc: "Transparent business" },
            { icon: "🤝", title: "Collaboration", desc: "Stronger together" },
            { icon: "🌍", title: "Impact", desc: "Africa's progress" },
          ].map((v, i) => (
            <div key={v.title} className="reveal card-lift text-center p-6 rounded-xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", transitionDelay: `${i * 60}ms` }}>
              <span className="text-2xl block mb-3">{v.icon}</span>
              <p className="font-display font-bold text-white text-sm mb-1">{v.title}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
