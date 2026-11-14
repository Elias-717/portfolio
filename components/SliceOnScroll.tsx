"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { createContext, useEffect, useRef, useState, type ReactNode } from "react";

/** Scroll progress (0 to 1) of the pinned block, for content revealed inside it. */
export const PinProgressContext = createContext<MotionValue<number> | null>(null);

/** Space kept between the end of the revealed content and whatever follows the pinned block. */
const AFTER_GAP = 8;

// Blinds close top to bottom, one after another. The first starts at FIRST, each next one
// STAGGER later, and each takes DURATION. All are closed by ~0.5 of the pinned stretch,
// just as the next section starts fading in.
const FIRST = 0;
const STAGGER = 0.04;
const DURATION = 0.3;

/** Ease-out (cubic): moves straight away on the first scroll tick, then settles into place. */
const ease = (t: number) => 1 - (1 - t) ** 3;

function Slice({ index, count, progress }: { index: number; count: number; progress: MotionValue<number> }) {
  const start = FIRST + index * STAGGER;
  // Function transform: a 0..1 eased fill, mapped to a slide down from above the band.
  const y = useTransform(progress, (p) => {
    const t = Math.min(1, Math.max(0, (p - start) / DURATION));
    return `${-100 * (1 - ease(t))}%`;
  });
  return (
    // The band clips a black panel that slides down into it. Sliding (not scaling) keeps
    // the panel's soft leading edge the same size the whole way, and is cheap to animate.
    <div
      aria-hidden
      style={{ top: `${(index / count) * 100}%`, height: `calc(${100 / count}% + 1px)` }}
      className="pointer-events-none absolute inset-x-0 z-10 overflow-hidden"
    >
      {/* The panel is the band's height plus its 2rem soft edge, so at -100% the edge is
          fully hidden too (the hero looks untouched at rest), and at 0 the edge hangs
          below the band where overflow-hidden clips it, leaving the band solid black. */}
      <motion.div
        style={{ y, background: "linear-gradient(to bottom, #000 calc(100% - 2rem), transparent)" }}
        className="absolute inset-x-0 top-0 h-[calc(100%+2rem)] will-change-transform"
      />
    </div>
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
  slices = 6,
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
