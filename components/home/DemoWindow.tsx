"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { TapeItem } from "./ProjectTape";

const SANDBOX = "allow-scripts allow-same-origin allow-forms allow-popups";

/**
 * Pop-up "browser window" for a project. Shows the live demo in an iframe when the
 * project has one; otherwise the full cover with a link out. Uses <dialog> for focus
 * trapping and Escape-to-close. The iframe only exists while the window is open.
 */
export function DemoWindow({ item, onClose }: { item: TapeItem | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [loaded, setLoaded] = useState(false);
  // The iframe is only created once the window is actually open; a frame created while
  // the dialog is still hidden can be deferred by the browser's lazy-loading.
  const [shown, setShown] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    setLoaded(false);
    setSlow(false);
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
    setShown(!!item);
    if (!item) return;
    const timer = window.setTimeout(() => setSlow(true), 8000);
    return () => window.clearTimeout(timer);
  }, [item]);

  const host = item?.demoUrl ? new URL(item.demoUrl).host : item?.title;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // click on the backdrop
      }}
      aria-label={item ? `${item.title}: live demo` : "Project demo"}
      className="window-in m-auto h-[86vh] w-[min(92vw,80rem)] max-w-none overflow-hidden rounded-2xl border border-white/10 bg-surface p-0 text-fg shadow-[0_40px_120px_rgb(0_0_0/0.7)]"
    >
      {item ? (
        <div className="flex h-full flex-col">
          {/* Window chrome */}
          <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-2.5">
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="h-3 w-3 rounded-full bg-[#ff5f57] hover:brightness-110"
              />
              <span aria-hidden className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span aria-hidden className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <p className="min-w-0 flex-1 truncate rounded-md bg-bg px-3 py-1 text-center font-mono text-xs text-muted">
              {host}
            </p>
            {item.demoUrl ? (
              <a
                href={item.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden text-xs text-muted underline underline-offset-4 hover:text-accent sm:inline"
              >
                Open in new tab ↗
              </a>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-line px-3 py-1 text-xs hover:border-accent hover:text-accent"
            >
              Close
            </button>
          </div>

          {/* Content */}
          {item.demoUrl ? (
            <>
              <div className="relative flex-1 bg-bg">
                {!loaded ? (
                  <p role="status" className="absolute inset-0 grid place-items-center text-sm text-muted">
                    <span className="inline-flex flex-col items-center gap-3 text-center">
                      <span className="inline-flex items-center gap-2">
                        <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                        Loading {item.title}…
                      </span>
                      {slow ? (
                        <a
                          href={item.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-ink hover:brightness-110"
                        >
                          Taking a while? Open it in a new tab ↗
                        </a>
                      ) : null}
                    </span>
                  </p>
                ) : null}
                {shown ? (
                  <iframe
                    key={item.demoUrl}
                    loading="eager"
                    src={item.demoUrl}
                    title={`${item.title}: live demo`}
                    sandbox={SANDBOX}
                    referrerPolicy="strict-origin-when-cross-origin"
                    onLoad={() => setLoaded(true)}
                    className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
                  />
                ) : null}
              </div>
              <p className="border-t border-line px-4 py-2 text-center text-xs text-muted">
                Blank window? The site may block embedding.{" "}
                <a
                  href={item.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-accent"
                >
                  Open it in a new tab
                </a>{" "}
                instead.
              </p>
            </>
          ) : (
            <div className="relative flex-1">
              <Image src={item.cover} alt={`${item.title} preview`} fill sizes="80rem" className="object-contain" />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-t from-black/90 to-transparent p-6 pt-16">
                <div>
                  <p className="text-xl font-semibold">{item.title}</p>
                  <p className="text-sm text-muted">{item.highlight}</p>
                </div>
                <Link
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink hover:brightness-110"
                >
                  {item.cta} <span aria-hidden>{item.external ? "↗" : "→"}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </dialog>
  );
}
