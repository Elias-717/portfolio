"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience", hideOnMobile: true },
  { id: "contact", label: "Contact" },
];

/** Centred glass pill. On the home page, the link for the section in view gets a sliding highlight. */
export function NavLinks() {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActive(pathname.startsWith("/projects") ? "projects" : null);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const els = links.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el);
    els.forEach((el) => observer.observe(el));
    const onTop = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive(null);
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [pathname]);

  return (
    <nav
      aria-label="Main"
      className="justify-self-center rounded-full border border-white/10 bg-black/40 p-1 shadow-[0_8px_30px_rgb(0_0_0/0.35)] backdrop-blur-xl"
    >
      <ul className="flex items-center">
        {links.map((l) => {
          const isActive = active === l.id;
          return (
            <li key={l.id} className={l.hideOnMobile ? "hidden md:block" : undefined}>
              <Link
                href={`/#${l.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative block rounded-full px-3 py-1.5 text-sm transition-colors sm:px-4 ${
                  isActive ? "text-fg" : "text-fg/65 hover:text-fg"
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    className="absolute inset-0 -z-10 rounded-full bg-white/12"
                  />
                ) : null}
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
