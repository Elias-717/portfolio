import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DemoFrame } from "@/components/DemoFrame";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? project.title : "Project" };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-5xl space-y-10 px-6 pb-24">
      <header>
        <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
        <p className="mt-2 opacity-70">
          {[project.year, project.role, project.tags.join(" · ")].filter(Boolean).join(" · ")}
        </p>
      </header>
      <p className="max-w-2xl opacity-80">{project.description}</p>
      <DemoFrame
        url={project.demoUrl}
        poster={project.poster}
        title={project.title}
        type={project.demoType}
      />
    </main>
  );
}
