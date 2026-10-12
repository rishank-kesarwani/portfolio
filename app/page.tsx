import { About } from "@/components/About";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { ContactForm } from "@/components/ContactForm";
import { EngineeringHighlights } from "@/components/EngineeringHighlights";
import { EngineeringNotesSection } from "@/components/EngineeringNotesSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { LiveProducts } from "@/components/LiveProducts";
import { MonetizationShowcase } from "@/components/MonetizationShowcase";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { groupedSkills } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="content">
        <Hero />
        <LiveProducts />
        <CaseStudiesSection />
        <ArchitectureSection />
        <Projects />
        <EngineeringNotesSection />
        <EngineeringHighlights />
        <MonetizationShowcase />
        <Skills groupedSkills={groupedSkills} />
        <About />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
