"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Architectural Wireframe Sculpture / Geometric Kinetic Drawing
    let targetAngleX = 0.2;
    let targetAngleY = 0.3;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / width - 0.5;
      const ny = (e.clientY - rect.top) / height - 0.5;
      targetAngleY = nx * 0.8;
      targetAngleX = ny * 0.6;
      setMousePos({ x: nx * 15, y: ny * 15 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Generate 3D structural nodes (Nested Isometric Polyhedra)
    const vertices: [number, number, number][] = [];
    const size = Math.min(width, height) * 0.26;

    // Outer cube vertices
    for (let x = -1; x <= 1; x += 2) {
      for (let y = -1; y <= 1; y += 2) {
        for (let z = -1; z <= 1; z += 2) {
          vertices.push([x * size, y * size, z * size]);
        }
      }
    }

    // Inner octahedron vertices
    const innerSize = size * 0.6;
    vertices.push([innerSize, 0, 0], [-innerSize, 0, 0]);
    vertices.push([0, innerSize, 0], [0, -innerSize, 0]);
    vertices.push([0, 0, innerSize], [0, 0, -innerSize]);

    const edges = [
      // Cube edges
      [0, 1], [1, 3], [3, 2], [2, 0],
      [4, 5], [5, 7], [7, 6], [6, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
      // Octahedron edges
      [8, 10], [10, 9], [9, 11], [11, 8],
      [8, 12], [9, 12], [10, 12], [11, 12],
      [8, 13], [9, 13], [10, 13], [11, 13],
      // Connecting structural struts
      [0, 8], [1, 9], [2, 10], [3, 11],
    ];

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Center sculpture on right-center quadrant for generous display spacing
      const cx = width > 1024 ? width * 0.72 : width * 0.5;
      const cy = height * 0.5;

      // Project vertices with rotation
      const projected = vertices.map(([x, y, z]) => {
        // Rotate around Y
        const cosY = Math.cos(targetAngleY);
        const sinY = Math.sin(targetAngleY);
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        // Rotate around X
        const cosX = Math.cos(targetAngleX);
        const sinX = Math.sin(targetAngleX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        // Perspective projection
        const fov = 800;
        const scale = fov / (fov + z2);

        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          scale,
        };
      });

      // Draw subtle orbital compass rings
      ctx.beginPath();
      ctx.strokeStyle = "rgba(29, 28, 26, 0.04)";
      ctx.lineWidth = 1;
      ctx.arc(cx, cy, size * 1.35, 0, Math.PI * 2);
      ctx.stroke();

      // Draw subtle grid crosshairs behind sculpture
      ctx.beginPath();
      ctx.strokeStyle = "rgba(29, 28, 26, 0.05)";
      ctx.setLineDash([3, 6]);
      ctx.moveTo(cx - size * 1.5, cy);
      ctx.lineTo(cx + size * 1.5, cy);
      ctx.moveTo(cx, cy - size * 1.5);
      ctx.lineTo(cx, cy + size * 1.5);
      ctx.stroke();

      // Draw structural edges
      edges.forEach(([i, j], edgeIdx) => {
        const p1 = projected[i];
        const p2 = projected[j];

        const isAccent = edgeIdx >= 12 && edgeIdx < 20;

        ctx.setLineDash([]);
        if (isAccent) {
          ctx.strokeStyle = "rgba(217, 69, 52, 0.75)"; // Vermilion red ink
          ctx.lineWidth = 1.5;
        } else {
          ctx.strokeStyle = "rgba(29, 28, 26, 0.22)"; // Soft charcoal ink
          ctx.lineWidth = 1;
        }

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw vertices
      projected.forEach((p, idx) => {
        const isVermilion = idx >= 8;
        ctx.fillStyle = isVermilion ? "#D94534" : "#1D1C1A";
        ctx.beginPath();
        ctx.arc(p.x, p.y, isVermilion ? 2.5 : 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-screen h-[100dvh] max-h-screen w-full flex flex-col justify-between pt-16 sm:pt-20 pb-4 sm:pb-6 px-6 sm:px-12 lg:px-20 overflow-hidden bg-[#F5F2EB] select-none"
    >
      {/* Interactive Architectural Kinetic Sculpture Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Top Printed Monogram & Location Bar */}
      <div className="relative z-10 w-full flex justify-between items-center text-xs font-mono text-[#78736A] border-b border-[#1D1C1A]/10 pb-2.5 sm:pb-3 gap-2 shrink-0">
        <div className="flex items-center space-x-3">
          <span className="font-handwriting text-base sm:text-lg text-[#D94534]">/ portfolio 01 /</span>
          <span className="text-[#1D1C1A]/20">·</span>
          <span className="font-display font-medium text-[11px] sm:text-xs text-[#1D1C1A]">
            Software · AI · Systems
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[11px] sm:text-xs">
          <span className="font-mono text-[#78736A]">13.0827° N / 80.2707° E</span>
          <span className="text-[#1D1C1A]/20">|</span>
          <span className="font-handwriting text-sm sm:text-base text-[#1D1C1A]">Chennai, India</span>
        </div>
      </div>

      {/* Center Intro & Display Headline Spread (Vertically centered, fits neatly in 100vh) */}
      <div
        className="relative z-10 my-auto py-2 sm:py-3 max-w-4xl space-y-2.5 sm:space-y-3.5 flex-1 flex flex-col justify-center"
        style={{
          transform: `translate3d(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px, 0)`,
          transition: "transform 0.4s ease-out",
        }}
      >
        {/* Exact reference style: clean sans-serif with handwritten emphasis word & smiley */}
        <div
          data-magnetic
          data-cursor="HELLO :)"
          className="inline-flex items-center flex-wrap gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F3]/80 backdrop-blur-md border border-[#1D1C1A]/10 text-xs sm:text-sm font-display text-[#1D1C1A] shadow-sm select-none cursor-pointer w-fit"
        >
          <span>Hey, my name is Jaiharish and I</span>
          <span className="font-handwriting text-xl sm:text-2xl text-[#D94534] font-bold leading-none mx-0.5">
            create
          </span>
          <span>digital systems :)</span>
        </div>

        <h1
          data-cursor="SYSTEMS"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.4rem] font-display font-bold tracking-tighter leading-[0.92] text-[#1D1C1A] uppercase select-none cursor-default"
        >
          I BUILD <br />
          <span className="text-[#1D1C1A]">DIGITAL</span> <br />
          <span className="text-[#D94534]">SYSTEMS.</span>
        </h1>

        <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#1D1C1A]/10 pt-2.5 sm:pt-3 max-w-2xl">
          <p className="text-xs sm:text-sm md:text-base font-body text-[#78736A] leading-relaxed max-w-lg">
            Computer Science Engineering student focused on software engineering, AI/ML, cloud architecture, geospatial telemetry, and experimental products.
          </p>

          <div className="font-handwriting text-base sm:text-lg text-[#1D1C1A] whitespace-nowrap bg-[#FAF8F3]/80 backdrop-blur-md px-3 py-1 rounded-lg border border-[#1D1C1A]/10 shadow-sm rotate-1">
            REC Chennai (2024–2028)
          </div>
        </div>
      </div>

      {/* Bottom Status & Scroll Trigger (Always anchored in initial single screen view) */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-[#78736A] border-t border-[#1D1C1A]/10 pt-2.5 sm:pt-3 pb-1 gap-2 shrink-0">
        <div className="flex items-center space-x-3">
          <span className="font-handwriting text-sm sm:text-base text-[#D94534] font-bold">★ SIH 2026 Internal Winner</span>
          <span className="text-[#1D1C1A]/20">/</span>
          <span className="text-[#1D1C1A] font-medium font-display text-[11px] sm:text-xs">CGPA 8.75 / 10</span>
          <span className="text-[#1D1C1A]/20">/</span>
          <span className="hidden sm:inline font-handwriting text-sm sm:text-base text-[#78736A]">COO @ InovX REC</span>
        </div>

        <button
          onClick={handleScrollDown}
          className="group flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F3]/80 backdrop-blur-md border border-[#1D1C1A]/10 text-[#1D1C1A] hover:bg-[#1D1C1A] hover:text-[#FAF8F3] transition-all cursor-pointer shadow-sm"
          data-cursor="EXPLORE"
        >
          <span className="text-xs font-display font-medium">
            Explore Work
          </span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-[#D94534]" />
        </button>
      </div>
    </section>
  );
}
