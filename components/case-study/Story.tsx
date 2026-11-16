import Image from "next/image";
import type { Project } from "@/data/projects";

/** A use case told as steps: each step's text beside the phone screen it happens on. */
export function Story({ story }: { story: NonNullable<Project["story"]> }) {
  return (
    <div className="space-y-6">
      {story.intro ? <p>{story.intro}</p> : null}
      <ol className="space-y-12 sm:space-y-16">
        {story.steps.map((step, i) => (
          <li key={step.title} className="grid items-center gap-6 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-10">
            {step.screen ? (
              <figure className={`w-[min(60vw,220px)] ${i % 2 ? "sm:order-2" : ""}`}>
                <div className="relative aspect-[390/844] overflow-hidden rounded-[1.75rem] border border-line bg-surface">
                  <Image
                    src={step.screen.src}
                    alt={step.screen.alt}
                    fill
                    sizes="(min-width: 640px) 220px, 60vw"
                    className="object-cover object-top"
                  />
                </div>
              </figure>
            ) : (
              <div aria-hidden />
            )}
            <div className={i % 2 ? "sm:order-1" : ""}>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {step.when ?? `Step ${i + 1}`}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-fg">{step.title}</h3>
              <p className="mt-3">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
