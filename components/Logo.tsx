import Image from "next/image";
import { site } from "@/data/site";

/** The Elias emblem, clipped to its circle so it sits cleanly on the dark background. */
export function Logo({ size = 36, priority = false }: { size?: number; priority?: boolean }) {
  return (
    <Image
      src="/logo-256.png"
      alt={`${site.name} logo`}
      width={size}
      height={size}
      priority={priority}
      className="rounded-full"
    />
  );
}
