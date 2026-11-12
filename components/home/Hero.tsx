import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:grid-cols-[1fr_auto]">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
              <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
              {site.availability}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 id="hero-title" className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl">
              {site.name}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-4xl font-semibold leading-none tracking-tighter text-accent sm:text-6xl lg:text-7xl">
              {site.title}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-xl text-lg text-muted">{site.pitch}</p>
            <p className="mt-2 text-sm text-muted">Based in {site.location}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/#projects">View projects</ButtonLink>
              <ButtonLink href={site.resume} variant="ghost" download>
                Download resume
              </ButtonLink>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="hidden lg:block">
          <Image
            src="/logo.png"
            alt=""
            width={340}
            height={340}
            priority
            sizes="340px"
            className="rounded-full shadow-[0_0_120px_-20px] shadow-accent/40"
          />
        </Reveal>
      </div>
    </section>
  );
}
