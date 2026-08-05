import { About } from "@/components/About";
import { ContactForm } from "@/components/ContactForm";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { projects, groupedSkills } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects projects={projects} />
        <Skills groupedSkills={groupedSkills} />
        <ContactForm />
      </main>
    </>
  );
}
