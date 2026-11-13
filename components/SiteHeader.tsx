import Link from "next/link";
import { site } from "@/data/site";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";

/** Floating header: logo left, glass pill nav centred, resume right. Overlays the hero. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 h-16 bg-gradient-to-b from-black/85 via-black/45 to-transparent">
      <div className="mx-auto grid h-full max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-2 px-3 sm:grid-cols-[1fr_auto_1fr] sm:px-6 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2.5 justify-self-start rounded-full"
          aria-label={`${site.name}, home`}
        >
          <Logo size={36} priority />
          <span className="hidden font-medium tracking-tight drop-shadow md:inline">{site.name}</span>
        </Link>
        <NavLinks />
        <a
          href={site.resume}
          download=""
          className="inline-flex items-center gap-1.5 justify-self-end rounded-full bg-accent px-3 py-1.5 text-[13px] font-medium sm:px-4 sm:py-2 sm:text-sm text-accent-ink shadow-[0_8px_30px_rgb(110_226_106/0.25)] transition hover:brightness-110"
        >
          <span className="sm:hidden">CV</span>
          <span className="hidden sm:inline">Resume</span>
          <span aria-hidden>↓</span>
          <span className="sr-only"> (resume PDF download)</span>
        </a>
      </div>
    </header>
  );
}
