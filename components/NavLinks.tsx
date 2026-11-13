"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type SVGProps } from "react";
import { LimelightNav, type NavItem } from "./ui/limelight-nav";

const icon = (children: React.ReactNode) =>
  function Icon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {children}
      </svg>
    );
  };

const GridIcon = icon(
  <>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </>,
);
const UserIcon = icon(
  <>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </>,
);
const BriefcaseIcon = icon(
  <>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </>,
);
const MailIcon = icon(
  <>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </>,
);

const sections = ["projects", "about", "experience", "contact"] as const;

const items: NavItem[] = [
  { id: "projects", icon: <GridIcon />, label: "Projects", href: "/#projects" },
  { id: "about", icon: <UserIcon />, label: "About", href: "/#about" },
  { id: "experience", icon: <BriefcaseIcon />, label: "Experience", href: "/#experience" },
  { id: "contact", icon: <MailIcon />, label: "Contact", href: "/#contact" },
];

/** Main nav: the limelight follows the section in view on the home page. */
export function NavLinks() {
  const pathname = usePathname();
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActive(pathname.startsWith("/projects") ? 0 : null);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(sections.indexOf(e.target.id as (typeof sections)[number]));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
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
    <LimelightNav
      items={items}
      activeIndex={active}
      onTabChange={setActive}
      showLabels
      className="justify-self-center shadow-[0_8px_30px_rgb(0_0_0/0.35)]"
    />
  );
}
