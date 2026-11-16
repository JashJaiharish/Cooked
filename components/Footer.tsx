"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F5F2EB] border-t border-[#1D1C1A]/10 py-8 px-6 sm:px-12 lg:px-20 text-xs font-mono text-[#78736A]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span
            data-magnetic
            data-cursor="JAIHARISH"
            className="font-handwriting text-2xl text-[#1D1C1A] cursor-pointer select-none"
          >
            jaiharish d.
          </span>
          <span className="text-[#1D1C1A]/20">/</span>
          <span className="font-display font-medium text-xs text-[#78736A]">Chennai, India</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D94534]" />
          <span className="font-handwriting text-base text-[#1D1C1A]">
            designed &amp; built by hand :)
          </span>
        </div>

        <div className="text-[11px] font-display text-[#78736A]">
          <span>© 2026 JAIHARISH D. ALL RIGHTS RESERVED.</span>
        </div>
      </div>
    </footer>
  );
}
