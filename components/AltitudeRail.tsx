"use client";

import { useEffect, useState } from "react";

export default function AltitudeRail() {
  const [altitude, setAltitude] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("SURFACE");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const p = Math.min(Math.max(scrollY / docHeight, 0), 1);
      setProgress(p);

      // Realistic orbital progression: 0 km (surface) -> 35,786 km (Geostationary transfer)
      let alt = 0;
      let currentPhase = "SURFACE";

      if (p < 0.2) {
        alt = Math.round(p * 5 * 100); // 0 - 100 km (Kármán Line)
        currentPhase = "ATMOSPHERE";
      } else if (p < 0.55) {
        alt = Math.round(100 + ((p - 0.2) / 0.35) * 1900); // 100 - 2000 km (LEO)
        currentPhase = "LEO ORBIT";
      } else if (p < 0.85) {
        alt = Math.round(2000 + ((p - 0.55) / 0.3) * 18000); // 2,000 - 20,000 km (MEO)
        currentPhase = "MEO TRANSIT";
      } else {
        alt = Math.round(20000 + ((p - 0.85) / 0.15) * 15786); // 20,000 - 35,786 km (GEO)
        currentPhase = "GEOSTATIONARY";
      }

      setAltitude(alt);
      setPhase(currentPhase);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center select-none pointer-events-none opacity-60 hover:opacity-100 transition-opacity duration-300"
      aria-hidden="true"
    >
      {/* Flight Telemetry Header */}
      <div className="flex flex-col items-end space-y-1 mb-3 text-right">
        <span className="font-mono text-[8px] tracking-[0.25em] text-dust uppercase">
          ORBITAL // TELEMETRY
        </span>
        <div className="flex items-baseline space-x-1.5 font-mono">
          <span className="text-solar-peach text-xs font-semibold tabular-nums">
            {altitude.toLocaleString()}
          </span>
          <span className="text-[9px] text-dust">KM</span>
        </div>
      </div>

      {/* Vertical Flight Track Rail */}
      <div className="relative w-6 h-44 flex justify-center py-2">
        {/* Background Track Line */}
        <div className="w-[1px] h-full bg-white/[0.08] relative">
          {/* Active Progress Line */}
          <div
            className="w-full bg-gradient-to-b from-solar-peach to-nebula-lavender"
            style={{ height: `${progress * 100}%` }}
          />

          {/* Indicator Pip (Aerospace Visor Gold) */}
          <div
            className="absolute -left-[3px] w-2 h-2 rounded-full bg-solar-peach shadow-[0_0_10px_rgba(232,162,124,0.9)] transition-transform duration-75"
            style={{
              top: `${progress * 100}%`,
              transform: "translateY(-50%)",
            }}
          />
        </div>

        {/* Orbit Altitude Stage Ticks */}
        <div className="absolute inset-y-2 left-0 flex flex-col justify-between text-[7px] font-mono text-dust/40 pointer-events-none">
          <span>0K</span>
          <span>400</span>
          <span>2K</span>
          <span>36K</span>
        </div>
      </div>

      {/* Orbit Phase & Coordinates Footer */}
      <div className="flex flex-col items-end space-y-0.5 mt-3 text-right">
        <span className="font-mono text-[8px] font-semibold tracking-widest text-cosmic-ivory/80 uppercase">
          {phase}
        </span>
        <span className="font-mono text-[7px] text-dust/60 tracking-wider">
          13.08°N 80.27°E
        </span>
      </div>
    </aside>
  );
}
