import { Reveal } from "@/components/Reveal";
import { skillGroups } from "@/data/profile";
import { Section } from "./Section";

export function SkillsSection() {
  return (
    <Section id="skills" index="02" label="Skills" title="What I work with.">
      <div className="grid gap-12 md:grid-cols-3">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.level} delay={gi * 0.05}>
            <h3 className="border-b border-line pb-4 text-xl font-semibold">{group.level}</h3>
            <ol className="mt-4 space-y-2">
              {group.items.map((item, i) => (
                <li key={item} className="flex gap-4">
                  <span className="w-6 font-mono text-xs leading-7 text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-fg/90">{item}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
