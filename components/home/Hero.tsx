import Image from "next/image";
import { SocialIcon } from "@/components/SocialIcon";
import { SliceOnScroll } from "@/components/SliceOnScroll";
import { VelocityMarquee } from "@/components/VelocityMarquee";
import { site, socials } from "@/data/site";

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

/** One run of the banner text. Repeated so the track is always wider than the screen. */
function BannerRun() {
  return (
    <span className="flex shrink-0 items-center">
      {[0, 1, 2].map((i) => (
        <span key={i} className="banner-name flex items-center whitespace-nowrap pr-[0.35em]">
          {site.name}
          <span className="pl-[0.35em]">—</span>
        </span>
      ))}
    </span>
  );
}

/**
 * Full-bleed portrait with the name scrolling across it as a giant banner.
 * The banner uses mix-blend-difference, so the letters invert where they cross the face,
 * and it speeds up with scroll velocity.
 * Socials sit bottom-left, titles bottom-right.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate">
      <h1 id="hero-title" className="sr-only">
        {site.name}, {site.title}
      </h1>

      <div className="relative -mt-16 h-svh max-h-[64rem] min-h-[36rem] overflow-hidden">
        <SliceOnScroll>
          <Image
            src="/elias_hero.png"
            alt={`Portrait of ${site.name}`}
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover object-[58%_30%]"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-black to-transparent"
          />

          {/*
            The moving banner, two layers moving together:
            1. off-white with mix-blend-difference, so the letters invert over the face;
            2. green (with a golden band sweeping through) using mix-blend-color, which tints
               layer 1 green without changing its lightness.
            No transform on this wrapper: it would isolate the blend modes from the photo.
          */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[29%] overflow-hidden py-[0.2em] sm:top-[27%]"
          >
            <VelocityMarquee
              className="text-[24vw] font-medium leading-none tracking-[-0.05em] sm:text-[clamp(4.5rem,15vw,14rem)]"
              layers={["mix-blend-difference text-[#e8ece8]", "mix-blend-color glint"]}
            >
              <BannerRun />
            </VelocityMarquee>
          </div>

          {/* Bottom row: socials left, titles right. */}
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-4 pb-8 sm:px-6 sm:pb-10">
              <ul className="rise hidden space-y-2.5 sm:block" style={delay(200)} aria-label="Social links">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-fg/85 transition hover:text-accent"
                    >
                      <SocialIcon label={s.label} />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p
                className="rise ml-auto text-right text-[clamp(2rem,4.6vw,4rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
                style={delay(120)}
              >
                <span className="block text-accent">{site.title}</span>
                <span className="block">CS student, Data & AI</span>
              </p>
            </div>
          </div>
        </SliceOnScroll>
      </div>
    </section>
  );
}
