import { SocialIcon } from "@/components/SocialIcon";

// The rim text runs along a circle of radius R in a 100x100 box.
const R = 40;
const CIRCLE = `M50,50 m-${R},0 a${R},${R} 0 1,1 ${R * 2},0 a${R},${R} 0 1,1 -${R * 2},0`;
const CIRCUMFERENCE = 2 * Math.PI * R;
/** Roughly how many characters fill the rim, so every ring has the same letter spacing. */
const RIM_CHARS = 26;

/**
 * A round social link: the platform's name runs around the rim like a badge, the icon sits in a
 * disc in the middle. All rings are one size. At rest the rim is quiet; on hover or keyboard
 * focus it brightens and spins and the disc fills green. Reduced motion: no spin. Pure CSS.
 */
export function SocialRing({ label, href }: { label: string; href: string }) {
  const id = `ring-${label.toLowerCase().replace(/[^a-z]/g, "")}`;
  const word = label.replace(/\s*\(.*\)/, "").toUpperCase();
  const unit = `${word} · `;
  const text = unit.repeat(Math.max(2, Math.round(RIM_CHARS / unit.length)));

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      className="group relative grid aspect-square w-full max-w-[6.5rem] place-items-center rounded-full"
    >
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-[spin_12s_linear_infinite] text-muted/55 transition-colors duration-300 [animation-play-state:paused] group-hover:text-accent group-hover:[animation-play-state:running] group-focus-visible:text-accent group-focus-visible:[animation-play-state:running] motion-reduce:animate-none"
      >
        <defs>
          <path id={id} d={CIRCLE} />
        </defs>
        <text className="fill-current font-mono" fontSize={9.5}>
          <textPath href={`#${id}`} textLength={CIRCUMFERENCE - 1} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>

      <span
        aria-hidden
        className="relative grid h-[56%] w-[56%] place-items-center rounded-full border border-line bg-surface text-fg transition duration-300 ease-out group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink group-focus-visible:scale-110 group-focus-visible:bg-accent group-focus-visible:text-accent-ink"
      >
        <SocialIcon label={label} className="h-[42%] w-[42%]" />
      </span>
    </a>
  );
}
