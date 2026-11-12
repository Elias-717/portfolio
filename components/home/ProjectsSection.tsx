import { projects, statusLabel } from "@/data/projects";
import { ProjectTape, type TapeItem } from "./ProjectTape";

/** Home-page projects: the scroll-driven spiral tape, one project at a time. */
export function ProjectsSection() {
  const items: TapeItem[] = projects.map((p) => {
    const external = !p.caseStudy;
    return {
      slug: p.slug,
      title: p.title,
      year: p.year,
      role: p.role,
      status: statusLabel[p.status],
      highlight: p.highlight,
      cover: p.cover,
      href: external ? (p.links.live ?? p.links.code ?? "/projects") : `/projects/${p.slug}`,
      external,
      cta: external ? "Visit the site" : "View case study",
    };
  });

  return <ProjectTape items={items} />;
}
