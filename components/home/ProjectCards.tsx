import Image from "next/image";
import Link from "next/link";
import type { TapeItem } from "./ProjectTape";

/** Simple, static project cards: used on small screens and for reduced-motion visitors. */
export function ProjectCards({ items, className = "" }: { items: TapeItem[]; className?: string }) {
  return (
    <div className={`mx-auto max-w-[1600px] px-4 pb-20 pt-16 sm:px-6 lg:px-10 ${className}`}>
      <h2 className="font-mono text-sm text-accent">
        <span aria-hidden className="text-accent/60">
          {"// "}
        </span>
        Selected work
      </h2>
      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.slug}>
            <Link
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group block overflow-hidden rounded-2xl border border-line bg-surface transition hover:border-accent/50"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.cover}
                  alt={`${item.title} screenshot`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <p className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, "0")} · {item.year} · {item.status}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] transition group-hover:text-accent">
                  {item.title}
                  {item.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                </h3>
                <p className="mt-1 text-sm text-muted">{item.highlight}</p>
                <p className="mt-4 text-sm font-medium text-accent">
                  {item.cta} <span aria-hidden>{item.external ? "↗" : "→"}</span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
