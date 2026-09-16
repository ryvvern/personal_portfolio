import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { ProjectsSection } from "@/components/projects-section";
import { StackSection } from "@/components/stack-section";

function SectionBand() {
  return (
    <div
      className="hatched h-6 w-full border-t border-b"
      style={{ borderColor: "var(--hatch)" }}
    />
  );
}

export default function Home() {
  return (
    <main>
      <AboutSection />
      <SectionBand />
      <StackSection />
      <SectionBand />
      <ProjectsSection />
      <SectionBand />
      <ContactSection />
    </main>
  );
}
