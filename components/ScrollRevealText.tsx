"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

export interface TextSegment {
  text: string;
  accent?: boolean;
}

function Word({
  word,
  accent,
  range,
  progress,
}: {
  word: string;
  accent?: boolean;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "text-accent" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

/**
 * Large statement whose words light up one by one as it scrolls into view.
 * Screen readers get the plain sentence; reduced-motion visitors see it fully lit.
 */
export function ScrollRevealText({
  segments,
  className = "",
  progress,
  range = [0, 1],
}: {
  segments: TextSegment[];
  className?: string;
  /** Drive the highlight from an outside scroll progress (e.g. a pinned section) instead of this text's position. */
  progress?: MotionValue<number>;
  /** The part of `progress` over which the words light up. */
  range?: [number, number];
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: own } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const outside = useTransform(progress ?? own, (p) =>
    Math.min(1, Math.max(0, (p - range[0]) / (range[1] - range[0]))),
  );
  const scrollYProgress = progress ? outside : own;

  const words = segments.flatMap((s) =>
    s.text
      .trim()
      .split(/\s+/)
      .map((w) => ({ w, accent: s.accent })),
  );
  const plain = segments.map((s) => s.text).join("");

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden>
        {words.map(({ w, accent }, i) =>
          reduce ? (
            <span key={i} className={accent ? "text-accent" : undefined}>
              {w}{" "}
            </span>
          ) : (
            <Word
              key={i}
              word={w}
              accent={accent}
              range={[i / words.length, (i + 1) / words.length]}
              progress={scrollYProgress}
            />
          ),
        )}
      </span>
    </p>
  );
}
