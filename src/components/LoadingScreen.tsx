"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setHidden(true);
        }, 600);
      }
      setProgress(Math.min(current, 100));
    }, 120);

    return () => clearInterval(interval);
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={screenRef}
      id="loading-screen"
      className={hidden ? "hidden" : ""}
      style={{
        opacity: progress >= 100 ? 0 : 1,
        transition: "opacity 0.8s ease",
        pointerEvents: progress >= 100 ? "none" : "all",
      }}
    >
      <div className="flex flex-col items-center gap-8">
        <div
          className="relative"
          style={{
            animation: "spin 3s linear infinite",
          }}
        >
          <Image
            src="/afridyn_logo.png"
            alt="Afridyn Engineering"
            width={100}
            height={100}
            className="object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>

        <div className="text-center">
          <p
            className="text-white/60 text-sm tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Engineering your experience...
          </p>

          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #E67817, #1F857A)",
              }}
            />
          </div>

          <p
            className="text-white/40 text-xs mt-3"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {Math.round(progress)}%
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
