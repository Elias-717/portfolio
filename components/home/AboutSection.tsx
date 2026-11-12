import Image from "next/image";
import { Placeholder } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { bio, languages, site } from "@/data/site";
import { Section } from "./Section";

export function AboutSection() {
  return (
    <Section id="about" label="About" title="From first idea to working product.">
      <div className="grid gap-12 md:grid-cols-[minmax(0,18rem)_1fr]">
        <Reveal>
          {site.headshot ? (
            <Image
              src={site.headshot}
              alt={`Portrait of ${site.name}`}
              width={576}
              height={720}
              sizes="(min-width: 768px) 18rem, 100vw"
              className="aspect-[4/5] w-full rounded-2xl border border-line object-cover"
            />
          ) : (
            <Placeholder label="headshot (public/headshot.jpg)" className="aspect-[4/5]" />
          )}
        </Reveal>
        <Reveal delay={0.05}>
          <div className="space-y-5 text-lg leading-relaxed text-fg/90">
            {bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {languages.map((l) => (
              <div key={l.name}>
                <dt className="font-medium">{l.name}</dt>
                <dd className="text-sm text-muted">{l.level}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
