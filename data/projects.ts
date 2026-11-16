export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  descriptor: string;
  tagline: string;
  themeColor: string;
  accentColor: string;
  problem: string;
  solution: string;
  contribution: string;
  technologies: string[];
  metrics?: { label: string; value: string }[];
  visualType: "industrial" | "geospatial" | "organic" | "academic" | "decisionTree" | "communication" | "hydrology";
  githubUrl?: string;
  demoUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "robridge",
    number: "01",
    title: "RoBridge",
    subtitle: "Industrial Automation · 2026",
    descriptor: "Automated Robotic Warehouse & Real-time Inventory System",
    tagline: "Bridging physical storage nodes with telemetry & automated scanning pipelines.",
    themeColor: "#C05621",
    accentColor: "#111111",
    problem: "Manual warehouse auditing creates latency bottlenecks, stock discrepancies, and operational delays in high-density facilities.",
    solution: "A unified warehouse inventory system coupling barcode telemetry scanning with robotic automation pathways.",
    contribution: "Rebuilt the entire warehouse inventory system with barcode scanning and robotic automation. Fixed system issues and designed the complete user interface for smoother warehouse floor operations.",
    technologies: ["React", "Node.js", "Express", "PostgreSQL", "Flask", "FastAPI", "ESP32"],
    metrics: [
      { label: "Hardware Node", value: "ESP32 Controller" },
      { label: "Architecture", value: "Full-Stack Edge" },
      { label: "Pipeline", value: "Real-time Telemetry" },
    ],
    visualType: "industrial",
    githubUrl: "https://github.com/JaiharishD",
  },
  {
    id: "aegisgrid",
    number: "02",
    title: "AegisGrid",
    subtitle: "Geospatial AI · Fraud Prevention",
    descriptor: "Predictive Geospatial Intelligence for High-Risk Cash Points",
    tagline: "Spatial telemetry layers predicting high-threat withdrawal clusters across urban grids.",
    themeColor: "#D94B35",
    accentColor: "#111111",
    problem: "Financial institutions struggle to proactively identify targeted ATMs and withdrawal nodes susceptible to coordinated skimming and physical fraud.",
    solution: "A geospatial intelligence platform rendering dynamic predictive risk surfaces and spatial transaction telemetry across municipal coordinates.",
    contribution: "Built the frontend of a geospatial platform that predicts high-risk cash withdrawal locations for fraud prevention. Developed interactive map visualizations and integrated prediction modules.",
    technologies: ["React", "Deck.gl", "MapLibre GL JS", "FastAPI"],
    metrics: [
      { label: "Rendering", value: "Deck.gl WebGL" },
      { label: "Vector Base", value: "MapLibre Tiles" },
      { label: "Inference", value: "FastAPI Predictive API" },
    ],
    visualType: "geospatial",
    githubUrl: "https://github.com/JaiharishD",
  },
  {
    id: "arbor",
    number: "03",
    title: "Arbor",
    subtitle: "Mobile Ecology · Botanical AI",
    descriptor: "Edge Botanical Care, Disease Diagnosis & Agritech Exchange",
    tagline: "Empowering cultivation lifecycle tracking with computer vision diagnostics on mobile.",
    themeColor: "#2E7D32",
    accentColor: "#111111",
    problem: "Smallholder growers lack accessible, low-friction disease diagnosis tools and localized channels to trade fresh produce.",
    solution: "A reactive cross-platform mobile ecosystem delivering computer-vision crop pathology screening, growth timeline monitoring, and community barter/produce exchange.",
    contribution: "Developed a mobile platform for plant care, crop tracking, disease detection, and produce exchange. Worked across the application, AI features, and cultivation management workflow.",
    technologies: ["React Native", "Expo", "Supabase", "PostgreSQL", "AI/ML"],
    metrics: [
      { label: "Platform", value: "Cross-platform Mobile" },
      { label: "Backend", value: "Supabase + PostgreSQL" },
      { label: "Model", value: "Edge Vision Classifier" },
    ],
    visualType: "organic",
    githubUrl: "https://github.com/JaiharishD",
  },
  {
    id: "dropout-prediction",
    number: "04",
    title: "Dropout Prediction",
    subtitle: "Educational Intelligence · Advisory",
    descriptor: "Academic Retention Intelligence & Automated Advisory Pipeline",
    tagline: "Transforming longitudinal scholastic indicators into early automated counseling triggers.",
    themeColor: "#C05621",
    accentColor: "#111111",
    problem: "Academic institutions detect at-risk students too late in the academic semester, after dropout trajectories have already hardened.",
    solution: "An algorithmic surveillance model evaluating academic trajectory, attendance velocity, and behavioral signals to alert counselors automatically.",
    contribution: "Developed a system that predicts student dropout risk using academic and behavioral data. Built the dashboard and automated counseling workflow for early intervention.",
    technologies: ["Python", "Flask", "Scikit-learn", "React", "Supabase"],
    metrics: [
      { label: "Inference", value: "Scikit-learn Ensemble" },
      { label: "Workflow", value: "Automated Triggers" },
      { label: "Interface", value: "Predictive Analytics UI" },
    ],
    visualType: "academic",
    githubUrl: "https://github.com/JaiharishD",
  },
  {
    id: "ai-movie-director",
    number: "05",
    title: "AI-Movie-Director",
    subtitle: "Cinematic AI · Decision Systems",
    descriptor: "Computational Narrative Graph & Knowledge-Driven Director",
    tagline: "Exploring deterministic narrative branch spaces using graph reasoning and state search.",
    themeColor: "#C05621",
    accentColor: "#111111",
    problem: "Generative media often hallucinates inconsistent scene progressions and lacks structural continuity across branching storylines.",
    solution: "A heuristic knowledge-based search and reasoning engine orchestrating structured narrative decision trees and director constraints.",
    contribution: "Built an AI-based application using search, reasoning, and knowledge-based decision techniques. Developed the supporting frontend and backend components.",
    technologies: ["Python", "FastAPI", "React"],
    metrics: [
      { label: "Technique", value: "Knowledge Graph Search" },
      { label: "Engine", value: "FastAPI Reasoning API" },
      { label: "Frontend", value: "Interactive Canvas UI" },
    ],
    visualType: "decisionTree",
    githubUrl: "https://github.com/JaiharishD",
  },
  {
    id: "chatiq",
    number: "06",
    title: "ChatIQ",
    subtitle: "Conversational UX · Integration",
    descriptor: "WhatsApp Ecosystem Automation & Structured Conversational Flow",
    tagline: "Bridging automated messaging pipelines with intuitive client interaction patterns.",
    themeColor: "#319795",
    accentColor: "#111111",
    problem: "Businesses face friction deploying contextual customer communication across universal chat channels without bloated enterprise software.",
    solution: "A nimble messaging layer integrating WhatsApp APIs with real-time response flows and cleanly formatted conversational UX.",
    contribution: "Developed a smart communication application with WhatsApp integration. Built the frontend and contributed to product ideation and user experience.",
    technologies: ["React", "APIs", "WhatsApp Integration"],
    metrics: [
      { label: "Integration", value: "WhatsApp Meta Cloud" },
      { label: "Latency", value: "Sub-second Webhooks" },
      { label: "UI Experience", value: "Reactive Stream View" },
    ],
    visualType: "communication",
    githubUrl: "https://github.com/JaiharishD",
  },
  {
    id: "floodguard",
    number: "07",
    title: "FloodGuard",
    subtitle: "Hydrological Data · Weather Prediction",
    descriptor: "Hydrological Telemetry Analytics & Flood Inundation Monitor",
    tagline: "Mapping water table elevations and precipitation surges into real-time hazard visuals.",
    themeColor: "#2B6CB0",
    accentColor: "#111111",
    problem: "Urban regions suffer catastrophic flash flood damage due to delayed telemetry processing and fragmented public alert displays.",
    solution: "A real-time hydrological visualization dashboard that aggregates sensor streams, predicts surge levels, and renders geographic hazard thresholds.",
    contribution: "Developed frontend and visualization components for a flood prediction and monitoring system. Contributed to additional modules and the overall implementation.",
    technologies: ["Frontend Development", "Data Visualization", "Prediction"],
    metrics: [
      { label: "Visuals", value: "Hydrological Wave Canvas" },
      { label: "Telemetry", value: "Real-time Thresholds" },
      { label: "Application", value: "Emergency Preparedness" },
    ],
    visualType: "hydrology",
    githubUrl: "https://github.com/JaiharishD",
  },
];

export const PERSONAL_DETAILS = {
  name: "JAIHARISH D",
  tagline: "I BUILD IDEAS INTO SYSTEMS.",
  subTagline: "Software × AI/ML × Cloud × Geospatial",
  title: "Computer Science Engineering Student & Software / AI Builder",
  institution: "Rajalakshmi Engineering College",
  graduation: "2024–2028",
  cgpa: "8.75 / 10",
  location: "Chennai, India",
  coordinates: "13.0827° N / 80.2707° E",
  email: "jaiharishd3010@gmail.com",
  github: "https://github.com/JaiharishD",
  githubUsername: "JaiharishD",
  linkedin: "https://linkedin.com/in/jaiharish-d-a4967932a",
  linkedinUsername: "jaiharish-d-a4967932a",
  resumePath: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/resume/Jaiharish_D_Resume.pdf`,
  achievement: {
    title: "SIH 2026 — Internal Winner",
    description: "Won internal institutional rounds of Smart India Hackathon 2026 for high-impact engineering innovation.",
  },
  leadership: {
    role: "Chief Operating Officer",
    organization: "InovX REC",
    description: "Coordinate club operations, team execution, technical events and initiatives while supporting effective collaboration across members.",
  },
};
