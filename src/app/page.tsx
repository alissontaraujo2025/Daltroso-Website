import { AboutManifesto } from "@/sections/AboutManifesto";
import { ContactSection } from "@/sections/ContactSection";
import { Hero } from "@/sections/Hero";
import { MethodSection } from "@/sections/MethodSection";
import { PracticeAreasSection } from "@/sections/PracticeAreasSection";
import { SiteFooter } from "@/sections/SiteFooter";
import { TeamSection } from "@/sections/TeamSection";
import { ViradaScene } from "@/sections/ViradaScene";

export default function Home() {
  return (
    <>
      <main id="top">
        <Hero />
        <AboutManifesto />
        <ViradaScene />
        <PracticeAreasSection />
        <MethodSection />
        <TeamSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
