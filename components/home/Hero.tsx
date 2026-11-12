import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { featuredProjects } from "@/data/projects";
import { site } from "@/data/site";

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 sm:px-6 sm:pt-20 lg:grid-cols-[1.25fr_1fr] lg:gap-6">
        <div>
          <p
            className="rise inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted"
            style={delay(0)}
          >
            <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            {site.availability}
          </p>
          <h1
            id="hero-title"
            className="rise mt-7 text-[clamp(3.25rem,9vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.055em]"
            style={delay(80)}
          >
            Elias
            <br />
            Al-Sumairi
          </h1>
          <p
            className="rise mt-5 text-[clamp(1.75rem,4vw,3rem)] font-light leading-none tracking-[-0.03em] text-accent"
            style={delay(160)}
          >
            {site.title}
          </p>
          <p className="rise mt-8 max-w-md text-lg leading-relaxed text-muted" style={delay(240)}>
            {site.pitch}
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={delay(320)}>
            <ButtonLink href="/#projects">See my work</ButtonLink>
            <ButtonLink href={site.resume} variant="ghost" download>
              Download resume
            </ButtonLink>
          </div>
        </div>

        {/* Signature: the emblem with a slow halo. */}
        <div className="rise relative mx-auto w-[min(78vw,26rem)] lg:w-full lg:max-w-[28rem]" style={delay(200)}>
          <div aria-hidden className="halo absolute -inset-10 rounded-full" />
          <Image
            src="/logo.png"
            alt=""
            width={448}
            height={448}
            priority
            sizes="(min-width: 1024px) 448px, 78vw"
            className="relative w-full rounded-full ring-1 ring-accent/20"
          />
        </div>
      </div>

      {/* Proof strip: the three featured projects, one fact each. */}
      <div className="mx-auto mt-16 max-w-6xl px-4 pb-6 sm:mt-24 sm:px-6">
        <ul className="rise grid border-t border-line sm:grid-cols-3" style={delay(420)}>
          {featuredProjects.map((p) => (
            <li key={p.slug} className="border-b border-line sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
              <Link
                href={`/projects/${p.slug}`}
                className="group flex h-full items-start justify-between gap-4 py-5"
              >
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
