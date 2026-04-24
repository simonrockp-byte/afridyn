"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let cur = 0;
    const iv = setInterval(() => {
      cur += Math.random() * 20 + 8;
      if (cur >= 100) {
        cur = 100;
        clearInterval(iv);
        setTimeout(() => setGone(true), 600);
      }
      setProgress(Math.min(cur, 100));
    }, 100);
    return () => clearInterval(iv);
  }, []);

  if (gone) return null;

  return (
    <div
      id="loading-screen"
      style={{
        opacity: progress >= 100 ? 0 : 1,
        transition: "opacity 0.8s ease",
        pointerEvents: progress >= 100 ? "none" : "all",
        background: "var(--white)",
      }}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* Spinner ring */}
          <svg
            className="absolute inset-0 w-full h-full animate-spin"
            style={{ animationDuration: "2.5s" }}
            viewBox="0 0 64 64"
          >
            <circle cx="32" cy="32" r="28" fill="none" stroke="var(--slate-100)" strokeWidth="1.5" />
            <circle
              cx="32" cy="32" r="28"
              fill="none"
              stroke="var(--copper-500)"
              strokeWidth="1.5"
              strokeDasharray="44 132"
              strokeLinecap="round"
            />
          </svg>
          <Image
            src="/afridyn_logo.png"
            alt="Afridyn"
            width={28}
            height={28}
            className="object-contain"
          />
        </div>

        <div className="text-center">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--slate-400)",
              marginBottom: "16px",
            }}
          >
            Loading
          </p>
          <div
            style={{
              width: "160px",
              height: "2px",
              background: "var(--slate-100)",
              borderRadius: "2px",
              overflow: "hidden",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "var(--copper-500)",
                borderRadius: "2px",
                transition: "width 0.1s linear",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
