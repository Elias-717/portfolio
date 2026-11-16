import Link from "next/link";
import type { Project } from "@/data/projects";
import { statusLabel } from "@/data/projects";
import { Tag } from "./Tag";

/** Editorial list of projects: year, title + outcome, tags. Case studies link inward; others link out. */
export function ProjectList({ projects, headingLevel = "h3" }: { projects: Project[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="border-t border-line">
      {projects.map((p) => {
        const href = p.caseStudy ? `/projects/${p.slug}` : (p.links.live ?? p.links.code ?? "#");
        const external = !p.caseStudy;
        return (
          <li key={p.slug} className="border-b border-line">
              <Link
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group grid gap-3 py-8 sm:grid-cols-[6rem_1fr_auto] sm:items-start sm:gap-8 sm:py-10"
              >
                <span className="font-mono text-sm text-muted">{p.year}</span>
                <div>
                  <Heading className="text-2xl font-semibold tracking-tight transition group-hover:text-accent sm:text-4xl">
                    {p.title}
                    {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                  </Heading>
                  <p className="mt-2 max-w-2xl text-muted">{p.oneLine}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.status !== "live" ? <Tag accent>{statusLabel[p.status]}</Tag> : null}
                    {p.awardShort ? <Tag accent>{p.awardShort}</Tag> : null}
                    {p.stack.slice(0, 4).map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
                <span
                  aria-hidden
                  className="hidden text-3xl text-muted transition group-hover:translate-x-1 group-hover:text-accent sm:block"
                >
                  {external ? "↗" : "→"}
                </span>
              </Link>
          </li>
        );
      })}
    </ul>
  );
}
