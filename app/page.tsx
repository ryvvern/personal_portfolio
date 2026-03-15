import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { ProjectsSection } from "@/components/projects-section";
import { StackSection } from "@/components/stack-section";

export default function Home() {
  return (
    <main>
      <AboutSection />
      <StackSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
