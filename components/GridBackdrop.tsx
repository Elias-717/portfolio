"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Site-wide backdrop after the hero, in the same glowing-dot style as the intro's <CodeField>:
 * - a faint perspective grid floor that glides toward you as you scroll, with drifting dust;
 * - 3D dot shapes (sphere, cube, ring, helix, wave) anchored down the page at the right edge,
 *   each with its own motion, passing by as you move between sections.
 * Fixed behind everything; sections with their own black background (hero, projects) cover it.
 *
 * Cost control: shape points are built once; only shapes on screen are drawn (at most ~1k dots a
 * frame, half on phones); hidden and paused while the hero is on screen or the tab is hidden.
 * With prefers-reduced-motion nothing animates: the scene is redrawn only when you scroll.
 */

const CAM_Z = 10;
const FLOOR_Y = -2.6;
const GRID_ALPHA = 0.12; // keep this faint: content sits on top
const DUST_ALPHA = 0.35;
const SHAPE_ALPHA = 0.55; // overall brightness of the dot shapes
const SHAPE_SPACING = 950; // page pixels between shapes
const PARALLAX = 0.85; // shapes scroll a little slower than the page

type Shape = "sphere" | "cube" | "ring" | "helix" | "wave";
const ORDER: Shape[] = ["sphere", "cube", "ring", "helix", "wave"];

/* Point clouds, roughly within a unit sphere, as flat [x, y, z, x, y, z, …] arrays. */
function build(shape: Shape): Float32Array {
  const pts: number[] = [];
  const push = (x: number, y: number, z: number) => pts.push(x, y, z);
  if (shape === "sphere") {
    // Even spread over a sphere (Fibonacci lattice).
    const n = 420;
    for (let i = 0; i < n; i++) {
      const y = 1 - (2 * (i + 0.5)) / n;
      const r = Math.sqrt(1 - y * y);
      const a = i * 2.39996;
      push(Math.cos(a) * r, y, Math.sin(a) * r);
    }
  } else if (shape === "cube") {
    // Dotted edges of a cube.
    const s = 0.62;
    const corners = [-s, s];
    for (const a of corners)
      for (const b of corners)
        for (let k = 0; k <= 28; k++) {
          const t = -s + (2 * s * k) / 28;
          push(t, a, b);
          push(a, t, b);
          push(a, b, t);
        }
  } else if (shape === "ring") {
    // Torus.
    for (let i = 0; i < 52; i++)
      for (let j = 0; j < 9; j++) {
        const u = (i / 52) * Math.PI * 2;
        const v = (j / 9) * Math.PI * 2;
        const r = 0.78 + 0.22 * Math.cos(v);
        push(Math.cos(u) * r, 0.22 * Math.sin(v), Math.sin(u) * r);
      }
  } else if (shape === "helix") {
    // Double helix with rungs.
    for (let i = 0; i <= 150; i++) {
      const t = i / 150;
      const a = t * Math.PI * 4;
      const y = (t - 0.5) * 2.2;
      push(Math.cos(a) * 0.5, y, Math.sin(a) * 0.5);
      push(Math.cos(a + Math.PI) * 0.5, y, Math.sin(a + Math.PI) * 0.5);
      if (i % 10 === 0)
        for (let k = 1; k < 8; k++) {
          const f = k / 8;
          push(Math.cos(a) * 0.5 * (1 - 2 * f), y, Math.sin(a) * 0.5 * (1 - 2 * f));
        }
    }
  } else {
    // Wave surface: a flat grid of points; its height is animated per frame.
    for (let i = 0; i < 22; i++) for (let j = 0; j < 22; j++) push(i / 10.5 - 1, 0, j / 10.5 - 1);
  }
  return new Float32Array(pts);
}

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
    const clouds = Object.fromEntries(ORDER.map((s) => [s, build(s)])) as Record<Shape, Float32Array>;

    // Where each shape sits on the page: from the About section to the end, every SHAPE_SPACING.
    let anchors: { shape: Shape; y: number; left: boolean }[] = [];
    const placeShapes = () => {
      const start = (document.getElementById("about")?.getBoundingClientRect().top ?? 0) + window.scrollY;
      const end = document.documentElement.scrollHeight;
      anchors = [];
      for (let y = start + 300, i = 0; y < end; y += SHAPE_SPACING, i++) {
        anchors.push({ shape: ORDER[i % ORDER.length], y, left: i % 2 === 1 });
      }
    };

    let w = 0;
    let h = 0;
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      placeShapes();
      draw(0);
    };

    /** One dot shape at screen (sx, sy) with radius R, rotated and animated for time t. */
    const drawShape = (shape: Shape, sx: number, sy: number, R: number, t: number, scroll: number, stride: number) => {
      const pts = clouds[shape];
      // Each shape has its own motion.
      let rx = 0.35;
      let ry = t * 0.25;
      let rz = 0;
      if (shape === "cube") [rx, ry, rz] = [t * 0.31, t * 0.23, t * 0.17];
      if (shape === "ring") [rx, ry, rz] = [1.1 + Math.sin(t * 0.6) * 0.25, t * 0.5, 0.2];
      if (shape === "helix") [rx, ry, rz] = [0.15, scroll * 0.004 + t * 0.15, 0.3]; // twists as you scroll
      if (shape === "wave") [rx, ry, rz] = [0.95, t * 0.1, 0];
      const [cx, sxr] = [Math.cos(rx), Math.sin(rx)];
      const [cy, syr] = [Math.cos(ry), Math.sin(ry)];
      const [cz, szr] = [Math.cos(rz), Math.sin(rz)];
      for (let i = 0; i < pts.length; i += 3 * stride) {
        const x0 = pts[i];
        const z0 = pts[i + 2];
        const y0 = shape === "wave" ? 0.18 * Math.sin(3 * x0 + t * 1.6) * Math.cos(3 * z0 + t * 1.2) : pts[i + 1];
        // Rotate around Y, then X, then Z.
        const x1 = x0 * cy + z0 * syr;
        const z1 = -x0 * syr + z0 * cy;
        const y2 = y0 * cx - z1 * sxr;
        const z2 = y0 * sxr + z1 * cx;
        const x3 = x1 * cz - y2 * szr;
        const y3 = x1 * szr + y2 * cz;
        const p = 3.2 / (3.2 + z2); // perspective
        const near = (1 - z2) / 2; // 0 back … 1 front
        const a = SHAPE_ALPHA * (0.25 + near * 0.75);
        ctx.fillStyle = near > 0.8 ? `rgba(170,255,214,${a})` : `rgba(110,226,106,${a})`;
        const size = 1 + near * 1.1;
        ctx.fillRect(sx + x3 * R * p - size / 2, sy - y3 * R * p - size / 2, size, size);
      }
    };

    const draw = (time: number) => {
      const t = reduce ? 0 : time / 1000;
      const scroll = window.scrollY;
      const f = Math.min(w, h * 1.6) * 0.8;
      const hx = w / 2;
      const hy = h * 0.42; // horizon a little above centre
      const project = (x: number, y: number, z: number) => {
        const zz = CAM_Z - z;
        return zz <= 0.3 ? null : ([hx + (x * f) / zz, hy - (y * f) / zz, zz] as const);
      };
      const travel = reduce ? 0 : (scroll * 0.004) % 1; // forward motion over the floor

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

      // Additive blending makes overlapping dots glow.
      ctx.globalCompositeOperation = "lighter";
      for (const p of dust) {
        const q = project(p[0], p[1], p[2]);
        if (!q) continue;
        ctx.fillStyle = `rgba(110,226,106,${Math.min(DUST_ALPHA, 2 / q[2])})`;
        ctx.fillRect(q[0], q[1], 1.3, 1.3);
      }

      // Dot shapes at the right edge (both margins on very wide screens), drawn only on screen.
      const narrow = w < 900;
      const margin = (w - 1600) / 2;
      const bothSides = margin > 260;
      const R = narrow ? 70 : Math.min(170, Math.max(110, w * 0.09));
      const stride = narrow ? 2 : 1; // half the dots on phones
      for (const a of anchors) {
        const sy = a.y - scroll * PARALLAX - (h * (1 - PARALLAX)) / 2;
        if (sy < -R * 1.5 || sy > h + R * 1.5) continue;
        const sx = bothSides
          ? a.left
            ? margin / 2
            : w - margin / 2
          : w - R * (narrow ? 0.35 : 0.6); // partly off the edge, so it never sits behind text
        drawShape(a.shape, sx, sy, R, t, scroll, stride);
      }
    };

    // Animate only while the hero is off screen and the tab is visible.
    let raf = 0;
    let running = false;
    let heroOnScreen = true;
    const loop = (time: number) => {
      for (const p of dust) {
        p[1] += 0.003;
        if (p[1] > 6.5) p[1] = FLOOR_Y;
      }
      draw(time);
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
    // With reduced motion there is no loop, so keep shapes in step with the page on scroll.
    let pending = false;
    const onScroll = () => {
      if (running || pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        draw(0);
      });
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
    // Section heights can change after images load; re-place shapes when the page resizes.
    const ro = new ResizeObserver(placeShapes);
    ro.observe(document.body);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", update);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
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
