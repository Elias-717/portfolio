import { DrawLine, Enter, MaskWords } from "@/components/Animate";

/** Section label + heading. The label slides in behind a drawn line; the title rises word by word. */
export function SectionHeading({ label, title, id }: { label: string; title: string; id?: string }) {
  return (
    <div className="mb-10 sm:mb-14">
      <div className="flex items-center gap-3">
        <DrawLine className="block h-px w-8 bg-accent" />
        <Enter as="p" variant="slide" delay={0.15} className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {label}
        </Enter>
      </div>
      <h2 id={id} className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1] tracking-[-0.04em]">
        <MaskWords text={title} delay={0.1} />
      </h2>
    </div>
  );
}
