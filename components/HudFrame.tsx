"use client";

import { useEffect, useState } from "react";

export default function HudFrame() {
  const [coords, setCoords] = useState({ x: "13.082", y: "80.270" });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Subtle dynamic coordinate fluctuation based on pointer
      const nx = (13.0827 + (e.clientX / window.innerWidth) * 0.005).toFixed(4);
      const ny = (80.2707 + (e.clientY / window.innerHeight) * 0.005).toFixed(4);
      setCoords({ x: nx, y: ny });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-2 sm:inset-4 md:inset-6 pointer-events-none z-30 select-none hidden sm:block"
      aria-hidden="true"
    >
      {/* Outer Tactical Beveled Frame */}
      <div className="relative w-full h-full rounded-[24px] md:rounded-[32px] border border-white/[0.1] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
        {/* ================= TOP BAR ================= */}
        <div className="absolute -top-[1px] inset-x-8 flex items-center justify-between font-mono text-[9px] text-dust">
          {/* Top Left: Audio Waveform Pulse */}
          <div className="flex items-center space-x-2 bg-space-deep px-3 py-0.5 rounded-b-md border-x border-b border-white/[0.08]">
            <div className="flex items-end space-x-0.5 h-2.5">
              <span className="w-0.5 h-1.5 bg-planetary-orange animate-pulse" />
              <span className="w-0.5 h-2.5 bg-planetary-orange animate-pulse delay-75" />
              <span className="w-0.5 h-2 bg-planetary-orange animate-pulse delay-150" />
            </div>
            <span className="tracking-widest uppercase font-semibold text-cosmic-ivory/80">ON</span>
            <span className="text-white/20">/</span>
            <span className="text-[8px] tracking-wider text-dust">AUDIO_STREAM</span>
          </div>

          {/* Top Center: Notch Tab */}
          <div className="hidden md:flex items-center space-x-3 bg-space-deep px-5 py-1 rounded-b-lg border-x border-b border-white/[0.12] shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
            <span className="font-display text-[10px] font-bold tracking-widest text-cosmic-ivory uppercase">
              JAIHARISH D.
            </span>
            <span className="text-planetary-orange font-bold text-[9px] tracking-widest">
              // SYSTEMS ARCHITECT
            </span>
          </div>

          {/* Top Right: System Status */}
          <div className="flex items-center space-x-2 bg-space-deep px-3 py-0.5 rounded-b-md border-x border-b border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-planetary-orange animate-ping" />
            <span className="tracking-widest uppercase text-cosmic-ivory/80 font-semibold">ONLINE</span>
            <span className="text-white/20">|</span>
            <span className="text-[8px] text-dust">REC_2026</span>
          </div>
        </div>

        {/* ================= SIDE NOTCHES ================= */}
        {/* Left Side Tick */}
        <div className="absolute top-1/2 -left-[1px] -translate-y-1/2 flex flex-col items-center bg-space-deep py-3 px-1 border-y border-r border-white/[0.08] rounded-r-md font-mono text-[7px] text-dust tracking-widest">
          <span className="rotate-90 origin-center my-2 text-planetary-orange">G_006</span>
          <span className="w-2 h-[1px] bg-white/20 my-1" />
          <span className="rotate-90 origin-center my-2">LEO_01</span>
        </div>

        {/* Right Side Tick */}
        <div className="absolute top-1/2 -right-[1px] -translate-y-1/2 flex flex-col items-center bg-space-deep py-3 px-1 border-y border-l border-white/[0.08] rounded-l-md font-mono text-[7px] text-dust tracking-widest">
          <span className="-rotate-90 origin-center my-2 text-cosmic-lavender">G_020</span>
          <span className="w-2 h-[1px] bg-white/20 my-1" />
          <span className="-rotate-90 origin-center my-2">ALT_36K</span>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="absolute -bottom-[1px] inset-x-8 flex items-center justify-between font-mono text-[9px] text-dust">
          {/* Bottom Left: Tactical Viewfinder Crosshair Box */}
          <div className="flex items-center space-x-2 bg-space-deep px-3 py-1 rounded-t-md border-x border-t border-white/[0.08]">
            <div className="w-3.5 h-3.5 border border-white/20 flex items-center justify-center relative">
              <span className="w-1 h-1 rounded-full bg-planetary-orange" />
              <span className="absolute -top-1 left-1.5 w-[1px] h-1 bg-white/30" />
              <span className="absolute -bottom-1 left-1.5 w-[1px] h-1 bg-white/30" />
            </div>
            <span className="tracking-widest uppercase text-[8px] text-dust font-medium">
              TARGET // CHENNAI
            </span>
          </div>

          {/* Bottom Center: Coordinates Notch (DICH reference X.0758 // Y.0483) */}
          <div className="flex items-center space-x-2 bg-space-deep px-4 py-1 rounded-t-lg border-x border-t border-white/[0.12] shadow-[0_-4px_12px_rgba(0,0,0,0.4)]">
            <span className="text-[10px] font-mono tracking-widest text-cosmic-ivory font-medium">
              X . {coords.x}
            </span>
            <span className="text-planetary-orange font-bold text-[9px]">//</span>
            <span className="text-[10px] font-mono tracking-widest text-cosmic-ivory font-medium">
              Y . {coords.y}
            </span>
          </div>

          {/* Bottom Right: Orbit Spec */}
          <div className="flex items-center space-x-2 bg-space-deep px-3 py-1 rounded-t-md border-x border-t border-white/[0.08]">
            <span className="text-[8px] tracking-wider text-dust">SIH_INTERNAL</span>
            <span className="text-planetary-orange font-semibold">WINNER</span>
          </div>
        </div>
      </div>
    </div>
  );
}
