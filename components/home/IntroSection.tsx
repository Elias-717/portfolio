"use client";

import { useContext } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { CodeField } from "@/components/CodeField";
import { ScrollRevealText, type TextSegment } from "@/components/ScrollRevealText";
import { PinProgressContext } from "@/components/SliceOnScroll";
import { site } from "@/data/site";

// Copy chosen by Elias ("Problem to product"). Facts from the brief and resume.
const statement: TextSegment[] = [
  { text: "I'm a full-stack developer who " },
  { text: "turns real campus problems into working products.", accent: true },
  { text: " I care about fair systems, honest data and software that keeps working offline." },
];

const detail =
  "From a platform that shares campus volunteering fairly to an offline-first money app for students, I work across the whole stack: database, API and interface.";

/**
 * The intro: big statement, small detail, actions. Rendered inside the hero's pinned frame,
 * where it fades in as the hero slices away (see Hero / SliceOnScroll), so it is already
 * on screen when the pin ends, whatever the screen height.
 */
export function IntroSection({ labelId = "intro-label" }: { labelId?: string }) {
  // Inside the pinned hero this is its scroll progress, so the statement lights up word by word
  // while pinned. Outside it (reduced motion) the text tracks its own scroll position.
  const progress = useContext(PinProgressContext) ?? undefined;
  return (
    <section aria-labelledby={labelId} className="relative flex h-full items-center overflow-hidden bg-black">
      {/* Glowing </> over a grid floor, behind the text. */}
      <CodeField className="[mask-image:linear-gradient(to_bottom,black_75%,transparent)]" />
      <div data-reveal-content className="relative mx-auto flex w-full max-w-[1600px] flex-col px-4 pb-2 pt-20 sm:px-6 lg:px-10">
        <p id={labelId} className="font-mono text-sm text-accent">
          <span aria-hidden className="text-accent/60">
            {"// "}
          </span>
          Intro
        </p>

        <ScrollRevealText
          segments={statement}
          progress={progress}
          range={[0.55, 0.95]}
          className="mt-10 indent-[18%] text-[clamp(1.6rem,3.4vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.045em] sm:mt-14"
        />

        <div className="mt-10 flex flex-col gap-8 sm:ml-auto sm:mt-14 sm:max-w-md 2xl:max-w-xl 2xl:text-xl">
          <p className="text-lg leading-relaxed text-muted">{detail}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/#projects">See my work</ButtonLink>
            <ButtonLink href={site.resume} variant="ghost" download>
              Download resume
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
