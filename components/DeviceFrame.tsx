import type { ReactNode } from "react";
import type { DemoType } from "@/data/projects";

export function DeviceFrame({ type, children }: { type: DemoType; children: ReactNode }) {
  if (type === "phone") {
    return (
      <div className="mx-auto w-full max-w-[320px] rounded-[2.5rem] border-8 border-neutral-800 bg-neutral-800 p-1 shadow-xl">
        <div className="aspect-[9/19.5] overflow-hidden rounded-[2rem] bg-white">{children}</div>
      </div>
    );
  }
  return (
    <div className="w-full overflow-hidden rounded-xl border border-neutral-300 shadow-xl dark:border-neutral-700">
      <div className="flex items-center gap-1.5 border-b border-neutral-300 bg-neutral-100 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
      </div>
      <div className="aspect-video bg-white">{children}</div>
    </div>
  );
}
