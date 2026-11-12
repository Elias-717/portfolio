import { renderOg, ogSize } from "@/app/og";
import { caseStudies, getProject } from "@/data/projects";

export const alt = "Project case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return renderOg({
    eyebrow: "Case study · Elias Al-Sumairi",
    title: p?.title ?? "Project",
    subtitle: p?.oneLine ?? "",
  });
}
