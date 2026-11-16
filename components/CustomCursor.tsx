"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Position storage in mutable ref to avoid triggering React re-renders on mousemove
  const pos = useRef({
    mouseX: -100,
    mouseY: -100,
    innerX: -100,
    innerY: -100,
    outerX: -100,
    outerY: -100,
    visible: false,
  });

  useEffect(() => {
    const checkDisabled = () => {
      const isTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return isTouch || prefersReduced || window.innerWidth < 1024;
    };

    if (checkDisabled()) {
      setIsDisabled(true);
      return;
    }
    setIsDisabled(false);

    const handleMouseMove = (e: MouseEvent) => {
      pos.current.mouseX = e.clientX;
      pos.current.mouseY = e.clientY;

      if (!pos.current.visible) {
        pos.current.visible = true;
        pos.current.innerX = e.clientX;
        pos.current.innerY = e.clientY;
        pos.current.outerX = e.clientX;
        pos.current.outerY = e.clientY;
        setIsVisible(true);
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // When hovering text inputs / forms, yield to native browser text cursor
      if (target.closest("input, textarea, select, [contenteditable='true']")) {
        setIsVisible(false);
        return;
      } else if (!pos.current.visible) {
        pos.current.visible = true;
        setIsVisible(true);
      }

      // 1. Check explicit data-cursor elements (e.g. Resume, Contact, Highlights, Projects)
      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "";
        setIsHovered(true);
        setCursorText(text);
        return;
      }

      // 2. Check Work carousel area for minimal DRAG label
      const carouselTrack = target.closest("#work, [data-carousel]") as HTMLElement | null;
      const isCardOrButton = target.closest("article, button, a, [role='button']");
      if (carouselTrack && !isCardOrButton) {
        setIsHovered(true);
        const isLeft = e.clientX < window.innerWidth / 2;
        setCursorText(isLeft ? "← DRAG" : "DRAG →");
        return;
      }

      // 3. Check general interactive elements (buttons, links, nav pills, magnetic targets)
      const isInteractive = target.closest(
        "a, button, [role='button'], [data-magnetic]"
      ) as HTMLElement | null;
      if (isInteractive) {
        setIsHovered(true);
        const rawText =
          isInteractive.getAttribute("aria-label") ||
          isInteractive.innerText?.trim().split("\n")[0] ||
          "";
        const cleanText = rawText.replace(/[^\w\s↗→←★✉✦✎⌘:]/g, "").trim().slice(0, 14);
        setCursorText(cleanText.toUpperCase() || "SELECT");
        return;
      }

      // Default cursor state
      setIsHovered(false);
      setCursorText("");
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeaveDoc = () => {
      pos.current.visible = false;
      setIsVisible(false);
    };
    const handleMouseEnterDoc = () => {
      pos.current.visible = true;
      setIsVisible(true);
    };

    // Magnetic pull on [data-magnetic] targets (3–5px displacement)
    const handleMagneticMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-magnetic]") as HTMLElement | null;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.16;
      const dy = (e.clientY - cy) * 0.16;
      const clampedX = Math.max(-5, Math.min(5, dx));
      const clampedY = Math.max(-5, Math.min(5, dy));

      target.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
    };

    const handleMagneticLeave = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-magnetic]") as HTMLElement | null;
      if (!target) return;

      target.style.transition = "transform 0.25s cubic-bezier(0.2, 0, 0, 1)";
      target.style.transform = "translate3d(0, 0, 0)";
      setTimeout(() => {
        if (target) target.style.transition = "";
      }, 250);
    };

    // Dynamic Cursor Physics (Responsive Inner Lead 0.72 + Snappy Outer Catch-Up 0.28)
    let animationId: number;
    const render = () => {
      const p = pos.current;

      // Responsive Inner Lead: follows mouse pointer with rapid tracking (lerp 0.72)
      p.innerX += (p.mouseX - p.innerX) * 0.72;
      p.innerY += (p.mouseY - p.innerY) * 0.72;

      // Snappy Outer Catch-Up: trails with fluid displacement, catching up swiftly within a fraction of a second
      p.outerX += (p.innerX - p.outerX) * 0.28;
      p.outerY += (p.innerY - p.outerY) * 0.28;

      // Sub-pixel snapping at rest to guarantee 100% dead-center concentric alignment
      if (
        Math.hypot(p.mouseX - p.innerX, p.mouseY - p.innerY) < 0.2 &&
        Math.hypot(p.innerX - p.outerX, p.innerY - p.outerY) < 0.2
      ) {
        p.innerX = p.mouseX;
        p.outerX = p.mouseX;
        p.innerY = p.mouseY;
        p.outerY = p.mouseY;
      }

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${p.outerX}px, ${p.outerY}px, 0)`;
      }

      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${p.innerX}px, ${p.innerY}px, 0)`;
      }

      animationId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeaveDoc);
    document.addEventListener("mouseenter", handleMouseEnterDoc);
    document.addEventListener("mousemove", handleMagneticMove, { passive: true });
    document.addEventListener("mouseout", handleMagneticLeave, { passive: true });

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeaveDoc);
      document.removeEventListener("mouseenter", handleMouseEnterDoc);
      document.removeEventListener("mousemove", handleMagneticMove);
      document.removeEventListener("mouseout", handleMagneticLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (isDisabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-200 select-none ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Outer Diamond (Snappy Outer Catch-Up 0.28) - Positioned at exact origin with centered child */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 w-0 h-0 pointer-events-none will-change-transform"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[5.5px] transition-all duration-200 ease-out flex items-center justify-center ${
            isClicking
              ? "w-[19px] h-[19px] border-[#D94534] bg-[#D94534]/20 scale-90"
              : isHovered
              ? "w-[26px] h-[26px] border-[#D94534] bg-[#D94534]/10 shadow-sm rounded-[6.5px]"
              : "w-[22px] h-[22px] border-[#1D1C1A] bg-transparent"
          }`}
          style={{
            borderWidth: "1.5px",
          }}
        />

        {/* Contextual Badge Underneath Diamond with Clean Clearance */}
        {cursorText && (
          <div className="absolute top-7 sm:top-8 left-0 -translate-x-1/2 pt-1 flex items-center justify-center pointer-events-none">
            <span className="font-mono text-[9px] font-bold tracking-widest text-[#1D1C1A] uppercase bg-[#FAF8F3]/95 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-[#1D1C1A]/15 shadow-sm whitespace-nowrap animate-fade-in">
              {cursorText}
            </span>
          </div>
        )}
      </div>

      {/* Inner Diamond (Responsive Inner Lead 0.72) - Positioned at exact origin with centered child */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-0 h-0 pointer-events-none will-change-transform"
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2.5px] transition-all duration-150 ease-out ${
            isClicking
              ? "w-[9px] h-[9px] bg-[#D94534]"
              : isHovered
              ? "w-[11.5px] h-[11.5px] bg-[#D94534] rounded-[3px]"
              : "w-[10.5px] h-[10.5px] bg-[#1D1C1A]"
          }`}
        />
      </div>
    </div>
  );
}