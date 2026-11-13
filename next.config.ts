import type { NextConfig } from "next";
import { projects } from "./data/projects";

const isDev = process.env.NODE_ENV !== "production";

/** Origins the live-demo iframes may load, taken from the project data so new demos stay allowed. */
const demoOrigins = Array.from(
  new Set(
    projects
      .flatMap((p) => [p.demo.url, p.links.guest])
      .filter((u): u is string => !!u)
      .map((u) => new URL(u).origin),
  ),
);

/**
 * Content-Security-Policy. Next.js hydrates static pages with inline scripts, so
 * script-src needs 'unsafe-inline' (nonces would force every page to render dynamically).
 * The rest is locked to this site, Formspree for the contact form, and the demo origins.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self'",
  `connect-src 'self' https://formspree.io${isDev ? " ws:" : ""}`,
  `frame-src ${demoOrigins.join(" ") || "'none'"}`,
  "form-action 'self' https://formspree.io",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  // Only on Vercel (always HTTPS); on plain-http localhost it would break `next start`.
  ...(process.env.VERCEL ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
