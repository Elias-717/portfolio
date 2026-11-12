import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { Hero } from "@/components/home/Hero";
import { IntroSection } from "@/components/home/IntroSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { SkillsSection } from "@/components/home/SkillsSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <IntroSection />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
