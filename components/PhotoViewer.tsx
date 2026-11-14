"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Photo } from "@/data/profile";

/**
 * Full-size photo viewer. A native modal <dialog>: focus is trapped inside, Escape closes it,
 * and focus returns to the photo that opened it. Arrow keys step through the set.
 */
export function PhotoViewer({
  photos,
  index,
  onIndex,
  onClose,
}: {
  photos: Photo[] | null;
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (photos && !dialog.open) dialog.showModal();
    if (!photos && dialog.open) dialog.close();
  }, [photos]);

  const count = photos?.length ?? 0;
  const photo = photos?.[index];
  const go = (step: number) => onIndex((index + step + count) % count);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // click on the backdrop
      }}
      onKeyDown={(e) => {
        if (count < 2) return;
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      aria-label={photo ? `Photo: ${photo.caption}` : "Photo"}
      className="window-in m-auto w-[min(94vw,72rem)] max-w-none overflow-hidden rounded-2xl border border-white/10 bg-surface p-0 text-fg shadow-[0_40px_120px_rgb(0_0_0/0.7)]"
    >
      {photo ? (
        <figure>
          <div className="relative aspect-[4/3] max-h-[78vh] w-full bg-black">
            <Image key={photo.src} src={photo.src} alt={photo.alt} fill sizes="94vw" className="object-contain" />
          </div>
          <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 sm:px-5">
            <span>
              <span className="font-medium">{photo.caption}</span>
              {count > 1 ? (
                <span className="ml-3 font-mono text-xs text-muted">
                  {index + 1} / {count}
                </span>
              ) : null}
            </span>
            <span className="flex gap-2">
              {count > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous photo"
                    className="grid h-9 w-9 place-items-center rounded-full border border-line hover:border-accent hover:text-accent"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next photo"
                    className="grid h-9 w-9 place-items-center rounded-full border border-line hover:border-accent hover:text-accent"
                  >
                    →
                  </button>
                </>
              ) : null}
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-line px-4 text-sm hover:border-accent hover:text-accent"
              >
                Close
              </button>
            </span>
          </figcaption>
        </figure>
      ) : null}
    </dialog>
  );
}
