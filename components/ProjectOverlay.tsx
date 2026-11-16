"use client";

import { useEffect, useState, useRef } from "react";
import { Project } from "@/data/projects";
import ProjectScene from "./ProjectScene";
import { X, Github, ArrowUpRight, Activity, Cpu, Layers } from "lucide-react";

interface ProjectOverlayProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectOverlay({ project, onClose }: ProjectOverlayProps) {
  const [activeTab, setActiveTab] = useState<"all" | "brief" | "architecture" | "contribution" | "telemetry">("all");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Prevent wheel propagation from bubbling to the background page
      e.stopPropagation();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);

      const overlayEl = overlayRef.current;
      if (overlayEl) {
        overlayEl.addEventListener("wheel", handleWheel, { passive: true });
      }
      setActiveTab("all");
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      const overlayEl = overlayRef.current;
      if (overlayEl) {
        overlayEl.removeEventListener("wheel", handleWheel);
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex justify-center items-start overflow-y-auto overscroll-contain bg-[#1D1C1A]/70 backdrop-blur-md p-4 sm:p-6 md:p-10 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-dialog-title"
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Backdrop click to close */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div
        className="relative w-full max-w-5xl bg-[#FAF8F3] border border-[#1D1C1A]/15 rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_30px_90px_rgba(29,28,26,0.3)] my-4 sm:my-8 space-y-6 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#1D1C1A]/10 pb-6 gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="font-handwriting text-2xl text-[#D94534] font-bold">{project.number}</span>
              <span className="text-[#1D1C1A]/20">/</span>
              <span className="font-display font-medium uppercase tracking-wider text-[#78736A] text-[11px]">{project.subtitle}</span>
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#EAE4D7] border border-[#1D1C1A]/10 text-[10px] text-[#1D1C1A] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D94534]" />
                <span>Case Study</span>
              </span>
            </div>
            <h2
              id="project-dialog-title"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1D1C1A] tracking-tight uppercase"
            >
              {project.title}
            </h2>
            <p className="text-sm font-body text-[#78736A] pt-0.5">{project.descriptor}</p>
          </div>

          <button
            onClick={onClose}
            data-cursor="CLOSE"
            className="p-2.5 rounded-full border border-[#1D1C1A]/15 bg-[#EAE4D7] hover:bg-[#1D1C1A] hover:text-[#FAF8F3] text-[#1D1C1A] transition-all cursor-pointer shadow-sm"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Two-Column Grid: Visual Simulation & Technical Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Scene & Metrics */}
          <div className="lg:col-span-5 h-full flex flex-col space-y-4">
            <ProjectScene project={project} isActive={true} />

            {/* Metrics */}
            {project.metrics && (
              <div className="grid grid-cols-1 gap-2 pt-2">
                <span className="font-handwriting text-base text-[#78736A] block">
                  telemetry specifications:
                </span>
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex justify-between items-center p-3 rounded-xl bg-[#EAE4D7] border border-[#1D1C1A]/10 text-xs shadow-sm"
                  >
                    <span className="font-display text-[#78736A] uppercase text-[10px] font-medium">{m.label}</span>
                    <span className="font-display font-bold text-[#1D1C1A]">{m.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Architectural Breakdown */}
          <div className="lg:col-span-7 space-y-6 font-body text-sm text-[#1D1C1A]">
            {/* Tab navigation pills */}
            <div className="flex items-center space-x-1.5 border-b border-[#1D1C1A]/10 pb-3 overflow-x-auto text-xs">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-full transition-all text-xs font-display font-semibold ${
                  activeTab === "all"
                    ? "bg-[#1D1C1A] text-[#FAF8F3]"
                    : "text-[#78736A] hover:text-[#1D1C1A] bg-[#EAE4D7]"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab("brief")}
                className={`px-3 py-1.5 rounded-full transition-all text-xs font-display font-semibold ${
                  activeTab === "brief"
                    ? "bg-[#1D1C1A] text-[#FAF8F3]"
                    : "text-[#78736A] hover:text-[#1D1C1A] bg-[#EAE4D7]"
                }`}
              >
                01 Challenge
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                className={`px-3 py-1.5 rounded-full transition-all text-xs font-display font-semibold ${
                  activeTab === "architecture"
                    ? "bg-[#1D1C1A] text-[#FAF8F3]"
                    : "text-[#78736A] hover:text-[#1D1C1A] bg-[#EAE4D7]"
                }`}
              >
                02 Architecture
              </button>
              <button
                onClick={() => setActiveTab("contribution")}
                className={`px-3 py-1.5 rounded-full transition-all text-xs font-display font-semibold ${
                  activeTab === "contribution"
                    ? "bg-[#1D1C1A] text-[#FAF8F3]"
                    : "text-[#78736A] hover:text-[#1D1C1A] bg-[#EAE4D7]"
                }`}
              >
                03 Contribution
              </button>
              <button
                onClick={() => setActiveTab("telemetry")}
                className={`px-3 py-1.5 rounded-full transition-all text-xs font-display font-semibold ${
                  activeTab === "telemetry"
                    ? "bg-[#1D1C1A] text-[#FAF8F3]"
                    : "text-[#78736A] hover:text-[#1D1C1A] bg-[#EAE4D7]"
                }`}
              >
                04 Stack
              </button>
            </div>

            {/* 01: The Challenge */}
            {(activeTab === "all" || activeTab === "brief") && (
              <div className="space-y-2 p-5 rounded-xl bg-[#EAE4D7] border border-[#1D1C1A]/10 shadow-sm">
                <div className="flex items-center space-x-2 text-xs">
                  <Activity className="w-3.5 h-3.5 text-[#D94534]" />
                  <span className="font-display font-bold text-[#1D1C1A] uppercase tracking-wider text-[11px]">01 // The Challenge</span>
                </div>
                <p className="text-xs sm:text-sm text-[#78736A] leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}

            {/* 02: System Architecture */}
            {(activeTab === "all" || activeTab === "architecture") && (
              <div className="space-y-2 p-5 rounded-xl bg-[#EAE4D7] border border-[#1D1C1A]/10 shadow-sm">
                <div className="flex items-center space-x-2 text-xs">
                  <Cpu className="w-3.5 h-3.5 text-[#D94534]" />
                  <span className="font-display font-bold text-[#1D1C1A] uppercase tracking-wider text-[11px]">02 // System Architecture &amp; Approach</span>
                </div>
                <p className="text-xs sm:text-sm text-[#1D1C1A] leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}

            {/* 03: Direct Contribution */}
            {(activeTab === "all" || activeTab === "contribution") && (
              <div className="space-y-2 p-5 rounded-xl bg-[#FAF8F3] border border-[#D94534]/30 shadow-sm">
                <div className="flex items-center space-x-2 text-xs">
                  <Layers className="w-3.5 h-3.5 text-[#D94534]" />
                  <span className="font-display font-bold text-[#D94534] uppercase tracking-wider text-[11px]">03 // Direct Contribution</span>
                </div>
                <p className="text-xs sm:text-sm text-[#1D1C1A] leading-relaxed">
                  {project.contribution}
                </p>
              </div>
            )}

            {/* 04: Instruments & Environment */}
            {(activeTab === "all" || activeTab === "telemetry") && (
              <div className="space-y-2">
                <span className="font-display text-xs font-bold text-[#78736A] uppercase tracking-wider block">
                  04 // Instruments &amp; Environment
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-md bg-[#EAE4D7] border border-[#1D1C1A]/10 font-mono text-xs text-[#1D1C1A]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-[#1D1C1A]/10">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="GITHUB ↗"
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#1D1C1A] text-[#FAF8F3] font-display text-xs font-semibold hover:bg-[#D94534] transition-colors shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full border border-[#1D1C1A]/20 bg-[#EAE4D7] font-display text-xs font-semibold text-[#1D1C1A] hover:border-[#1D1C1A] transition-colors shadow-sm"
              >
                Return to Spread
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}