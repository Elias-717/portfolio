import Link from "next/link";
import { site } from "@/data/site";
import { Logo } from "./Logo";

const nav = [
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience", hideOnMobile: true },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 rounded-full" aria-label={`${site.name}, home`}>
          <Logo size={36} priority />
          <span className="hidden font-medium tracking-tight sm:inline">{site.name}</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-4 text-sm sm:gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-muted transition hover:text-fg ${item.hideOnMobile ? "hidden md:inline" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.resume}
            download=""
            className="rounded-full border border-accent/60 px-3 py-1.5 text-accent transition hover:bg-accent hover:text-accent-ink"
          >
            Resume
            <span className="sr-only"> (PDF download)</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
