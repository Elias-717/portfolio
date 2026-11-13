// Site-wide facts. Sources: ABOUT_ME.md brief, resume, and interview answers.

export const site = {
  name: "Elias Al-Sumairi",
  initials: "EA",
  title: "Full-stack developer",
  pitch:
    "I build practical, well-structured software and like taking an idea from first concept to a working product.",
  availability: "Available for internship: March to August 2027",
  location: "Alor Setar, Kedah, Malaysia",
  url: "https://eliasalsumairi.dev",
  email: "eliassumairi@gmail.com",
  resume: "/Elias-Al-Sumairi-Resume.pdf",
  // Set NEXT_PUBLIC_FORMSPREE_ID in .env.local / Vercel. The form is hidden until it is set.
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "",
} as const;

export interface Social {
  label: string;
  href: string;
}

// Shown in the contact section and footer, in this order. Entries with an empty href are hidden.
const allSocials: Social[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/elias-al-sumairi-1b55b5324" },
  { label: "GitHub", href: "https://github.com/Elias-717" },
  { label: "Instagram", href: "https://instagram.com/elias__717" },
  { label: "Facebook", href: "https://facebook.com/Elias-Al-Sumairi" },
  { label: "TikTok", href: "https://tiktok.com/@elias__717" },
  { label: "X (Twitter)", href: "" }, // TODO: X / Twitter profile URL
];

export const socials = allSocials.filter((s) => s.href);

export const bio: string[] = [
  "I'm a Computer Science (Data Science) student at Universiti Antarabangsa Albukhary (AIU) in Malaysia, graduating in 2027. I like taking an idea from first concept to a working product, and learning the engineering decisions along the way.",
  "My focus is full-stack development, with a growing interest in backend systems, data, AI and automation. I led a four-person team to a 2nd Place Prize at MMC Upstart 2026 with Voluntree, and I'm building Brokely, an offline-first Android app.",
  "Outside code I teach, speak in public, make music and do creative design.",
];

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Full professional" },
  { name: "Malay", level: "Elementary" },
];
