"use client";

import { motion, type TargetAndTransition } from "motion/react";
import type { ReactNode } from "react";

/*
 * Small, reusable entrance animations so each section can move differently. All run once when
 * scrolled into view. Reduced motion is handled globally by <MotionProvider> (movement is
 * dropped, opacity changes remain), so nothing here needs its own check.
 */

const EASE = [0.2, 0.7, 0.2, 1] as const;
const VIEW = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Words rise one by one from behind a mask: for headings. */
export function MaskWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={VIEW}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {/* Screen readers get the plain text once; the animated words are hidden from them. */}
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-top">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "105%" }, shown: { y: "0%" } }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

type Variant = "rise" | "pop" | "blur" | "tilt" | "slide";

const FROM: Record<Variant, TargetAndTransition> = {
  rise: { opacity: 0, y: 24 },
  pop: { opacity: 0, scale: 0.4, rotate: -90 },
  blur: { opacity: 0, y: 10, filter: "blur(8px)" },
  tilt: { opacity: 0, y: 30, rotateX: -35, scale: 0.96 },
  slide: { opacity: 0, x: -28 },
};
const TO: Record<Variant, TargetAndTransition> = {
  rise: { opacity: 1, y: 0 },
  pop: { opacity: 1, scale: 1, rotate: 0 },
  blur: { opacity: 1, y: 0, filter: "blur(0px)" },
  tilt: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
  slide: { opacity: 1, x: 0 },
};

const TAGS = { div: motion.div, li: motion.li, span: motion.span, p: motion.p } as const;

/** One element that animates in with the chosen style, after `delay` seconds. */
export function Enter({
  as = "div",
  variant = "rise",
  delay = 0,
  className,
  style,
  hidden,
  children,
}: {
  as?: keyof typeof TAGS;
  variant?: Variant;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Decorative: hide from assistive tech. */
  hidden?: boolean;
  children?: ReactNode;
}) {
  const Tag = TAGS[as];
  return (
    <Tag
      className={className}
      style={style}
      aria-hidden={hidden || undefined}
      initial={FROM[variant]}
      whileInView={TO[variant]}
      viewport={VIEW}
      transition={
        variant === "pop"
          ? { type: "spring", stiffness: 260, damping: 18, delay }
          : { duration: 0.6, ease: EASE, delay }
      }
    >
      {children}
    </Tag>
  );
}

/** Content revealed by a wipe from the bottom, with a slight zoom settling: for photos. */
export function WipeReveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={VIEW}
      transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={VIEW}
        transition={{ duration: 1.6, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** A thin line that draws from the left: for section labels. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden
      className={className}
      style={{ originX: 0 }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEW}
      transition={{ duration: 0.9, ease: EASE, delay }}
    />
  );
}
