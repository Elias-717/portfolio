export type DemoType = "browser" | "phone";

export interface Project {
  slug: string;
  title: string;
  year: number | null;
  tags: string[];
  role: string;
  description: string;
  demoUrl: string;
  demoType: DemoType;
  poster: string;
  video?: string;
}

// TODO: placeholders only. Claude Code fills these in after the Q&A interview.
export const projects: Project[] = [
  {
    slug: "mobile-app",
    title: "TODO: Mobile app name",
    year: null,
    tags: ["Mobile App"],
    role: "TODO",
    description: "TODO",
    demoUrl: "",
    demoType: "phone",
    poster: "/posters/mobile-app.png",
  },
  {
    slug: "web-app",
    title: "TODO: Web app name",
    year: null,
    tags: ["Web App"],
    role: "TODO",
    description: "TODO",
    demoUrl: "",
    demoType: "browser",
    poster: "/posters/web-app.png",
  },
  {
    slug: "website",
    title: "TODO: Website name",
    year: null,
    tags: ["Website"],
    role: "TODO",
    description: "TODO",
    demoUrl: "",
    demoType: "browser",
    poster: "/posters/website.png",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
