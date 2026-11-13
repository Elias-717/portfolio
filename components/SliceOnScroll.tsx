"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { createContext, useEffect, useRef, useState, type ReactNode } from "react";

/** Scroll progress (0 to 1) of the pinned block, for content revealed inside it. */
export const PinProgressContext = createContext<MotionValue<number> | null>(null);

/** Space kept between the end of the revealed content and whatever follows the pinned block. */
const AFTER_GAP = 8;

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
  reveal,
  revealReduced,
  slices = 10,
  frameClassName = "h-svh",
}: {
  children: ReactNode;
  /** Content that fades in inside the frame as the slicing finishes (e.g. the next section). */
  reveal?: ReactNode;
  /** The same content for reduced-motion visitors, shown after the frame in normal flow. */
  revealReduced?: ReactNode;
  slices?: number;
  frameClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.3]);
  // Function transforms (not range arrays) so Motion keeps these on the JS path that tracks
  // the pinned scroll range exactly; the browser-accelerated path got the end state wrong.
  const revealT = (p: number) => Math.min(1, Math.max(0, (p - 0.45) / 0.3));
  const revealOpacity = useTransform(scrollYProgress, (p) => revealT(p));
  const revealY = useTransform(scrollYProgress, (p) => 40 * (1 - revealT(p)));
  const revealPointer = useTransform(scrollYProgress, (p) => (p > 0.6 ? "auto" : "none"));

  // The revealed content is centred in a full-screen frame, which leaves empty black below it.
  // Measure that empty space and pull the next section up into it (negative margin), so the
  // next section starts AFTER_GAP below the content at any screen height. It only overlaps the
  // frame's empty part, and only once the pin has ended.
  const frameRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const [pullUp, setPullUp] = useState(0);
  useEffect(() => {
    const frame = frameRef.current;
    const content = revealRef.current?.querySelector<HTMLElement>("[data-reveal-content]");
    if (!frame || !content || reduce) {
      setPullUp(0);
      return;
    }
    const measure = () => {
      const bottom = content.offsetTop + content.offsetHeight; // layout position, ignores the fade-in offset
      setPullUp(Math.max(0, Math.round(frame.clientHeight - bottom - AFTER_GAP)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    observer.observe(content);
    return () => observer.disconnect();
  }, [reduce]);

  // Extra scroll room (90svh) for the pin comes from a spacer element after the frame: a sticky
  // element can only travel within its parent's content box, so padding would not work. It is a
  // CSS class rather than a JS check, so the server-rendered page already has it; reduced-motion
  // visitors get no pin.
  return (
    <div ref={ref} className="relative" style={pullUp ? { marginBottom: -pullUp } : undefined}>
      <div ref={frameRef} className={`sticky top-0 overflow-hidden bg-black ${frameClassName}`}>
        <motion.div style={reduce ? undefined : { scale, opacity }} className="absolute inset-0 isolate origin-top">
          {children}
        </motion.div>
        {reduce
          ? null
          : Array.from({ length: slices }, (_, i) => (
              <Slice key={i} index={i} count={slices} progress={scrollYProgress} />
            ))}
        {reveal ? (
          <motion.div
            ref={revealRef}
            style={{ opacity: revealOpacity, y: revealY, pointerEvents: revealPointer }}
            className="absolute inset-0 z-20 motion-reduce:hidden"
          >
            <PinProgressContext.Provider value={scrollYProgress}>{reveal}</PinProgressContext.Provider>
          </motion.div>
        ) : null}
      </div>
      <div aria-hidden className="h-[90svh] motion-reduce:hidden" />
      {revealReduced ? <div className="hidden motion-reduce:block">{revealReduced}</div> : null}
    </div>
  );
}
