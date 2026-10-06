import { AboutManifesto } from "@/sections/AboutManifesto";
import { ContactSection } from "@/sections/ContactSection";
import { Hero } from "@/sections/Hero";
import { MethodSection } from "@/sections/MethodSection";
import { PracticeAreasSection } from "@/sections/PracticeAreasSection";
import { SiteFooter } from "@/sections/SiteFooter";
import { TeamSection } from "@/sections/TeamSection";

export default function Home() {
  return (
    <>
      <main id="top">
        <Hero />
        <AboutManifesto />
        <PracticeAreasSection />
        <MethodSection />
        <TeamSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
