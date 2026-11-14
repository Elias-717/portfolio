// Skills, experience, education and certifications. Sources: resume and brief.

export const skillGroups: { level: string; items: string[] }[] = [
  // Confirmed by Elias (2026-11-14): only these are skills he can use and explain unaided.
  {
    level: "Strong",
    items: ["JavaScript", "Python", "React", "Node.js", "Express", "SQL", "Git"],
  },
  // Tools his projects are built with, not claimed as personal expertise. Keep in sync with
  // the project stacks in data/projects.ts.
  {
    level: "Used in my projects",
    items: [
      "TypeScript",
      "Next.js",
      "PostgreSQL",
      "Supabase",
      "React Native",
      "Expo",
      "Fastify",
      "SQLite",
      "Drizzle",
      "Zod",
      "Tailwind CSS",
      "Vitest",
      "Playwright",
      "GitHub Actions",
      "Vercel",
      "Docker",
      "Azure Container Apps",
    ],
  },
];

export interface Role {
  title: string;
  org: string;
  dates: string;
  points: string[];
}

export const leadership: Role[] = [
  {
    title: "Head of Public Relations & Media",
    org: "Team United",
    dates: "Dec 2025 – present",
    points: [
      "Lead communication and issue resolution for community and advocacy campaigns.",
      "Coordinate international volunteer teams across cultures and time zones.",
      "Co-lectured the Microsoft Excel class in a Microsoft Essentials course (2 sessions, 30 participants).",
    ],
  },
  {
    title: "Maybank #Mbassador 2026",
    org: "Maybank",
    dates: "Apr 2026 – present",
    points: ["Selected to represent Maybank's brand initiatives on campus and drive student engagement."],
  },
];

export const education = {
  degree: "Bachelor of Computer Science (Data Science)",
  school: "Universiti Antarabangsa Albukhary (AIU), Malaysia",
  dates: "2024 – 2027 (expected)",
  points: ["CGPA 3.83 / 4.00"],
};

export interface Certification {
  name: string;
  issuer?: string;
  // TODO: credential URL for each certification.
  url?: string;
}

// TODO: Elias will send the full certification list with issuers, dates and credential links.
export const certifications: Certification[] = [
  { name: "React", issuer: "IBM on Coursera" },
  { name: "Node.js", issuer: "IBM on Coursera" },
  { name: "Learn Accessible Web Design" },
  { name: "AI For MY Future" },
  { name: "Teaching English as a Second Language" },
];
