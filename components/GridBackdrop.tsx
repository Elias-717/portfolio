"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Site-wide backdrop after the hero: a faint perspective grid floor that glides toward you as
 * you scroll, with sparse drifting dust. A quieter cousin of the intro's <CodeField> (no glyph),
 * so it never competes with section content. Fixed behind everything; sections with their own
 * black background (hero, projects) simply cover it.
 *
 * Cost control: hidden and paused while the hero is on screen or the tab is hidden; one still
 * frame with prefers-reduced-motion.
 */

const CAM_Z = 10;
const FLOOR_Y = -2.6;
const GRID_ALPHA = 0.12; // keep this faint: content sits on top
const DUST_ALPHA = 0.35;

export function GridBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dust = Array.from({ length: 70 }, () => [
      (Math.random() - 0.5) * 26,
      Math.random() * 9 - 2.6,
      Math.random() * 16 - 6,
    ]);

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      const f = Math.min(w, h * 1.6) * 0.8;
      const cx = w / 2;
      const cy = h * 0.42; // horizon a little above centre
      const project = (x: number, y: number, z: number) => {
        const zz = CAM_Z - z;
        return zz <= 0.3 ? null : ([cx + (x * f) / zz, cy - (y * f) / zz, zz] as const);
      };
      // Scrolling moves you forward over the floor (wraps every grid cell).
      const travel = reduce ? 0 : (window.scrollY * 0.004) % 1;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = 1;
      for (let i = -7; i <= 8; i++) {
        const z = i + travel;
        const a = project(-16, FLOOR_Y, z);
        const b = project(16, FLOOR_Y, z);
        if (!a || !b) continue;
        ctx.strokeStyle = `rgba(110,226,106,${GRID_ALPHA * Math.min(1, 8 / a[2]) ** 1.5})`;
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
        ctx.stroke();
      }
      for (let x = -16; x <= 16; x++) {
        const a = project(x, FLOOR_Y, -7);
        const b = project(x, FLOOR_Y, 9);
        if (!a || !b) continue;
        const g = ctx.createLinearGradient(a[0], a[1], b[0], b[1]);
        g.addColorStop(0, "rgba(110,226,106,0.05)");
        g.addColorStop(1, `rgba(110,226,106,${GRID_ALPHA * 1.4})`);
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "lighter";
      for (const p of dust) {
        const q = project(p[0], p[1], p[2]);
        if (!q) continue;
        ctx.fillStyle = `rgba(110,226,106,${Math.min(DUST_ALPHA, 2 / q[2])})`;
        ctx.fillRect(q[0], q[1], 1.3, 1.3);
      }
    };

    // Run only while the hero is off screen and the tab is visible.
    let raf = 0;
    let running = false;
    let heroOnScreen = true;
    const loop = () => {
      for (const p of dust) {
        p[1] += 0.003;
        if (p[1] > 6.5) p[1] = FLOOR_Y;
      }
      draw();
      raf = requestAnimationFrame(loop);
    };
    const update = () => {
      setVisible(!heroOnScreen);
      const should = !heroOnScreen && !document.hidden && !reduce;
      if (should && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!should && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const hero = document.querySelector('section[aria-labelledby="hero-title"]');
    const io = new IntersectionObserver(([e]) => {
      heroOnScreen = e.isIntersecting;
      update();
    });
    if (hero) io.observe(hero);
    else {
      heroOnScreen = false;
      update();
    }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", update);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none fixed inset-0 -z-10 h-full w-full transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
