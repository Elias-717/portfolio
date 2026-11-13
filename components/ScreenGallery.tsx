import Image from "next/image";
import type { Project, Screen } from "@/data/projects";

type Variant = "wide" | "portrait" | "phone";

const frame: Record<Variant, string> = {
  wide: "aspect-[16/10] rounded-xl",
  portrait: "aspect-[4/5] rounded-xl",
  phone: "aspect-[390/844] rounded-[1.75rem]",
};

const sizes: Record<Variant, string> = {
  wide: "(min-width: 640px) 50vw, 100vw",
  portrait: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  phone: "(min-width: 1024px) 220px, 45vw",
};

function Shot({ s, variant }: { s: Screen; variant: Variant }) {
  return (
    <figure>
      <div className={`relative overflow-hidden border border-line bg-surface ${frame[variant]}`}>
        <Image
          src={s.src}
          alt={s.alt}
          fill
          sizes={sizes[variant]}
          className="object-cover object-top"
        />
      </div>
      {s.caption ? <figcaption className="mt-3 text-sm leading-relaxed text-muted">{s.caption}</figcaption> : null}
    </figure>
  );
}

/** Key screens: desktop captures in a two-column grid, phone captures in portrait frames. */
export function ScreenGallery({ project }: { project: Project }) {
  const desktop = project.screens.filter((s) => !s.mobile && !s.portrait);
  const portrait = project.screens.filter((s) => !s.mobile && s.portrait);
  const mobile = project.screens.filter((s) => s.mobile);

  return (
    <div className="space-y-10">
      {desktop.length > 0 ? (
        <ul className="grid gap-8 sm:grid-cols-2">
          {desktop.map((s) => (
            <li key={s.src}>
              <Shot s={s} variant="wide" />
            </li>
          ))}
        </ul>
      ) : null}
      {portrait.length > 0 ? (
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {portrait.map((s) => (
            <li key={s.src}>
              <Shot s={s} variant="portrait" />
            </li>
          ))}
        </ul>
      ) : null}
      {mobile.length > 0 ? (
        <ul className="flex flex-wrap gap-8">
          {mobile.map((s) => (
            <li key={s.src} className="w-[min(45vw,220px)]">
              <Shot s={s} variant="phone" />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
