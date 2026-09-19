import { AboutManifesto } from "@/sections/AboutManifesto";
import { BiancaProfile } from "@/sections/BiancaProfile";
import { ContactSection } from "@/sections/ContactSection";
import { Hero } from "@/sections/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutManifesto />
      <BiancaProfile />
      <ContactSection />
    </main>
  );
}
