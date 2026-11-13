import Image from "next/image";
import type { Project, Screen } from "@/data/projects";

function Shot({ s, phone }: { s: Screen; phone: boolean }) {
  return (
    <figure>
      <div
        className={`relative overflow-hidden border border-line bg-surface ${
          phone ? "aspect-[390/844] rounded-[1.75rem]" : "aspect-[16/10] rounded-xl"
        }`}
      >
        <Image
          src={s.src}
          alt={s.alt}
          fill
          sizes={phone ? "(min-width: 1024px) 220px, 45vw" : "(min-width: 640px) 50vw, 100vw"}
          className="object-cover object-top"
        />
      </div>
      {s.caption ? <figcaption className="mt-3 text-sm leading-relaxed text-muted">{s.caption}</figcaption> : null}
    </figure>
  );
}

/** Key screens: desktop captures in a two-column grid, phone captures in portrait frames. */
export function ScreenGallery({ project }: { project: Project }) {
  const desktop = project.screens.filter((s) => !s.mobile);
  const mobile = project.screens.filter((s) => s.mobile);

  return (
    <div className="space-y-10">
      {desktop.length > 0 ? (
        <ul className="grid gap-8 sm:grid-cols-2">
          {desktop.map((s) => (
            <li key={s.src}>
              <Shot s={s} phone={false} />
            </li>
          ))}
        </ul>
      ) : null}
      {mobile.length > 0 ? (
        <ul className="flex flex-wrap gap-8">
          {mobile.map((s) => (
            <li key={s.src} className="w-[min(45vw,220px)]">
              <Shot s={s} phone />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
