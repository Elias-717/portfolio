import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { DemoFrame } from "@/components/DemoFrame";
import { ProjectList } from "@/components/ProjectList";
import { Reveal } from "@/components/Reveal";
import { ScreenGallery } from "@/components/ScreenGallery";
import { Tag } from "@/components/Tag";
import type { Project } from "@/data/projects";
import { projects, statusLabel } from "@/data/projects";
import { Block } from "./Block";

export function CaseStudy({ project: p }: { project: Project }) {
  const more = projects.filter((x) => x.slug !== p.slug);

  return (
    <main>
      <header className="mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-6 sm:pt-20">
        <Link href="/#projects" className="text-sm text-muted hover:text-accent">
          ← Back to projects
        </Link>
        <Reveal>
          <h1 className="mt-8 text-5xl font-semibold tracking-tighter sm:text-7xl">{p.title}</h1>
          <p className="mt-4 max-w-2xl text-xl text-muted">{p.oneLine}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Tag accent>{statusLabel[p.status]}</Tag>
            {p.award ? <Tag accent>{p.award}</Tag> : null}
          </div>
        </Reveal>
        <dl className="mt-10 grid gap-6 border-y border-line py-6 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-muted">Year</dt>
            <dd className="mt-1">{p.year}</dd>
          </div>
          <div>
            <dt className="text-muted">Role</dt>
            <dd className="mt-1">{p.role}</dd>
          </div>
          <div>
            <dt className="text-muted">Links</dt>
            <dd className="mt-1 flex flex-wrap gap-x-4">
              {p.links.live ? (
                <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-accent">
                  Live site ↗
                </a>
              ) : null}
              {p.links.code ? (
                <a href={p.links.code} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-accent">
                  Code on GitHub ↗
                </a>
              ) : null}
            </dd>
          </div>
        </dl>
        {p.statusNote ? <p className="mt-4 text-sm text-muted">{p.statusNote}</p> : null}
      </header>

      <section aria-label={`${p.title} live demo`} className="mx-auto max-w-5xl px-4 pb-8 sm:px-6">
        <DemoFrame project={p} />
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Block title="The problem">
          <p>{p.problem}</p>
        </Block>

        <Block title="The solution">
          <p>{p.solution}</p>
          <ul className="mt-6 space-y-3">
            {p.features.map((f) => (
              <li key={f} className="flex gap-3">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Key screens" wide>
          <ScreenGallery project={p} />
        </Block>

        <Block title="Technical decisions">
          <div className="space-y-8">
            {p.decisions.map((d) => (
              <div key={d.title}>
                <h3 className="text-lg font-semibold text-fg">{d.title}</h3>
                <p className="mt-2">{d.body}</p>
              </div>
            ))}
          </div>
        </Block>

        {p.results ? (
          <Block title={p.results.title}>
            <div className="space-y-4">
              {p.results.body.map((r) => (
                <p key={r}>{r}</p>
              ))}
            </div>
            {p.results.note ? (
              <p className="mt-6 rounded-lg border border-line bg-surface px-4 py-3 text-sm text-muted">
                Note: {p.results.note}
              </p>
            ) : null}
          </Block>
        ) : null}

        <Block title="Stack & credits">
          <ul className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s}>
                <Tag>{s}</Tag>
              </li>
            ))}
          </ul>
          {p.credits ? <p className="mt-6 text-sm text-muted">{p.credits}</p> : null}
          <div className="mt-8 flex flex-wrap gap-3">
            {p.links.live ? (
              <ButtonLink href={p.links.live} external>
                Visit live site ↗
              </ButtonLink>
            ) : null}
            {p.links.code ? (
              <ButtonLink href={p.links.code} variant="ghost" external>
                View code ↗
              </ButtonLink>
            ) : null}
          </div>
        </Block>

        <section aria-labelledby="more-title" className="border-t border-line py-20">
          <h2 id="more-title" className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            More projects
          </h2>
          <ProjectList projects={more} />
        </section>
      </div>
    </main>
  );
}
