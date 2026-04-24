"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [titleRef.current, subtitleRef.current, ctaRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      setTimeout(() => {
        if (!el) return;
        el.style.transition = "opacity 0.9s ease, transform 0.9s ease";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 1200 + i * 200);
    });
  }, []);

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0d1b35 0%, #14223E 50%, #1a2d4a 100%)" }}
    >
      {/* 3D Canvas Background */}
      <HeroCanvas />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(230,120,23,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(31,133,122,0.08) 0%, transparent 50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: "rgba(230,120,23,0.1)",
              border: "1px solid rgba(230,120,23,0.3)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#E67817" }}
            />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "#E67817", fontFamily: "var(--font-mono)" }}
            >
              Engineering Excellence Across Africa
            </span>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-outfit)", color: "#fff" }}
          >
            AFRIDYN
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #E67817, #1F857A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ENGINEERING
            </span>
            <br />
            <span style={{ fontSize: "0.55em", fontWeight: 400, color: "rgba(255,255,255,0.7)" }}>
              LIMITED
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl mb-10 max-w-xl"
            style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8 }}
          >
            Delivering world-class mechanical, electrical, IT, fibre optic, and logistics
            engineering solutions that power Africa's industrial future.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <button
              onClick={scrollToServices}
              className="group relative px-8 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #E67817, #cc6a10)" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Our Services
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 rounded-full font-semibold transition-all hover:scale-105"
              style={{
                border: "1px solid rgba(255,255,255,0.3)",
                color: "rgba(255,255,255,0.85)",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              Contact Us
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-16">
            {[
              { value: "10+", label: "Years of Service" },
              { value: "200+", label: "Projects Completed" },
              { value: "50+", label: "Happy Clients" },
            ].map((stat) => (
              <div key={stat.label}>
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
                  {stat.value}
                </p>
                <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest text-white/40 uppercase">Scroll</span>
        <div
          className="w-px h-12 animate-pulse"
          style={{ background: "linear-gradient(to bottom, rgba(230,120,23,0.8), transparent)" }}
        />
      </div>
    </section>
  );
}
