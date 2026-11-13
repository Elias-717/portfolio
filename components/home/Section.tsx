import type { ReactNode } from "react";
import { SectionHeading } from "@/components/SectionHeading";

/** Standard home-page section wrapper. */
export function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <div className="mx-auto max-w-[1600px] px-4 py-20 sm:px-6 lg:px-10 sm:py-28">
        <SectionHeading id={`${id}-title`} label={label} title={title} />
        {children}
      </div>
    </section>
  );
}
