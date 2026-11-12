"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import type { ReactNode } from "react";

/** Keeps v inside [min, max) so the track loops seamlessly. */
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Horizontal banner that drifts slowly to the left and speeds up with scroll
 * velocity (scrolling up or down). The children are rendered twice; moving the
 * track by half its width loops it. Stays still for reduced-motion visitors.
 */
export function VelocityMarquee({
  children,
  className = "",
  /** Base drift in percent of the track per second. 1 ≈ one loop every 50s. */
  speed = 1,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  // ~1000px/s of scrolling makes the banner move about 5x faster.
  const boost = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const step = speed * (delta / 1000);
    baseX.set(baseX.get() - step * (1 + Math.abs(boost.get())));
  });

  return (
    <motion.div style={{ x }} className={`flex w-max ${className}`}>
      {children}
      {children}
    </motion.div>
  );
}
