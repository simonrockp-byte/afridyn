"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useReveal(ref: React.RefObject<Element | null>) {
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }, { threshold: 0.12 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let t0 = 0;
        const step = (ts: number) => {
          if (!t0) t0 = ts;
          const p = Math.min((ts - t0) / 1800, 1);
          setVal(Math.round((1 - Math.pow(1 - p, 4)) * to));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function About() {
  const sRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }, { threshold: 0.08 });
    sRef.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const pillars = [
    { icon: "⚡", title: "Innovation", desc: "Leveraging cutting-edge technologies to solve complex engineering challenges." },
    { icon: "🛡️", title: "Integrity", desc: "Transparent operations underpinned by full PACRA, TPIN & ZPPA compliance." },
    { icon: "🎯", title: "Precision", desc: "International-standard engineering execution on every project." },
    { icon: "🌍", title: "Pan-African", desc: "Network and capability spanning the entire African continent." },
  ];

  return (
    <section id="about" ref={sRef} className="section-pad relative overflow-hidden" style={{ background: "var(--off-white)" }}>
      {/* Subtle top edge */}
      <div className="divider absolute top-0 left-0 right-0" />

      {/* Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{
        background: "radial-gradient(circle, rgba(20,83,45,0.04) 0%, transparent 70%)",
        transform: "translate(30%,-30%)"
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <div className="label-chip mb-6 reveal">Who We Are</div>
            <h2 className="font-display font-extrabold mb-6 reveal" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "var(--navy)", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
              Africa's Partner in<br />
              <span className="text-grad-teal">Engineering Excellence</span>
            </h2>
            <p className="text-base leading-relaxed mb-6 reveal" style={{ color: "var(--text-muted)" }}>
              Afridyn Engineering Limited delivers integrated engineering services across
              mechanical, electrical, IT, optical fibre, and logistics sectors. We combine
              deep technical expertise with an unwavering commitment to quality and compliance.
            </p>
            <p className="text-base leading-relaxed mb-10 reveal" style={{ color: "var(--text-muted)", opacity: 0.8 }}>
              Registered with PACRA, TPIN, and ZPPA, our team of certified engineers and
              technicians has built a reputation for on-time, on-budget delivery across
              Zambia and the wider African region.
            </p>

            {/* Stats inline */}
            <div className="grid grid-cols-3 gap-4 mb-10 reveal">
              {[
                { n: 10, s: "+", label: "Years" },
                { n: 200, s: "+", label: "Projects" },
                { n: 50, s: "+", label: "Clients" },
              ].map((st) => (
                <div key={st.label} className="text-center py-6 rounded-2xl bg-white border border-black/[0.03] shadow-sm">
                  <p className="font-display font-bold text-3xl text-grad-copper leading-none"><CountUp to={st.n} suffix={st.s} /></p>
                  <p className="text-[10px] uppercase tracking-widest font-bold mt-2 opacity-40">{st.label}</p>
                </div>
              ))}
            </div>

            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="btn-primary reveal">
              Work With Us →
            </button>
          </div>

          {/* Right */}
          <div className="space-y-6 reveal">
            {/* Image card with frame */}
            <div className="relative p-3 bg-white rounded-3xl shadow-2xl border border-black/[0.03]">
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <Image src="/assets/team_light.png" alt="Engineering" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Floating badge */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="glass rounded-xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0" style={{ background: "rgba(212,121,42,0.15)" }}>🏆</div>
                    <div>
                      <p className="font-semibold text-sm text-var(--navy)">ZPPA Approved Supplier</p>
                      <p className="text-[10px] font-bold uppercase opacity-40 tracking-wider">Fully compliant & certified</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-2 gap-4">
              {pillars.map((p) => (
                <div key={p.title} className="card-lift rounded-2xl p-5 bg-white border border-black/[0.03] shadow-sm">
                  <span className="text-2xl block mb-3">{p.icon}</span>
                  <p className="font-bold text-sm text-var(--navy) mb-1">{p.title}</p>
                  <p className="text-[11px] leading-relaxed text-var(--text-muted)">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
