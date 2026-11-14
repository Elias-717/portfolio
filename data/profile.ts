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
  /** Organisation logo shown beside the title (decorative; the org is named in text). */
  logo?: { src: string; width: number; height: number; /** Sit on a light backing (dark logos). */ light?: boolean };
}

/**
 * Leadership and education as one timeline, oldest first. Photos are Elias's own evidence
 * (originals kept outside the repo in ../evidence-originals). Only events he took part in.
 */
/** MMC Upstart 2026 evidence, shared by the timeline and the Voluntree case study. */
export const mmcPhotos: Photo[] = [
  {
    src: "/experience/mmc-team.webp",
    width: 1600,
    height: 1200,
    alt: "The Voluntree team holding the Catalyst: Igniting Future Innovation 2nd Place prize board with an official at Albukhary International University.",
    caption: "The Voluntree team with the 2nd Place prize",
  },
  {
    src: "/experience/mmc-stage.webp",
    width: 1600,
    height: 1321,
    alt: "The Voluntree team on stage with the 2nd Place board and two officials, under the Albukhary International University sign.",
    caption: "On stage at the MMC Upstart 2026 awards",
  },
  {
    src: "/experience/mmc-presenting.webp",
    width: 1600,
    height: 1066,
    alt: "Elias speaking into a microphone on stage in front of Albukhary International University banners.",
    caption: "Presenting on stage at MMC Upstart 2026",
  },
];

// AIU's navy lettering needs a light backing to read on the dark page.
const AIU_LOGO = { src: "/logos/aiu.webp", width: 240, height: 220, light: true };

export const journey: Milestone[] = [
  {
    kind: "Education",
    title: "Bachelor of Computer Science (Data Science)",
    org: "Universiti Antarabangsa Albukhary (AIU), Malaysia",
    logo: AIU_LOGO,
    dates: "2024",
    points: ["Started the degree. CGPA 3.83 / 4.00 so far."],
  },
  {
    kind: "Award",
    title: "Dean's List Award, every semester",
    org: "School of Computing and Informatics, AIU",
    logo: AIU_LOGO,
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
    logo: { src: "/logos/team-united.webp", width: 240, height: 224 },
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
    ],
  },
  {
    kind: "Leadership",
    title: "Maybank #Mbassador 2026",
    org: "Maybank",
    dates: "Apr 2026 – present",
    logo: { src: "/logos/maybank.webp", width: 480, height: 164 },
    points: ["Selected to represent Maybank's brand initiatives on campus and drive student engagement."],
  },
  {
    kind: "Award",
    title: "2nd Place, MMC Upstart 2026",
    org: "Catalyst: Igniting Future Innovation · Albukhary International University",
    dates: "Oct 2026",
    points: [
      "Led a team of four to 2nd place with Voluntree, a platform that fills campus volunteer slots fairly.",
    ],
    photos: mmcPhotos,
  },
  {
    kind: "Education",
    title: "Graduation",
    org: "Bachelor of Computer Science, AIU",
    logo: AIU_LOGO,
    dates: "2027 (expected)",
    points: ["Available for an internship from March to August 2027."],
    upcoming: true,
  },
];

export interface Certification {
  name: string;
  issuer?: string;
  date?: string;
  /** Public verification page. */
  url?: string;
  /** Issuer logo in public/logos (single-colour SVG, tinted by the page). */
  logo?: "ibm" | "udacity" | "microsoft" | "scrimba" | "udemy";
}

// Titles, issuers and dates read from each verification page (Nov 2026).
export const certifications: Certification[] = [
  {
    name: "Developing Back-End Apps with Node.js and Express",
    issuer: "IBM · Coursera",
    date: "Oct 2026",
    url: "https://www.coursera.org/account/accomplishments/verify/66PTUE0WYS03",
    logo: "ibm",
  },
  {
    name: "Developing Front-End Apps with React",
    issuer: "IBM · Coursera",
    date: "Oct 2026",
    url: "https://www.coursera.org/account/accomplishments/verify/RSBQJW47VXXE",
    logo: "ibm",
  },
  {
    name: "Introduction to Software Engineering",
    issuer: "IBM · Coursera",
    date: "Sep 2026",
    url: "https://www.coursera.org/account/accomplishments/verify/2UNOY1TYXC4W",
    logo: "ibm",
  },
  {
    name: "AWS AI Practitioner Challenge",
    issuer: "Udacity",
    date: "Jun 2026",
    url: "https://www.udacity.com/certificate/e/a8870c16-3cba-11f1-a11d-47caa5554bc2",
    logo: "udacity",
  },
  {
    name: "AI For MY Future",
    issuer: "Microsoft · PepperLab",
    date: "Apr 2025",
    // TODO: this host did not resolve when checked (Nov 2026); Elias to confirm the link works.
    url: "https://pepper-s-site-1c7b.thinkific.com/certificates/e7mmiqb7uz",
    logo: "microsoft",
  },
  {
    name: "HTML and CSS for Web Designers: From Basics to Beautiful",
    issuer: "Udemy",
    url: "https://www.udemy.com/certificate/UC-cead3f14-e653-414a-ac67-cb5fabc1a4be/",
    logo: "udemy",
  },
  { name: "Learn Accessible Web Design", issuer: "Scrimba", logo: "scrimba" },
  { name: "Teaching English as a Second Language" },
];
