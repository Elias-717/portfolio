import Image from "next/image";
import type { Project } from "@/data/projects";
import { Placeholder } from "./Placeholder";

/** Key screens. Phone apps get a narrow, portrait grid. */
export function ScreenGallery({ project }: { project: Project }) {
  const phone = project.demo.type === "phone";

  if (project.screens.length === 0) {
    return <Placeholder label={`${project.title} screenshots`} className="min-h-40" />;
  }

  return (
    <ul className={`grid gap-6 ${phone ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : "sm:grid-cols-2"}`}>
      {project.screens.map((s) => (
        <li key={s.src}>
          <figure>
            <div
              className={`relative overflow-hidden border border-line bg-surface ${
                phone ? "aspect-[9/19.5] rounded-2xl" : "aspect-[16/10] rounded-xl"
              }`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes={phone ? "(min-width: 1024px) 200px, 45vw" : "(min-width: 640px) 50vw, 100vw"}
                className="object-cover object-top"
              />
            </div>
            {s.caption ? <figcaption className="mt-2 text-sm text-muted">{s.caption}</figcaption> : null}
          </figure>
        </li>
      ))}
    </ul>
  );
}
