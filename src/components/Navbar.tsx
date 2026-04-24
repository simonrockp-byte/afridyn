"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const services = [
  { label: "Mechanical & Electrical Spares", icon: "⚙️" },
  { label: "Maintenance Services", icon: "🔧" },
  { label: "Engineering Consultation", icon: "📐" },
  { label: "IT Equipment Supply", icon: "💻" },
  { label: "Optical Fibre Services", icon: "🔆" },
  { label: "Technical Outsourcing", icon: "👷" },
  { label: "Logistics Consultancy", icon: "🚛" },
  { label: "Clearing & Forwarding", icon: "🚢" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActive(id);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        padding: scrolled ? "0" : "0",
        background: scrolled ? "rgba(255,255,255,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => goto("home")} className="flex items-center gap-3 shrink-0">
          <div className="relative w-8 h-8">
            <Image src="/afridyn_logo.png" alt="Afridyn" fill className="object-contain" />
          </div>
          <div className="leading-none text-left">
            <span className="font-display font-black text-sm tracking-widest" style={{ color: "var(--navy)" }}>AFRIDYN</span>
            <span className="block text-[8px] font-bold tracking-[.3em] opacity-30" style={{ color: "var(--navy)" }}>ENGINEERING</span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {(["home","about","services","why-us","contact"] as const).map((id) => (
            id === "services" ? (
              <div key={id} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                <button
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                  style={{ color: active === id ? "var(--copper)" : "rgba(15,23,42,0.6)" }}
                >
                  Services
                  <svg className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Mega dropdown */}
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    background: "rgba(11,22,40,0.98)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    opacity: servicesOpen ? 1 : 0,
                    pointerEvents: servicesOpen ? "all" : "none",
                    transform: `translateX(-50%) translateY(${servicesOpen ? "0" : "-8px"})`,
                    transition: "opacity 0.2s, transform 0.2s",
                  }}
                >
                  <div className="p-4 grid grid-cols-2 gap-1">
                    {services.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => goto("services")}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all hover:bg-white/5 group"
                      >
                        <span className="text-base shrink-0">{s.icon}</span>
                        <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors leading-tight">{s.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="px-4 pb-4">
                    <div className="h-px bg-white/5 mb-3" />
                    <button onClick={() => goto("contact")} className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all" style={{ background: "linear-gradient(135deg,#D4792A,#1A7A70)" }}>
                      Request a Quote →
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                key={id}
                onClick={() => goto(id)}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize"
                style={{ color: active === id ? "var(--copper)" : "rgba(15,23,42,0.6)" }}
              >
                {id === "why-us" ? "Why Us" : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            )
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button onClick={() => goto("contact")} className="btn-primary text-sm">
            Get a Quote
          </button>
        </div>

        {/* Hamburger */}
        <button className="lg:hidden p-2 -mr-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <div className="w-5 flex flex-col gap-1.5">
            <span className="block h-px bg-slate-900 transition-all font-bold" style={{ transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
            <span className="block h-px bg-slate-900 transition-all font-bold" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="block h-px bg-slate-900 transition-all font-bold" style={{ transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden" style={{ background: "rgba(11,22,40,0.98)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="px-6 py-4 space-y-1">
            {["home","about","services","why-us","contact"].map((id) => (
              <button key={id} onClick={() => goto(id)} className="block w-full text-left px-4 py-3 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 capitalize">
                {id === "why-us" ? "Why Us" : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
            <div className="pt-3">
              <button onClick={() => goto("contact")} className="btn-primary w-full justify-center">Get a Quote</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
