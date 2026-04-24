"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Why Us", id: "why-us" },
  { label: "Certifications", id: "certifications" },
];

const SERVICE_ITEMS = [
  { label: "Mechanical & Electrical Spares", icon: "⚙️" },
  { label: "Maintenance Services", icon: "🔧" },
  { label: "Engineering Consultation", icon: "📐" },
  { label: "IT Equipment Supply", icon: "💻" },
  { label: "Optical Fibre Services", icon: "🔆" },
  { label: "Technical Outsourcing", icon: "👷" },
  { label: "Logistics Consultancy", icon: "🚛" },
  { label: "Clearing & Forwarding", icon: "🚢" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        height: scrolled ? "60px" : "72px",
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.06)" : "none",
      }}
    >
      <Container className="h-full flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => goto("home")}
          className="flex items-center gap-2.5 shrink-0"
          aria-label="Go to top"
        >
          <div className="relative w-8 h-8">
            <Image
              src="/afridyn_logo.png"
              alt="Afridyn Engineering"
              fill
              className="object-contain"
              style={{ filter: scrolled ? "none" : "brightness(0) invert(1)" }}
            />
          </div>
          <div className="leading-none text-left">
            <span
              className="block font-bold text-sm tracking-[0.12em]"
              style={{
                fontFamily: "var(--font-display)",
                color: scrolled ? "var(--slate-900)" : "rgba(255,255,255,0.95)",
              }}
            >
              AFRIDYN
            </span>
            <span
              className="block text-[8px] tracking-[0.22em] uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                color: scrolled ? "var(--slate-400)" : "rgba(255,255,255,0.45)",
              }}
            >
              Engineering
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) =>
            link.id === "services" ? (
              <div
                key={link.id}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    color: scrolled ? "var(--slate-600)" : "rgba(255,255,255,0.75)",
                  }}
                >
                  Services
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div
                  className="absolute top-full left-1/2 mt-1 w-[440px] rounded-2xl overflow-hidden"
                  style={{
                    background: "white",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
                    opacity: servicesOpen ? 1 : 0,
                    pointerEvents: servicesOpen ? "all" : "none",
                    transform: `translateX(-50%) translateY(${servicesOpen ? "0" : "-6px"})`,
                    transition: "opacity 0.18s ease, transform 0.18s ease",
                  }}
                >
                  <div className="p-3 grid grid-cols-2 gap-0.5">
                    {SERVICE_ITEMS.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => goto("services")}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors hover:bg-slate-50 group"
                      >
                        <span className="text-base shrink-0">{s.icon}</span>
                        <span
                          className="text-sm leading-tight transition-colors group-hover:text-slate-900"
                          style={{ color: "var(--slate-600)" }}
                        >
                          {s.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="mx-3 mb-3 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => goto("contact")}
                      className="btn btn-copper w-full justify-center text-sm py-2.5"
                    >
                      Request a Quote →
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                key={link.id}
                onClick={() => goto(link.id)}
                className="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors hover:text-slate-900"
                style={{
                  color: scrolled ? "var(--slate-600)" : "rgba(255,255,255,0.75)",
                }}
              >
                {link.label}
              </button>
            )
          )}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => goto("contact")}
            className="btn btn-sm"
            style={{
              background: scrolled ? "var(--navy-900)" : "rgba(255,255,255,0.12)",
              color: "white",
              border: scrolled ? "none" : "1px solid rgba(255,255,255,0.18)",
            }}
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 -mr-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-[5px]">
            <span
              className="block h-[1.5px] rounded transition-all"
              style={{
                background: scrolled ? "var(--slate-800)" : "white",
                transform: mobileOpen ? "rotate(45deg) translate(4px,4px)" : "none",
              }}
            />
            <span
              className="block h-[1.5px] rounded transition-all"
              style={{
                background: scrolled ? "var(--slate-800)" : "white",
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-[1.5px] rounded transition-all"
              style={{
                background: scrolled ? "var(--slate-800)" : "white",
                transform: mobileOpen ? "rotate(-45deg) translate(4px,-4px)" : "none",
              }}
            />
          </div>
        </button>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            background: "white",
            borderTop: "1px solid var(--slate-200)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <div className="px-5 py-4 space-y-1">
            <button
              onClick={() => goto("home")}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Home
            </button>
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => goto(link.id)}
                className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => goto("contact")}
                className="btn btn-copper w-full justify-center"
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
