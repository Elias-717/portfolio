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

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface Milestone extends Role {
  kind: "Education" | "Award" | "Leadership";
  photos?: Photo[];
  /** Still ahead (e.g. graduation): drawn as an open node on the line. */
  upcoming?: boolean;
}

/**
 * Leadership and education as one timeline, oldest first. Photos are Elias's own evidence
 * (originals kept outside the repo in ../evidence-originals). Only events he took part in.
 */
export const journey: Milestone[] = [
  {
    kind: "Education",
    title: "Bachelor of Computer Science (Data Science)",
    org: "Universiti Antarabangsa Albukhary (AIU), Malaysia",
    dates: "2024",
    points: ["Started the degree. CGPA 3.83 / 4.00 so far."],
  },
  {
    kind: "Award",
    title: "Dean's List Award, every semester",
    org: "School of Computing and Informatics, AIU",
    // Confirmed by Elias: on the Dean's List every semester; the photos are from the ceremonies
    // where certificates were presented, not a count of awards.
    dates: "2024 – present",
    points: ["Named to the Dean's List for high academic achievement in every semester so far."],
    photos: [
      {
        src: "/experience/deans-list-1.webp",
        width: 1600,
        height: 1067,
        alt: "Elias on stage receiving a Dean's List Award certificate, between School of Computing and Informatics banners.",
        caption: "Dean's List Award ceremony",
      },
      {
        src: "/experience/deans-list-2.webp",
        width: 1463,
        height: 1075,
        alt: "Elias holding a Dean's List Award certificate for high academic achievement with a presenter.",
        caption: "Dean's List Award for high academic achievement",
      },
      {
        src: "/experience/deans-list-3.webp",
        width: 1521,
        height: 1034,
        alt: "Elias giving a thumbs-up while receiving his Dean's List Award certificate for the 2024/2025 academic session.",
        caption: "Dean's List, 2024/2025 academic session",
      },
    ],
  },
  {
    kind: "Leadership",
    title: "Head of Public Relations & Media",
    org: "Team United",
    dates: "Dec 2025 – present",
    points: [
      "Lead communication and issue resolution for community and advocacy campaigns.",
      "Coordinate international volunteer teams across cultures and time zones.",
      "Co-lectured the Microsoft Excel class in a Microsoft Essentials course (2 sessions, 30 participants).",
      "Our club won Best Active 3ZERO Club under the School of Computing and Informatics.",
    ],
    photos: [
      {
        src: "/experience/team-united-formal.webp",
        width: 1600,
        height: 1200,
        alt: "Team United members in formal wear standing in a line, arms crossed, in front of a white arched campus building.",
        caption: "The Team United committee",
      },
      {
        src: "/experience/best-3zero-club.webp",
        width: 1600,
        height: 1200,
        alt: "Team United members on stage at Albukhary International University holding Best 3ZERO Club Award certificates.",
        caption: "Team United wins Best Active 3ZERO Club (SCI)",
      },
      {
        src: "/experience/excel-class.webp",
        width: 1280,
        height: 960,
        alt: "The Microsoft Excel class in a computer lab: the session lead at the front with a laptop, students at their workstations.",
        caption: "Co-lecturing the Microsoft Excel class",
      },
      {
        src: "/experience/team-united-casual.webp",
        width: 1600,
        height: 1064,
        alt: "Team United members smiling in a group selfie on campus.",
        caption: "Team United, off the clock",
      },
    ],
  },
  {
    kind: "Leadership",
    title: "Maybank #Mbassador 2026",
    org: "Maybank",
    dates: "Apr 2026 – present",
    points: ["Selected to represent Maybank's brand initiatives on campus and drive student engagement."],
  },
  {
    kind: "Education",
    title: "Graduation",
    org: "Bachelor of Computer Science, AIU",
    dates: "2027 (expected)",
    points: ["Available for an internship from March to August 2027."],
    upcoming: true,
  },
];

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
