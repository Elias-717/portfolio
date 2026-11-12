import type { ReactNode } from "react";
import { SectionHeading } from "@/components/SectionHeading";

/** Standard home-page section wrapper with a numbered heading. */
export function Section({
  id,
  index,
  label,
  title,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading id={`${id}-title`} index={index} label={label} title={title} />
        {children}
      </div>
    </section>
  );
}
