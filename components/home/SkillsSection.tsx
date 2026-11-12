import { Reveal } from "@/components/Reveal";
import { skillGroups } from "@/data/profile";
import { Section } from "./Section";

export function SkillsSection() {
  return (
    <Section id="skills" label="Skills" title="What I work with.">
      <dl className="border-t border-line">
        {skillGroups.map((group) => (
          <Reveal key={group.level}>
            <div className="grid gap-3 border-b border-line py-7 md:grid-cols-[14rem_1fr] md:gap-10">
              <dt className="font-mono text-xs uppercase tracking-[0.18em] text-muted md:pt-2">{group.level}</dt>
              <dd>
                <ul className="flex flex-wrap gap-x-2 gap-y-1 text-xl leading-relaxed sm:text-2xl">
                  {group.items.map((item, i) => (
                    <li key={item} className="whitespace-nowrap">
                      {item}
                      {i < group.items.length - 1 ? (
                        <span aria-hidden className="pl-2 text-accent/60">
                          /
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
