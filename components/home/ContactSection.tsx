import { ButtonLink } from "@/components/ButtonLink";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { site, socials } from "@/data/site";
import { Section } from "./Section";

export function ContactSection() {
  return (
    <Section id="contact" index="05" label="Contact" title="Let's build something.">
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="text-lg text-muted">
            I&apos;m looking for a full-stack software engineering internship from March to August 2027. Email me
            or send a message.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-block break-all text-2xl font-semibold tracking-tight hover:text-accent sm:text-3xl"
          >
            {site.email}
          </a>
          <ul className="mt-8 flex flex-wrap gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <ButtonLink href={s.href} variant="ghost" external>
                  {s.label} ↗
                </ButtonLink>
              </li>
            ))}
            <li>
              <ButtonLink href={site.resume} download>
                Download resume
              </ButtonLink>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.05}>
          {site.formspreeId ? (
            <ContactForm formspreeId={site.formspreeId} email={site.email} />
          ) : (
            <p className="rounded-xl border border-dashed border-line p-6 font-mono text-xs text-muted">
              TODO: set NEXT_PUBLIC_FORMSPREE_ID to show the contact form.
            </p>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
