import { Reveal } from "@/components/Reveal";
import { certifications, education, leadership } from "@/data/profile";
import { Section } from "./Section";

function Entry({ title, org, dates, points }: { title: string; org: string; dates: string; points: string[] }) {
  return (
    <li className="grid gap-2 border-b border-line py-8 sm:grid-cols-[12rem_1fr] sm:gap-8">
      <p className="font-mono text-sm text-muted">{dates}</p>
      <div>
        <h4 className="text-xl font-semibold">{title}</h4>
        <p className="text-accent">{org}</p>
        <ul className="mt-3 space-y-1.5 text-muted">
          {points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function ExperienceSection() {
  return (
    <Section id="experience" index="04" label="Experience" title="Leadership & education.">
      <div className="space-y-16">
        <Reveal>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Leadership</h3>
          <ul className="mt-2 border-t border-line">
            {leadership.map((r) => (
              <Entry key={r.title} {...r} />
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Education</h3>
          <ul className="mt-2 border-t border-line">
            <Entry title={education.degree} org={education.school} dates={education.dates} points={education.points} />
          </ul>
        </Reveal>

        <Reveal>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Certifications</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {certifications.map((c) => (
              <li key={`${c.issuer}-${c.name}`} className="rounded-xl border border-line bg-surface p-4">
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-accent">
                    {c.name} ↗
                  </a>
                ) : (
                  <p className="font-medium">{c.name}</p>
                )}
                {c.issuer ? <p className="text-sm text-muted">{c.issuer}</p> : null}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
