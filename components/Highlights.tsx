"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const HIGHLIGHTS_DATA = [
  {
    number: "01",
    tag: "Hackathon",
    title: "SIH 2026",
    role: "Internal Winner",
    handwrittenNote: "selected #1 in REC selection",
    desc: "Selected as Internal Champion in the institutional Smart India Hackathon 2026 selection for high-impact automated engineering problem solving.",
  },
  {
    number: "02",
    tag: "Leadership",
    title: "InovX REC",
    role: "Chief Operating Officer",
    handwrittenNote: "operations & dev execution",
    desc: "Spearheading club operations, developer workflows, technical hackathons, and multi-disciplinary project execution.",
  },
  {
    number: "03",
    tag: "Portfolio",
    title: "7+ Systems",
    role: "Production Architectures",
    handwrittenNote: "all built & deployed",
    desc: "Engineered seven comprehensive software and AI systems spanning robotics automation, geospatial intelligence, mobile agritech, and predictive pipelines.",
  },
  {
    number: "04",
    tag: "Academics",
    title: "8.75 / 10",
    role: "Academic Excellence",
    handwrittenNote: "CSE 2024–2028",
    desc: "Strong Computer Science foundation at Rajalakshmi Engineering College (2024–2028), balancing rigorous theory with real-world technical execution.",
  },
];

export default function Highlights() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const whatRef = useRef<HTMLSpanElement>(null);
  const iveRef = useRef<HTMLSpanElement>(null);
  const builtRef = useRef<HTMLSpanElement>(null);
  const sentenceRef = useRef<HTMLParagraphElement>(null);
  const verifiedRef = useRef<HTMLDivElement>(null);
  const row0Ref = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const section = sectionRef.current;
    if (!section) return;

    const rows = [row0Ref.current, row1Ref.current, row2Ref.current, row3Ref.current];

    // Initial state: Completely unseen before scrolling (0% opacity, zero ghosting)
    gsap.set(whatRef.current, { opacity: 0, y: 30 });
    gsap.set(iveRef.current, { opacity: 0, y: 30 });
    gsap.set(builtRef.current, { opacity: 0, y: 30 });
    gsap.set(sentenceRef.current, { opacity: 0, y: 20 });
    gsap.set(verifiedRef.current, { opacity: 0, y: 16 });
    gsap.set(rows, { opacity: 0, y: 25 });

    // GSAP ScrollTrigger timeline pinned on a single screen
    // Sequence: WHAT -> I'VE -> BUILT -> (sentence) -> (~ verified records) -> 01 row -> 02 row -> 03 row -> 04 row -> PAUSE HOLD
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 0.8,
        start: "top top",
        end: "+=3200", // Generous scroll distance including final pause buffer
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    // 1. Reveal "WHAT"
    tl.to(whatRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    });

    // 2. Reveal "I'VE"
    tl.to(
      iveRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "+=0.2"
    );

    // 3. Reveal "BUILT."
    tl.to(
      builtRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "+=0.2"
    );

    // 4. Reveal bottom descriptive sentence
    tl.to(
      sentenceRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "+=0.25"
    );

    // 5. Reveal "~ verified engineering record" badge
    tl.to(
      verifiedRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
      },
      "+=0.2"
    );

    // 6. Reveal 01 Hackathon row (SIH 2026) - Open editorial row without box
    tl.to(
      row0Ref.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      "+=0.3"
    );

    // 7. Reveal 02 Leadership row (InovX REC)
    tl.to(
      row1Ref.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      "+=0.3"
    );

    // 8. Reveal 03 Portfolio row (7+ Systems)
    tl.to(
      row2Ref.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      "+=0.3"
    );

    // 9. Reveal 04 Academics row (8.75 / 10)
    tl.to(
      row3Ref.current,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      "+=0.3"
    );

    // 10. PAUSE BUFFER: Holds the fully revealed page static so the user can see & read everything
    // Only after another continuous scroll does it unpin and proceed to the next page!
    tl.to({}, { duration: 2.2 });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  const rowRefs = [row0Ref, row1Ref, row2Ref, row3Ref];

  return (
    <section
      id="highlights"
      ref={sectionRef}
      className="relative h-screen h-[100dvh] max-h-screen w-full bg-[#F5F2EB] pt-16 sm:pt-20 pb-4 sm:pb-6 px-6 sm:px-12 lg:px-20 border-t border-[#1D1C1A]/10 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* 1. Top Section Header Bar (shrink-0) */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#1D1C1A]/10 pb-2.5 sm:pb-3 text-xs shrink-0 w-full max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <span className="font-handwriting text-xl sm:text-2xl text-[#D94534]">/ 03 /</span>
          <span className="font-display font-semibold text-[11px] sm:text-xs tracking-wider uppercase text-[#1D1C1A]">
            Selected Distinctions
          </span>
        </div>
        <span className="font-handwriting text-sm sm:text-base text-[#78736A]">
          ( milestones &amp; leadership )
        </span>
      </div>

      {/* 2. Pinned Single-Screen Spread */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-2 sm:py-3 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center w-full">
          {/* Left Column: Sequential Display Typography Spread */}
          <div className="lg:col-span-5 space-y-2 sm:space-y-3">
            <h2 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem] tracking-tighter uppercase leading-[0.92] select-none cursor-default">
              <span ref={whatRef} className="block will-change-transform text-[#1D1C1A]">
                WHAT
              </span>
              <span ref={iveRef} className="block will-change-transform text-[#D94534]">
                I&apos;VE
              </span>
              <span ref={builtRef} className="block will-change-transform text-[#1D1C1A]">
                BUILT.
              </span>
            </h2>

            <p
              ref={sentenceRef}
              className="text-xs sm:text-sm md:text-base font-body text-[#78736A] pt-2 sm:pt-3 leading-relaxed max-w-md will-change-transform"
            >
              Demonstrated execution across national engineering competitions, technical leadership, and production software builds.
            </p>

            <div ref={verifiedRef} className="pt-2 will-change-transform">
              <span className="font-handwriting text-sm sm:text-base text-[#D94534] bg-[#FAF8F3]/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#1D1C1A]/10 shadow-sm inline-block">
                ~ verified engineering record
              </span>
            </div>
          </div>

          {/* Right Column: Clean Editorial List with Thin Dividers (NO BOXES, exactly as original design) */}
          <div className="lg:col-span-7 border-t border-[#1D1C1A]/15 divide-y divide-[#1D1C1A]/15">
            {HIGHLIGHTS_DATA.map((item, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <div
                  key={item.title}
                  ref={rowRefs[idx]}
                  data-magnetic
                  data-cursor={item.title.toUpperCase()}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`group relative py-3 sm:py-3.5 px-3 sm:px-4 transition-all duration-300 cursor-default will-change-transform ${
                    isHovered
                      ? "bg-[#EAE4D7]/40 pl-5 border-l-2 border-l-[#D94534]"
                      : "bg-transparent pl-3 sm:pl-4 border-l-0"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#78736A] mb-1">
                    <span className="font-handwriting text-base sm:text-lg text-[#D94534] font-bold">
                      {item.number} // {item.tag}
                    </span>
                    <span className="font-handwriting text-xs sm:text-sm text-[#1D1C1A]/70">
                      ~ {item.handwrittenNote}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1D1C1A]">
                      {item.title}
                    </h3>
                    <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#D94534] font-semibold">
                      {item.role}
                    </span>
                  </div>

                  <p className="text-xs sm:text-[13px] text-[#78736A] leading-relaxed font-body">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Bottom Minimal Progress Anchor (shrink-0) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-[#78736A] border-t border-[#1D1C1A]/10 pt-2 shrink-0">
        <span className="font-handwriting text-xs sm:text-sm text-[#78736A]">
          Scroll to step through distinction archive ↓
        </span>
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#1D1C1A]">
          REC CHENNAI · 2024–2028
        </span>
      </div>
    </section>
  );
}
