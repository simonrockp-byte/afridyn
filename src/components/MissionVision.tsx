"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
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
      id="mission"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <span
            className="text-xs tracking-widest uppercase font-semibold"
            style={{ color: "#E67817", fontFamily: "var(--font-mono)" }}
          >
            Our Purpose
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-3"
            style={{ fontFamily: "var(--font-outfit)", color: "#14223E" }}
          >
            Mission & Vision
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Mission */}
          <div
            className="reveal relative rounded-3xl overflow-hidden p-10"
            style={{
              background: "linear-gradient(135deg, #14223E 0%, #1a2d4a 100%)",
              boxShadow: "0 30px 80px rgba(20,34,62,0.2)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
              style={{
                background: "#E67817",
                filter: "blur(60px)",
                transform: "translate(30%, -30%)",
              }}
            />
            <div className="relative z-10">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6"
                style={{ background: "rgba(230,120,23,0.15)", border: "1px solid rgba(230,120,23,0.3)" }}
              >
                🎯
              </div>
              <h3
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Our Mission
              </h3>
              <p className="text-white/70 leading-relaxed text-lg">
                To deliver exceptional engineering services that empower African industries,
                drive economic growth, and create lasting value for our clients through
                innovation, technical excellence, and uncompromising quality.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Excellence", "Innovation", "Value Creation"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(230,120,23,0.15)",
                      border: "1px solid rgba(230,120,23,0.3)",
                      color: "#E67817",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Vision */}
          <div
            className="reveal relative rounded-3xl overflow-hidden p-10"
            style={{
              background: "linear-gradient(135deg, #1F857A 0%, #166b61 100%)",
              boxShadow: "0 30px 80px rgba(31,133,122,0.2)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10"
              style={{
                background: "#ffffff",
                filter: "blur(60px)",
                transform: "translate(30%, -30%)",
              }}
            />
            <div className="relative z-10">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-6"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}
              >
                🔭
              </div>
              <h3
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                Our Vision
              </h3>
              <p className="text-white/80 leading-relaxed text-lg">
                To be the foremost engineering services company in Africa, recognized for
                transforming industrial landscapes through sustainable practices, cutting-edge
                technology, and a team of world-class engineering professionals.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Pan-African", "Sustainable", "World-Class"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Core values row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { icon: "⚡", title: "Innovation", desc: "Embracing new technologies" },
            { icon: "🛡️", title: "Integrity", desc: "Honest and transparent" },
            { icon: "🤝", title: "Collaboration", desc: "Partnering for success" },
            { icon: "🌍", title: "Impact", desc: "Making Africa stronger" },
          ].map((val, i) => (
            <div
              key={val.title}
              className="reveal text-center p-6 rounded-2xl transition-all hover:-translate-y-2 hover:shadow-xl"
              style={{
                border: "1px solid rgba(20,34,62,0.08)",
                background: "#fff",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <div className="text-3xl mb-3">{val.icon}</div>
              <h4
                className="font-bold mb-2"
                style={{ fontFamily: "var(--font-outfit)", color: "#14223E" }}
              >
                {val.title}
              </h4>
              <p className="text-sm" style={{ color: "#595959" }}>
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
