"use client";

import Image from "next/image";
import { useState } from "react";
import { Enter } from "@/components/Animate";
import { PhotoViewer } from "@/components/PhotoViewer";
import type { Photo } from "@/data/profile";

/**
 * Evidence photos as a mosaic: the first photo large, the rest stacked beside it (all stacked on
 * phones). Each opens full size in the accessible photo viewer.
 */
export function PhotoMosaic({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <ul className="grid gap-3 sm:grid-cols-[1.6fr_1fr] sm:grid-rows-2 sm:gap-4">
        {photos.map((p, i) => (
          <Enter
            as="li"
            variant="rise"
            delay={i * 0.1}
            key={p.src}
            className={i === 0 ? "sm:row-span-2" : ""}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open photo: ${p.caption}`}
              className="group relative block h-full min-h-56 w-full overflow-hidden rounded-2xl border border-line bg-surface text-left"
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes={i === 0 ? "(min-width: 640px) 60vw, 100vw" : "(min-width: 640px) 35vw, 100vw"}
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
              <span className="absolute bottom-3 left-4 right-4 text-sm font-medium text-fg">{p.caption}</span>
              <span
                aria-hidden
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-sm text-fg opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                ⤢
              </span>
            </button>
          </Enter>
        ))}
      </ul>
      <PhotoViewer
        photos={open === null ? null : photos}
        index={open ?? 0}
        onIndex={setOpen}
        onClose={() => setOpen(null)}
      />
    </>
  );
}
