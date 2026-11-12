import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { bio, languages, site } from "@/data/site";
import { Section } from "./Section";

export function AboutSection() {
  return (
    <Section id="about" label="About" title="From first idea to working product.">
      <div className="grid items-center gap-12 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16">
        {/* The emblem, with its slow halo. */}
        <Reveal className="relative mx-auto w-[min(70vw,20rem)] md:w-full">
          <div aria-hidden className="halo absolute -inset-8 rounded-full" />
          <Image
            src="/logo.png"
            alt={`${site.name} emblem`}
            width={320}
            height={320}
            sizes="(min-width: 768px) 320px, 70vw"
            className="relative w-full rounded-full ring-1 ring-accent/20"
          />
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
