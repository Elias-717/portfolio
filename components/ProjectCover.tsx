import Image from "next/image";
import type { Project } from "@/data/projects";
import { DeviceFrame } from "./DeviceFrame";

/**
 * Card cover. Uses the project's poster when one exists; until then, a designed
 * browser or phone frame with the project's name and key fact.
 */
export function ProjectCover({ project: p }: { project: Project }) {
  const phone = p.demo.type === "phone";
  const host = p.links.live ? new URL(p.links.live).host : undefined;

  const inner = p.demo.poster ? (
    <Image
      src={p.demo.poster}
      alt={`${p.title} screenshot`}
      fill
      sizes={phone ? "260px" : "(min-width: 1024px) 640px, 100vw"}
      className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
    />
  ) : (
    <div className="absolute inset-0 flex flex-col justify-end overflow-hidden bg-[radial-gradient(120%_90%_at_100%_0%,rgb(110_226_106/0.22),transparent_60%)] p-6 sm:p-8">
      <span
        aria-hidden
        className={`font-semibold leading-[0.9] tracking-[-0.05em] text-fg/90 transition duration-500 group-hover:text-accent ${
          phone ? "text-4xl" : "text-[clamp(2.5rem,6vw,4.5rem)]"
        }`}
      >
        {p.title}
      </span>
      <span aria-hidden className="mt-3 font-mono text-xs text-muted">
        {p.highlight}
      </span>
    </div>
  );

  return phone ? (
    <div className="mx-auto w-[min(70vw,15rem)]">
      <DeviceFrame type="phone">{inner}</DeviceFrame>
    </div>
  ) : (
    <DeviceFrame type="browser" address={host}>
      {inner}
    </DeviceFrame>
  );
}
