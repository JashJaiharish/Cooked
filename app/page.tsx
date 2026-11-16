"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Highlights from "@/components/Highlights";
import Work from "@/components/Work";
import Contact from "@/components/Contact";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Section Observer for active navbar state
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      lenis.destroy();
      observer.disconnect();
    };
  }, [isLoaded]);

  return (
    <main className="min-h-screen bg-[#F5F2EB] text-[#1D1C1A] relative selection:bg-[#D94534] selection:text-[#FAF8F3]">
      {/* Editorial Print Loader */}
      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Floating Centered Technical Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Experience Stream */}
      <div className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {/* 01: HOME HERO */}
        <Hero />

        {/* 02: ABOUT IDENTITY & PHILOSOPHY */}
        <About />

        {/* 03: HIGHLIGHTS & ACHIEVEMENTS */}
        <Highlights />

        {/* 04: WORK - PINNED HORIZONTAL GALLERY */}
        <Work />

        {/* 05: CONTACT & DISPATCH (Includes Single-Screen Integrated Colophon) */}
        <Contact />
      </div>
    </main>
  );
}
