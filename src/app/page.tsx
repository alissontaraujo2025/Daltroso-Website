import { AboutManifesto } from "@/sections/AboutManifesto";
import { ContactSection } from "@/sections/ContactSection";
import { Hero } from "@/sections/Hero";
import { TeamSection } from "@/sections/TeamSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutManifesto />
      <TeamSection />
      <ContactSection />
    </main>
  );
}
