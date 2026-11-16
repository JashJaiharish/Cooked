export interface TechCategory {
  category: string;
  items: string[];
}

export const VERIFIED_TECHNOLOGIES: TechCategory[] = [
  {
    category: "Languages",
    items: ["Python", "JavaScript", "C", "Java"],
  },
  {
    category: "Web & Mobile",
    items: ["React.js", "React Native", "Expo", "HTML5", "CSS3"],
  },
  {
    category: "Backend & Systems",
    items: ["FastAPI", "Node.js", "Express.js", "Flask", "REST APIs"],
  },
  {
    category: "AI & Machine Learning",
    items: ["PyTorch", "Scikit-learn", "Pandas", "NumPy"],
  },
  {
    category: "Cloud & Databases",
    items: ["PostgreSQL", "Supabase", "AWS S3", "AWS Lambda", "AWS API Gateway"],
  },
  {
    category: "Visualization & Graphics",
    items: ["Deck.gl", "MapLibre GL JS"],
  },
  {
    category: "Core Disciplines",
    items: ["Data Structures", "Algorithms", "OOP", "DBMS", "UI/UX Design"],
  },
];

export const MARQUEE_ROW_ONE = [
  "React.js",
  "Python",
  "PostgreSQL",
  "FastAPI",
  "PyTorch",
  "AWS Cloud",
  "React Native",
  "Deck.gl",
  "Node.js",
  "Express.js",
];

export const MARQUEE_ROW_TWO = [
  "MapLibre GL",
  "Supabase",
  "Scikit-learn",
  "AWS Lambda",
  "Flask",
  "Expo Mobile",
  "REST APIs",
  "Algorithms",
  "Data Structures",
  "Geospatial Telemetry",
];

export const CURRENTLY_EXPLORING = [
  "AI SYSTEMS",
  "FULL-STACK ARCHITECTURE",
  "CLOUD INFRASTRUCTURE",
  "COMPUTER VISION",
  "AUTOMATION",
  "INTERACTIVE SYSTEMS",
];
