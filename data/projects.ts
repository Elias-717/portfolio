// Project content. Every fact comes from the ABOUT_ME.md brief, the resume, or interview answers.
// Missing assets and links are marked TODO.

export type DemoType = "browser" | "phone" | "none";
export type Status = "live" | "in-development" | "concept";

export interface Screen {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  oneLine: string;
  year: string;
  role: string;
  status: Status;
  statusNote?: string;
  featured: boolean;
  caseStudy: boolean;
  award?: string;
  awardShort?: string;
  problem: string;
  solution: string;
  features: string[];
  decisions: { title: string; body: string }[];
  results?: { title: string; body: string[]; note?: string };
  credits?: string;
  stack: string[];
  links: { live?: string; code?: string; guest?: string };
  demo: {
    type: DemoType;
    url?: string;
    poster?: string;
    video?: string;
  };
  screens: Screen[];
}

export const statusLabel: Record<Status, string> = {
  live: "Live",
  "in-development": "In development",
  concept: "Concept · fictional brand",
};

export const projects: Project[] = [
  {
    slug: "voluntree",
    title: "Voluntree",
    oneLine: "A campus volunteering platform that fills event slots fairly.",
    year: "2026",
    role: "Team lead and developer · team of four",
    status: "live",
    featured: true,
    caseStudy: true,
    award: "2nd Place Prize, Catalyst: Igniting Future Innovation (MMC Upstart 2026)",
    awardShort: "2nd Place · MMC Upstart 2026",
    problem:
      "Volunteer slots at AIU go to whoever replies first in WhatsApp and Telegram groups. In a 20-student survey, 7 of 13 applicants had been turned away at least once, and 4 of 13 volunteers never received a certificate.",
    solution:
      "Voluntree replaces the race with a transparent process. It recommends students who have had fewer opportunities, lets the database enforce capacity, and closes the loop with verified attendance and a certificate. It was built for the MMC Upstart 2026 Catalyst (Focus Area 02, Smart Campus and Institutional Systems).",
    features: [
      "AI drafts a mission from a pasted event announcement; a person always edits and publishes it.",
      "A transparent score recommends students with fewer past opportunities and explains why (\"Why recommended\").",
      "Capacity is enforced by the database, so there is no race for slots.",
      "QR check-in and organizer-approved attendance, then a PDF certificate and growth of the student's private date palm.",
      "Admin view with a fairness chart, a dean-approval queue and logged revocations.",
    ],
    decisions: [
      {
        title: "Overbooking is impossible at the database level",
        body: "PostgreSQL row-level security and locking functions mean capacity is never exceeded, and a repeated approval changes nothing. The schema is built from 12 Supabase migrations and backed by 293 automated tests.",
      },
      {
        title: "AI drafts, people decide",
        body: "A Groq LLM step turns an announcement into a mission draft. Its output is validated with Zod, and a human must review it before anything is published.",
      },
    ],
    results: {
      title: "Results",
      body: [
        "Across a simulation of 100 students and 20 missions, Voluntree placed 88.9% of first-time volunteers, against 66.7% under first-come-first-served. It was fairer on 10 of 10 further random seeds.",
        "The trade-off: the most experienced 10% of students receive fewer new placements.",
        "Voluntree won the 2nd Place Prize in Catalyst: Igniting Future Innovation (MMC Upstart 2026).",
      ],
      note: "The evaluation uses synthetic data, not real students.",
    },
    credits:
      "Built by a team of four. The matching, certificate and evaluation modules were built by my co-developer.",
    stack: [
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Supabase (PostgreSQL, RLS)",
      "Groq LLM",
      "Zod",
      "pdf-lib",
      "Vitest",
      "Vercel",
    ],
    links: {
      live: "https://joinvoluntree.vercel.app",
      code: "https://github.com/Elias-717/voluntree",
      // TODO: one-click guest URL (e.g. https://joinvoluntree.vercel.app/demo?role=student). Once set, the embed opens it.
      guest: undefined,
    },
    demo: {
      type: "browser",
      url: "https://joinvoluntree.vercel.app",
      // TODO: add public/projects/voluntree/poster.png and set poster: "/projects/voluntree/poster.png".
      poster: undefined,
      // TODO: add public/projects/voluntree/demo.mp4 (core journey recording) and set video.
      video: undefined,
    },
    // TODO: screenshots — landing, student home with watering gauge, "Why recommended", AI draft, QR attendance, admin fairness chart.
    screens: [],
  },
  {
    slug: "insightly",
    title: "Insightly",
    oneLine: "Drop in a CSV and get the story, without the file ever leaving your browser.",
    year: "2026",
    role: "Solo developer",
    status: "live",
    featured: true,
    caseStudy: true,
    problem:
      "Getting a quick, honest read on a messy dataset usually means uploading it to a service or writing code first.",
    solution:
      "Insightly is a privacy-first data profiling tool. You drop in a CSV and it scores data quality, charts the distributions and writes plain-English insights, all inside the browser.",
    features: [
      "Detects the delimiter and column types, with manual override.",
      "Gives a 0 to 100 data quality score with a transparent breakdown.",
      "Per-column statistics, histograms, category bars, time series, scatter plots, a correlation heatmap and box plots.",
      "Writes 8 to 12 ranked plain-English insights (\"Whispers\"), each a pure function in its own file.",
      "Cleaning helpers with a before and after score, a virtualised table for 50,000+ rows, and PDF, HTML and Markdown export.",
    ],
    decisions: [
      {
        title: "Files never leave the browser",
        body: "Parsing and analysis run in a Web Worker so the interface stays responsive. A Content-Security-Policy restricts network connections, and the README shows how anyone can verify the privacy claim in the browser's Network tab.",
      },
      {
        title: "Tested like a product",
        body: "163 unit and component tests, plus 12 Playwright end-to-end and accessibility tests on desktop and a 375px mobile viewport. Strict TypeScript and GitHub Actions CI on every change.",
      },
    ],
    stack: ["Next.js 14 (static export)", "TypeScript", "Tailwind CSS", "Recharts", "Papaparse", "jsPDF", "Vitest", "Playwright"],
    links: {
      live: "https://tryinsightly.vercel.app",
      code: "https://github.com/Elias-717/insightly",
    },
    demo: {
      type: "browser",
      // Embedding needs frame-ancestors for eliasalsumairi.dev in Insightly's CSP (currently DENY); new-tab fallback works meanwhile.
      url: "https://tryinsightly.vercel.app",
      poster: undefined, // TODO: public/projects/insightly/poster.png
      video: undefined, // TODO: public/projects/insightly/demo.mp4 (drop a sample CSV, read the result)
    },
    // TODO: screenshots — upload, overview with quality score, column profile, charts + heatmap, Whispers, cleaning before/after, dark mode, mobile view.
    screens: [],
  },
  {
    slug: "brokely",
    title: "Brokely",
    oneLine: "A student-first expenditure planner for Android, with a broccoli mascot that grows from good money habits.",
    year: "2026 – present",
    role: "Solo developer and product owner",
    status: "in-development",
    statusNote: "Release 0.1 is in testing, with a first pilot planned at AIU.",
    featured: true,
    caseStudy: true,
    problem:
      "University students need to plan spending, cover essentials like meals and laundry first, and track money owed between friends, without bank logins or a shaming tone.",
    solution:
      "Brokely is an offline-first Android app for planning student spending. It works without a connection, syncs safely when one returns, and rewards good habits with a broccoli mascot that grows.",
    features: [
      "Home screen with the broccoli mascot.",
      "Quick-add keypad for logging a purchase.",
      "Insights with a spending doughnut chart.",
      "Bills tracking.",
      "Backup and sync status.",
    ],
    decisions: [
      {
        title: "Money as whole sen",
        body: "Money is stored as whole sen, never floating-point ringgit, with rounding only for display.",
      },
      {
        title: "Business rules traced to a specification",
        body: "Every business rule lives in a pure, unit-tested domain package, traced to requirement IDs in a written specification.",
      },
      {
        title: "Offline-first sync",
        body: "Every record is written with a phone-generated ID through an outbox, then synced to a Fastify and PostgreSQL API with idempotent pushes and conflict handling. I tested the sync between two simulated phones.",
      },
      {
        title: "Automated deployment",
        body: "The API deploys automatically to Azure Container Apps from GitHub Actions. The repository is a pnpm monorepo with separate app, API, domain, contracts and local-database packages.",
      },
    ],
    credits: "Mascot artwork is AI-generated.",
    stack: [
      "React Native",
      "Expo",
      "SQLite",
      "Drizzle",
      "Fastify",
      "PostgreSQL (Supabase)",
      "Zod",
      "Vitest",
      "GitHub Actions",
      "Azure Container Apps",
    ],
    links: {
      code: "https://github.com/Elias-717/brokely",
    },
    demo: {
      type: "phone",
      // TODO: Expo web build URL, if `npx expo export -p web` works. Otherwise leave undefined (screenshots + video only).
      url: undefined,
      poster: undefined, // TODO: public/projects/brokely/poster.png (phone screenshot, synthetic data)
      video: undefined, // TODO: public/projects/brokely/demo.mp4 (log a purchase offline, then sync)
    },
    // TODO: screenshots (synthetic data) — Home with mascot, quick add, Insights, Bills, sync status; mascot stages; architecture diagram.
    screens: [],
  },
  {
    slug: "sanaa-house",
    title: "Sana'a House",
    oneLine:
      "A bilingual Arabic and English showcase site for a fictional Yemeni artisan atelier, built to demonstrate right-to-left design.",
    year: "2026", // TODO: confirm year.
    role: "Solo designer and developer",
    status: "concept",
    featured: false,
    caseStudy: false,
    problem: "",
    solution: "",
    features: [
      "True right-to-left mirroring with CSS logical properties.",
      "Locale-aware pricing with Arabic-Indic numerals.",
      "Scroll-driven parallax hero of the Sana'a skyline.",
    ],
    decisions: [],
    stack: ["React 19", "Vite", "Plain CSS", "OpenStreetMap", "Formspree", "Netlify"],
    links: {
      live: "https://sanaahouse.netlify.app",
      code: "https://github.com/Elias-717/sanaa_house",
    },
    demo: { type: "none" },
    screens: [],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const caseStudies = projects.filter((p) => p.caseStudy);
export const featuredProjects = projects.filter((p) => p.featured);
