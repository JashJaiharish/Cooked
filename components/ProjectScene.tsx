"use client";

import Image from "next/image";
import { Project } from "@/data/projects";
import {
  ScanLine,
  Compass,
  Activity,
  GitBranch,
  MessageSquare,
  Waves,
  Users,
  Globe2,
} from "lucide-react";

interface ProjectSceneProps {
  project: Project;
  isActive?: boolean;
}

export default function ProjectScene({ project, isActive }: ProjectSceneProps) {
  switch (project.visualType) {
    case "industrial":
      return <IndustrialScene project={project} />;
    case "geospatial":
      return <GeospatialScene project={project} />;
    case "organic":
      return <OrganicScene project={project} />;
    case "academic":
      return <AcademicScene project={project} />;
    case "decisionTree":
      return <DecisionTreeScene project={project} />;
    case "communication":
      return <CommunicationScene project={project} />;
    case "hydrology":
      return <HydrologyScene project={project} />;
    default:
      return null;
  }
}

// 01 — RoBridge: Industrial Logistics & Barcode Scanning Automation
function IndustrialScene({ project }: { project: Project }) {
  return (
    <div className="relative w-full h-full min-h-[340px] flex flex-col justify-between p-6 bg-[#FAF8F3] border border-[#1D1C1A]/10 rounded-xl overflow-hidden group shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono text-[#78736A] relative z-10 border-b border-[#1D1C1A]/10 pb-3">
        <span className="flex items-center space-x-2 text-[#1D1C1A] font-semibold font-display">
          <ScanLine className="w-3.5 h-3.5 text-[#D94534]" />
          <span className="tracking-wider uppercase">Logistics Spread · 01</span>
        </span>
        <span className="font-handwriting text-base text-[#D94534]">
          ( ESP32 Telemetry )
        </span>
      </div>

      {/* Barcode Laser Auditing Simulation */}
      <div className="relative z-10 my-auto py-6 flex flex-col items-center justify-center space-y-4">
        <div className="relative w-64 h-28 p-3 bg-[#EAE4D7] border border-[#1D1C1A]/15 rounded-lg flex items-center justify-between overflow-hidden shadow-sm">
          {/* Red Pencil Laser Scan Beam */}
          <div className="absolute top-0 bottom-0 w-[1.5px] bg-[#D94534] shadow-[0_0_8px_#D94534] animate-[scanline_3.5s_ease-in-out_infinite]" />

          {/* Barcode Bars in Solid Charcoal Ink */}
          <div className="w-full flex items-center justify-between h-16 opacity-90">
            {[4, 2, 5, 1, 3, 2, 4, 6, 1, 3, 5, 2, 4, 1, 6, 2, 3].map((w, idx) => (
              <div
                key={idx}
                className="h-full bg-[#1D1C1A]"
                style={{ width: `${w * 2.5}px` }}
              />
            ))}
          </div>
        </div>

        <div className="w-full max-w-xs flex items-center justify-between text-[11px] font-mono text-[#78736A]">
          <span className="text-[#1D1C1A] font-medium font-display">Barcode Auditing</span>
          <span className="h-[1px] flex-1 mx-3 bg-[#1D1C1A]/15" />
          <span className="font-handwriting text-base text-[#D94534]">AGV automation</span>
        </div>
      </div>

      {/* Bottom Specs */}
      <div className="grid grid-cols-3 gap-2 border-t border-[#1D1C1A]/10 pt-3 text-[11px] font-mono text-[#78736A] relative z-10">
        <div>
          <span className="block text-[9px] uppercase tracking-wider text-[#78736A]">Hardware</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">ESP32 Edge</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-wider text-[#78736A]">Services</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">FastAPI + Node</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-wider text-[#78736A]">Storage</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">PostgreSQL</span>
        </div>
      </div>
    </div>
  );
}

// 02 — AegisGrid: Earth Orbit Geospatial Heat Clusters
function GeospatialScene({ project }: { project: Project }) {
  return (
    <div className="relative w-full h-full min-h-[340px] flex flex-col justify-between p-6 bg-[#FAF8F3] border border-[#1D1C1A]/10 rounded-xl overflow-hidden group shadow-sm">
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-85">
        <Image
          src="/images/aegisgrid-earth.jpg"
          alt="Earth from Orbit at Night"
          fill
          className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 filter contrast-115 grayscale-[25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F3] via-transparent to-[#FAF8F3]/80" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono text-[#78736A] relative z-10 border-b border-[#1D1C1A]/15 pb-3">
        <span className="flex items-center space-x-2 text-[#1D1C1A] font-semibold font-display">
          <Globe2 className="w-3.5 h-3.5 text-[#D94534]" />
          <span className="tracking-wider uppercase">Geospatial · 420km</span>
        </span>
        <span className="font-handwriting text-base text-[#D94534]">
          ( Deck.gl Map )
        </span>
      </div>

      {/* Center Printed Tag */}
      <div className="relative z-10 my-auto py-8 flex flex-col items-center justify-center">
        <div className="px-4 py-2 rounded-full bg-[#FAF8F3]/95 border border-[#1D1C1A]/15 text-xs font-display text-[#1D1C1A] flex items-center space-x-2 shadow-sm font-medium">
          <Compass className="w-3.5 h-3.5 text-[#D94534]" />
          <span>Predictive Withdrawal Heat Zones</span>
        </div>
      </div>

      {/* Bottom Specs */}
      <div className="grid grid-cols-3 gap-2 border-t border-[#1D1C1A]/15 pt-3 text-[11px] font-mono text-[#78736A] relative z-10">
        <div>
          <span className="block text-[9px] uppercase tracking-wider">Tiles</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">MapLibre GL</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-wider">Viewport</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">Deck.gl WebGL</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-wider">API</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">FastAPI</span>
        </div>
      </div>
    </div>
  );
}

// 03 — Arbor: Living Canopy Mobile Vision Diagnostics
function OrganicScene({ project }: { project: Project }) {
  return (
    <div className="relative w-full h-full min-h-[340px] flex flex-col justify-between p-6 bg-[#FAF8F3] border border-[#1D1C1A]/10 rounded-xl overflow-hidden group shadow-sm">
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-85">
        <Image
          src="/images/arbor-planet.jpg"
          alt="Living World Canopy"
          fill
          className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700 filter contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F3] via-transparent to-[#FAF8F3]/80" />
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-[#78736A] relative z-10 border-b border-[#1D1C1A]/15 pb-3">
        <span className="flex items-center space-x-2 text-[#1D1C1A] font-semibold font-display">
          <Activity className="w-3.5 h-3.5 text-[#3A7347]" />
          <span className="tracking-wider uppercase">Botanical · Canopy</span>
        </span>
        <span className="font-handwriting text-base text-[#3A7347]">
          ( edge vision AI )
        </span>
      </div>

      <div className="relative z-10 my-auto py-8 flex flex-col items-center justify-center">
        <div className="px-4 py-2 rounded-full bg-[#FAF8F3]/95 border border-[#1D1C1A]/15 text-xs font-display text-[#1D1C1A] flex items-center space-x-2 shadow-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-[#3A7347]" />
          <span>Pathology Sensitivity: 99.4%</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-[#1D1C1A]/15 pt-3 text-[11px] font-mono text-[#78736A] relative z-10">
        <div>
          <span className="block text-[9px] uppercase tracking-wider">Mobile</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">React Native</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-wider">Toolchain</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">Expo Managed</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-wider">Storage</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">Supabase</span>
        </div>
      </div>
    </div>
  );
}

// 04 — Dropout Prediction: Academic Guidance & Intervention Curve
function AcademicScene({ project }: { project: Project }) {
  return (
    <div className="relative w-full h-full min-h-[340px] flex flex-col justify-between p-6 bg-[#FAF8F3] border border-[#1D1C1A]/10 rounded-xl overflow-hidden group shadow-sm">
      <div className="flex items-center justify-between text-xs font-mono text-[#78736A] relative z-10 border-b border-[#1D1C1A]/10 pb-3">
        <span className="flex items-center space-x-2 text-[#1D1C1A] font-semibold font-display">
          <Users className="w-3.5 h-3.5 text-[#D94534]" />
          <span className="tracking-wider uppercase">Retention Model</span>
        </span>
        <span className="font-handwriting text-base text-[#D94534]">
          ( early advisory )
        </span>
      </div>

      <div className="relative z-10 my-auto py-6 flex flex-col items-center justify-center">
        <div className="relative w-64 h-36 border border-[#1D1C1A]/15 rounded-lg bg-[#EAE4D7] p-4 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-center text-[10px] font-mono text-[#78736A] border-b border-[#1D1C1A]/10 pb-2">
            <span>TRAJECTORY CURVE</span>
            <span className="font-handwriting text-sm text-[#D94534] font-bold">intervention alert</span>
          </div>

          <div className="flex items-end justify-between h-14 px-1 gap-2">
            {[40, 55, 68, 50, 75, 90, 88].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t transition-all duration-300 ${
                    i > 4 ? "bg-[#D94534]" : "bg-[#1D1C1A]/25"
                  }`}
                  style={{ height: `${h}%` }}
                />
                <span className="text-[8px] font-mono text-[#78736A]">W{i + 1}</span>
              </div>
            ))}
          </div>

          <div className="text-[9px] font-mono text-[#78736A] flex justify-between pt-1">
            <span>THRESHOLD: 75%</span>
            <span className="text-[#1D1C1A] font-medium">COUNSELOR ALERTED</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-[#1D1C1A]/10 pt-3 text-[11px] font-mono text-[#78736A] relative z-10">
        <div>
          <span className="block text-[9px] uppercase tracking-wider">Model</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">Scikit-learn</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-wider">Service</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">Flask + Python</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-wider">Data</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">Supabase</span>
        </div>
      </div>
    </div>
  );
}

// 05 — AI-Movie-Director: Decision Tree & Reasoning Graph
function DecisionTreeScene({ project }: { project: Project }) {
  return (
    <div className="relative w-full h-full min-h-[340px] flex flex-col justify-between p-6 bg-[#FAF8F3] border border-[#1D1C1A]/10 rounded-xl overflow-hidden group shadow-sm">
      <div className="flex items-center justify-between text-xs font-mono text-[#78736A] relative z-10 border-b border-[#1D1C1A]/10 pb-3">
        <span className="flex items-center space-x-2 text-[#1D1C1A] font-semibold font-display">
          <GitBranch className="w-3.5 h-3.5 text-[#D94534]" />
          <span className="tracking-wider uppercase">Narrative Graph</span>
        </span>
        <span className="font-handwriting text-base text-[#D94534]">
          ( state reasoning )
        </span>
      </div>

      <div className="relative z-10 my-auto py-6 flex flex-col items-center justify-center">
        <div className="relative w-64 h-36 border border-[#1D1C1A]/15 rounded-lg bg-[#EAE4D7] p-4 flex flex-col items-center justify-center space-y-2.5 shadow-sm">
          <div className="px-3 py-1 rounded bg-[#FAF8F3] border border-[#1D1C1A]/15 text-[#1D1C1A] font-display text-xs font-semibold">
            Narrative Seed Node
          </div>

          <div className="w-[1.5px] h-3 bg-[#1D1C1A]/20" />

          <div className="flex items-center justify-between w-full gap-2">
            <div className="p-2 rounded bg-[#FAF8F3] border border-[#1D1C1A]/10 text-[9px] font-mono text-[#78736A] text-center flex-1">
              Branch Alpha
            </div>
            <div className="p-2 rounded bg-[#FAF8F3] border border-[#D94534] text-[9px] font-display font-bold text-[#D94534] text-center flex-1 shadow-sm">
              Optimal Beta ↗
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-[#1D1C1A]/10 pt-3 text-[11px] font-mono text-[#78736A] relative z-10">
        <div>
          <span className="block text-[9px] uppercase tracking-wider">Paradigm</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">Graph Reasoner</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-wider">Backend</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">FastAPI</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-wider">Client</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">React Canvas</span>
        </div>
      </div>
    </div>
  );
}

// 06 — ChatIQ: Messaging Flow & Webhook Pipeline
function CommunicationScene({ project }: { project: Project }) {
  return (
    <div className="relative w-full h-full min-h-[340px] flex flex-col justify-between p-6 bg-[#FAF8F3] border border-[#1D1C1A]/10 rounded-xl overflow-hidden group shadow-sm">
      <div className="flex items-center justify-between text-xs font-mono text-[#78736A] relative z-10 border-b border-[#1D1C1A]/10 pb-3">
        <span className="flex items-center space-x-2 text-[#1D1C1A] font-semibold font-display">
          <MessageSquare className="w-3.5 h-3.5 text-[#1D1C1A]" />
          <span className="tracking-wider uppercase">Messaging Stream</span>
        </span>
        <span className="font-handwriting text-base text-[#D94534]">
          ( sub-second latency )
        </span>
      </div>

      <div className="relative z-10 my-auto py-6 flex flex-col items-center justify-center">
        <div className="w-64 space-y-2.5 font-mono text-xs">
          <div className="p-3 rounded-lg bg-[#EAE4D7] border border-[#1D1C1A]/10 text-[#78736A] max-w-[85%] font-body text-xs shadow-sm">
            Check availability for batch SKU #8492?
          </div>
          <div className="p-3 rounded-lg bg-[#1D1C1A] text-[#FAF8F3] max-w-[85%] ml-auto text-right font-body text-xs shadow-sm">
            SKU #8492 verified (24 units available in REC Hub).
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-[#1D1C1A]/10 pt-3 text-[11px] font-mono text-[#78736A] relative z-10">
        <div>
          <span className="block text-[9px] uppercase tracking-wider">Platform</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">WhatsApp Cloud</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-wider">Interface</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">React.js</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-wider">Network</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">REST Webhooks</span>
        </div>
      </div>
    </div>
  );
}

// 07 — FloodGuard: Hydrological Surge Waves & Hazard Sensor Telemetry
function HydrologyScene({ project }: { project: Project }) {
  return (
    <div className="relative w-full h-full min-h-[340px] flex flex-col justify-between p-6 bg-[#FAF8F3] border border-[#1D1C1A]/10 rounded-xl overflow-hidden group shadow-sm">
      <div className="flex items-center justify-between text-xs font-mono text-[#78736A] relative z-10 border-b border-[#1D1C1A]/10 pb-3">
        <span className="flex items-center space-x-2 text-[#1D1C1A] font-semibold font-display">
          <Waves className="w-3.5 h-3.5 text-[#385A94]" />
          <span className="tracking-wider uppercase">Hydrological Surge Radar</span>
        </span>
        <span className="font-handwriting text-base text-[#385A94]">
          ( wave elevation )
        </span>
      </div>

      <div className="relative z-10 my-auto py-6 flex flex-col items-center justify-center">
        <div className="relative w-64 h-36 border border-[#1D1C1A]/15 rounded-lg bg-[#EAE4D7] p-4 flex flex-col justify-between overflow-hidden shadow-sm">
          <div className="flex justify-between items-center text-[10px] font-mono text-[#78736A]">
            <span>RIVER BASIN LEVEL</span>
            <span className="font-handwriting text-base text-[#385A94] font-bold">Surge: 3.4m</span>
          </div>

          <div className="relative w-full h-12 flex items-center">
            <svg
              className="w-full h-12 text-[#385A94]"
              viewBox="0 0 200 60"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0,30 Q25,10 50,30 T100,30 T150,30 T200,30 L200,60 L0,60 Z"
                fill="rgba(56, 90, 148, 0.15)"
              />
              <path
                d="M0,30 Q25,10 50,30 T100,30 T150,30 T200,30"
                fill="none"
                stroke="#385A94"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <div className="flex justify-between text-[9px] font-mono text-[#78736A] border-t border-[#1D1C1A]/10 pt-1.5">
            <span>ALERT THRESHOLD: 4.0m</span>
            <span className="text-[#D94534] font-semibold">MONITORED</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-[#1D1C1A]/10 pt-3 text-[11px] font-mono text-[#78736A] relative z-10">
        <div>
          <span className="block text-[9px] uppercase tracking-wider">Sensors</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">River Buoys</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-wider">Analytics</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">Surge Models</span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-wider">Canvas</span>
          <span className="text-[#1D1C1A] font-display font-bold text-xs">React Visuals</span>
        </div>
      </div>
    </div>
  );
}
