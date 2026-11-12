import Link from "next/link";
import { ProjectList } from "@/components/ProjectList";
import { featuredProjects } from "@/data/projects";
import { Section } from "./Section";

export function ProjectsSection() {
  return (
    <Section id="projects" index="03" label="Projects" title="Selected work.">
      <ProjectList projects={featuredProjects} />
      <div className="mt-10 flex justify-end">
        <Link href="/projects" className="text-sm text-muted underline underline-offset-4 hover:text-accent">
          All projects →
        </Link>
      </div>
    </Section>
  );
}
