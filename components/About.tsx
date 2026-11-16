"use client";

import { useRef, useEffect, useState } from "react";

const EXPLORING_TOPICS = [
  "AI / ML ARCHITECTURES",
  "FULL-STACK SYSTEMS",
  "DISTRIBUTED CLOUD",
  "GEOSPATIAL VISUALIZATION",
  "REACTIVE MOBILE APPS",
  "ROBOTICS TELEMETRY",
  "RAPID PRODUCT SYSTEMS",
  "EXPERIMENTAL INTERFACES",
];

const TECH_GROUPS = [
  {
    category: "LANGUAGES & CORE CS",
    handwrittenTag: "the fundamentals",
    items: ["Python", "Java", "C", "JavaScript", "Data Structures", "Algorithms", "OOP", "DBMS"],
  },
  {
    category: "FRONTEND & MOBILE",
    handwrittenTag: "user facing",
    items: ["React.js", "React Native", "Expo", "Deck.gl", "MapLibre GL JS", "HTML5", "Tailwind CSS"],
  },
  {
    category: "BACKEND & CLOUD",
    handwrittenTag: "services & scale",
    items: ["Node.js", "Express.js", "FastAPI", "Flask", "REST APIs", "AWS S3", "Lambda", "API Gateway"],
  },
  {
    category: "AI, ML & DATA",
    handwrittenTag: "intelligence",
    items: ["PyTorch", "Scikit-learn", "Pandas", "NumPy", "PostgreSQL", "Supabase", "Git", "VS Code"],
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setScrollY(window.innerHeight - rect.top);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#F5F2EB] py-28 md:py-40 px-6 sm:px-12 lg:px-20 border-t border-[#1D1C1A]/10 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto space-y-24 md:space-y-32">
        {/* Section Header */}
        <div className="flex items-baseline justify-between border-b border-[#1D1C1A]/10 pb-4">
          <div className="flex items-center space-x-2">
            <span className="font-handwriting text-2xl text-[#D94534]">/ 02 /</span>
            <span className="font-display font-semibold text-xs tracking-wider uppercase text-[#1D1C1A]">
              About &amp; Capabilities
            </span>
          </div>
          <span className="font-handwriting text-base text-[#78736A]">
            ( background &amp; toolchain )
          </span>
        </div>

        {/* Dynamic Display Typography Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6 space-y-4">
            <h2
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-[#1D1C1A] uppercase leading-[0.94] cursor-default select-none"
            >
              <span
                className="inline-block transition-transform duration-300"
                style={{ transform: `translateX(${Math.min(scrollY * 0.03, 24)}px)` }}
              >
                I LIKE
              </span>
              <br />
              <span
                className="inline-block text-[#D94534] transition-transform duration-300"
                style={{ transform: `translateX(${Math.min(scrollY * 0.06, 48)}px)` }}
              >
                TURNING
              </span>
              <br />
              <span
                className="inline-block text-[#1D1C1A] transition-transform duration-300"
                style={{ transform: `translateX(${Math.min(scrollY * 0.02, 16)}px)` }}
              >
                IDEAS INTO
              </span>
              <br />
              <span
                className="inline-block text-[#1D1C1A] underline decoration-[#D94534] decoration-4 underline-offset-8 transition-transform duration-300"
                style={{ transform: `translateX(${Math.min(scrollY * 0.05, 36)}px)` }}
              >
                SYSTEMS.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-6 space-y-8 lg:pl-10 lg:border-l border-[#1D1C1A]/10">
            <p className="text-lg sm:text-xl md:text-2xl font-body text-[#1D1C1A] leading-relaxed">
              Jaiharish is a Computer Science Engineering student with hands-on experience across software engineering, cloud architecture, mobile ecosystems, AI-driven pipelines, and rapid digital product systems.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Oatmeal Card 1 */}
              <div className="p-6 rounded-xl border border-[#1D1C1A]/10 bg-[#EAE4D7] shadow-sm space-y-2">
                <span className="font-handwriting text-base text-[#D94534] block">
                  Education // Institution
                </span>
                <h3 className="font-display font-bold text-base text-[#1D1C1A]">
                  Rajalakshmi Engineering College
                </h3>
                <p className="text-[#78736A] text-xs leading-relaxed font-body">
                  B.E. Computer Science and Engineering (2024–2028). CGPA: 8.75 / 10.
                </p>
              </div>

              {/* Oatmeal Card 2 */}
              <div className="p-6 rounded-xl border border-[#1D1C1A]/10 bg-[#EAE4D7] shadow-sm space-y-2">
                <span className="font-handwriting text-base text-[#D94534] block">
                  Leadership // Executive
                </span>
                <h3 className="font-display font-bold text-base text-[#1D1C1A]">
                  InovX REC
                </h3>
                <p className="text-[#78736A] text-xs leading-relaxed font-body">
                  Chief Operating Officer. Managing team execution, hackathons, and technical initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 1. TECHNICAL STACK (Craft Matrix) - Placed First */}
        <div className="space-y-6 pt-10 border-t border-[#1D1C1A]/10">
          <div className="flex items-baseline justify-between">
            <span className="font-display text-xs uppercase tracking-widest font-bold text-[#1D1C1A]">
              Technical Stack
            </span>
            <span className="font-handwriting text-lg text-[#78736A]">( verified tools &amp; frameworks )</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECH_GROUPS.map((group) => (
              <div
                key={group.category}
                className="p-6 rounded-xl border border-[#1D1C1A]/10 bg-[#EAE4D7] shadow-sm space-y-4 hover:border-[#1D1C1A]/30 transition-colors"
              >
                <div className="border-b border-[#1D1C1A]/10 pb-2 flex items-baseline justify-between">
                  <h4 className="font-display text-xs font-bold tracking-wider text-[#1D1C1A] uppercase">
                    {group.category}
                  </h4>
                  <span className="font-handwriting text-sm text-[#D94534]">
                    {group.handwrittenTag}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-[#FAF8F3] border border-[#1D1C1A]/10 font-mono text-xs text-[#1D1C1A]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. CURRENTLY EXPLORING (Horizontal Runner) - Directly below Technical Stack without middle line */}
        <div className="space-y-4 pt-4">
          <div className="flex items-baseline justify-between">
            <span className="font-display text-xs uppercase tracking-widest font-bold text-[#1D1C1A]">
              Currently Exploring
            </span>
            <span className="font-handwriting text-lg text-[#D94534]">( research &amp; frontier focus )</span>
          </div>

          {/* Full Screen Width Breakout Marquee */}
          <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden select-none py-3.5 border-y border-[#1D1C1A]/12 bg-[#EAE4D7] flex">
            {/* Track 1 */}
            <div className="flex shrink-0 animate-marquee-left items-center space-x-8 pr-8 font-display font-bold text-base sm:text-lg text-[#1D1C1A] uppercase tracking-wide">
              {EXPLORING_TOPICS.map((topic, i) => (
                <div key={i} className="inline-flex items-center space-x-6 hover:text-[#D94534] transition-colors cursor-default">
                  <span>{topic}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D94534]" />
                </div>
              ))}
            </div>

            {/* Track 2 (Duplicate for Seamless Circular Continuation) */}
            <div className="flex shrink-0 animate-marquee-left items-center space-x-8 pr-8 font-display font-bold text-base sm:text-lg text-[#1D1C1A] uppercase tracking-wide" aria-hidden="true">
              {EXPLORING_TOPICS.map((topic, i) => (
                <div key={`dup-${i}`} className="inline-flex items-center space-x-6 hover:text-[#D94534] transition-colors cursor-default">
                  <span>{topic}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D94534]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
