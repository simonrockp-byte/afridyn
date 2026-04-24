"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";

const SERVICES = ["Mech. & Elec. Spares", "Maintenance", "Engineering Consulting", "IT Equipment", "Optical Fibre", "Logistics", "Clearing & Forwarding"];
const NAV = [["home","Home"],["about","About"],["services","Services"],["why-us","Why Choose Us"],["certifications","Certifications"],["contact","Contact"]];

export function Footer() {
  const goto = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer style={{ background: "var(--navy-900)" }}>
      {/* Top gradient line */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,121,42,0.5), rgba(10,22,40,0.5), transparent)" }} />

      <Container className="pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-7 h-7">
                <Image
                  src="/afridyn_logo.png"
                  alt="Afridyn"
                  fill
                  className="object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "13px",
                    color: "white",
                    letterSpacing: "0.1em",
                  }}
                >
                  AFRIDYN
                </p>
                <p style={{ fontSize: "8px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.2em", fontFamily: "var(--font-mono)" }}>
                  ENGINEERING LIMITED
                </p>
              </div>
            </div>
            <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.38)", lineHeight: 1.7, marginBottom: "20px" }}>
              Engineering Excellence Across Africa — world-class industrial, IT, and logistics
              solutions since 2013.
            </p>
            <div className="flex gap-2">
              {[{ l: "in", bg: "#0077B5" }, { l: "f", bg: "#1877F2" }, { l: "t", bg: "#1DA1F2" }].map((s) => (
                <a
                  key={s.l}
                  href="#"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold transition-all hover:scale-110"
                  style={{ background: s.bg, fontSize: "11px" }}
                >
                  {s.l}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "20px",
              }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV.map(([id, label]) => (
                <li key={id}>
                  <button
                    onClick={() => goto(id)}
                    className="text-sm transition-colors group flex items-center gap-2 hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    <span
                      className="w-0 group-hover:w-3 h-px transition-all duration-300"
                      style={{ background: "var(--copper-500)" }}
                    />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "20px",
              }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => goto("services")}
                    className="text-sm text-left transition-colors group flex items-center gap-2 hover:text-white"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    <span
                      className="w-0 group-hover:w-3 h-px transition-all duration-300 shrink-0"
                      style={{ background: "rgba(255,255,255,0.3)" }}
                    />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Certs */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: "20px",
              }}
            >
              Contact
            </h4>
            <div className="space-y-3.5 mb-8">
              {[
                ["📍", "Lusaka, Zambia"],
                ["📞", "+260 XXX XXX XXX"],
                ["✉️", "info@afridynengineering.com"],
              ].map(([icon, text]) => (
                <p
                  key={text}
                  className="flex items-center gap-2.5"
                  style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.42)" }}
                >
                  <span className="opacity-60">{icon}</span>
                  {text}
                </p>
              ))}
            </div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
                marginBottom: "10px",
              }}
            >
              Certified By
            </p>
            <div className="flex flex-wrap gap-2">
              {["PACRA", "ZPPA", "TPIN", "ZRA"].map((c) => (
                <span
                  key={c}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: "rgba(212,121,42,0.08)",
                    border: "1px solid rgba(212,121,42,0.18)",
                    color: "var(--copper-400)",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Afridyn Engineering Limited. All rights reserved.
          </p>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.18)" }}>
            Registered in Zambia · PACRA · ZPPA Approved
          </p>
        </div>
      </Container>
    </footer>
  );
}
