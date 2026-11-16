"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

type StoryData = NonNullable<Project["story"]>;
type Step = StoryData["steps"][number];

const EASE = [0.2, 0.7, 0.2, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

/**
 * Desktop stage: one phone that stays in view while the steps scroll past beside it. The screen
 * slides to the step being read, and the guide (if any) hops and says when it happens.
 */
function Stage({
  story,
  active,
  onPick,
}: {
  story: StoryData;
  active: number;
  onPick: (i: number) => void;
}) {
  const step = story.steps[active];
  const guide = story.guide;

  return (
    <div className="relative flex flex-col items-center pl-24 xl:pl-32">
      {/* Soft glow behind the phone. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="relative">
        {/* The phone, in the app's chunky outlined style. */}
        <div className="relative aspect-[390/844] h-[min(68vh,620px)] overflow-hidden rounded-[2.4rem] border-[5px] border-[#1b1b17] bg-[#edf1e2] shadow-[12px_12px_0_0_rgb(110_226_106/0.28)]">
          {story.steps.map((s, i) =>
            s.screen ? (
              <motion.div
                key={s.screen.src}
                aria-hidden={i !== active}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: i === active ? 1 : 0,
                  y: i === active ? "0%" : i < active ? "-6%" : "6%",
                  scale: i === active ? 1 : 0.97,
                }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <Image
                  src={s.screen.src}
                  alt={i === active ? s.screen.alt : ""}
                  fill
                  sizes="300px"
                  className="object-cover object-top"
                />
              </motion.div>
            ) : null,
          )}
        </div>

        {guide ? (
          <div className="absolute -bottom-6 -left-28 w-40 xl:-left-36 xl:w-48">
            {/* Speech bubble: says when this step happens. */}
            <div className="absolute -top-16 right-4 w-max max-w-[14rem] xl:-top-14">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 8, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="relative rounded-2xl border-[3px] border-[#1b1b17] bg-[#fafbf4] px-4 py-2 text-sm font-semibold text-[#1b1b17] shadow-[5px_5px_0_0_#1b1b17]"
                >
                  {step.when ?? `Step ${active + 1}`}
                  <span
                    aria-hidden
                    className="absolute -bottom-[9px] right-10 h-4 w-4 rotate-45 border-b-[3px] border-r-[3px] border-[#1b1b17] bg-[#fafbf4]"
                  />
                </motion.p>
              </AnimatePresence>
            </div>
            {/* The guide hops each time the step changes. */}
            <motion.div
              key={active}
              initial={{ y: 0, rotate: 0 }}
              animate={{ y: [0, -18, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="origin-bottom"
            >
              <Image src={guide.src} alt={guide.alt} width={512} height={640} sizes="192px" className="h-auto w-full" />
            </motion.div>
          </div>
        ) : null}
      </div>

      {/* Step dots: jump to any step. */}
      <div className="mt-12 flex items-center gap-2" role="group" aria-label="Jump to a step">
        {story.steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => onPick(i)}
            aria-label={`Step ${i + 1}: ${s.title}`}
            aria-current={i === active ? "step" : undefined}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === active ? "w-8 bg-accent" : "w-2.5 bg-line hover:bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/** One step of the story. On desktop it reports when it reaches the middle of the screen. */
function StepItem({
  step,
  index,
  total,
  active,
  onEnter,
  itemRef,
}: {
  step: Step;
  index: number;
  total: number;
  active: boolean;
  onEnter: () => void;
  itemRef: (el: HTMLLIElement | null) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // A thin line across the middle of the viewport: the step crossing it is the one being read.
  const atCentre = useInView(ref, { margin: "-50% 0px -50% 0px" });
  useEffect(() => {
    if (atCentre) onEnter();
  }, [atCentre, onEnter]);

  return (
    <li
      ref={(el) => {
        ref.current = el;
        itemRef(el);
      }}
      className="relative grid gap-6 sm:grid-cols-[200px_1fr] sm:items-center sm:gap-10 lg:flex lg:min-h-[65vh] lg:items-center"
    >
      {/* Phones: inline on small screens; the stage shows them on desktop. */}
      {step.screen ? (
        <div className="relative aspect-[390/844] w-[min(60vw,200px)] overflow-hidden rounded-[1.75rem] border-4 border-[#1b1b17] bg-[#edf1e2] shadow-[8px_8px_0_0_rgb(110_226_106/0.28)] lg:hidden">
          <Image src={step.screen.src} alt={step.screen.alt} fill sizes="200px" className="object-cover object-top" />
        </div>
      ) : null}

      <div
        className={`max-w-xl transition-opacity duration-500 lg:border-l-2 lg:pl-8 ${
          active ? "lg:border-accent lg:opacity-100" : "lg:border-line lg:opacity-35"
        }`}
      >
        <p className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          <span className="text-muted">
            {pad(index + 1)}/{pad(total)}
          </span>
          {step.when ?? `Step ${index + 1}`}
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-fg sm:text-3xl">{step.title}</h3>
        <p className="mt-4">{step.body}</p>
      </div>
    </li>
  );
}

/**
 * A use case told as an interactive walkthrough. On desktop the phone stays in view while the
 * steps scroll beside it; the screen, the guide's speech bubble and the dots follow along, and
 * the dots jump to any step. On smaller screens each step shows its own phone.
 */
export function Story({ story }: { story: StoryData }) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  // Stable per-step callbacks so each step's effect only fires when it actually reaches the centre.
  const [enter] = useState(() => story.steps.map((_, i) => () => setActive(i)));

  const pick = (i: number) =>
    items.current[i]?.scrollIntoView({ behavior: scrollBehavior(), block: "center" });

  return (
    <div className="space-y-10">
      {story.intro ? <p className="max-w-3xl">{story.intro}</p> : null}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div className="hidden lg:block">
          <div className="sticky top-[12vh] pb-10 pt-6">
            <Stage story={story} active={active} onPick={pick} />
          </div>
        </div>
        <ol className="space-y-14 sm:space-y-16 lg:space-y-0">
          {story.steps.map((step, i) => (
            <StepItem
              key={step.title}
              step={step}
              index={i}
              total={story.steps.length}
              active={i === active}
              onEnter={enter[i]}
              itemRef={(el) => {
                items.current[i] = el;
              }}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}
