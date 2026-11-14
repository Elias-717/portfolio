import { Enter } from "@/components/Animate";
import type { Certification } from "@/data/profile";

// Layout: 2 columns on phones, 4 from lg. Cells are padded to a full row with decorative filler.
const COLS_BASE = 2;
const COLS_LG = 4;

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/** Small "+" mark drawn where four cells meet. */
function Plus({ className }: { className: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={cx("pointer-events-none absolute -bottom-3 -right-3 z-10 h-6 w-6 text-muted/70", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path d="M12 4v16M4 12h16" />
    </svg>
  );
}

/** Issuer logo, tinted via CSS mask so it follows the theme (white, green on hover). */
function Logo({ name }: { name?: Certification["logo"] }) {
  if (!name) {
    // No issuer logo: a simple certificate mark.
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-7 w-7 text-muted transition-colors duration-300 group-hover:text-accent" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M7 9h10M7 12h6" />
        <circle cx="16.5" cy="17.5" r="2.5" />
        <path d="M15.5 19.8 15 22l1.5-.8 1.5.8-.5-2.2" />
      </svg>
    );
  }
  const mask = `url(/logos/${name}.svg) center / contain no-repeat`;
  return (
    <span
      aria-hidden
      className="block h-8 w-11 bg-fg transition-colors duration-300 group-hover:bg-accent [mask-position:left!important] [-webkit-mask-position:left!important]"
      style={{ mask, WebkitMask: mask }}
    />
  );
}

/**
 * Certifications as a bordered logo grid with "+" marks at the inner corners and a checkerboard
 * of tones. Each certificate with a verify page is a link. Pure CSS, no client JavaScript.
 */
export function CertGrid({ items }: { items: Certification[] }) {
  const total = Math.ceil(items.length / COLS_LG) * COLS_LG;
  const rowsBase = total / COLS_BASE;
  const rowsLg = total / COLS_LG;

  return (
    <ul className="grid grid-cols-2 gap-px border border-line bg-line [perspective:1200px] lg:grid-cols-4">
      {Array.from({ length: total }, (_, i) => {
        const c = items[i];
        // Checkerboard tones and corner marks, worked out for each breakpoint's column count.
        const toneBase = (Math.floor(i / COLS_BASE) + (i % COLS_BASE)) % 2 === 0;
        const toneLg = (Math.floor(i / COLS_LG) + (i % COLS_LG)) % 2 === 0;
        const plusBase = i % COLS_BASE !== COLS_BASE - 1 && Math.floor(i / COLS_BASE) < rowsBase - 1;
        const plusLg = i % COLS_LG !== COLS_LG - 1 && Math.floor(i / COLS_LG) < rowsLg - 1;
        const cell = cx(
          "relative",
          toneBase ? "bg-surface" : "bg-bg",
          toneLg ? "lg:bg-surface" : "lg:bg-bg",
        );
        // Diagonal ripple: cells further from the top-left corner arrive later.
        const wave = (Math.floor(i / COLS_LG) + (i % COLS_LG)) * 0.08;
        const plus = <Plus className={cx(plusBase ? "block" : "hidden", plusLg ? "lg:block" : "lg:hidden")} />;

        if (!c) {
          // Filler to complete the last row: a faint hatch, hidden from assistive tech.
          return (
            <Enter as="li" variant="tilt" delay={wave} hidden key={`filler-${i}`} className={cx(cell, "min-h-48")}>
              <span className="absolute inset-0 opacity-40 [background:repeating-linear-gradient(135deg,transparent_0_10px,var(--color-line)_10px_11px)]" />
              {plus}
            </Enter>
          );
        }

        const meta = [c.issuer, c.date].filter(Boolean).join(" · ");
        const body = (
          <>
            <Enter as="span" variant="pop" delay={wave + 0.25} className="block w-fit">
              <Logo name={c.logo} />
            </Enter>
            <span className="mt-auto flex flex-col gap-2 pt-10">
              {meta ? <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{meta}</span> : null}
              <span className="text-base font-semibold leading-snug tracking-[-0.01em] text-fg sm:text-lg">{c.name}</span>
              {c.url ? (
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent opacity-80 transition group-hover:opacity-100">
                  Verify ↗
                </span>
              ) : null}
            </span>
          </>
        );
        const inner = "group flex h-full min-h-48 flex-col p-5 transition-colors duration-300 sm:p-7";

        return (
          <Enter as="li" variant="tilt" delay={wave} key={`${c.issuer}-${c.name}`} className={cell}>
            {c.url ? (
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${c.name}${meta ? `, ${meta}` : ""}: verify credential (opens in a new tab)`}
                className={cx(inner, "hover:bg-surface-2 focus-visible:bg-surface-2")}
              >
                {body}
              </a>
            ) : (
              <div className={inner}>{body}</div>
            )}
            {plus}
          </Enter>
        );
      })}
    </ul>
  );
}
