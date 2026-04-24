"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let cur = 0;
    const iv = setInterval(() => {
      cur += Math.random() * 18 + 6;
      if (cur >= 100) {
        cur = 100;
        clearInterval(iv);
        setTimeout(() => setGone(true), 700);
      }
      setProgress(Math.min(cur, 100));
    }, 110);
    return () => clearInterval(iv);
  }, []);

  if (gone) return null;

  return (
    <div
      id="loading-screen"
      style={{ opacity: progress >= 100 ? 0 : 1, transition: "opacity 0.9s ease", pointerEvents: progress >= 100 ? "none" : "all" }}
    >
      <div className="flex flex-col items-center gap-10">
        {/* Spinning logo ring */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: "3s" }} viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(212,121,42,0.15)" strokeWidth="1" />
            <circle cx="40" cy="40" r="36" fill="none" stroke="#D4792A" strokeWidth="1.5"
              strokeDasharray="60 166" strokeLinecap="round" />
          </svg>
          <Image src="/afridyn_logo.png" alt="Afridyn" width={36} height={36} className="object-contain" style={{ filter: "brightness(0) invert(1)" }} />
        </div>

        <div className="text-center">
          <p className="text-white/30 text-xs tracking-[0.35em] uppercase mb-5 font-mono-custom">
            Engineering your experience
          </p>
          <div className="w-48 h-px bg-white/5 rounded-full overflow-hidden mx-auto">
            <div className="h-full rounded-full transition-all duration-150" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #D4792A, #1A7A70)" }} />
          </div>
          <p className="text-white/20 text-xs mt-3 font-mono-custom">{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  );
}
