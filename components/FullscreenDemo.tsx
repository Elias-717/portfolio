"use client";

import { useEffect, useRef } from "react";

/** Full-viewport modal with the demo iframe. Uses <dialog> for focus trapping and Escape-to-close. */
export function FullscreenDemo({
  open,
  onClose,
  src,
  title,
  sandbox,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  title: string;
  sandbox: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-label={title}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-bg p-0 text-fg"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2">
          <p className="truncate text-sm text-muted">{title}</p>
          <div className="flex items-center gap-4">
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted underline underline-offset-4 hover:text-accent"
            >
              New tab ↗
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-line px-3 py-1 text-sm hover:border-accent hover:text-accent"
            >
              Close
            </button>
          </div>
        </div>
        {open ? <iframe src={src} title={title} sandbox={sandbox} className="w-full flex-1 bg-white" /> : null}
      </div>
    </dialog>
  );
}
