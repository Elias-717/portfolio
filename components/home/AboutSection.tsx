import Image from "next/image";
import type { ReactNode } from "react";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";
import { bio, languages, proofStats, site } from "@/data/site";

const tile =
  "relative overflow-hidden rounded-3xl border border-line bg-surface/70 transition-colors duration-300 hover:border-accent/40";

// One small outline icon per stat, in the same order as proofStats.
const STAT_ICONS: ReactNode[] = [
  // Trophy: the MMC Upstart prize.
  <>
    <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
    <path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4" />
  </>,
  // Graduation cap: CGPA.
  <>
    <path d="M2 9l10-5 10 5-10 5-10-5z" />
    <path d="M6 11v5c3 2 9 2 12 0v-5M22 9v6" />
  </>,
  // Globe: projects live on the web.
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </>,
];

/**
 * About as a bento grid that fits on one screen: the heading and bio, a tall portrait tile, the
 * headline stats with icons, and languages. On phones the tiles stack, heading first.
 */
export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-[1600px] gap-3 px-4 py-16 sm:gap-4 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,26rem)_1fr] lg:px-10">
        {/* Heading + bio. */}
        <Reveal className={`${tile} p-6 sm:p-9 lg:col-start-2 lg:row-start-1`}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">About</p>
          <h2
            id="about-title"
            className="mt-3 text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1] tracking-[-0.04em]"
          >
            From first idea to working product.
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 leading-relaxed text-fg/85 sm:text-lg">
            {bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        {/* Portrait: spans the full height of the right-hand column on desktop. */}
        <Reveal
          delay={0.05}
          className={`${tile} group min-h-[26rem] lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:min-h-0`}
        >
          <Image
            src="/about.webp"
            alt={`Portrait of ${site.name} in a suit and tie, smiling.`}
            fill
            sizes="(min-width: 1024px) 26rem, 100vw"
            className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
          <div aria-hidden className="absolute -bottom-24 left-1/2 h-48 w-[120%] -translate-x-1/2 rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
            <p className="text-2xl font-semibold tracking-[-0.03em]">{site.name}</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-fg/75">
              <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              {site.title} · {site.location}
            </p>
          </div>
        </Reveal>

        {/* Stats, each in its own tile with an icon. */}
        <dl className="grid grid-cols-3 gap-3 sm:gap-4 lg:col-start-2 lg:row-start-2">
          {proofStats.map((s, i) => (
            <Reveal key={s.label} delay={0.08 + i * 0.05} className={`${tile} flex flex-col p-4 sm:p-7`}>
              <span
                aria-hidden
                className="grid h-9 w-9 place-items-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/25 sm:h-11 sm:w-11"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                  {STAT_ICONS[i]}
                </svg>
              </span>
              {/* Label first in the markup (dt before dd); shown below the number via order. */}
              <dt className="order-last mt-2 text-xs leading-snug text-muted sm:mt-3 sm:text-sm">{s.label}</dt>
              <dd className="mt-4 text-3xl font-semibold leading-none tracking-[-0.04em] text-accent sm:mt-6 sm:text-5xl">
                <CountUp value={s.value} decimals={s.decimals} />
                {s.suffix ? <span className="text-xl sm:text-3xl">{s.suffix}</span> : null}
              </dd>
            </Reveal>
          ))}
        </dl>

        {/* Languages. */}
        <Reveal delay={0.2} className={`${tile} p-6 sm:px-9 sm:py-7 lg:col-start-2 lg:row-start-3`}>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Languages</p>
            <dl className="flex flex-wrap gap-x-10 gap-y-3">
              {languages.map((l) => (
                <div key={l.name} className="flex items-baseline gap-2">
                  <dt className="font-medium">{l.name}</dt>
                  <dd className="text-sm text-muted">{l.level}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
