"use client";

import { useEffect, useRef } from "react";

/*
 * A "</>" built from glowing dots, floating over a perspective grid floor with drifting dust,
 * drawn on a 2D canvas with a tiny hand-rolled 3D projection (no library). Decorative only.
 *
 * Cost control: it animates only while on screen and while the tab is visible, caps the pixel
 * ratio at 2, and with prefers-reduced-motion draws a single still frame.
 */

type P3 = [number, number, number];

const ACCENT = [110, 226, 106] as const; // --color-accent
const MINT = [170, 255, 214] as const; // lighter tint for the brightest dots

/** Dots tracing the edges of thick strokes: 4 rails per stroke plus end caps, lightly jittered. */
function buildGlyph(): P3[] {
  const strokes: [number, number][][] = [
    [[-1.55, 1.35], [-3.05, 0], [-1.55, -1.35]], // <
    [[0.6, 1.6], [-0.6, -1.6]], // /
    [[1.55, 1.35], [3.05, 0], [1.55, -1.35]], // >
  ];
  const w = 0.13; // half stroke width
  const d = 0.28; // half depth
  const pts: P3[] = [];
  const jitter = () => (Math.random() - 0.5) * 0.025;
  for (const line of strokes) {
    for (let s = 0; s < line.length - 1; s++) {
      const [x0, y0] = line[s];
      const [x1, y1] = line[s + 1];
      const len = Math.hypot(x1 - x0, y1 - y0);
      const nx = -(y1 - y0) / len;
      const ny = (x1 - x0) / len;
      const steps = Math.round(len / 0.028);
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = x0 + (x1 - x0) * t;
        const y = y0 + (y1 - y0) * t;
        for (const [a, b] of [[w, d], [-w, d], [w, -d], [-w, -d]]) {
          pts.push([x + nx * a + jitter(), y + ny * a + jitter(), b + jitter()]);
        }
      }
      // Cross-section outline at each joint, so the corners read as solid.
      for (let k = 0; k < 24; k++) {
        const u = (k / 24) * 4;
        const side = Math.floor(u);
        const f = u - side;
        const a = side === 0 ? -w + 2 * w * f : side === 1 ? w : side === 2 ? w - 2 * w * f : -w;
        const b = side === 0 ? d : side === 1 ? d - 2 * d * f : side === 2 ? -d : -d + 2 * d * f;
        pts.push([x0 + nx * a, y0 + ny * a, b]);
      }
    }
  }
  // Faint dust inside the glyph's bounds.
  for (let i = 0; i < 260; i++) pts.push([(Math.random() - 0.5) * 6.6, (Math.random() - 0.5) * 3.6, (Math.random() - 0.5) * 1.2]);
  return pts;
}

export function CodeField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const glyph = buildGlyph();
    const dust: P3[] = Array.from({ length: 140 }, () => [
      (Math.random() - 0.5) * 26,
      Math.random() * 9 - 2.6,
      Math.random() * 18 - 6,
    ]);

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw(last);
    });
    ro.observe(canvas);

    // Mouse tilt, eased.
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const CAM_Z = 10;
    const FLOOR_Y = -2.6;

    const draw = (time: number) => {
      const narrow = w < 768;
      const f = Math.min(w, h * 1.6) * (narrow ? 0.95 : 0.78); // focal length in px
      // Glyph sits right of centre on wide screens, centred (and dimmer) on phones.
      const cx = w * (narrow ? 0.5 : 0.68);
      const cy = h * 0.5;
      const sec = time / 1000;

      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
      const yaw = Math.sin(sec * 0.35) * 0.45 + mx * 0.35;
      const pitch = -0.18 + Math.sin(sec * 0.27) * 0.06 + my * 0.15;
      const cyw = Math.cos(yaw);
      const syw = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      // Grid floor: lines across and into the scene, fading with distance.
      const project = (x: number, y: number, z: number) => {
        const zz = CAM_Z - z;
        return zz <= 0.2 ? null : ([cx + (x * f) / zz, cy - (y * f) / zz, zz] as const);
      };
      ctx.lineWidth = 1;
      for (let z = -6; z <= 7; z += 1) {
        const a = project(-14, FLOOR_Y, z);
        const b = project(14, FLOOR_Y, z);
        if (!a || !b) continue;
        ctx.strokeStyle = `rgba(110,226,106,${0.2 * Math.min(1, 9 / a[2]) ** 2})`;
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
        ctx.stroke();
      }
      for (let x = -14; x <= 14; x += 1) {
        const a = project(x, FLOOR_Y, -6);
        const b = project(x, FLOOR_Y, 7);
        if (!a || !b) continue;
        const g = ctx.createLinearGradient(a[0], a[1], b[0], b[1]);
        g.addColorStop(0, "rgba(110,226,106,0.07)");
        g.addColorStop(1, "rgba(110,226,106,0.22)");
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
        ctx.stroke();
      }

      // Additive blending makes overlapping dots glow.
      ctx.globalCompositeOperation = "lighter";

      // Dust drifts slowly upward and wraps.
      for (const p of dust) {
        if (!reduce) {
          p[1] += 0.004;
          if (p[1] > 6.5) p[1] = FLOOR_Y;
        }
        const q = project(p[0], p[1], p[2]);
        if (!q) continue;
        const a = Math.min(0.5, 2.2 / q[2]) * 0.6;
        ctx.fillStyle = `rgba(${ACCENT[0]},${ACCENT[1]},${ACCENT[2]},${a})`;
        ctx.fillRect(q[0], q[1], 1.4, 1.4);
      }

      // The glyph, gently bobbing above the floor.
      const bob = Math.sin(sec * 0.8) * 0.12;
      const fade = narrow ? 0.45 : 0.65; // dim enough that the intro text stays the focus
      for (const [x0, y0, z0] of glyph) {
        const x1 = x0 * cyw + z0 * syw;
        const z1 = -x0 * syw + z0 * cyw;
        const y2 = y0 * cp - z1 * sp + bob + 0.4;
        const z2 = y0 * sp + z1 * cp;
        const q = project(x1, y2, z2);
        if (!q) continue;
        const near = Math.max(0, Math.min(1, (CAM_Z + 1.2 - q[2]) / 2.4)); // 0 far … 1 near
        const c = near > 0.7 ? MINT : ACCENT;
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${(0.25 + near * 0.6) * fade})`;
        const s = 1.1 + near * 0.9;
        ctx.fillRect(q[0] - s / 2, q[1] - s / 2, s, s);
      }
    };

    // Animate only while visible on screen and the tab is in front.
    let raf = 0;
    let running = false;
    let last = 0;
    let onScreen = false;
    const loop = (t: number) => {
      last = t;
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const update = () => {
      const should = onScreen && !document.hidden && !reduce;
      if (should && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!should && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      update();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", update);
    draw(0); // first frame (and the only one with reduced motion)

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
