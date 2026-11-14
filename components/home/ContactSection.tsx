import { ButtonLink } from "@/components/ButtonLink";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmail } from "@/components/CopyEmail";
import { Reveal } from "@/components/Reveal";
import { site, socials } from "@/data/site";
import { SocialRing } from "@/components/SocialRing";
import { Section } from "./Section";

const isPrimary = (label: string) => label === "LinkedIn" || label === "GitHub";

export function ContactSection() {
  return (
    <Section id="contact" label="Contact" title="Let's build something.">
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="text-lg text-muted">
            I&apos;m looking for a full-stack software engineering internship from March to August 2027. Email me
            or send a message.
          </p>
          <CopyEmail email={site.email} />
          {/* One even row (LinkedIn and GitHub first: they're what recruiters check). */}
          <ul
            className="mt-10 grid max-w-xl grid-cols-3 gap-4 sm:grid-cols-5"
            aria-label="Social profiles"
          >
            {[...socials]
              .sort((a, b) => Number(isPrimary(b.label)) - Number(isPrimary(a.label)))
              .map((s) => (
                <li key={s.label} className="flex justify-center">
                  <SocialRing label={s.label} href={s.href} />
                </li>
              ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href={site.resume} download>
              Download resume
            </ButtonLink>
          </div>
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
