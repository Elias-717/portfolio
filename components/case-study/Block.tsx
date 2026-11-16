import type { ReactNode } from "react";

/** One case-study section: heading column on the left, content on the right. */
export function Block({ title, children, wide = false }: { title: string; children: ReactNode; wide?: boolean }) {
  const id = `section-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <section aria-labelledby={id} className="border-t border-line py-14 sm:py-20">
      <div className={wide ? "space-y-8" : "grid gap-6 md:grid-cols-[14rem_1fr] md:gap-12"}>
        <h2 id={id} className="text-2xl font-semibold tracking-[-0.03em]">
          {title}
        </h2>
        <div className="max-w-3xl text-lg leading-relaxed text-fg/85">{children}</div>
      </div>
    </section>
  );
}
