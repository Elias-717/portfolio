import { Enter } from "@/components/Animate";
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
          <Enter variant="slide" delay={0.1}>
            <CopyEmail email={site.email} />
          </Enter>
          {/* One even row (LinkedIn and GitHub first: they're what recruiters check). */}
          <ul
            className="mt-10 grid max-w-xl grid-cols-3 gap-4 sm:grid-cols-5"
            aria-label="Social profiles"
          >
            {[...socials]
              .sort((a, b) => Number(isPrimary(b.label)) - Number(isPrimary(a.label)))
              .map((s, i) => (
                <Enter as="li" variant="pop" delay={0.15 + i * 0.09} key={s.label} className="flex justify-center">
                  {/* Gentle idle float, each ring out of step with its neighbours. */}
                  <div className="ring-float flex w-full justify-center" style={{ animationDelay: `${-i * 0.7}s` }}>
                    <SocialRing label={s.label} href={s.href} />
                  </div>
                </Enter>
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
