"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/projects";
import { DeviceFrame } from "./DeviceFrame";
import { FullscreenDemo } from "./FullscreenDemo";
import { Placeholder } from "./Placeholder";

type Mode = "poster" | "live" | "video";

const SANDBOX = "allow-scripts allow-same-origin allow-forms allow-popups";

const btn =
  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition";

/**
 * Poster first. The iframe only loads after "Launch live demo" is clicked (desktop),
 * or inside a full-screen view (small screens). An "Open in new tab" link and the
 * recording, when available, are always offered as fallbacks.
 */
export function DemoFrame({ project }: { project: Project }) {
  const { demo, title } = project;
  const [mode, setMode] = useState<Mode>("poster");
  const [fullscreen, setFullscreen] = useState(false);

  if (demo.type === "none") return null;

  const src = project.links.guest ?? demo.url;
  const frameType = demo.type;
  const host = src ? new URL(src).host : undefined;

  const screen = (() => {
    if (mode === "live" && src) {
      return (
        <iframe
          src={src}
          title={`${title}: live demo`}
          className="absolute inset-0 h-full w-full bg-white"
          sandbox={SANDBOX}
          referrerPolicy="strict-origin-when-cross-origin"
        />
      );
    }
    if (mode === "video" && demo.video) {
      return (
        <video
          src={demo.video}
          poster={demo.poster}
          controls
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full bg-black object-contain"
          aria-label={`${title}: screen recording`}
        />
      );
    }
    if (demo.poster) {
      return (
        <Image
          src={demo.poster}
          alt={`${title} screenshot`}
          fill
          sizes={frameType === "phone" ? "300px" : "(min-width: 1024px) 960px, 100vw"}
          className="object-cover object-top"
        />
      );
    }
    return <Placeholder label={`${title} poster image`} className="absolute inset-0 rounded-none border-0" />;
  })();

  return (
    <div className="space-y-5">
      <DeviceFrame type={frameType} address={host}>
        {screen}
      </DeviceFrame>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {src && mode !== "live" ? (
          <button
            type="button"
            onClick={() => setMode("live")}
            className={`${btn} hidden bg-accent text-accent-ink hover:brightness-110 md:inline-flex`}
          >
            ▶ Launch live demo
          </button>
        ) : null}
        {src ? (
          <button
            type="button"
            onClick={() => setFullscreen(true)}
            className={`${btn} bg-accent text-accent-ink hover:brightness-110 md:border md:border-line md:bg-transparent md:text-fg md:hover:border-accent md:hover:text-accent`}
          >
            Open full screen
          </button>
        ) : null}
        {demo.video && mode !== "video" ? (
          <button
            type="button"
            onClick={() => setMode("video")}
            className={`${btn} border border-line hover:border-accent hover:text-accent`}
          >
            Watch recording
          </button>
        ) : null}
        {mode !== "poster" ? (
          <button
            type="button"
            onClick={() => setMode("poster")}
            className={`${btn} border border-line text-muted hover:text-fg`}
          >
            Close demo
          </button>
        ) : null}
        {src ? (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted underline underline-offset-4 hover:text-accent"
          >
            Open in new tab ↗
          </a>
        ) : null}
      </div>

      {!src ? (
        <p className="text-center text-sm text-muted">
          {project.status === "in-development"
            ? "No browser demo yet: Brokely is an Android app, with release 0.1 in testing."
            : "Live demo link coming soon."}
        </p>
      ) : null}
      {mode === "live" ? (
        <p className="text-center text-xs text-muted">
          Blank frame? The site may block embedding. Open it in a new tab
          {demo.video ? " or watch the recording" : ""} instead.
        </p>
      ) : null}

      {src ? (
        <FullscreenDemo
          open={fullscreen}
          onClose={() => setFullscreen(false)}
          src={src}
          title={`${title}: live demo`}
          sandbox={SANDBOX}
        />
      ) : null}
    </div>
  );
}
