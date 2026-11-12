import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:brightness-110",
  ghost: "border border-line text-fg hover:border-accent hover:text-accent",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition";

/** Link styled as a button. External or download links render a plain <a>. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  download = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  download?: boolean;
  className?: string;
}) {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (external || download) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: "" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
