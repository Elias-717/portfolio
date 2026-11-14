import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { Hero } from "@/components/home/Hero";
import { GridBackdrop } from "@/components/GridBackdrop";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { SkillsSection } from "@/components/home/SkillsSection";

export default function Home() {
  return (
    <main>
      {/* Faint 3D grid behind everything after the hero. */}
      <GridBackdrop />
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
