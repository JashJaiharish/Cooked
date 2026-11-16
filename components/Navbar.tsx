"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";

interface NavbarProps {
  activeSection: string;
}

// Staggered vertical rolling text animation on hover (Balanced 400ms duration, 28ms stagger)
function RollingText({
  text,
  className = "",
  hoverColor = "group-hover/nav:text-[#D94534]",
}: {
  text: string;
  className?: string;
  hoverColor?: string;
}) {
  return (
    <span className={`relative inline-flex items-center overflow-hidden leading-tight select-none ${className}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="relative inline-block overflow-hidden h-[1.15em] leading-[1.15em]"
        >
          <span
            className="flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover/nav:-translate-y-1/2 will-change-transform"
            style={{
              transitionDelay: `${index * 28}ms`,
            }}
          >
            {/* Top letter: initial state */}
            <span className="block h-[1.15em] leading-[1.15em]">
              {char === " " ? "\u00A0" : char}
            </span>
            {/* Bottom letter: rolls in smoothly on hover */}
            <span className={`block h-[1.15em] leading-[1.15em] transition-colors ${hoverColor}`}>
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", cursor: "HOME" },
    { label: "About", href: "#about", cursor: "ABOUT" },
    { label: "Distinctions", href: "#highlights", cursor: "DISTINCTIONS" },
    { label: "Work", href: "#work", cursor: "WORK" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Floating Header with Frosted Glassmorphic Navigation */}
      <header className="fixed top-4 left-0 w-full z-50 flex items-center justify-between px-6 sm:px-12 pointer-events-none">
        {/* Top-Left: Handwritten Signature Monogram (Capital J, Red Dot, D) */}
        <div className="pointer-events-auto">
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, "#home")}
            className="group inline-flex items-center px-4 py-1.5 rounded-full bg-[#FAF8F3]/75 backdrop-blur-xl border border-[#1D1C1A]/10 shadow-[0_4px_24px_rgba(29,28,26,0.05),_inset_0_1px_1px_rgba(255,255,255,0.9)] cursor-pointer select-none transition-all duration-200 hover:border-[#1D1C1A]/25 hover:shadow-md"
            aria-label="Jaiharish D. Home"
            data-magnetic
            data-cursor="JAIHARISH ✦"
          >
            <span className="font-handwriting text-3xl text-[#1D1C1A] group-hover:text-[#D94534] transition-colors leading-none tracking-normal">
              Jaiharish
            </span>
            <span className="font-handwriting text-2xl text-[#D94534] inline-block -rotate-6 ml-0.5">
              .
            </span>
            <span className="font-handwriting text-3xl text-[#1D1C1A] group-hover:text-[#D94534] transition-colors leading-none tracking-normal ml-1">
              D
            </span>
          </a>
        </div>

        {/* Top-Right: Tailored Frosted Glass Navigation Island */}
        <div className="pointer-events-auto flex items-center space-x-2">
          <nav className="hidden md:flex items-center space-x-1.5 p-1.5 rounded-full bg-[#FAF8F3]/75 backdrop-blur-xl border border-[#1D1C1A]/10 shadow-[0_8px_32px_rgba(29,28,26,0.06),_inset_0_1px_1px_rgba(255,255,255,0.85)]">
            {navLinks.map((link) => {
              const isActive =
                activeSection.toLowerCase() === link.label.toLowerCase() ||
                (link.href === "#highlights" && activeSection.toLowerCase() === "highlights");
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  data-magnetic
                  data-cursor={link.cursor}
                  className={`group/nav px-4 py-1.5 rounded-full text-xs font-display font-medium transition-all duration-200 select-none ${isActive
                    ? "bg-[#FAF8F3] text-[#1D1C1A] shadow-sm font-semibold border border-[#1D1C1A]/12"
                    : "text-[#78736A] hover:text-[#1D1C1A] hover:bg-[#FAF8F3]/85 hover:border-[#1D1C1A]/10 border border-transparent shadow-none hover:shadow-sm"
                    }`}
                >
                  <RollingText
                    text={link.label}
                    hoverColor={isActive ? "group-hover/nav:text-[#D94534]" : "group-hover/nav:text-[#1D1C1A]"}
                  />
                </a>
              );
            })}

            {/* Resume Action Pill with Rolling Text & Diagonal Arrow */}
            <a
              href="/resume/Jaiharish_D_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              data-cursor="RESUME ↗"
              className="group/nav px-3.5 py-1.5 rounded-full text-xs font-display font-medium text-[#78736A] hover:text-[#1D1C1A] hover:bg-[#FAF8F3]/85 hover:border-[#1D1C1A]/10 border border-transparent transition-all flex items-center space-x-1 select-none hover:shadow-sm"
            >
              <RollingText text="Resume" hoverColor="group-hover/nav:text-[#D94534]" />
              <ArrowUpRight className="w-3 h-3 text-[#D94534] transition-transform duration-200 group-hover/nav:translate-x-0.5 group-hover/nav:-translate-y-0.5" />
            </a>

            {/* Contact Action Pill with Rolling Text */}
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              data-magnetic
              data-cursor="CONTACT"
              className={`group/nav px-4 py-1.5 rounded-full text-xs font-display font-medium transition-all duration-200 select-none ${activeSection === "contact"
                ? "bg-[#1D1C1A] text-[#FAF8F3] font-semibold shadow-sm"
                : "bg-[#1D1C1A] text-[#FAF8F3] hover:bg-[#D94534] shadow-sm hover:scale-[1.02]"
                }`}
            >
              <RollingText
                text="Contact"
                hoverColor="group-hover/nav:text-[#FAF8F3]"
              />
            </a>
          </nav>

          {/* Mobile Menu Glass Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-magnetic
            data-cursor="MENU"
            className="md:hidden px-3.5 py-2 rounded-full bg-[#FAF8F3]/80 backdrop-blur-xl border border-[#1D1C1A]/10 text-[#1D1C1A] hover:border-[#1D1C1A]/25 flex items-center space-x-1.5 text-xs font-display font-medium shadow-sm transition-all"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 text-[#D94534]" />
            ) : (
              <>
                <span className="font-handwriting text-base">menu</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D94534]" />
              </>
            )}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer on Frosted Paper Glass */}
      <div
        className={`fixed inset-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-2xl md:hidden flex flex-col justify-between p-8 pt-28 transition-all duration-400 ease-out ${mobileMenuOpen
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none -translate-y-4"
          }`}
      >
        <div className="space-y-6">
          <p className="font-handwriting text-2xl text-[#D94534]">
            navigation // explore
          </p>
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                data-cursor={link.cursor}
                className="group/nav text-3xl font-display font-semibold text-[#1D1C1A] hover:text-[#D94534] transition-colors"
              >
                <RollingText text={link.label} />
              </a>
            ))}

            <a
              href="/resume/Jaiharish_D_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              data-cursor="RESUME ↗"
              className="group/nav flex items-center justify-between text-2xl font-display font-semibold text-[#D94534] pt-4 border-t border-[#1D1C1A]/10"
            >
              <RollingText text="Resume PDF" hoverColor="group-hover/nav:text-[#1D1C1A]" />
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover/nav:translate-x-1 group-hover/nav:-translate-y-1" />
            </a>

            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              data-cursor="CONTACT ✉"
              className="group/nav text-3xl font-display font-semibold text-[#1D1C1A] hover:text-[#D94534]"
            >
              <RollingText text="Contact Me →" />
            </a>
          </div>
        </div>

        <div className="border-t border-[#1D1C1A]/10 pt-6 font-mono text-xs text-[#78736A] space-y-1">
          <p className="font-handwriting text-lg text-[#1D1C1A]">Jaiharish D · Chennai, India</p>
          <p>B.E. Computer Science &amp; Engineering · 2024–2028</p>
        </div>
      </div>
    </>
  );
}
