/** Clearly marked TODO box for content or assets that haven't been provided yet. */
export function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`grid place-items-center rounded-xl border border-dashed border-line bg-surface p-6 text-center font-mono text-xs text-muted ${className}`}
    >
      TODO: {label}
    </div>
  );
}
