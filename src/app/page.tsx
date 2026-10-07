import { AboutManifesto } from "@/sections/AboutManifesto";
import { LightThread } from "@/components/LightThread";
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
        <LightThread>
          <PracticeAreasSection />
          <MethodSection />
          <TeamSection />
        </LightThread>
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
