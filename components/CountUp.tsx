"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * A number that counts up once when it scrolls into view. The server renders the final
 * value (so it is correct without JavaScript and for crawlers); reduced-motion visitors
 * just see the final value.
 */
export function CountUp({ value, decimals = 0, duration = 1.4 }: { value: number; decimals?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const [armed, setArmed] = useState(false);

  // Before it is seen, reset to zero so the count-up has somewhere to start from.
  useEffect(() => {
    if (reduce || inView) return;
    setShown(0);
    setArmed(true);
  }, [reduce, inView]);

  useEffect(() => {
    if (!armed || !inView) return;
    const controls = animate(0, value, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: setShown });
    return () => controls.stop();
  }, [armed, inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown.toFixed(decimals)}
    </span>
  );
}
