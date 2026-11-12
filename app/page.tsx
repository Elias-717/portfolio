import Link from "next/link";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl space-y-24 px-6 pb-24">
      <section className="pt-16">
        <h1 className="text-5xl font-bold tracking-tight">TODO: Your Name</h1>
        <p className="mt-4 text-xl opacity-80">TODO: role / one-line pitch</p>
      </section>

      <section id="about">
        <h2 className="mb-4 text-2xl font-semibold">About</h2>
        <p className="max-w-2xl opacity-80">TODO: short bio</p>
      </section>

      <section id="projects">
        <h2 className="mb-6 text-2xl font-semibold">Projects</h2>
        <ul className="grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className="block rounded-xl border border-neutral-300 p-5 transition hover:-translate-y-0.5 dark:border-neutral-700"
              >
                <h3 className="font-medium">{p.title}</h3>
                <p className="mt-1 text-sm opacity-70">{p.tags.join(" · ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact">
        <h2 className="mb-4 text-2xl font-semibold">Contact</h2>
        <p className="opacity-80">TODO: email / socials</p>
      </section>
    </main>
  );
}
