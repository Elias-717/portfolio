import { site, socials } from "@/data/site";

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
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                {s.label}
              </a>
            </li>
          ))}
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
