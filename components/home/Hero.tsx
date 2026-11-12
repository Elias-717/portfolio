import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { SocialIcon } from "@/components/SocialIcon";
import { SliceOnScroll } from "@/components/SliceOnScroll";
import { VelocityMarquee } from "@/components/VelocityMarquee";
import { featuredProjects } from "@/data/projects";
import { site, socials } from "@/data/site";

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

/** One run of the banner text. Repeated so the track is always wider than the screen. */
function BannerRun() {
  return (
    <span className="flex shrink-0 items-center">
      {[0, 1, 2].map((i) => (
        <span key={i} className="flex items-center whitespace-nowrap pr-[0.35em]">
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

      <div className="relative h-[calc(100svh-61px)] max-h-[60rem] min-h-[34rem] overflow-hidden">
        <SliceOnScroll>
          <Image
            src="/elias-hero.png"
            alt={`Portrait of ${site.name}`}
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover object-[58%_30%]"
          />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-bg to-transparent"
          />

          {/*
            The moving banner, two layers moving together:
            1. off-white with mix-blend-difference, so the letters invert over the face;
            2. green (with a white band sweeping through) using mix-blend-color, which tints
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

          {/* Top-left availability. */}
          <div className="absolute inset-x-0 top-0">
            <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
              <p
                className="rise inline-flex items-center gap-2 rounded-full border border-fg/15 bg-bg/50 px-3 py-1 text-xs text-fg/85 backdrop-blur"
                style={delay(0)}
              >
                <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                {site.availability}
              </p>
            </div>
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

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rise flex flex-col gap-6 pt-8 sm:flex-row sm:items-end sm:justify-between" style={delay(320)}>
          <p className="max-w-md text-lg leading-relaxed text-muted">{site.pitch}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/#projects">See my work</ButtonLink>
            <ButtonLink href={site.resume} variant="ghost" download>
              Download resume
            </ButtonLink>
          </div>
        </div>

        {/* Proof strip: the three featured projects, one fact each. */}
        <ul className="rise mt-14 grid border-t border-line sm:grid-cols-3" style={delay(420)}>
          {featuredProjects.map((p) => (
            <li
              key={p.slug}
              className="border-b border-line sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
            >
              <Link href={`/projects/${p.slug}`} className="group flex h-full items-start justify-between gap-4 py-5">
                <span>
                  <span className="block font-medium transition group-hover:text-accent">{p.title}</span>
                  <span className="mt-1 block text-sm text-muted">{p.highlight}</span>
                </span>
                <span aria-hidden className="text-muted transition group-hover:translate-x-1 group-hover:text-accent">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
