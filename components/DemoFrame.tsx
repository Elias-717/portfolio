"use client";

import { useState } from "react";
import { DeviceFrame } from "./DeviceFrame";
import type { DemoType } from "@/data/projects";

interface Props {
  url: string;
  poster: string;
  title: string;
  type: DemoType;
}

export function DemoFrame({ url, poster, title, type }: Props) {
  const [live, setLive] = useState(false);

  if (!url) {
    return <p className="text-sm opacity-70">Demo URL not set yet (TODO).</p>;
  }

  return (
    <div className="space-y-3">
      <DeviceFrame type={type}>
        {live ? (
          <iframe
            src={url}
            title={`${title} live demo`}
            className="h-full w-full"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLive(true)}
            className="group relative block h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={poster} alt={`${title} preview`} className="h-full w-full object-cover" />
            <span className="absolute inset-0 grid place-items-center bg-black/40 font-medium text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
              Launch live demo
            </span>
          </button>
        )}
      </DeviceFrame>
      <p className="text-center text-sm">
        <a href={url} target="_blank" rel="noopener noreferrer" className="underline">
          Open in new tab
        </a>
      </p>
    </div>
  );
}
