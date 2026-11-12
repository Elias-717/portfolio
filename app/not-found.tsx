import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <main className="mx-auto grid max-w-6xl place-items-start gap-6 px-4 py-32 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="text-4xl font-semibold tracking-tighter sm:text-6xl">This page doesn&apos;t exist.</h1>
      <ButtonLink href="/">Back home</ButtonLink>
    </main>
  );
}
