"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "copied" | "failed";

/**
 * The email as the main call to action: the address opens the visitor's mail app (with a green
 * underline that draws in on hover/focus), and a chip beside it copies it to the clipboard.
 * The result is announced to screen readers.
 */
export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 2200);
  };

  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
      <a
        href={`mailto:${email}`}
        className="group relative inline-block break-all pb-1 text-2xl font-semibold tracking-tight transition-colors hover:text-accent focus-visible:text-accent sm:text-3xl"
      >
        {email}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy email address ${email}`}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
          status === "copied"
            ? "border-accent bg-accent text-accent-ink"
            : "border-line text-fg hover:border-accent hover:text-accent"
        }`}
      >
        {status === "copied" ? (
          <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M5 12.5 10 17l9-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75}>
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
          </svg>
        )}
        {status === "copied" ? "Copied" : status === "failed" ? "Press Ctrl+C" : "Copy"}
      </button>
      <span role="status" className="sr-only">
        {status === "copied" ? "Email address copied to clipboard." : status === "failed" ? "Could not copy. Select the address to copy it." : ""}
      </span>
    </div>
  );
}
