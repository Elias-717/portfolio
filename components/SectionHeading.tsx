/** Numbered section label + heading, e.g. "01 / Projects". */
export function SectionHeading({
  index,
  label,
  title,
  id,
}: {
  index: string;
  label: string;
  title: string;
  id?: string;
}) {
  return (
    <div className="mb-10 sm:mb-14">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {index} / {label}
      </p>
      <h2 id={id} className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
