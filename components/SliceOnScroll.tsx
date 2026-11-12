"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";

// When each slice starts closing, as a fraction of the scroll through the block.
// Uneven on purpose so the bars don't close in lockstep.
const STARTS = [0.18, 0.05, 0.3, 0.12, 0.38, 0.0, 0.24, 0.1, 0.34, 0.2];

function Slice({ index, count, progress }: { index: number; count: number; progress: MotionValue<number> }) {
  const start = STARTS[index % STARTS.length];
  const scaleY = useTransform(progress, [start, start + 0.5], [0, 1]);
  return (
    <motion.div
      aria-hidden
      style={{ top: `${(index / count) * 100}%`, height: `${100 / count + 0.5}%`, scaleY }}
      className="pointer-events-none absolute inset-x-0 z-10 bg-black"
    />
  );
}

/**
 * As the block scrolls out of view, its content shrinks and dims while
 * horizontal bars grow across it, so it looks like it's slicing apart.
 * Disabled for reduced-motion visitors.
 */
export function SliceOnScroll({ children, slices = 10 }: { children: ReactNode; slices?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.3]);

  return (
    <div ref={ref} className="relative h-full overflow-hidden">
      <motion.div style={reduce ? undefined : { scale, opacity }} className="absolute inset-0 isolate origin-top">
        {children}
      </motion.div>
      {reduce
        ? null
        : Array.from({ length: slices }, (_, i) => (
            <Slice key={i} index={i} count={slices} progress={scrollYProgress} />
          ))}
    </div>
  );
}
