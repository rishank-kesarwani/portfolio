import { About } from "@/components/About";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { ContactForm } from "@/components/ContactForm";
import { EngineeringHighlights } from "@/components/EngineeringHighlights";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { LiveProducts } from "@/components/LiveProducts";
import { MonetizationShowcase } from "@/components/MonetizationShowcase";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { AdBanner } from "@/components/ads/AdBanner";
import { groupedSkills } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="content">
        <Hero />
        <LiveProducts />
        <ArchitectureSection />
        <Projects />
        <EngineeringHighlights />
        <MonetizationShowcase />
        <Skills groupedSkills={groupedSkills} />
        <About />
        <AdBanner />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
