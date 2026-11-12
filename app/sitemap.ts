import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/projects`, priority: 0.8 },
    ...caseStudies.map((p) => ({ url: `${site.url}/projects/${p.slug}`, priority: 0.7 })),
  ];
}
