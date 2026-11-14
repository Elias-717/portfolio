"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { DemoWindow } from "./DemoWindow";

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
  /** Live demo to open in the pop-up window, if the project has one. */
  demoUrl?: string;
  /** The closing "and more are coming" stop: not a project, links to contact. */
  teaser?: boolean;
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

/** Share of each project's scroll span spent holding still at the front. */
const HOLD = 0.4;

/** Smooth ease in/out (smootherstep): zero velocity and acceleration at both ends. */
const ease = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

/**
 * Maps scroll progress (0..1) to ribbon rotation. Each project holds at the front for
 * HOLD of its span, and the turns between them ease in and out, so there are no
 * sudden changes of speed for the spring to smooth over.
 */
function rotationFor(p: number, n: number) {
  const x = Math.min(n - 1, Math.max(0, p * n - 0.5)); // 0 at item 0's centre, n-1 at the last
  const i = Math.floor(x);
  const f = x - i;
  const half = HOLD / 2;
  const t = f <= half ? 0 : f >= 1 - half ? 1 : (f - half) / (1 - HOLD);
  const from = angleFor(i);
  const to = angleFor(Math.min(n - 1, i + 1));
  return from + (to - from) * ease(t);
}

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
 * Flat, readable card for one project that rises off the tape as that project turns to
 * the front and dissolves as it turns away. Driven frame-by-frame by the tape's rotation
 * (opacity and transform only), so it is part of the scroll rather than a separate animation.
 */
function PopCard({
  item,
  index,
  rotation,
  isActive,
  onOpen,
}: {
  item: TapeItem;
  index: number;
  rotation: MotionValue<number>;
  isActive: boolean;
  onOpen: () => void;
}) {
  // 1 when this project is exactly at the front, 0 once it is ~1.5 slices away.
  const nearness = useTransform(rotation, (r) => {
    const v = 1 - Math.abs(r - angleFor(index)) / (STEP * 1.5);
    const c = Math.min(1, Math.max(0, v));
    return c * c * (3 - 2 * c); // smoothstep
  });
  const scale = useTransform(nearness, [0, 1], [0.9, 1]);
  const pointerEvents = useTransform(nearness, (v) => (v > 0.6 ? "auto" : "none"));
  // Fully faded cards drop out of compositing instead of being blended at 0 opacity.
  const visibility = useTransform(nearness, (v) => (v > 0.001 ? "visible" : "hidden"));

  const opensSite = !item.teaser && !item.demoUrl && item.external;
  const label = item.teaser
    ? "Say hello"
    : item.demoUrl
      ? "Try the live demo"
      : opensSite
        ? "Visit the live site ↗"
        : "Take a closer look";
  const aria = item.teaser
    ? "Say hello: go to the contact section"
    : item.demoUrl
      ? `Try the ${item.title} live demo`
      : opensSite
        ? `Visit the ${item.title} live site (opens in a new tab)`
        : `Take a closer look at ${item.title}`;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={aria}
      tabIndex={isActive ? 0 : -1}
      aria-hidden={!isActive}
      style={{ opacity: nearness, scale, pointerEvents, visibility, willChange: "transform, opacity" }}
      className="group absolute inset-0 overflow-hidden rounded-2xl ring-2 ring-accent/70 shadow-[0_0_60px_-10px_rgb(110_226_106/0.55)] transition-shadow duration-300 hover:ring-accent hover:shadow-[0_0_90px_-10px_rgb(110_226_106/0.8)]"
    >
      <Image src={item.cover} alt="" fill sizes="650px" loading="eager" className="object-cover object-top" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
      <span className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-black/80 px-4 py-2 text-sm font-medium text-fg ring-1 ring-white/15 transition group-hover:bg-accent group-hover:text-accent-ink">
        <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-accent group-hover:bg-accent-ink" />
        {label}
      </span>
    </motion.button>
  );
}

/**
 * Pinned section (desktop, motion allowed): a paper ribbon of project covers that
 * turns as you scroll, bringing one project to the front at a time.
 */
export function ProjectTape({ items, className = "" }: { items: TapeItem[]; className?: string }) {
  const n = items.length;
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Hold each project at the front for a while, then ease round to the next one.
  const target = useTransform(scrollYProgress, (p) => rotationFor(p, n));
  // Light, near-critically damped spring: smooths coarse mouse-wheel steps without lag.
  const rotation = useSpring(target, { stiffness: 170, damping: 26, mass: 0.8, restDelta: 0.001 });
  const rotateY = useTransform(rotation, (r) => -r);
  const y = useTransform(rotation, (r) => -(r / STEP) * DROP);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(n - 1, Math.max(0, Math.floor(p * n)));
    setActive((prev) => (prev === next ? prev : next));
  });

  const [open, setOpen] = useState<TapeItem | null>(null);
  const openItem = (item: TapeItem) => {
    if (item.teaser) document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    // Sites that refuse to be embedded (no demoUrl) open for real in a new tab.
    else if (!item.demoUrl && item.external) window.open(item.href, "_blank", "noopener,noreferrer");
    else setOpen(item);
  };

  const jumpTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const clamped = Math.min(n - 1, Math.max(0, i));
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * ((clamped + 0.5) / n), behavior: "smooth" });
  };

  const current = items[active];
  const projectCount = items.filter((it) => !it.teaser).length;
  // The ribbon never changes, so don't re-render its slices when the active project does.
  const ribbon = useMemo(
    () =>
      Array.from({ length: n * SEGS_PER_ITEM + EXTRA * 2 }, (_, k) => k - EXTRA).map((k) => (
        <Slice key={k} index={k} items={items} />
      )),
    [items, n],
  );

  return (
    <div ref={ref} className={`relative ${className}`} style={{ height: `${n * 70}svh` }}>
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pt-20 lg:px-10">
          <h2 id="projects-title" className="font-mono text-sm text-accent">
            <span aria-hidden className="text-accent/60">
              {"// "}
            </span>
            Selected work
          </h2>
        </div>

        {/* The ribbon. Decorative: the same information is in the text around it. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="scale-[0.8] xl:scale-90 2xl:scale-[1.12] min-[1900px]:scale-[1.3]" style={{ perspective: "2400px" }}>
            {/* Gentle tilt so the spiral reads without distorting the front project. */}
            <div style={{ transform: "rotateX(-10deg) rotateZ(-4deg)", transformStyle: "preserve-3d" }}>
              <motion.div
                style={{ rotateY, y, transformStyle: "preserve-3d", willChange: "transform" }}
                className="relative h-0 w-0"
              >
                {ribbon}
              </motion.div>
            </div>
          </div>
          {/* Paper shading, drawn once: the curve darkens towards its sides. */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_42%_70%_at_50%_50%,transparent_60%,rgb(0_0_0/0.7)_100%)]" />
        </div>

        {/* One flat card per project, faded and scaled continuously by how close it is to the front. */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[355px] w-[578px] -translate-x-1/2 -translate-y-[44%] xl:h-[400px] xl:w-[650px] 2xl:h-[497px] 2xl:w-[810px] min-[1900px]:h-[577px] min-[1900px]:w-[940px]">
          {items.map((item, i) => (
            <PopCard
              key={item.slug}
              item={item}
              index={i}
              rotation={rotation}
              isActive={i === active}
              onOpen={() => openItem(item)}
            />
          ))}
        </div>
        <DemoWindow item={open} onClose={() => setOpen(null)} />

        <div className="relative mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-[14rem_1fr_16rem] items-center px-6 lg:px-10 2xl:grid-cols-[17rem_1fr_19rem]">
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

          <ol className="space-y-3 text-right">
            {items.map((item, i) => (
              <li key={item.slug}>
                {/* Size changes via transform (not font-size) so switching projects never reflows the pinned panel. */}
                <button
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-current={i === active ? "true" : undefined}
                  className={`ml-auto block origin-right text-right text-3xl font-semibold uppercase tracking-[-0.02em] transition-[transform,color] duration-300 ease-out 2xl:text-4xl ${
                    i === active ? "text-fg" : "scale-[0.6] text-muted/60 hover:text-fg"
                  }`}
                >
                  {item.title}
                </button>
                {i === active ? <p className="mt-1 text-xs text-muted">{item.highlight}</p> : null}
              </li>
            ))}
          </ol>
        </div>

        <div className="relative mx-auto flex w-full max-w-[1600px] items-end justify-between gap-6 px-6 pb-10 lg:px-10">
          <div className="flex items-end gap-6">
            <div>
              <p className="text-xs text-muted">Selected work</p>
              <p className="font-semibold leading-none tracking-[-0.05em]" aria-live="polite">
                <span className="text-7xl text-accent">{current.teaser ? "+" : pad(active + 1)}</span>
                <span className="text-xl text-muted"> /{pad(projectCount)}</span>
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
