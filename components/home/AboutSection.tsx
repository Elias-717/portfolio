import Image from "next/image";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { bio, languages, proofStats, site } from "@/data/site";
import { Section } from "./Section";

export function AboutSection() {
  return (
    <Section id="about" label="About" title="From first idea to working product.">
      {/* Proof strip: the facts a recruiter should see in five seconds. */}
      <Reveal>
        {/* 1px gaps over a line-coloured background draw the dividers at any column count. */}
        <dl className="mb-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {proofStats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end gap-3 bg-bg p-5 sm:p-7">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="text-5xl font-semibold leading-none tracking-[-0.04em] text-accent sm:text-6xl">
                <CountUp value={s.value} decimals={s.decimals} />
                {s.suffix ? <span className="text-3xl sm:text-4xl">{s.suffix}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
      <div className="grid items-center gap-12 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16">
        {/* Portrait, with the emblem's slow halo behind it. */}
        <Reveal className="relative mx-auto w-[min(70vw,20rem)] md:w-full">
          <div aria-hidden className="halo absolute -inset-8 rounded-full" />
          <Image
            src="/about.webp"
            alt={`Portrait of ${site.name} in a suit and tie, smiling.`}
            width={895}
            height={900}
            sizes="(min-width: 768px) 320px, 70vw"
            className="relative w-full rounded-3xl ring-1 ring-accent/20"
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
