import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";
import { ScrollRevealText, type TextSegment } from "@/components/ScrollRevealText";
import { site } from "@/data/site";

// Copy chosen by Elias ("Problem to product"). Facts from the brief and resume.
const statement: TextSegment[] = [
  { text: "I'm a full-stack developer who " },
  { text: "turns real campus problems into working products.", accent: true },
  { text: " I care about fair systems, honest data and software that keeps working offline." },
];

const detail =
  "From a volunteering platform that won 2nd place at MMC Upstart 2026 to an offline-first money app for students, I work across the whole stack: database, API and interface.";

/** Black full-screen intro that follows the hero: big statement, small detail, actions. */
export function IntroSection() {
  return (
    <section aria-labelledby="intro-label" className="bg-black">
      <div className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-4 py-24 sm:px-6">
        <p id="intro-label" className="font-mono text-sm text-accent">
          <span aria-hidden className="text-accent/60">
            {"// "}
          </span>
          Intro
        </p>

        <ScrollRevealText
          segments={statement}
          className="mt-14 indent-[18%] text-[clamp(2rem,5.2vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.045em] sm:mt-20"
        />

        <Reveal className="mt-14 flex flex-col gap-8 sm:ml-auto sm:mt-20 sm:max-w-md">
          <p className="text-lg leading-relaxed text-muted">{detail}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/#projects">See my work</ButtonLink>
            <ButtonLink href={site.resume} variant="ghost" download>
              Download resume
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
