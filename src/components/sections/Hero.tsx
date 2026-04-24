"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/Container";

const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), { ssr: false });

const STATS = [
  { value: "10+", label: "Years Active" },
  { value: "200+", label: "Projects Delivered" },
  { value: "8", label: "Service Lines" },
  { value: "ZPPA", label: "Approved Supplier" },
];

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const children = contentRef.current?.children;
    if (!children) return;
    Array.from(children).forEach((el, i) => {
      const e = el as HTMLElement;
      e.style.opacity = "0";
      e.style.transform = "translateY(20px)";
      setTimeout(() => {
        e.style.transition = "opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out)";
        e.style.opacity = "1";
        e.style.transform = "translateY(0)";
      }, 800 + i * 120);
    });
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-grid-dark"
      style={{ background: "var(--navy-900)" }}
    >
      {/* 3D Canvas */}
      <HeroCanvas />

      {/* Left gradient for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, rgba(10,22,40,0.98) 0%, rgba(10,22,40,0.85) 45%, rgba(10,22,40,0.3) 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--navy-900), transparent)" }}
      />

      <Container className="relative z-10 py-32">
        <div ref={contentRef} className="max-w-[680px] space-y-0">
          {/* Overline */}
          <div className="label" style={{ marginBottom: "28px", display: "inline-flex" }}>
            Engineering Excellence Across Africa
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.06,
              color: "white",
              fontFamily: "var(--font-display)",
              marginBottom: "24px",
            }}
          >
            Powering Africa's
            <br />
            <span className="text-copper">Industrial</span> Future
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.55)",
              maxWidth: "520px",
              marginBottom: "36px",
            }}
          >
            From mechanical spares to fibre optic networks — Afridyn Engineering delivers
            world-class solutions for Africa's most demanding industrial environments.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-3"
            style={{ marginBottom: "56px" }}
          >
            <button
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              className="btn btn-copper btn-lg"
            >
              Explore Services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn btn-ghost-dark btn-lg"
            >
              Contact Us
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {STATS.map((s, i) => (
              <div key={s.label}>
                {i > 0 && (
                  <div
                    className="hidden sm:block"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      height: "24px",
                      width: "1px",
                      background: "rgba(255,255,255,0.12)",
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "1.5rem",
                    color: "white",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    fontFamily: "var(--font-mono)",
                    color: "rgba(255,255,255,0.38)",
                    letterSpacing: "0.08em",
                    marginTop: "5px",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div
          className="flex flex-col items-center gap-2 animate-bounce"
          style={{ animationDuration: "2s" }}
        >
          <svg className="w-5 h-5" style={{ color: "rgba(255,255,255,0.2)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
