import type { ReactNode } from "react";

export function Tag({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs ${
        accent ? "border-accent/50 text-accent" : "border-line text-muted"
      }`}
    >
      {children}
    </span>
  );
}
