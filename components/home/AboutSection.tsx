import Image from "next/image";
import { bio, languages, proofStats, site } from "@/data/site";

/**
 * About, editorial layout in the same language as the rest of the site (type, thin rules, mono
 * labels; no cards). On desktop it is sized to one screen: the portrait's height is tied to the
 * viewport and keeps its 4:5 shape, so the face is never cropped tight.
 */
export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="lg:flex lg:min-h-svh lg:items-center">
      <div className="mx-auto grid w-full max-w-[1600px] items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[auto_1fr] lg:gap-14 lg:px-10 lg:pb-10 lg:pt-24 xl:gap-20">
        <figure>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface lg:h-[min(calc(100svh-10rem),40rem)] lg:w-auto">
              <Image
                src="/about.webp"
                alt={`Portrait of ${site.name} in a suit and tie, smiling.`}
                fill
                priority={false}
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
            <figcaption className="mt-3 flex justify-between gap-4 font-mono text-xs text-muted">
              <span>{site.name}</span>
              <span>{site.location}</span>
            </figcaption>
        </figure>

        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span aria-hidden className="block h-px w-8 bg-accent" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">About</p>
          </div>
          <h2
            id="about-title"
            className="mt-3 max-w-[18ch] text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.04em] lg:text-[clamp(1.75rem,min(3.6vw,6.4vh),3.4rem)]"
          >
            From first idea to working product.
          </h2>

          <div className="mt-7 max-w-[68ch] space-y-4 leading-relaxed text-fg/85 lg:mt-[clamp(0.75rem,3vh,1.75rem)] lg:space-y-[clamp(0.5rem,1.6vh,1rem)] lg:text-[clamp(0.95rem,2.15vh,1.125rem)]">
            {bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {/* Headline facts as one ruled row. */}
          <dl className="mt-10 grid max-w-3xl grid-cols-3 divide-x divide-line border-y border-line lg:mt-[clamp(1rem,4vh,2.5rem)]">
            {proofStats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col py-5 lg:py-[clamp(0.6rem,2.2vh,1.25rem)] ${i === 0 ? "pr-4" : "px-4 sm:px-6"}`}
              >
                <dt className="order-last mt-2 text-xs leading-snug text-muted sm:text-sm">{s.label}</dt>
                <dd className="text-3xl font-semibold leading-none tracking-[-0.04em] text-accent sm:text-4xl lg:text-[clamp(1.6rem,4.6vh,2.25rem)]">
                  <span className="tabular-nums">{s.value.toFixed(s.decimals ?? 0)}</span>
                  {s.suffix ? <span className="text-xl sm:text-2xl">{s.suffix}</span> : null}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-sm text-muted lg:mt-[clamp(0.6rem,2.2vh,1.25rem)]">
            <span className="font-mono text-xs uppercase tracking-[0.18em]">Languages</span>
            <span className="mx-3 text-line">/</span>
            {languages.map((l, i) => (
              <span key={l.name}>
                <span className="text-fg">{l.name}</span> ({l.level.toLowerCase()})
                {i < languages.length - 1 ? <span className="mx-2">·</span> : null}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
