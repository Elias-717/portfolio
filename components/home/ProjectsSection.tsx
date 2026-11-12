import { projects, statusLabel } from "@/data/projects";
import { ProjectCards } from "./ProjectCards";
import { ProjectTape, type TapeItem } from "./ProjectTape";

/**
 * Home-page projects. Large screens with motion allowed get the scroll-driven paper
 * ribbon; small screens and reduced-motion visitors get simple cards instead.
 */
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

  return (
    <section id="projects" aria-label="Selected work" className="bg-black">
      <ProjectTape items={items} className="hidden lg:block motion-reduce:lg:hidden" />
      <ProjectCards items={items} className="lg:hidden motion-reduce:lg:block" />
    </section>
  );
}
