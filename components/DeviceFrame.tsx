import type { ReactNode } from "react";

type FrameType = "browser" | "phone";

/** Browser-window or phone mockup around a demo. Children fill the screen area. */
export function DeviceFrame({
  type,
  children,
  address,
}: {
  type: FrameType;
  children: ReactNode;
  address?: string;
}) {
  if (type === "phone") {
    return (
      <div className="mx-auto w-full max-w-[300px] rounded-[2.75rem] border border-line bg-surface-2 p-2.5 shadow-2xl shadow-black/60">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.2rem] bg-surface">
          <span
            aria-hidden
            className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black"
          />
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/60">
      <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-2.5">
        <div aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        {address ? (
          <p className="min-w-0 flex-1 truncate rounded-md bg-bg px-3 py-1 text-center font-mono text-xs text-muted">
            {address}
          </p>
        ) : null}
      </div>
      <div className="relative aspect-[16/10]">{children}</div>
    </div>
  );
}
