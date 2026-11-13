import type { Metadata } from "next";
import { ProjectList } from "@/components/ProjectList";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Web apps, a mobile app and a front-end showcase by Elias Al-Sumairi, with live demos.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-10 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Projects</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tighter sm:text-6xl">All work.</h1>
      <p className="mt-4 max-w-xl text-muted">
        Case studies with live demos, plus a front-end concept project.
      </p>
      <div className="mt-14">
        <ProjectList projects={projects} headingLevel="h2" />
      </div>
    </main>
  );
}
