"use client";

import { useRef, useState } from "react";
import type { Certification } from "@/data/profile";

/** Speed while the pointer is over the banner, as a fraction of normal. */
const HOVER_RATE = 0.25;

/** Copies of the list in each half of the loop, so a half is always wider than the screen. */
const REPEAT = 1;

function Item({ c, hidden = false }: { c: Certification; hidden?: boolean }) {
  const body = (
    <>
      {c.logo ? (
        // Single-colour issuer logo, tinted via CSS mask so it matches the theme (and turns green on hover).
        <span
          aria-hidden
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-line bg-surface sm:h-16 sm:w-16"
        >
          <span
            className="h-7 w-7 bg-fg transition-colors duration-300 group-hover/item:bg-accent sm:h-8 sm:w-8"
            style={{
              maskImage: `url(/logos/${c.logo}.svg)`,
              WebkitMaskImage: `url(/logos/${c.logo}.svg)`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />
        </span>
      ) : null}
      <span className="flex flex-col gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          {[c.issuer ?? "Certification", c.date].filter(Boolean).join(" · ")}
          {c.url ? <span className="text-accent"> · Verify ↗</span> : null}
        </span>
        <span className="text-3xl font-semibold tracking-[-0.035em] text-fg transition-colors duration-300 group-hover/item:text-accent sm:text-5xl">
          {c.name}
        </span>
      </span>
    </>
  );
  // Hovering one item dims the rest of the banner, so the one under the pointer stands out.
  const cls =
    "group/item flex items-center gap-5 rounded-md transition-opacity duration-300 group-hover:opacity-35 hover:!opacity-100 focus-visible:!opacity-100";
  return (
    <li className="flex shrink-0 items-center pr-16 sm:pr-24">
      {c.url ? (
        <a
          href={c.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={hidden ? -1 : undefined}
          aria-label={`${c.name}${c.issuer ? `, ${c.issuer}` : ""}: verify credential (opens in a new tab)`}
          className={cls}
        >
          {body}
        </a>
      ) : (
        <span className={cls}>{body}</span>
      )}
    </li>
  );
}

/**
 * Certifications as a slow, editorial banner in the hero's big type. The list is repeated for a
 * seamless loop; only the first run is exposed to assistive tech and the keyboard. Hovering slows
 * it down (by playback rate, so it eases without jumping); keyboard focus or the Pause button
 * stops it; with reduced motion it becomes a static, wrapping list.
 */
export function CertBanner({ items }: { items: Certification[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const setRate = (rate: number) => {
    for (const a of trackRef.current?.getAnimations() ?? []) a.updatePlaybackRate(rate);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play certifications banner" : "Pause certifications banner"}
        className="absolute -top-12 right-0 rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition hover:border-accent hover:text-accent motion-reduce:hidden"
      >
        {paused ? "Play" : "Pause"}
      </button>
      <div
        data-paused={paused}
        onPointerEnter={() => setRate(HOVER_RATE)}
        onPointerLeave={() => setRate(1)}
        className="cert-banner group relative overflow-hidden border-y border-line py-10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        {/* Faint accent wash behind the moving type. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_120%_at_50%_50%,rgb(110_226_106/0.07),transparent)]" />
        {/* Two identical halves; the animation moves exactly one half. */}
        <div ref={trackRef} className="cert-track relative flex w-max">
          {[0, 1].map((half) => (
            <div key={half} className={`flex ${half ? "cert-copy" : ""}`} aria-hidden={half ? true : undefined}>
              {Array.from({ length: REPEAT }, (_, r) => {
                const real = half === 0 && r === 0;
                return (
                  <ul
                    key={r}
                    className={`flex ${real ? "" : "cert-copy"}`}
                    aria-label={real ? "Certifications" : undefined}
                    aria-hidden={!real && half === 0 ? true : undefined}
                  >
                    {items.map((c) => (
                      <Item key={`${c.issuer}-${c.name}`} c={c} hidden={!real} />
                    ))}
                  </ul>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
