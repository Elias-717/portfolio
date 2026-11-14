import { Enter } from "@/components/Animate";
import { skillGroups } from "@/data/profile";
import { Section } from "./Section";

/** Skills: each row's label slides in, then its skills blur into focus one after another. */
export function SkillsSection() {
  return (
    <Section id="skills" label="Skills" title="What I work with.">
      <dl className="border-t border-line">
        {skillGroups.map((group) => (
          <div key={group.level} className="grid gap-3 border-b border-line py-7 md:grid-cols-[14rem_1fr] md:gap-10">
            <dt>
              <Enter as="span" variant="slide" className="block font-mono text-xs uppercase tracking-[0.18em] text-muted md:pt-2">
                {group.level}
              </Enter>
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-x-2 gap-y-1 text-xl leading-relaxed sm:text-2xl">
                {group.items.map((item, i) => (
                  <Enter
                    as="li"
                    variant="blur"
                    delay={0.1 + i * 0.045}
                    key={item}
                    className="whitespace-nowrap transition-colors duration-200 hover:text-accent"
                  >
                    {item}
                    {i < group.items.length - 1 ? (
                      <span aria-hidden className="pl-2 text-accent/60">
                        /
                      </span>
                    ) : null}
                  </Enter>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
