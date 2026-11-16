import { certifications, journey } from "@/data/profile";
import { CertGrid } from "./CertGrid";
import { Journey } from "./Journey";
import { Section } from "./Section";

export function ExperienceSection() {
  return (
    <Section id="experience" label="Experience" title="Leadership & education.">
      <Journey items={journey} />

      <div className="mt-24">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Certifications</h3>
        <div className="mt-6">
          <CertGrid items={certifications} />
        </div>
      </div>
    </Section>
  );
}
