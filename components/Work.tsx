"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { PROJECTS, Project } from "@/data/projects";
import ProjectScene from "./ProjectScene";
import ProjectOverlay from "./ProjectOverlay";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  // Disable background ScrollTrigger when ProjectOverlay modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      ScrollTrigger.getAll().forEach((t) => t.disable(false));
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      ScrollTrigger.getAll().forEach((t) => t.enable());
    }
  }, [selectedProject]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    if (window.innerWidth < 1024) {
      return () => window.removeEventListener("resize", checkDesktop);
    }

    const container = containerRef.current;
    const trigger = triggerRef.current;
    if (!container || !trigger) return;

    const totalProjects = PROJECTS.length;
    const scrollDistance = () => container.scrollWidth - window.innerWidth;

    const pin = gsap.to(container, {
      x: () => -scrollDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: trigger,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${scrollDistance()}`,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(
            totalProjects - 1,
            Math.floor(self.progress * totalProjects)
          );
          setActiveIndex(idx);
        },
      },
    });

    return () => {
      pin.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", checkDesktop);
    };
  }, []);

  const handleJumpToProject = (index: number) => {
    setActiveIndex(index);
    if (!isDesktop) {
      const el = document.getElementById(`project-${PROJECTS[index].id}`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="work" ref={sectionRef} className="relative w-full bg-[#F5F2EB] text-[#1D1C1A] overflow-hidden">
      {/* Work Section Header - Left-Aligned with all other sections (px-6 sm:px-12 lg:px-20) */}
      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 pt-16 sm:pt-20 pb-6 flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#1D1C1A]/10 gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="font-handwriting text-xl sm:text-2xl text-[#D94534]">/ 04 /</span>
            <span className="font-display font-semibold text-xs tracking-wider uppercase text-[#1D1C1A]">
              Selected Systems
            </span>
            <span className="font-handwriting text-sm sm:text-base text-[#78736A] hidden sm:inline">
              ( 7 production builds )
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-[#1D1C1A] uppercase leading-[0.92]">
            SELECTED <span className="text-[#D94534]">WORK.</span>
          </h2>
        </div>

        <div className="text-left sm:text-right text-xs font-mono text-[#78736A]">
          <span className="font-handwriting text-sm text-[#78736A] hidden sm:inline">
            ( scroll horizontally to explore projects → )
          </span>
        </div>
      </div>

      {/* HORIZONTAL PINNED GALLERY (DESKTOP) / SEQUENTIAL SPREAD STREAM (MOBILE) */}
      <div ref={triggerRef} className="relative w-full" data-carousel="true">
        {/* Dynamic Project Index Indicator - Anchored at Bottom Right (Lowered with Clear Clearance from Cards) */}
        <div className="hidden lg:flex absolute bottom-3 sm:bottom-4 right-6 sm:right-10 lg:right-16 z-30 items-center space-x-4 px-4 py-2 rounded-full bg-[#FAF8F3]/95 backdrop-blur-xl border border-[#1D1C1A]/15 shadow-md pointer-events-auto select-none">
          {/* Active number / Total */}
          <div className="flex items-baseline space-x-1 font-display">
            <span className="text-xl font-bold text-[#1D1C1A]">
              {PROJECTS[activeIndex]?.number || "01"}
            </span>
            <span className="text-[#78736A] text-sm font-handwriting">/</span>
            <span className="text-[#78736A] text-sm font-handwriting">0{PROJECTS.length}</span>
          </div>

          <div className="w-[1px] h-4 bg-[#1D1C1A]/10" />

          {/* Segmented Dots Indicator */}
          <div className="flex items-center space-x-1.5">
            {PROJECTS.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => handleJumpToProject(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "bg-[#D94534] w-5"
                    : "bg-[#1D1C1A]/20 hover:bg-[#1D1C1A]/40 w-1.5"
                }`}
                aria-label={`Jump to project ${p.title}`}
              />
            ))}
          </div>

          <div className="w-[1px] h-4 bg-[#1D1C1A]/10" />

          {/* Active Project Title */}
          <div className="text-right">
            <span className="text-[10px] font-handwriting text-[#D94534] block leading-none">
              current spread
            </span>
            <span className="font-display font-semibold text-xs text-[#1D1C1A] leading-tight">
              {PROJECTS[activeIndex]?.title}
            </span>
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex flex-col lg:flex-row lg:h-screen lg:items-center px-6 md:px-12 lg:px-16 py-12 lg:py-0 gap-12 lg:gap-16 w-full lg:w-max will-change-transform"
        >
          {PROJECTS.map((project, idx) => (
            <article
              key={project.id}
              id={`project-${project.id}`}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("button, a")) return;
                setSelectedProject(project);
              }}
              className={`cursor-pointer relative w-full lg:w-[75vw] xl:w-[68vw] 2xl:w-[62vw] lg:h-[75vh] max-h-[720px] rounded-2xl bg-[#FAF8F3] border transition-all duration-500 p-5 sm:p-7 md:p-8 flex flex-col justify-between overflow-hidden shadow-paper flex-shrink-0 group ${
                isDesktop && activeIndex === idx
                  ? "border-[#1D1C1A]/30 scale-100 opacity-100 shadow-paper-lift ring-1 ring-[#1D1C1A]/10"
                  : "border-[#1D1C1A]/10 hover:border-[#1D1C1A]/25 scale-[0.98] opacity-90"
              }`}
            >
              {/* Project Card Header */}
              <div className="flex items-start justify-between border-b border-[#1D1C1A]/10 pb-4 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="font-handwriting text-xl text-[#D94534] font-bold">{project.number}</span>
                    <span className="text-[#1D1C1A]/20">/</span>
                    <span className="font-display font-medium uppercase tracking-wider text-[#78736A] text-[11px]">{project.subtitle}</span>
                    <span className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#EAE4D7] text-[10px] text-[#1D1C1A] font-medium border border-[#1D1C1A]/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D94534]" />
                      <span>Production</span>
                    </span>
                  </div>
                  <h3
                    data-magnetic
                    data-cursor="OPEN"
                    className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-[#1D1C1A] group-hover:text-[#D94534] transition-colors flex items-baseline select-none"
                  >
                    <span>{project.title}</span>
                    <span className="ml-3 font-handwriting text-lg text-[#78736A] lowercase hidden sm:inline">
                      ( spread 0{idx + 1} )
                    </span>
                  </h3>
                </div>

                {/* DETAILS Action Pill (Referencing Josh's oatmeal rounded button) */}
                <button
                  onClick={() => setSelectedProject(project)}
                  data-magnetic
                  data-cursor="DETAILS →"
                  className="group/btn inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#EAE4D7] border border-[#1D1C1A]/10 hover:bg-[#1D1C1A] hover:text-[#FAF8F3] text-[#1D1C1A] transition-all shadow-sm"
                  aria-label={`Open details for ${project.title}`}
                >
                  <span className="hidden sm:inline font-display text-xs font-semibold tracking-wide">
                    Details
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#FAF8F3] text-[#1D1C1A] font-mono text-[10px] font-bold group-hover/btn:bg-[#D94534] group-hover/btn:text-white transition-colors">
                    →
                  </span>
                </button>
              </div>

              {/* Central Two-Column Area: Visual Scene & Project Summary */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-auto py-2 sm:py-3 items-center">
                {/* Left: Bespoke Visual Representation */}
                <div
                  className="md:col-span-7 h-full relative"
                  data-cursor="VIEW"
                >
                  <ProjectScene project={project} isActive={activeIndex === idx} />
                </div>

                {/* Right: Technical Explanation & Contribution */}
                <div className="md:col-span-5 space-y-4 font-body">
                  <p className="text-sm sm:text-base text-[#1D1C1A] leading-relaxed font-normal">
                    {project.tagline}
                  </p>

                  <div className="p-4 rounded-xl bg-[#EAE4D7] border border-[#1D1C1A]/10 space-y-1.5 shadow-sm">
                    <span className="font-handwriting text-base text-[#D94534] block">
                      Core Contribution
                    </span>
                    <p className="text-xs text-[#78736A] leading-relaxed font-body">
                      {project.contribution}
                    </p>
                  </div>

                  {/* Architecture Telemetry Metrics */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      {project.metrics.slice(0, 2).map((m) => (
                        <div
                          key={m.label}
                          className="p-2.5 rounded-lg bg-[#EAE4D7] border border-[#1D1C1A]/10 flex flex-col justify-between shadow-sm"
                        >
                          <span className="text-[9px] font-display text-[#78736A] tracking-wider uppercase block truncate font-medium">
                            {m.label}
                          </span>
                          <span className="text-xs font-display font-bold text-[#1D1C1A] mt-1 truncate">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="space-y-1.5 pt-1">
                    <span className="font-handwriting text-base text-[#78736A] block">
                      Instruments &amp; Environment:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded bg-[#EAE4D7] border border-[#1D1C1A]/10 text-xs font-mono text-[#1D1C1A]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="flex items-center justify-between border-t border-[#1D1C1A]/10 pt-4 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-handwriting text-base text-[#D94534] font-bold">
                    Jaiharish // {project.visualType}
                  </span>
                </div>

                <a
                  href={project.githubUrl || "https://github.com/JaiharishD"}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                  data-cursor="GITHUB ↗"
                  className="flex items-center space-x-1.5 text-[#78736A] hover:text-[#1D1C1A] transition-colors cursor-pointer group/link font-display text-xs font-semibold"
                >
                  <span>Source Code</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#D94534] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* WORK SECTION END: MORE EXPERIMENTS (Oatmeal Craft Cards) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-[#1D1C1A]/10">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 gap-2">
          <div>
            <span className="font-handwriting text-2xl text-[#D94534] block mb-1">
              Supplementary Archives
            </span>
            <h4 className="text-3xl sm:text-4xl font-display font-bold text-[#1D1C1A]">
              More Experiments.
            </h4>
          </div>
          <span className="font-handwriting text-lg text-[#78736A]">
            ( research prototypes &amp; protocols )
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-[#1D1C1A]/10 bg-[#EAE4D7] shadow-sm space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-[#78736A] uppercase text-[10px]">Cloud &amp; Assets</span>
              <span className="font-handwriting text-base text-[#D94534]">#archive</span>
            </div>
            <h5 className="font-display font-bold text-lg text-[#1D1C1A]">
              CloudVault Architecture
            </h5>
            <p className="text-xs text-[#78736A] leading-relaxed font-body">
              Exploratory secure cloud asset pipeline with AWS S3 encrypted endpoints and signed access URLs.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#1D1C1A]/10 bg-[#EAE4D7] shadow-sm space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-[#78736A] uppercase text-[10px]">Communication</span>
              <span className="font-handwriting text-base text-[#1D1C1A]">#protocol</span>
            </div>
            <h5 className="font-display font-bold text-lg text-[#1D1C1A]">
              BITCHAT Peer Engine
            </h5>
            <p className="text-xs text-[#78736A] leading-relaxed font-body">
              Real-time low-overhead socket messaging protocol experiment testing concurrency throughput.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-[#1D1C1A]/10 bg-[#EAE4D7] shadow-sm space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono text-[#78736A] uppercase text-[10px]">Simulation</span>
              <span className="font-handwriting text-base text-[#D94534]">#sensors</span>
            </div>
            <h5 className="font-display font-bold text-lg text-[#1D1C1A]">
              Parking Grid Telemetry
            </h5>
            <p className="text-xs text-[#78736A] leading-relaxed font-body">
              Smart parking occupancy detector simulation combining sensor inputs with state management.
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Project Overlay Modal */}
      <ProjectOverlay
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
