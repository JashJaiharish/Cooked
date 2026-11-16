"use client";

import {
  MARQUEE_ROW_ONE,
  MARQUEE_ROW_TWO,
  CURRENTLY_EXPLORING,
} from "@/data/technologies";

export default function TechMarquee() {
  const rowOneItems = [...MARQUEE_ROW_ONE, ...MARQUEE_ROW_ONE, ...MARQUEE_ROW_ONE];
  const rowTwoItems = [...MARQUEE_ROW_TWO, ...MARQUEE_ROW_TWO, ...MARQUEE_ROW_TWO];

  return (
    <section className="relative w-full bg-[#070D18] py-28 border-t border-atmospheric-blue/30 overflow-hidden">
      {/* Deep Oceanic Orbital Cyan Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,240,255,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(82,106,133,0.12)_0%,transparent_50%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-xs font-mono text-solar-peach">
            <span className="w-8 h-[1px] bg-solar-peach" />
            <span className="uppercase tracking-widest font-semibold">02 // TOOLCHAIN &amp; INSTRUMENTS</span>
          </div>
          <h3 className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-cosmic-ivory tracking-tighter uppercase">
            TECH <span className="text-solar-peach">//</span> STACK
          </h3>
        </div>
        <p className="text-xs sm:text-sm font-body text-dust max-w-md font-light leading-relaxed">
          A disciplined stack focused on low-latency backends, real-time spatial interfaces, and cross-platform native architectures.
        </p>
      </div>

      {/* CONTINUOUS DICH-STYLE FUTURISTIC MARQUEES */}
      <div className="space-y-6 my-6">
        {/* Row 1 - Left Drift */}
        <div className="relative w-full overflow-hidden flex select-none group py-2">
          <div className="flex space-x-12 animate-marquee-left group-hover:[animation-play-state:paused] whitespace-nowrap items-center">
            {rowOneItems.map((tech, i) => (
              <div
                key={`r1-${i}`}
                className="inline-flex items-center space-x-6 text-dust-light hover:text-cosmic-ivory transition-colors cursor-default"
                data-cursor={tech}
              >
                <span className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider">
                  {tech}
                </span>
                <span className="text-solar-peach/60 text-xs font-mono">+++</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Right Drift */}
        <div className="relative w-full overflow-hidden flex select-none group py-2">
          <div className="flex space-x-12 animate-marquee-right group-hover:[animation-play-state:paused] whitespace-nowrap items-center">
            {rowTwoItems.map((tech, i) => (
              <div
                key={`r2-${i}`}
                className="inline-flex items-center space-x-6 text-dust-light hover:text-solar-peach transition-colors cursor-default"
                data-cursor={tech}
              >
                <span className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider">
                  {tech}
                </span>
                <span className="text-nebula-lavender/60 text-xs font-mono">///</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CURRENTLY EXPLORING (DICH Micro-Grid) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-16 border-t border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-solar-peach font-semibold">
            +++ CURRENTLY RESEARCHING // FRONTIER DOMAINS
          </span>
          <span className="font-mono text-[10px] tracking-widest text-dust">
            SYS_SPEC · 2026
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CURRENTLY_EXPLORING.map((item, idx) => (
            <div
              key={item}
              className="p-3.5 rounded-xl border border-white/[0.08] bg-space-surface/50 backdrop-blur-md space-y-1.5 hover:border-solar-peach/40 transition-colors group"
              data-cursor="RESEARCH"
            >
              <div className="flex justify-between items-center text-[9px] font-mono text-dust">
                <span>0{idx + 1}</span>
                <span className="text-solar-peach">G_0{idx + 1}</span>
              </div>
              <p className="font-display text-xs font-bold tracking-tight text-cosmic-ivory/90 group-hover:text-solar-peach transition-colors uppercase truncate">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
