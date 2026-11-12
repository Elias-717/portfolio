"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
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

// Paper-ribbon geometry (px / degrees). Many thin slices make one smooth, continuous strip;
// each project's cover runs across SEGS_PER_ITEM slices, and one full turn holds all four.
const SEG_W = 56;
const SEG_H = 300;
const SEGS_PER_ITEM = 10;
const SEGS_PER_TURN = 40;
const STEP = 360 / SEGS_PER_TURN; // degrees between slices
const RADIUS = SEG_W / (2 * Math.tan((STEP / 2) * (Math.PI / 180)));
const DROP = (SEG_H + 90) / SEGS_PER_TURN; // vertical drop per slice, so the ribbon spirals
const EXTRA = 20; // half a turn of extra ribbon before and after
// Slant each slice to follow the spiral, so the ribbon's edges are smooth lines, not steps.
const SLANT = (Math.atan(DROP / SEG_W) * 180) / Math.PI;

/** Rotation (deg) that brings the middle of item `i` to the front. */
const angleFor = (i: number) => (i * SEGS_PER_ITEM + (SEGS_PER_ITEM - 1) / 2) * STEP;

function Slice({ index, items, rotation }: { index: number; items: TapeItem[]; rotation: MotionValue<number> }) {
  const n = items.length;
  const itemIndex = ((Math.floor(index / SEGS_PER_ITEM) % n) + n) % n;
  const slice = ((index % SEGS_PER_ITEM) + SEGS_PER_ITEM) % SEGS_PER_ITEM;
  const own = index * STEP;
  const facingOf = (r: number) => Math.cos(((own - r) * Math.PI) / 180);

  // Paper shading: bright where it faces you, darker as it curves away,
  // and the back of the ribbon reads as a faded grey print.
  const filter = useTransform(rotation, (r) => {
    const f = facingOf(r);
    return f >= 0 ? `brightness(${0.32 + 0.68 * f ** 0.8})` : "grayscale(1) brightness(1.1)";
  });
  const opacity = useTransform(rotation, (r) => (facingOf(r) >= 0 ? 1 : 0.14));

  return (
    <motion.div
      style={{
        filter,
        opacity,
        width: SEG_W + 0.75, // slight overlap hides hairline seams between slices
        height: SEG_H,
        marginLeft: -SEG_W / 2,
        marginTop: -SEG_H / 2,
        transform: `rotateY(${own}deg) translateZ(${RADIUS}px) translateY(${index * DROP}px) skewY(${SLANT}deg)`,
        backgroundImage: `url(${items[itemIndex].cover})`,
        backgroundSize: `${SEG_W * SEGS_PER_ITEM}px auto`,
        backgroundPosition: `${-slice * SEG_W}px center`,
        // Thin light paper edges top and bottom; a soft crease where one print meets the next.
        boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.18), inset 0 -1px 0 rgb(255 255 255 / 0.1)${
          slice === 0 ? ", inset 3px 0 6px -2px rgb(0 0 0 / 0.55)" : ""
        }`,
      }}
      className="absolute left-1/2 top-1/2 bg-[#e9ebe7] bg-no-repeat [backface-visibility:visible]"
    />
  );
}

/**
 * Pinned section: a 3D spiral tape of project covers that turns as you scroll,
 * bringing one project to the front at a time. Details on the left, project list
 * on the right, counter bottom-left, link bottom-right.
 */
export function ProjectTape({ items }: { items: TapeItem[] }) {
  const n = items.length;
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

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
  const rotation = useSpring(target, { stiffness: 120, damping: 26, mass: 0.6 });
  const rotateY = useTransform(rotation, (r) => -r);
  const y = useTransform(rotation, (r) => -(r / STEP) * DROP);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(p * n))));
  });

  const jumpTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + travel * ((i + 0.5) / n), behavior: "smooth" });
  };

  const current = items[active];
  const panels = Array.from({ length: n * SEGS_PER_ITEM + EXTRA * 2 }, (_, k) => k - EXTRA);

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-title"
      className="relative bg-black"
      style={{ height: `${n * 100}svh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4 pt-24 sm:px-6">
          <h2 id="projects-title" className="font-mono text-sm text-accent">
            <span aria-hidden className="text-accent/60">
              {"// "}
            </span>
            Selected work
          </h2>
        </div>

        {/* The tape. Decorative: the same information is in the text around it. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="scale-[0.62] sm:scale-[0.8] lg:scale-[0.88]" style={{ perspective: "2600px" }}>
            {/* Tilt so the spiral's slant is visible. */}
            <div style={{ transform: "rotateX(-14deg) rotateZ(-7deg)", transformStyle: "preserve-3d" }}>
              <motion.div
                style={{ rotateY, y, transformStyle: "preserve-3d" }}
                className="relative h-0 w-0 [transform-style:preserve-3d]"
              >
                {panels.map((k) => (
                  <Slice key={k} index={k} items={items} rotation={rotation} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center px-4 sm:px-6 lg:grid-cols-[14rem_1fr_16rem]">
          {/* Left: details of the active project. */}
          <dl className="hidden space-y-6 text-sm lg:block" aria-live="polite">
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

          {/* Right: all projects, the active one large. */}
          <ol className="hidden space-y-6 text-right lg:block">
            {items.map((item, i) => (
              <li key={item.slug}>
                <button
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-current={i === active ? "true" : undefined}
                  className={`ml-auto block text-right uppercase tracking-[-0.02em] transition-all duration-300 ${
                    i === active ? "text-3xl font-semibold text-fg" : "text-lg text-muted/50 hover:text-muted"
                  }`}
                >
                  {item.title}
                </button>
                {i === active ? <p className="mt-1 text-xs text-muted">{item.highlight}</p> : null}
              </li>
            ))}
          </ol>
        </div>

        {/* Bottom row: counter left, link right. Mobile shows the active title here too. */}
        <div className="relative mx-auto flex w-full max-w-6xl items-end justify-between gap-6 px-4 pb-10 sm:px-6">
          <div>
            <p className="text-xs text-muted">Selected work</p>
            <p className="font-semibold leading-none tracking-[-0.05em]">
              <span className="text-6xl text-accent sm:text-7xl">{String(active + 1).padStart(2, "0")}</span>
              <span className="text-xl text-muted"> /{String(n).padStart(2, "0")}</span>
            </p>
            <p className="mt-3 text-xl font-semibold uppercase lg:hidden">{current.title}</p>
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
    </section>
  );
}
