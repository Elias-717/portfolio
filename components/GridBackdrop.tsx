"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Site-wide backdrop after the hero: a faint perspective grid floor that glides toward you as
 * you scroll, sparse drifting dust, and faint binary/hex bytes that float past in the side
 * gutters at different speeds (parallax), with the odd bit flipping. A quieter cousin of the intro's <CodeField> (no glyph),
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
const CODE_ALPHA = 0.16; // floating bytes: decoration, never competing with content

/** A random fragment of data: binary bytes, hex bytes, or a single 0x value. */
function makeBytes(): string {
  const byte = () => Math.floor(Math.random() * 256);
  const bin = (n: number) => n.toString(2).padStart(8, "0");
  const hex = (n: number) => n.toString(16).toUpperCase().padStart(2, "0");
  const kind = Math.random();
  const count = 1 + Math.floor(Math.random() * 3);
  if (kind < 0.45) return Array.from({ length: count }, () => bin(byte())).join(" ");
  if (kind < 0.85) return Array.from({ length: count + 2 }, () => hex(byte())).join(" ");
  return `0x${hex(byte())}${hex(byte())}`;
}
const BYTE_COUNT = 18;

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

    // Floating bytes: each sits in a side gutter at a random height and depth. Deeper ones are
    // smaller, fainter and scroll more slowly (parallax).
    const mono = (() => {
      const probe = document.createElement("span");
      probe.className = "font-mono";
      document.body.appendChild(probe);
      const family = getComputedStyle(probe).fontFamily;
      probe.remove();
      return family || "monospace";
    })();
    const code = Array.from({ length: BYTE_COUNT }, (_, i) => ({
      text: makeBytes(),
      accent: Math.random() < 0.3, // some fragments glow green
      left: i % 2 === 0, // alternate gutters
      x: Math.random(), // position inside the gutter
      y: (i + 0.3 + Math.random() * 0.4) / BYTE_COUNT, // own vertical slot, so fragments never pile up
      depth: 0.25 + Math.random() * 0.75, // 0.25 far … 1 near (size and brightness)
    }));

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

      // Floating bytes, in the side gutters on wide screens (fewer and fainter on phones).
      ctx.globalCompositeOperation = "source-over";
      ctx.textBaseline = "middle";
      const narrow = w < 900;
      // Real empty margin either side of the 1600px content column (only on very wide screens).
      const margin = (w - 1600) / 2;
      const bothSides = margin > 200;
      const gutter = bothSides ? margin : Math.max(160, w * 0.2);
      const span = h + 240; // wrap distance
      const scroll = reduce ? 0 : window.scrollY;
      code.forEach((c, i) => {
        if (narrow && i % 3 !== 0) return;
        const size = Math.round(10 + c.depth * 5);
        const yy = (((c.y * span - scroll * (0.3 + c.depth * 0.06)) % span) + span) % span - 120;
        const alpha = (narrow ? 0.5 : 1) * CODE_ALPHA * (0.45 + c.depth * 0.55);
        ctx.font = `${size}px ${mono}`;
        // Keep the text inside its gutter.
        const width = ctx.measureText(c.text).width;
        const room = Math.max(0, gutter - width - 24);
        let xx = 16 + c.x * room;
        // Right edge by default (sections leave it mostly empty); left too only when there is a
        // genuine margin; on phones, hugging the right edge.
        if (!(bothSides && c.left)) xx = w - 16 - width - c.x * room;
        if (narrow) xx = w - 12 - width - c.x * 24;
        // Soft fade in and out at the top and bottom of the screen.
        const edge = Math.min(1, Math.max(0, Math.min(yy, h - yy) / 140));
        ctx.fillStyle = c.accent
          ? `rgba(110,226,106,${alpha * 1.2 * edge})`
          : `rgba(238,242,238,${alpha * edge})`;
        ctx.fillText(c.text, xx, yy);
      });
    };

    // Run only while the hero is off screen and the tab is visible.
    let raf = 0;
    let running = false;
    let heroOnScreen = true;
    const loop = () => {
      // Now and then a bit flips (or a hex digit changes), so the data feels live.
      if (Math.random() < 0.08) {
        const c = code[Math.floor(Math.random() * code.length)];
        const chars = [...c.text];
        const from = Math.floor(Math.random() * chars.length);
        // First digit at or after a random position (skipping the "0x" prefix).
        const idx = chars.findIndex((ch, j) => j >= from && j > (c.text.startsWith("0x") ? 1 : -1) && /[0-9A-F]/.test(ch));
        if (idx >= 0) {
          const isBin = /^[01 ]+$/.test(c.text);
          chars[idx] = isBin ? (chars[idx] === "0" ? "1" : "0") : "0123456789ABCDEF"[Math.floor(Math.random() * 16)];
          c.text = chars.join("");
        }
      }
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
