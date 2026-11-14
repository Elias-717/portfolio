import { SocialIcon } from "@/components/SocialIcon";

// The ring text runs along a circle of radius R in a 100x100 box.
const R = 41;
const CIRCLE = `M50,50 m-${R},0 a${R},${R} 0 1,1 ${R * 2},0 a${R},${R} 0 1,1 -${R * 2},0`;
const CIRCUMFERENCE = 2 * Math.PI * R;

/**
 * A round social link: the platform's name runs around the rim like a badge, the icon sits in a
 * disc in the middle. On hover or keyboard focus the rim spins and the disc fills green. With
 * reduced motion the rim stays still (the colour change remains). Pure CSS.
 */
export function SocialRing({ label, href, size = "md" }: { label: string; href: string; size?: "lg" | "md" }) {
  const id = `ring-${label.toLowerCase().replace(/[^a-z]/g, "")}`;
  const word = label.replace(/\s*\(.*\)/, "").toUpperCase();
  // Repeat the name so it wraps the whole rim, separated by dots.
  const reps = Math.max(2, Math.round(26 / (word.length + 3)));
  const text = Array.from({ length: reps }, () => `${word} • `).join("");
  const lg = size === "lg";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      className={`group relative grid shrink-0 place-items-center rounded-full ${lg ? "h-32 w-32" : "h-24 w-24"}`}
    >
      {/* Rim text. Spins only while hovered or focused. */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-[spin_10s_linear_infinite] text-muted transition-colors duration-300 [animation-play-state:paused] group-hover:text-accent group-hover:[animation-play-state:running] group-focus-visible:text-accent group-focus-visible:[animation-play-state:running] motion-reduce:animate-none"
      >
        <defs>
          <path id={id} d={CIRCLE} />
        </defs>
        <text className="fill-current font-mono" fontSize={lg ? 9 : 10.5} letterSpacing="1">
          <textPath href={`#${id}`} textLength={CIRCUMFERENCE - 2} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Centre disc. Fills green and pops on hover. */}
      <span
        aria-hidden
        className={`relative grid place-items-center rounded-full border border-line bg-surface text-fg shadow-[0_10px_30px_-12px_rgb(0_0_0/0.9)] transition duration-300 ease-out group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink group-hover:shadow-[0_0_40px_-6px_rgb(110_226_106/0.7)] group-focus-visible:scale-110 group-focus-visible:bg-accent group-focus-visible:text-accent-ink ${
          lg ? "h-[4.5rem] w-[4.5rem]" : "h-14 w-14"
        }`}
      >
        <SocialIcon label={label} className={lg ? "h-7 w-7" : "h-5 w-5"} />
        {/* Little "opens elsewhere" arrow that slides in on hover. */}
        <span className="absolute -right-1 -top-1 grid h-6 w-6 translate-y-1 place-items-center rounded-full bg-fg text-[11px] font-bold text-bg opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          ↗
        </span>
      </span>
    </a>
  );
}
