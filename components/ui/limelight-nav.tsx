"use client";

import Link from "next/link";
import { cloneElement, useLayoutEffect, useRef, useState, type ReactElement, type SVGProps } from "react";

// Adapted from the "limelight nav" component: a nav bar with a light that slides to the
// active item. Changes from the original: real links (keyboard and screen-reader friendly),
// optional visible labels, a controlled `activeIndex` (so scroll position can drive it),
// the site's own colour tokens instead of shadcn's, and React 19-safe typing.

const DefaultHomeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

export type NavItem = {
  id: string | number;
  icon: ReactElement<{ className?: string }>;
  label: string;
  /** Where the item links to. Without it the item renders as a button. */
  href?: string;
  onClick?: () => void;
};

const defaultNavItems: NavItem[] = [{ id: "home", icon: <DefaultHomeIcon />, label: "Home", href: "/" }];

type LimelightNavProps = {
  items?: NavItem[];
  /** Controlled active item. `null` hides the limelight. Leave undefined for uncontrolled use. */
  activeIndex?: number | null;
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  /** Show text labels next to icons from the `md` breakpoint up. */
  showLabels?: boolean;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

/** An adaptive-width navigation bar with a "limelight" that highlights the active item. */
export const LimelightNav = ({
  items = defaultNavItems,
  activeIndex: controlled,
  defaultActiveIndex = 0,
  onTabChange,
  showLabels = false,
  className = "",
  limelightClassName = "",
  iconContainerClassName = "",
  iconClassName = "",
}: LimelightNavProps) => {
  const [uncontrolled, setUncontrolled] = useState<number | null>(defaultActiveIndex);
  const activeIndex = controlled === undefined ? uncontrolled : controlled;
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const limelight = limelightRef.current;
    if (!limelight) return;

    const place = () => {
      const activeItem = activeIndex === null ? null : navItemRefs.current[activeIndex];
      if (!activeItem) return;
      limelight.style.left = `${activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2}px`;
    };
    place();
    if (!isReady) {
      const t = window.setTimeout(() => setIsReady(true), 50);
      return () => window.clearTimeout(t);
    }
    // Re-centre when the bar changes width (labels appearing at a breakpoint, font loading).
    const observer = new ResizeObserver(place);
    if (limelight.parentElement) observer.observe(limelight.parentElement);
    return () => observer.disconnect();
  }, [activeIndex, isReady, items]);

  if (items.length === 0) return null;

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setUncontrolled(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav
      aria-label="Main"
      className={`relative inline-flex h-14 items-center rounded-full md:h-12 border border-white/10 bg-black/40 px-1.5 text-fg backdrop-blur-xl ${className}`}
    >
      {items.map(({ id, icon, label, href, onClick }, index) => {
        const isActive = activeIndex === index;
        const content = (
          <>
            {cloneElement(icon, {
              className: `h-4 w-4 shrink-0 md:h-[18px] md:w-[18px] transition-opacity duration-200 ${
                isActive ? "opacity-100" : "opacity-50"
              } ${icon.props.className ?? ""} ${iconClassName}`,
            })}
            {showLabels ? (
              <span
                className={`text-[10px] leading-none transition-colors duration-200 md:text-sm md:leading-normal ${isActive ? "text-fg" : "text-fg/60"}`}
              >
                {label}
              </span>
            ) : null}
          </>
        );
        const cls = `relative z-20 flex h-full flex-col items-center justify-center gap-1 rounded-full px-2 text-fg/80 hover:text-fg sm:px-3 md:flex-row md:gap-2 md:px-4 ${iconContainerClassName}`;
        const setRef = (el: HTMLElement | null) => {
          navItemRefs.current[index] = el;
        };
        return href ? (
          <Link
            key={id}
            ref={setRef}
            href={href}
            onClick={() => handleItemClick(index, onClick)}
            aria-label={showLabels ? undefined : label}
            aria-current={isActive ? "true" : undefined}
            className={cls}
          >
            {content}
          </Link>
        ) : (
          <button
            key={id}
            ref={setRef}
            type="button"
            onClick={() => handleItemClick(index, onClick)}
            aria-label={label}
            aria-pressed={isActive}
            className={cls}
          >
            {content}
          </button>
        );
      })}

      <div
        ref={limelightRef}
        aria-hidden
        className={`pointer-events-none absolute top-0 z-10 h-[4px] w-11 rounded-full bg-accent shadow-[0_40px_14px_rgb(110_226_106/0.55)] ${
          isReady ? "transition-[left,opacity] duration-500 ease-in-out" : ""
        } ${activeIndex === null ? "opacity-0" : "opacity-100"} ${limelightClassName}`}
        style={{ left: "-999px" }}
      >
        <div className="pointer-events-none absolute left-[-30%] top-[4px] h-10 w-[160%] bg-gradient-to-b from-accent/30 to-transparent [clip-path:polygon(5%_100%,25%_0,75%_0,95%_100%)]" />
      </div>
    </nav>
  );
};
