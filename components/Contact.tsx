"use client";

import { PERSONAL_DETAILS } from "@/data/projects";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="relative h-screen h-[100dvh] max-h-screen w-full flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-16 sm:pt-20 pb-4 sm:pb-6 border-t border-[#1D1C1A]/10 bg-[#F5F2EB] text-[#1D1C1A] overflow-hidden select-none"
    >
      {/* 1. Section Header Bar (shrink-0) */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#1D1C1A]/10 pb-2.5 sm:pb-3 text-xs shrink-0">
        <div className="flex items-center space-x-2">
          <span className="font-handwriting text-xl sm:text-2xl text-[#D94534]">/ 05 /</span>
          <span className="font-display font-semibold uppercase tracking-widest text-[11px] sm:text-xs text-[#1D1C1A]">
            Dispatch &amp; Contact
          </span>
        </div>
        <span className="font-handwriting text-sm sm:text-base text-[#78736A]">
          Chennai, India · 13.0827° N / 80.2707° E
        </span>
      </div>

      {/* 2. Centerpiece Statement Spread (flex-1 flex flex-col justify-center, neatly fitting 100vh) */}
      <div className="relative z-10 my-auto py-2 sm:py-3 max-w-5xl space-y-3 sm:space-y-4 flex-1 flex flex-col justify-center">
        {/* Transmission Status Badge */}
        <div
          data-magnetic
          data-cursor="STATUS"
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F3]/80 backdrop-blur-md border border-[#1D1C1A]/10 text-xs font-display text-[#1D1C1A] shadow-sm w-fit cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D94534] animate-pulse" />
          <span>Initiate Transmission</span>
          <span className="font-handwriting text-base text-[#D94534]">( open for collaborations )</span>
        </div>

        {/* Big Display Headline */}
        <h2
          data-cursor="CONNECT"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.4rem] font-display font-bold tracking-tighter leading-[0.92] text-[#1D1C1A] uppercase select-none cursor-default"
        >
          LET&apos;S BUILD <br />
          SOMETHING <br />
          <span className="text-[#D94534]">VALUABLE.</span>
        </h2>

        {/* Subtitle Bio & CTA Action Buttons */}
        <div className="mt-2 sm:mt-3 max-w-xl space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm md:text-base font-body text-[#78736A] leading-relaxed max-w-lg">
            Interested in software systems, AI pipelines, cloud infrastructure, or collaborative product engineering? Reach out directly.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={`mailto:${PERSONAL_DETAILS.email}`}
              data-magnetic
              data-cursor="SEND EMAIL ✉"
              className="group inline-flex items-center space-x-2.5 px-6 py-2.5 rounded-full bg-[#1D1C1A] text-[#FAF8F3] font-display text-xs font-semibold tracking-wider uppercase hover:bg-[#D94534] transition-all shadow-sm cursor-pointer select-none"
            >
              <span>Send Email</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <a
              href="/resume/Jaiharish_D_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              data-cursor="RESUME ↗"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#1D1C1A]/12 hover:border-[#1D1C1A]/25 text-[#1D1C1A] bg-[#FAF8F3]/85 backdrop-blur-md hover:bg-[#FAF8F3] font-display text-xs font-semibold tracking-wider transition-all shadow-sm cursor-pointer select-none"
            >
              <span>View Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D94534]" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. Bottom Zone: Direct Channels & Integrated Colophon (shrink-0) */}
      <div className="relative z-10 w-full space-y-2 sm:space-y-2.5 shrink-0">
        {/* Direct Contact Links Row */}
        <div className="pt-2 sm:pt-2.5 border-t border-[#1D1C1A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-display text-xs">
            <a
              href={`mailto:${PERSONAL_DETAILS.email}`}
              className="text-[#78736A] hover:text-[#D94534] transition-colors flex items-center space-x-1.5 font-medium px-2.5 py-1 rounded-full hover:bg-[#FAF8F3]/60"
              data-magnetic
              data-cursor="EMAIL ↗"
            >
              <Mail className="w-3.5 h-3.5 text-[#D94534]" />
              <span>{PERSONAL_DETAILS.email}</span>
            </a>

            <a
              href={PERSONAL_DETAILS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#78736A] hover:text-[#D94534] transition-colors flex items-center space-x-1.5 font-medium px-2.5 py-1 rounded-full hover:bg-[#FAF8F3]/60"
              data-magnetic
              data-cursor="GITHUB ↗"
            >
              <Github className="w-3.5 h-3.5 text-[#1D1C1A]" />
              <span>GITHUB</span>
              <ArrowUpRight className="w-3 h-3 text-[#78736A]" />
            </a>

            <a
              href={PERSONAL_DETAILS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#78736A] hover:text-[#D94534] transition-colors flex items-center space-x-1.5 font-medium px-2.5 py-1 rounded-full hover:bg-[#FAF8F3]/60"
              data-magnetic
              data-cursor="LINKEDIN ↗"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#1D1C1A]" />
              <span>LINKEDIN</span>
              <ArrowUpRight className="w-3 h-3 text-[#78736A]" />
            </a>
          </div>

          <div className="text-left sm:text-right text-[11px] font-mono text-[#78736A]">
            <span className="font-handwriting text-sm text-[#1D1C1A]">Jaiharish D · REC Chennai (2024–2028)</span>
            <span className="mx-1.5 opacity-40">|</span>
            <span>CGPA 8.75</span>
          </div>
        </div>

        {/* Integrated Colophon / Footer Bar */}
        <div className="pt-2 border-t border-[#1D1C1A]/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-[#78736A]">
          <div className="flex items-center space-x-2">
            <span
              onClick={handleScrollToTop}
              data-magnetic
              data-cursor="TOP ↑"
              className="font-handwriting text-xl text-[#1D1C1A] hover:text-[#D94534] cursor-pointer select-none transition-colors"
            >
              jaiharish d.
            </span>
            <span className="text-[#1D1C1A]/20">/</span>
            <span className="font-display font-medium text-[11px] text-[#78736A]">Chennai, India</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D94534]" />
            <span className="font-handwriting text-sm sm:text-base text-[#1D1C1A]">
              designed &amp; built by hand :)
            </span>
          </div>

          <div className="text-[10px] sm:text-[11px] font-display text-[#78736A]">
            <span>© 2026 JAIHARISH D. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
