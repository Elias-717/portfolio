/** Section label + heading. */
export function SectionHeading({ label, title, id }: { label: string; title: string; id?: string }) {
  return (
    <div className="mb-10 sm:mb-14">
      <div className="flex items-center gap-3">
        <span aria-hidden className="block h-px w-8 bg-accent" />
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{label}</p>
      </div>
      <h2 id={id} className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1] tracking-[-0.04em]">
        {title}
      </h2>
    </div>
  );
}
