import type { Certification } from "@/data/profile";

/** Copies of the list in each half of the loop, so a half is always wider than the screen. */
const REPEAT = 2;

function Item({ c, hidden = false }: { c: Certification; hidden?: boolean }) {
  const body = (
    <>
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
        {c.issuer ?? "Certification"}
        {c.url ? <span className="text-accent"> · Verify ↗</span> : null}
      </span>
      <span className="text-3xl font-semibold tracking-[-0.035em] text-fg transition-colors duration-300 group-hover/item:text-accent sm:text-5xl">
        {c.name}
      </span>
    </>
  );
  // Hovering one item dims the rest of the banner, so the one under the pointer stands out.
  const cls =
    "group/item flex flex-col gap-2 rounded-md transition-opacity duration-300 group-hover:opacity-35 hover:!opacity-100 focus-visible:!opacity-100";
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
 * seamless loop; only the first run is exposed to assistive tech and the keyboard. Hovering or
 * focusing pauses it, and with reduced motion it becomes a static, wrapping list.
 */
export function CertBanner({ items }: { items: Certification[] }) {
  return (
    <div className="cert-banner group relative overflow-hidden border-y border-line py-10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      {/* Faint accent wash behind the moving type. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_120%_at_50%_50%,rgb(110_226_106/0.07),transparent)]" />
      {/* Two identical halves; the animation moves exactly one half. */}
      <div className="cert-track relative flex w-max">
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
  );
}
