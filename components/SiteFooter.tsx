import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a href={`mailto:${site.email}`} className="hover:text-fg">
              Email
            </a>
          </li>
          <li>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.resume} download="" className="hover:text-fg">
              Resume (PDF)
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
