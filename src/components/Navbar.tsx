"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const services = [
  "Mechanical & Electrical Spares",
  "Maintenance Services",
  "Engineering Consultation",
  "IT Equipment Supply",
  "Optical Fibre Services",
  "Technical Outsourcing",
  "Logistics Consultancy",
  "Clearing & Forwarding",
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(20, 34, 62, 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(230,120,23,0.15)" : "none",
        padding: scrolled ? "12px 0" : "20px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("#home")} className="flex items-center gap-3">
          <Image
            src="/afridyn_logo.png"
            alt="Afridyn"
            width={48}
            height={48}
            className="object-contain"
            style={{ filter: scrolled ? "none" : "brightness(0) invert(1)" }}
          />
          <div>
            <p
              className="font-bold text-sm leading-tight"
              style={{
                fontFamily: "var(--font-outfit)",
                color: scrolled ? "#E67817" : "#fff",
                letterSpacing: "0.05em",
              }}
            >
              AFRIDYN
            </p>
            <p
              className="text-xs leading-tight"
              style={{
                color: scrolled ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.7)",
                letterSpacing: "0.1em",
              }}
            >
              ENGINEERING
            </p>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-sm font-medium transition-colors"
                  style={{
                    color: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.9)",
                  }}
                >
                  {link.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 8L2 4h8L6 8z" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 rounded-xl overflow-hidden shadow-2xl"
                    style={{
                      background: "rgba(20,34,62,0.97)",
                      border: "1px solid rgba(230,120,23,0.2)",
                    }}
                  >
                    {services.map((s) => (
                      <button
                        key={s}
                        onClick={() => scrollTo("#services")}
                        className="block w-full text-left px-4 py-3 text-sm transition-colors hover:bg-white/5"
                        style={{ color: "rgba(255,255,255,0.8)" }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium transition-colors hover:text-orange-400"
                style={{
                  color: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.9)",
                }}
              >
                {link.label}
              </button>
            )
          )}
        </nav>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollTo("#contact")}
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #E67817, #1F857A)",
              color: "#fff",
            }}
          >
            Get In Touch
          </button>

          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-0.5 transition-all"
              style={{
                background: "#fff",
                transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all"
              style={{
                background: "#fff",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all"
              style={{
                background: "#fff",
                transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="lg:hidden py-4"
          style={{
            background: "rgba(20,34,62,0.97)",
            borderTop: "1px solid rgba(230,120,23,0.2)",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left px-6 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5"
            >
              {link.label}
            </button>
          ))}
          <div className="px-6 pt-4">
            <button
              onClick={() => scrollTo("#contact")}
              className="w-full py-3 rounded-full text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #E67817, #1F857A)" }}
            >
              Get In Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
