"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(ease * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "#f8f9fc" }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top right, rgba(31,133,122,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span
            className="text-xs tracking-widest uppercase font-semibold"
            style={{ color: "#E67817", fontFamily: "var(--font-mono)" }}
          >
            Who We Are
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-3 mb-6"
            style={{ fontFamily: "var(--font-outfit)", color: "#14223E" }}
          >
            About Afridyn
            <span
              className="block text-3xl font-normal mt-1"
              style={{
                background: "linear-gradient(135deg, #E67817, #1F857A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Engineering Limited
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <div className="space-y-6">
            <div className="reveal">
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#595959" }}
              >
                Afridyn Engineering Limited is a premier engineering services company
                delivering integrated solutions across mechanical, electrical, IT, optical
                fibre, and logistics sectors throughout Africa.
              </p>
            </div>
            <div className="reveal">
              <p className="leading-relaxed" style={{ color: "#595959" }}>
                Registered and compliant with PACRA, TPIN, and ZPPA, we bring together
                decades of engineering expertise with a commitment to quality, innovation,
                and customer satisfaction. Our team of qualified engineers and technicians
                ensures every project meets international standards.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 mt-8 reveal">
              {[
                { icon: "⚡", label: "Innovation", desc: "Cutting-edge solutions" },
                { icon: "🎯", label: "Precision", desc: "Exact engineering standards" },
                { icon: "🤝", label: "Integrity", desc: "Transparent partnerships" },
                { icon: "🌍", label: "Pan-African", desc: "Continent-wide reach" },
              ].map((v) => (
                <div
                  key={v.label}
                  className="p-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg"
                  style={{ border: "1px solid rgba(20,34,62,0.08)", background: "#fff" }}
                >
                  <div className="text-2xl mb-2">{v.icon}</div>
                  <p className="font-semibold text-sm" style={{ color: "#14223E" }}>
                    {v.label}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#595959" }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats + Image */}
          <div className="space-y-6 reveal">
            {/* Image */}
            <div
              className="relative rounded-2xl overflow-hidden aspect-video"
              style={{ boxShadow: "0 30px 80px rgba(20,34,62,0.15)" }}
            >
              <Image
                src="/enginee.png"
                alt="Afridyn Engineering"
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(20,34,62,0.7) 0%, transparent 60%)",
                }}
              />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-outfit)" }}>
                  Professional Engineering
                </p>
                <p className="text-white/70 text-sm">Zambia & Beyond</p>
              </div>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-4 p-6 rounded-2xl"
              style={{ background: "#14223E" }}
            >
              {[
                { value: 10, suffix: "+", label: "Years" },
                { value: 200, suffix: "+", label: "Projects" },
                { value: 50, suffix: "+", label: "Clients" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="text-3xl font-bold"
                    style={{
                      fontFamily: "var(--font-outfit)",
                      background: "linear-gradient(135deg, #E67817, #1F857A)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs mt-1 text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
