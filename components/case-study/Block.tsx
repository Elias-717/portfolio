import type { ReactNode } from "react";

/**
 * One case-study section: heading column on the left, content on the right. `wide` puts the
 * heading above the content; `full` also lets the content use the whole width (for layouts
 * with their own columns, like the story walkthrough).
 */
export function Block({
  title,
  children,
  wide = false,
  full = false,
}: {
  title: string;
  children: ReactNode;
  wide?: boolean;
  full?: boolean;
}) {
  const id = `section-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <section aria-labelledby={id} className="border-t border-line py-14 sm:py-20">
      <div className={wide || full ? "space-y-8" : "grid gap-6 md:grid-cols-[14rem_1fr] md:gap-12"}>
        <h2 id={id} className="text-2xl font-semibold tracking-[-0.03em]">
          {title}
        </h2>
        <div className={`${full ? "" : "max-w-3xl "}text-lg leading-relaxed text-fg/85`}>{children}</div>
      </div>
    </section>
  );
}
