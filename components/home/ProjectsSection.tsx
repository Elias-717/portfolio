import Link from "next/link";
import { ProjectCover } from "@/components/ProjectCover";
import { Reveal } from "@/components/Reveal";
import { Tag } from "@/components/Tag";
import { featuredProjects, projects, statusLabel } from "@/data/projects";
import { Section } from "./Section";

export function ProjectsSection() {
  const others = projects.filter((p) => !p.featured);

  return (
    <Section id="projects" label="Projects" title="Things I've built.">
      <ul className="space-y-6">
        {featuredProjects.map((p) => (
          <li key={p.slug}>
            <Reveal>
              <Link
                href={`/projects/${p.slug}`}
                className="group grid items-center gap-8 rounded-3xl border border-line bg-surface p-5 transition hover:border-accent/40 sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12"
              >
                <div className="lg:order-2">
                  <p className="font-mono text-xs text-muted">
                    {p.year} · {p.role}
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] transition group-hover:text-accent sm:text-5xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-lg text-muted">{p.oneLine}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.awardShort ? <Tag accent>{p.awardShort}</Tag> : null}
                    {p.status !== "live" ? <Tag accent>{statusLabel[p.status]}</Tag> : null}
                    {p.stack.slice(0, 3).map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                  <p className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent">
                    {p.demo.url || p.links.guest ? "Read the case study & try it live" : "Read the case study"}
                    <span aria-hidden className="transition group-hover:translate-x-1">
                      →
                    </span>
                  </p>
                </div>
                <div className="lg:order-1">
                  <ProjectCover project={p} />
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      {others.length > 0 ? (
        <ul className="mt-6 grid gap-6">
          {others.map((p) => {
            const href = p.links.live ?? p.links.code ?? "#";
            return (
              <li key={p.slug}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between gap-6 rounded-3xl border border-line p-6 transition hover:border-accent/40 sm:flex-row sm:items-end sm:p-8"
                >
                  <div>
                    <p className="font-mono text-xs text-muted">{statusLabel[p.status]}</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] transition group-hover:text-accent">
                      {p.title}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </h3>
                    <p className="mt-2 text-muted">{p.oneLine}</p>
                  </div>
                  <p className="text-sm text-accent">
                    {p.links.live ? "Visit the site" : "View code"} <span aria-hidden>↗</span>
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div className="mt-10 flex justify-end">
        <Link href="/projects" className="text-sm text-muted underline underline-offset-4 hover:text-accent">
          All projects →
        </Link>
      </div>
    </Section>
  );
}
