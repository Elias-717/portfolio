// Project content. Every fact comes from the ABOUT_ME.md brief, the resume, or interview answers.
// Missing assets and links are marked TODO.

import { mmcPhotos, type Photo } from "./profile";

export type DemoType = "browser" | "phone" | "none";
export type Status = "live" | "in-development" | "concept";

export interface Screen {
  src: string;
  alt: string;
  caption?: string;
  /** Phone-sized capture, shown in a portrait frame. */
  mobile?: boolean;
  /** Tall 4:5 desktop capture, shown uncropped in its own grid. */
  portrait?: boolean;
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
  /** One short, factual proof point shown on cards and in the hero. */
  highlight: string;
  /** Wide image used on the home-page project tape. */
  cover: string;
  problem: string;
  solution: string;
  features: string[];
  decisions: { title: string; body: string }[];
  results?: { title: string; body: string[]; note?: string };
  /** A use case told as steps, each beside its phone screen ("How a student uses it"). */
  story?: {
    title: string;
    intro?: string;
    /** Optional character who walks the visitor through the steps (e.g. Brokely's mascot). */
    guide?: { src: string; alt: string; name: string };
    steps: { when?: string; title: string; body: string; screen?: Screen }[];
  };
  /** Award evidence photos, shown in a Recognition section on the case study. */
  recognition?: Photo[];
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
    cover: "/projects/voluntree/cover.webp",
    highlight: "2nd Place · MMC Upstart 2026",
    title: "Voluntree",
    oneLine: "A campus volunteering platform that fills event slots fairly.",
    year: "2026",
    role: "Team lead and developer · team of four",
    status: "live",
    featured: true,
    caseStudy: true,
    award: "2nd Place Prize, Catalyst: Igniting Future Innovation (MMC Upstart 2026)",
    awardShort: "2nd Place · MMC Upstart 2026",
    recognition: mmcPhotos,
    problem:
      "Volunteer slots at AIU go to whoever replies first in WhatsApp and Telegram groups. In a 20-student survey, 7 of 13 applicants had been turned away at least once, and 4 of 13 volunteers never received a certificate.",
    solution:
      "Voluntree replaces the race with a transparent process. It recommends students who have had fewer opportunities, lets the database enforce capacity, and closes the loop with verified attendance and a certificate. It was built for the MMC Upstart 2026 Catalyst (Focus Area 02, Smart Campus and Institutional Systems).",
    features: [
      "AI drafts a mission from a pasted event announcement; a person always edits and publishes it.",
      'A transparent score recommends students with fewer past opportunities and explains why ("Why recommended").',
      "Capacity is enforced by the database, so there is no race for slots.",
      "QR check-in and organizer-approved attendance, then a PDF certificate and growth of the student's private date palm.",
      "Admin view with a fairness chart, a dean-approval queue and logged revocations.",
    ],
    decisions: [
      {
        title: "Overbooking is impossible at the database level",
        body: "PostgreSQL row-level security and locking functions mean capacity is never exceeded, and a repeated approval changes nothing. The schema is built from 12 Supabase migrations.",
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
    credits: "Built by a team of four. The matching, certificate and evaluation modules were built by my co-developer.",
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
      // Homepage capture; replace with a curated screenshot if you like.
      poster: "/projects/voluntree/cover.webp",
      // TODO: add public/projects/voluntree/demo.mp4 (core journey recording) and set video.
      video: undefined,
    },
    // Captured from the live site. TODO (optional): add in-app screens (student home, QR attendance, admin fairness chart).
    screens: [
      {
        src: "/projects/voluntree/screen-landing.webp",
        alt: "Voluntree landing page",
        caption: "Landing page: fair volunteering at AIU.",
      },
      {
        src: "/projects/voluntree/screen-tree.webp",
        alt: "Voluntree tree seen from above",
        caption: "Each leaf on the tree is a mission a student showed up for.",
      },
      {
        src: "/projects/voluntree/screen-ai-draft.webp",
        alt: "An event announcement next to the mission AI drafted from it",
        caption: "AI drafts the mission from an announcement; the organizer checks every field before publishing.",
      },
      {
        src: "/projects/voluntree/screen-matching.webp",
        alt: "Three students with recommendation bars and reasons",
        caption: "Fair matching, with reasons: every recommendation says why.",
      },
      {
        src: "/projects/voluntree/screen-mobile.webp",
        alt: "Voluntree landing page on a phone",
        caption: "Mobile.",
        mobile: true,
      },
    ],
  },
  {
    slug: "insightly",
    cover: "/projects/insightly/cover.webp",
    highlight: "Your files never leave the browser",
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
      'Writes 8 to 12 ranked plain-English insights ("Whispers"), each a pure function in its own file.',
      "Cleaning helpers with a before and after score, a virtualised table for 50,000+ rows, and PDF, HTML and Markdown export.",
    ],
    decisions: [
      {
        title: "Files never leave the browser",
        body: "Parsing and analysis run in a Web Worker so the interface stays responsive. A Content-Security-Policy restricts network connections, and the README shows how anyone can verify the privacy claim in the browser's Network tab.",
      },
      {
        title: "Tested like a product",
        body: "226 unit and component tests, plus 8 Playwright end-to-end and accessibility tests, each run on desktop and a 375px mobile viewport. Strict TypeScript and GitHub Actions CI on every change.",
      },
    ],
    stack: [
      "Next.js 14 (static export)",
      "TypeScript",
      "Tailwind CSS",
      "Recharts",
      "Papaparse",
      "jsPDF",
      "Vitest",
      "Playwright",
    ],
    links: {
      live: "https://tryinsightly.vercel.app",
      code: "https://github.com/Elias-717/insightly",
    },
    demo: {
      type: "browser",
      // Embedding needs frame-ancestors for eliasalsumairi.dev in Insightly's CSP (currently DENY); new-tab fallback works meanwhile.
      url: "https://tryinsightly.vercel.app",
      poster: "/projects/insightly/cover.webp", // Homepage capture; TODO: curated screenshot optional
      video: undefined, // TODO: public/projects/insightly/demo.mp4 (drop a sample CSV, read the result)
    },
    // Captured from the live site.
    screens: [
      {
        src: "/projects/insightly/screen-report.webp",
        alt: "Insightly example report with a quality score of 92 and ranked findings",
        caption: "Example report: quality score, column profile and ranked findings.",
      },
      {
        src: "/projects/insightly/07-landing-dark.webp",
        alt: "Insightly landing page in dark mode with a CSV drop zone, three sample files and an example report table highlighting inconsistent values",
        caption: "Landing page in dark mode: drop a CSV or open a sample.",
        portrait: true,
      },
      {
        src: "/projects/insightly/01-overview.webp",
        alt: "Insightly overview tab for messy-customers.csv showing a quality score of 92, Grade A, 15% missing cells and the top findings",
        caption: "Overview: quality score with its breakdown and the top findings.",
        portrait: true,
      },
      {
        src: "/projects/insightly/02-whispers.webp",
        alt: "Insightly Whispers tab listing 12 plain-English insights ranked by importance, including missing values, outliers and inconsistent casing",
        caption: "Whispers: 12 plain-English insights, ranked by importance.",
        portrait: true,
      },
      {
        src: "/projects/insightly/03b-charts-time-series.webp",
        alt: "Insightly Charts tab for ecommerce-sales.csv with a monthly time-series line chart and a correlation heatmap",
        caption: "Charts: time series by month and a correlation heatmap.",
        portrait: true,
      },
      {
        src: "/projects/insightly/03-charts-heatmap.webp",
        alt: "Insightly correlation heatmap across three numeric columns, a scatter plot of quantity against unit price and a histogram of quantity",
        caption: "Correlation heatmap, scatter plot and distribution histogram.",
        portrait: true,
      },
      {
        src: "/projects/insightly/04-clean.webp",
        alt: "Insightly Clean tab showing the quality score rising from 91.6 to 95.3 after one-click cleaning actions",
        caption: "Clean: one-click fixes with a before and after score (91.6 to 95.3).",
        portrait: true,
      },
      {
        src: "/projects/insightly/05-privacy-proof.webp",
        alt: "Privacy proof: a file opened, analysed and exported with 0 requests to other sites, 0 uploads and 0 requests containing file data",
        caption: "Privacy, measured: zero uploads or third-party requests, recorded with Playwright.",
        portrait: true,
      },
      {
        src: "/projects/insightly/06-offline.webp",
        alt: "Offline proof: with the network off, the page reloads from the local cache and the file is still parsed and analysed",
        caption: "Works offline: network off, page reloaded, file analysed anyway.",
        portrait: true,
      },
      {
        src: "/projects/insightly/screen-mobile.webp",
        alt: "Insightly upload screen on a phone",
        caption: "Mobile: drop a CSV or open a sample.",
        mobile: true,
      },
    ],
  },
  {
    slug: "brokely",
    cover: "/projects/brokely/cover.webp",
    highlight: "Student spending planner, essentials first",
    title: "Brokely",
    oneLine:
      "A student-first spending planner for Android, with a broccoli mascot that grows from good money habits.",
    year: "2026 – present",
    role: "Solo developer and product owner",
    status: "in-development",
    statusNote:
      "Release 0.1 is in testing on a Samsung Galaxy A26, with a pilot of 5 to 10 AIU students planned next. Screens below use made-up demo data.",
    featured: true,
    caseStudy: true,
    problem:
      "Students at AIU live on meal money from family, small part-time pay and Touch 'n Go transfers between friends. Budgeting apps ask for bank logins, track a balance the student never sees, and shame overspending. What students need is simpler: cover meals, laundry and the phone bill first, know what they can spend today, and remember who owes whom.",
    solution:
      "Brokely plans spending instead of tracking a bank balance. A short chat sets up the month, essentials come first, and every day Home shows one honest number: what you can spend today. It works fully offline, backs up when a connection returns, and never asks for a bank login, PIN or OTP.",
    features: [
      "Quick start as a chat with Brokely: one number and two dates, then essentials one card at a time.",
      '"To spend today" on Home, worked out from what is left after bills and set-asides.',
      "Logging in a few taps: a keypad with a built-in calculator, categories ordered by use, and Undo instead of confirm dialogs.",
      "Money in that does something: it goes to the plan, to today, to savings or to paying a friend back.",
      "Bills with Mark paid, so a bill is never counted twice.",
      "Debts with friends: split a bill, lend, borrow and pay back, with an optional pay-back date.",
      "Insights with an honest forecast, shown as a range and only once there is enough data.",
      "A broccoli mascot with 3 growth stages and 4 moods that grows from days logged, never from spending less.",
    ],
    story: {
      title: "How a student uses it",
      intro:
        "Sara is a made-up first-year student at AIU with RM600 for November. This is her month in Brokely.",
      guide: {
        src: "/projects/brokely/mascot.webp",
        alt: "Brokely, the app's broccoli mascot, pointing and smiling",
        name: "Brokely",
      },
      steps: [
        {
          when: "Getting started · about a minute",
          title: "A plan from one chat",
          body: "Brokely knows the date and offers to plan just the rest of November, but she chooses to plan the whole month and types RM600. Next it asks whether she owes anyone from before, so any payback comes off the budget first. Then it suggests essentials one card at a time: meals, laundry, phone.",
          screen: {
            src: "/projects/brokely/screen-quick-start.webp",
            alt: "Quick start chat where Brokely asks how much money Sara has for the month",
          },
        },
        {
          when: "Every morning",
          title: "One number for today",
          body: "Home shows what she can spend today and what each day after today gets. Bills still to come and savings are already taken out, so the number is honest. Her plan has grown to RM700 since she set it up, and the plan keeps every version.",
          screen: {
            src: "/projects/brokely/screen-home.webp",
            alt: "Brokely Home with the mascot, the amount to spend today and what is left in the plan",
          },
        },
        {
          when: "Lunch",
          title: "Logged before the food arrives",
          body: 'The + button opens a keypad. Type 7.50, pick Meals, done. Undo stays on screen for five seconds instead of an "Are you sure?" dialog, and it all works with no signal.',
          screen: {
            src: "/projects/brokely/screen-quick-add.webp",
            alt: "Quick add sheet with RM7.50 typed on the keypad and Meals chosen as the category",
          },
        },
        {
          when: "Day 16",
          title: "Money in goes somewhere",
          body: "Her family sends RM100. Brokely asks where it goes: the plan, today, savings or paying someone back, and shows the new budget (RM700 to RM800) before she saves.",
          screen: {
            src: "/projects/brokely/screen-money-in.webp",
            alt: "Money in sheet with a Goes to row set to this month's plan",
          },
        },
        {
          when: "Laundry day",
          title: "Paid once, never counted twice",
          body: "The weekly wash waits under Still to come. Mark paid turns it into one record, with an amount she can change.",
          screen: {
            src: "/projects/brokely/screen-bills.webp",
            alt: "Bills screen with the laundry bill and a Mark paid button",
          },
        },
        {
          when: "Movie night",
          title: "Who owes whom",
          body: "She splits a RM50 movie night with Aina. Only her half counts as spending; Aina's half waits in Debts with a pay-back date.",
          screen: {
            src: "/projects/brokely/screen-debts.webp",
            alt: "Debts screen with money owed to Sara and money she owes",
          },
        },
        {
          when: "Mid-month",
          title: "Where it went, honestly",
          body: "Insights shows spending by category. The forecast appears only from day 14 and only when most days are logged, and it is a range, not a promise.",
          screen: {
            src: "/projects/brokely/screen-insights.webp",
            alt: "Insights with a spending doughnut chart by category",
          },
        },
      ],
    },
    decisions: [
      {
        title: "Money is whole sen, never floating-point ringgit",
        body: "Every amount is an integer number of sen, and rounding happens only for display, so sums are always exact.",
      },
      {
        title: "Business rules traced to a specification",
        body: "I wrote a product requirements document and a software requirements specification (now v1.9) with numbered rules and acceptance tests. Every rule lives in a pure, unit-tested domain package and names its requirement ID, and 139 product decisions are logged with their reasons.",
      },
      {
        title: "Offline-first sync",
        body: "Every record gets a phone-generated UUIDv7 and is written with an outbox entry in one SQLite transaction. A Fastify and PostgreSQL API accepts idempotent pushes with versioned writes, delete markers and a conflict screen. The sync acceptance tests passed between two real phones.",
      },
      {
        title: "Measured, then made faster",
        body: "A test counts database queries per synced change. One transaction per push with grouped lookups cut it from 7.7 to 2.1 queries per change, taking a first backup from about 34 seconds to about 9.",
      },
      {
        title: "Automated deployment",
        body: "Every push to main runs format, lint, typecheck and tests, builds a Docker image and deploys it to Azure Container Apps through OpenID Connect, with no stored cloud password. The repository is a pnpm monorepo with app, API, domain, contracts and local-database packages.",
      },
    ],
    results: {
      title: "Where it stands",
      body: [
        "All of release 0.1 works on one phone, offline and without an account. The 0.1 screen checks passed on the reference phone, and the sync acceptance tests passed between two real phones.",
        "About 530 automated tests cover the domain rules, the phone database, the sync contracts and the API.",
        "In progress: reading Touch 'n Go transfer notifications on the phone. Nothing counts until the student confirms it.",
      ],
      note: "No student pilot has run yet, so these are engineering checks, not user results.",
    },
    credits: "Mascot artwork is AI-generated. Screens use made-up demo data.",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "SQLite (expo-sqlite)",
      "Drizzle",
      "Fastify",
      "PostgreSQL (Supabase)",
      "Zod",
      "Vitest",
      "Docker",
      "GitHub Actions",
      "Azure Container Apps",
    ],
    links: {
      code: "https://github.com/Elias-717/brokely",
    },
    demo: {
      type: "phone",
      url: undefined,
      poster: "/projects/brokely/poster.webp",
      video: undefined, // TODO: public/projects/brokely/demo.mp4 (log a purchase offline, then sync)
    },
    screens: [
      {
        src: "/projects/brokely/screen-records.webp",
        alt: "Records grouped by day with filters",
        caption: "Records by day, with edit history and refunds.",
        mobile: true,
      },
      {
        src: "/projects/brokely/screen-plan.webp",
        alt: "Your plan with amounts per category",
        caption: "The plan: essentials first, then the rest.",
        mobile: true,
      },
      {
        src: "/projects/brokely/screen-grow.webp",
        alt: "Brokely's growth path from sprout to full broccoli",
        caption: "Brokely grows from days logged, never from spending less.",
        mobile: true,
      },
      {
        src: "/projects/brokely/screen-home-dark.webp",
        alt: "Brokely Home in dark mode",
        caption: "Dark mode follows the phone.",
        mobile: true,
      },
    ],
  },
  {
    slug: "sanaa-house",
    cover: "/projects/sanaa-house/cover.webp",
    highlight: "Arabic and English, true right-to-left",
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
    // Embeddable once the sanaa_house PR (frame-ancestors allow-list) is merged and deployed.
    demo: { type: "browser", url: "https://sanaahouse.netlify.app" },
    screens: [],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const caseStudies = projects.filter((p) => p.caseStudy);
export const featuredProjects = projects.filter((p) => p.featured);
