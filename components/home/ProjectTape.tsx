"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";

export interface TapeItem {
  slug: string;
  title: string;
  year: string;
  role: string;
  status: string;
  highlight: string;
  cover: string;
  href: string;
  external: boolean;
  cta: string;
}

// Paper-ribbon geometry (px / degrees). Each project's cover runs across SEGS_PER_ITEM slices,
// and one full turn holds all four projects.
const SEG_W = 92;
const SEG_H = 300;
const SEGS_PER_ITEM = 6;
const SEGS_PER_TURN = 24;
const STEP = 360 / SEGS_PER_TURN; // degrees between slices
const RADIUS = SEG_W / (2 * Math.tan((STEP / 2) * (Math.PI / 180)));
const DROP = (SEG_H + 90) / SEGS_PER_TURN; // vertical drop per slice, so the ribbon spirals
const SLANT = (Math.atan(DROP / SEG_W) * 180) / Math.PI; // keeps the ribbon's edges smooth
const EXTRA = 12; // half a turn of extra ribbon before and after

/** Rotation (deg) that brings the middle of item `i` to the front. */
const angleFor = (i: number) => (i * SEGS_PER_ITEM + (SEGS_PER_ITEM - 1) / 2) * STEP;

/**
 * One static slice of the ribbon. Nothing here changes while scrolling: only the
 * parent rotates, so the browser moves a single layer per frame.
 */
function Slice({ index, items }: { index: number; items: TapeItem[] }) {
  const n = items.length;
  const itemIndex = ((Math.floor(index / SEGS_PER_ITEM) % n) + n) % n;
  const slice = ((index % SEGS_PER_ITEM) + SEGS_PER_ITEM) % SEGS_PER_ITEM;
  return (
    <div
      style={{
        width: SEG_W + 0.75, // slight overlap hides hairline seams
        height: SEG_H,
        marginLeft: -SEG_W / 2,
        marginTop: -SEG_H / 2,
        transform: `rotateY(${index * STEP}deg) translateZ(${RADIUS}px) translateY(${index * DROP}px) skewY(${SLANT}deg)`,
        backgroundImage: `url(${items[itemIndex].cover})`,
        backgroundSize: `${SEG_W * SEGS_PER_ITEM}px auto`,
        backgroundPosition: `${-slice * SEG_W}px center`,
        boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.2), inset 0 -1px 0 rgb(255 255 255 / 0.12)${
          slice === 0 ? ", inset 3px 0 6px -2px rgb(0 0 0 / 0.55)" : ""
        }`,
      }}
      className="absolute left-1/2 top-1/2 bg-[#e9ebe7] bg-no-repeat [backface-visibility:hidden]"
    />
  );
}

const pad = (v: number) => String(v).padStart(2, "0");

/**
 * Pinned section (desktop, motion allowed): a paper ribbon of project covers that
 * turns as you scroll, bringing one project to the front at a time.
 */
export function ProjectTape({ items, className = "" }: { items: TapeItem[]; className?: string }) {
  const n = items.length;
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Hold each project at the front for a while, then turn to the next one.
  const input: number[] = [];
  const output: number[] = [];
  items.forEach((_, i) => {
    const start = i / n;
    const end = (i + 1) / n;
    input.push(start + (end - start) * 0.25, start + (end - start) * 0.75);
    output.push(angleFor(i), angleFor(i));
  });
  const target = useTransform(scrollYProgress, [0, ...input, 1], [angleFor(0), ...output, angleFor(n - 1)]);
  const rotation = useSpring(target, { stiffness: 140, damping: 30, mass: 0.6 });
  const rotateY = useTransform(rotation, (r) => -r);
  const y = useTransform(rotation, (r) => -(r / STEP) * DROP);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(n - 1, Math.max(0, Math.floor(p * n)));
    setActive((prev) => (prev === next ? prev : next));
  });

  const jumpTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const clamped = Math.min(n - 1, Math.max(0, i));
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * ((clamped + 0.5) / n), behavior: "smooth" });
  };

  const current = items[active];
  const slices = Array.from({ length: n * SEGS_PER_ITEM + EXTRA * 2 }, (_, k) => k - EXTRA);

  return (
    <div ref={ref} className={`relative ${className}`} style={{ height: `${n * 70}svh` }}>
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24">
          <h2 id="projects-title" className="font-mono text-sm text-accent">
            <span aria-hidden className="text-accent/60">
              {"// "}
            </span>
            Selected work
          </h2>
        </div>

        {/* The ribbon. Decorative: the same information is in the text around it. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="scale-[0.8] xl:scale-90" style={{ perspective: "2400px" }}>
            {/* Gentle tilt so the spiral reads without distorting the front project. */}
            <div style={{ transform: "rotateX(-10deg) rotateZ(-4deg)", transformStyle: "preserve-3d" }}>
              <motion.div
                style={{ rotateY, y, transformStyle: "preserve-3d", willChange: "transform" }}
                className="relative h-0 w-0"
              >
                {slices.map((k) => (
                  <Slice key={k} index={k} items={items} />
                ))}
              </motion.div>
            </div>
          </div>
          {/* Paper shading, drawn once: the curve darkens towards its sides. */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_42%_70%_at_50%_50%,transparent_60%,rgb(0_0_0/0.7)_100%)]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl flex-1 grid-cols-[14rem_1fr_16rem] items-center px-6">
          <dl className="space-y-6 text-sm">
            <div className="grid grid-cols-[5rem_1fr] gap-3">
              <dt className="text-muted">Role</dt>
              <dd>{current.role}</dd>
            </div>
            <div className="grid grid-cols-[5rem_1fr] gap-3">
              <dt className="text-muted">Year</dt>
              <dd>{current.year}</dd>
            </div>
            <div className="grid grid-cols-[5rem_1fr] gap-3">
              <dt className="text-muted">Status</dt>
              <dd>{current.status}</dd>
            </div>
          </dl>

          <div />

          <ol className="space-y-6 text-right">
            {items.map((item, i) => (
              <li key={item.slug}>
                <button
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-current={i === active ? "true" : undefined}
                  className={`ml-auto block text-right uppercase tracking-[-0.02em] transition-all duration-300 ${
                    i === active ? "text-3xl font-semibold text-fg" : "text-lg text-muted/60 hover:text-fg"
                  }`}
                >
                  {item.title}
                </button>
                {i === active ? <p className="mt-1 text-xs text-muted">{item.highlight}</p> : null}
              </li>
            ))}
          </ol>
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl items-end justify-between gap-6 px-6 pb-10">
          <div className="flex items-end gap-6">
            <div>
              <p className="text-xs text-muted">Selected work</p>
              <p className="font-semibold leading-none tracking-[-0.05em]" aria-live="polite">
                <span className="text-7xl text-accent">{pad(active + 1)}</span>
                <span className="text-xl text-muted"> /{pad(n)}</span>
                <span className="sr-only">: {current.title}</span>
              </p>
            </div>
            <div className="mb-1 flex gap-2">
              <button
                type="button"
                onClick={() => jumpTo(active - 1)}
                disabled={active === 0}
                aria-label="Previous project"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition hover:border-accent hover:text-accent disabled:opacity-30"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => jumpTo(active + 1)}
                disabled={active === n - 1}
                aria-label="Next project"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition hover:border-accent hover:text-accent disabled:opacity-30"
              >
                →
              </button>
            </div>
          </div>
          <Link
            href={current.href}
            {...(current.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-ink transition hover:brightness-110"
          >
            {current.cta}
            <span aria-hidden>{current.external ? "↗" : "→"}</span>
            <span className="sr-only">: {current.title}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
