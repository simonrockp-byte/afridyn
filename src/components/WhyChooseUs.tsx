"use client";

import { useEffect, useRef } from "react";

const reasons = [
  {
    icon: "🏆",
    title: "Proven Track Record",
    desc: "Over a decade of successful project delivery across Zambia and the African continent, with a portfolio spanning multiple industries.",
    stat: "10+ Years",
    color: "#E67817",
  },
  {
    icon: "🎓",
    title: "Certified Professionals",
    desc: "Our team comprises qualified engineers, technicians, and specialists certified by international engineering bodies.",
    stat: "100% Certified",
    color: "#1F857A",
  },
  {
    icon: "⚡",
    title: "Rapid Response",
    desc: "24/7 emergency response capability ensures your operations never face prolonged downtime due to equipment failure.",
    stat: "24/7 Support",
    color: "#E67817",
  },
  {
    icon: "🌍",
    title: "Pan-African Reach",
    desc: "Our network and partnerships span the entire African continent, enabling us to deliver services wherever you operate.",
    stat: "Africa-Wide",
    color: "#1F857A",
  },
  {
    icon: "📋",
    title: "Fully Compliant",
    desc: "Registered with PACRA, TPIN, and ZPPA, we operate with full regulatory compliance and transparent business practices.",
    stat: "ZPPA Certified",
    color: "#E67817",
  },
  {
    icon: "💡",
    title: "Integrated Solutions",
    desc: "From procurement to installation, maintenance, and logistics — we handle the complete project lifecycle under one roof.",
    stat: "End-to-End",
    color: "#1F857A",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.05 }
    );
    const reveals = sectionRef.current?.querySelectorAll(".reveal");
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "#f8f9fc" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(20,34,62,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span
            className="text-xs tracking-widest uppercase font-semibold"
            style={{ color: "#E67817", fontFamily: "var(--font-mono)" }}
          >
            The Afridyn Advantage
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-3"
            style={{ fontFamily: "var(--font-outfit)", color: "#14223E" }}
          >
            Why Choose Us
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: "#595959" }}>
            We combine technical expertise, regional knowledge, and a passion for
            excellence to deliver engineering solutions that exceed expectations.
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <div
              key={reason.title}
              className="reveal group p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-default"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(20,34,62,0.06)",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{
                    background: `${reason.color}12`,
                    border: `1px solid ${reason.color}30`,
                  }}
                >
                  {reason.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3
                      className="font-bold"
                      style={{ fontFamily: "var(--font-outfit)", color: "#14223E" }}
                    >
                      {reason.title}
                    </h3>
                    <span
                      className="text-xs font-bold px-2 py-1 rounded-full flex-shrink-0"
                      style={{
                        background: `${reason.color}15`,
                        color: reason.color,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {reason.stat}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#595959" }}>
                    {reason.desc}
                  </p>
                </div>
              </div>

              {/* Hover accent bar */}
              <div
                className="mt-6 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: `linear-gradient(90deg, ${reason.color}, transparent)` }}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 reveal">
          <p className="text-lg mb-6" style={{ color: "#595959" }}>
            Ready to experience the Afridyn difference?
          </p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-10 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #14223E, #1F857A)" }}
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
