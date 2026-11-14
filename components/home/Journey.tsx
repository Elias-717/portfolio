"use client";

import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { PhotoViewer } from "@/components/PhotoViewer";
import type { Milestone, Photo } from "@/data/profile";

// Small resting tilts so the photos read as prints laid on a desk.
const TILTS = [-2.5, 1.75, -1.25, 2.5];

/** A milestone's photos: stacked until the line reaches it, then dealt out in a row. */
function PhotoFan({ photos, active, onOpen }: { photos: Photo[]; active: boolean; onOpen: (i: number) => void }) {
  const reduce = useReducedMotion();
  return (
    <ul
      className="-mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 pt-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      aria-label="Photos"
    >
      {photos.map((p, i) => {
        const tilt = TILTS[i % TILTS.length];
        const stacked = { x: `${-i * 82}%`, rotate: tilt * 2.5, opacity: i === 0 ? 1 : 0.85 };
        const dealt = { x: "0%", rotate: tilt, opacity: 1 };
        return (
          <li key={p.src} className="shrink-0 snap-start" style={{ zIndex: photos.length - i }}>
            <motion.button
              type="button"
              onClick={() => onOpen(i)}
              aria-label={`Open photo: ${p.caption}`}
              initial={reduce ? false : stacked}
              animate={reduce ? undefined : active ? dealt : stacked}
              transition={{ type: "spring", stiffness: 170, damping: 22, delay: active ? i * 0.07 : 0 }}
              whileHover={reduce ? undefined : { rotate: 0, y: -6, scale: 1.03 }}
              whileFocus={reduce ? undefined : { rotate: 0, y: -6, scale: 1.03 }}
              className="group block w-60 rounded-xl bg-surface-2 p-2 text-left shadow-[0_18px_40px_-18px_rgb(0_0_0/0.9)] ring-1 ring-white/10 hover:ring-accent/60 sm:w-64"
            >
              <span className="relative block aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 640px) 16rem, 15rem"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </span>
              <span className="mt-2 block px-1 pb-0.5 text-xs leading-snug text-muted group-hover:text-fg">{p.caption}</span>
            </motion.button>
          </li>
        );
      })}
    </ul>
  );
}

function Stop({ m, onOpen }: { m: Milestone; onOpen: (photos: Photo[], i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  // "Reached" once the stop's top passes 60% down the screen: the same point the line's tip is at.
  const reached = useInView(ref, { margin: "0px 0px -40% 0px" });

  return (
    <li ref={ref} className="relative grid grid-cols-[2rem_1fr] gap-x-4 pb-16 last:pb-0 md:grid-cols-[9rem_3rem_1fr] md:gap-x-6">
      <p className="hidden pt-0.5 text-right font-mono text-sm text-muted md:block">{m.dates}</p>

      {/* Node on the line. Fills when the line reaches it; upcoming stops stay open and dashed. */}
      <span aria-hidden className="relative flex justify-center pt-1">
        <span
          className={`relative grid h-4 w-4 place-items-center rounded-full border-2 transition-colors duration-500 ${
            m.upcoming
              ? "border-dashed border-muted/60 bg-bg"
              : reached
                ? "border-accent bg-accent shadow-[0_0_18px_rgb(110_226_106/0.7)]"
                : "border-line bg-bg"
          }`}
        >
          {reached && !m.upcoming ? (
            <span className="absolute inset-0 animate-ping rounded-full bg-accent/50 [animation-iteration-count:1]" />
          ) : null}
        </span>
      </span>

      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.18em]">
          <span className={m.upcoming ? "text-muted" : "text-accent"}>{m.kind}</span>
          <span className="text-muted md:hidden">{m.dates}</span>
        </p>
        <h4 className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
          {m.title}
          {/* Organisation logo beside the title. Decorative: the org is named in text just below. */}
          {m.logo ? (
            <Image
              src={m.logo.src}
              alt=""
              width={m.logo.width}
              height={m.logo.height}
              className="h-7 w-auto rounded-md sm:h-8"
            />
          ) : null}
        </h4>
        <p className="mt-1 text-muted">{m.org}</p>
        <ul className="mt-4 max-w-3xl space-y-1.5 text-fg/85">
          {m.points.map((p) => (
            <li key={p} className="flex gap-3">
              <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent/60" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        {m.photos?.length ? (
          <PhotoFan photos={m.photos} active={reached} onOpen={(i) => onOpen(m.photos!, i)} />
        ) : null}
      </div>
    </li>
  );
}

/**
 * Leadership and education as one progressive line: it draws itself as you scroll, each stop
 * lights up as the line reaches it, and its photos are dealt out from a stack. Every photo
 * opens in an accessible viewer. Reduced motion: the line is drawn and photos sit in place.
 */
export function Journey({ items }: { items: Milestone[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const tipTop = useTransform(progress, (p) => `${p * 100}%`);

  const [viewer, setViewer] = useState<{ photos: Photo[]; index: number } | null>(null);

  return (
    <>
      <ol ref={ref} className="relative mt-4">
        {/* The line: a dim track, the drawn part, and a glowing tip. Centred on the node column. */}
        <span aria-hidden className="absolute bottom-2 top-2 left-[calc(1rem-0.5px)] w-px bg-line md:left-[calc(9rem+1.5rem+1.5rem-0.5px)]">
          <motion.span
            style={reduce ? undefined : { scaleY: progress }}
            className="absolute inset-0 origin-top bg-gradient-to-b from-accent/40 via-accent to-accent"
          />
          {reduce ? null : (
            <motion.span
              style={{ top: tipTop }}
              className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_4px_rgb(110_226_106/0.6)]"
            />
          )}
        </span>
        {items.map((m) => (
          <Stop key={m.title} m={m} onOpen={(photos, index) => setViewer({ photos, index })} />
        ))}
      </ol>
      <PhotoViewer
        photos={viewer?.photos ?? null}
        index={viewer?.index ?? 0}
        onIndex={(index) => setViewer((v) => (v ? { ...v, index } : v))}
        onClose={() => setViewer(null)}
      />
    </>
  );
}
