"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";

// When each slice starts closing, as a fraction of the scroll through the block.
// Uneven on purpose so the bars don't close in lockstep.
const STARTS = [0.12, 0.03, 0.2, 0.08, 0.26, 0.0, 0.16, 0.06, 0.23, 0.13];

function Slice({ index, count, progress }: { index: number; count: number; progress: MotionValue<number> }) {
  const start = STARTS[index % STARTS.length];
  // Every bar is closed by ~70% of the pinned stretch, so the frame is black just as the next section arrives.
  const scaleY = useTransform(progress, [start, start + 0.42], [0, 1]);
  return (
    <motion.div
      aria-hidden
      style={{ top: `${(index / count) * 100}%`, height: `${100 / count + 0.5}%`, scaleY }}
      className="pointer-events-none absolute inset-x-0 z-10 bg-black"
    />
  );
}

/**
 * Pins its content for a short stretch of scrolling. While pinned, the content shrinks
 * and dims and horizontal bars grow across it until it's fully sliced away, so the
 * effect plays on screen in both scroll directions. `frameClassName` sizes the pinned
 * frame (e.g. "h-svh"). Reduced-motion visitors get the content without pinning or bars.
 */
export function SliceOnScroll({
  children,
  slices = 10,
  frameClassName = "h-svh",
}: {
  children: ReactNode;
  slices?: number;
  frameClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.3]);

  // Extra scroll room (60svh) for the pin comes from a spacer element after the frame: a sticky
  // element can only travel within its parent's content box, so padding would not work. It is a
  // CSS class rather than a JS check, so the server-rendered page already has it; reduced-motion
  // visitors get no pin.
  return (
    <div ref={ref} className="relative">
      <div className={`sticky top-0 overflow-hidden bg-black ${frameClassName}`}>
        <motion.div style={reduce ? undefined : { scale, opacity }} className="absolute inset-0 isolate origin-top">
          {children}
        </motion.div>
        {reduce
          ? null
          : Array.from({ length: slices }, (_, i) => (
              <Slice key={i} index={i} count={slices} progress={scrollYProgress} />
            ))}
      </div>
      <div aria-hidden className="h-[60svh] motion-reduce:hidden" />
    </div>
  );
}
