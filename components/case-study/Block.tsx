import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

/** One numbered case-study section: label column on the left, content on the right. */
export function Block({
  index,
  title,
  children,
  wide = false,
}: {
  index: string;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  const id = `section-${index}`;
  return (
    <section aria-labelledby={id} className="border-t border-line py-14 sm:py-20">
      <Reveal className={wide ? "space-y-8" : "grid gap-6 md:grid-cols-[14rem_1fr] md:gap-12"}>
        <div>
          <p className="font-mono text-xs text-accent">{index}</p>
          <h2 id={id} className="mt-2 text-2xl font-semibold tracking-tight">
            {title}
          </h2>
        </div>
        <div className="max-w-3xl text-lg leading-relaxed text-fg/85">{children}</div>
      </Reveal>
    </section>
  );
}
