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
export function ScrollRevealText({ segments, className = "" }: { segments: TextSegment[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

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
