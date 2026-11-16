"use client";

import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

const SEQUENCE = [
  { range: [0, 25], step: "01", text: "craft & paper", note: "setting the sheets" },
  { range: [26, 50], step: "02", text: "type & ink", note: "loading fonts" },
  { range: [51, 75], step: "03", text: "systems & work", note: "drawing 7 spreads" },
  { range: [76, 100], step: "04", text: "experience", note: "ready to explore :)" },
];

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [activeItem, setActiveItem] = useState(SEQUENCE[0]);
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const hasLoaded = sessionStorage.getItem("portfolio_craft_initialized");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hasLoaded === "true" || prefersReducedMotion) {
      const quickTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onComplete, 250);
      }, 250);
      return () => clearTimeout(quickTimer);
    }

    const duration = 2000; // ~2.0 seconds
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const rawProgress = Math.min(100, Math.round((currentStep / steps) * 100));

      const seq = SEQUENCE.find(
        (s) => rawProgress >= s.range[0] && rawProgress <= s.range[1]
      );
      if (seq) {
        setActiveItem(seq);
      }

      setProgress(rawProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        sessionStorage.setItem("portfolio_craft_initialized", "true");
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 400);
        }, 120);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-[#F5F2EB] text-[#1D1C1A] p-8 md:p-16 transition-all duration-600 ease-out select-none ${
        isExiting
          ? "opacity-0 -translate-y-6 pointer-events-none"
          : "opacity-100 translate-y-0"
      }`}
      aria-label="Opening Publication"
      role="status"
    >
      {/* Top Monogram */}
      <div className="flex items-center justify-between border-b border-[#1D1C1A]/10 pb-4">
        <div className="flex items-center space-x-2">
          <span className="font-handwriting text-3xl text-[#1D1C1A]">jaiharish</span>
          <span className="font-handwriting text-2xl text-[#D94534]">.</span>
          <span className="text-[#1D1C1A]/20">/</span>
          <span className="font-display font-medium text-xs text-[#78736A] uppercase tracking-wider">edition 2026</span>
        </div>
        <span className="font-handwriting text-base text-[#78736A]">Chennai, India</span>
      </div>

      {/* Centerpiece Title */}
      <div className="my-auto max-w-3xl space-y-4">
        <p className="font-handwriting text-2xl text-[#D94534]">
          {activeItem.step} // {activeItem.note}
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-[#1D1C1A] uppercase">
          {activeItem.text}
        </h1>
        <p className="text-sm font-body text-[#78736A]">
          Computer Science &amp; Digital Systems · Rajalakshmi Engineering College
        </p>
      </div>

      {/* Bottom Progress Rule & Tabular Indicator */}
      <div className="space-y-3 font-mono border-t border-[#1D1C1A]/10 pt-4">
        <div className="flex items-baseline justify-between text-xs text-[#78736A]">
          <span className="font-handwriting text-lg text-[#1D1C1A]">
            loading portfolio spreads...
          </span>
          <span className="text-base font-display font-bold text-[#1D1C1A] tabular-nums">
            {progress < 10 ? `0${progress}` : progress}%
          </span>
        </div>

        {/* Thin Oatmeal Progress Rule with Red Pencil Indicator */}
        <div className="w-full h-[2.5px] bg-[#EAE4D7] rounded-full relative overflow-hidden">
          <div
            className="h-full bg-[#D94534] transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
