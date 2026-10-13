import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Projects } from "@/components/Projects";
import { LiveProducts } from "@/components/LiveProducts";
import { LuFolderGit2 } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Projects & Engineering Portfolio | Rishank Kesarwani",
  description:
    "Production AI systems, distributed microservices, and enterprise web applications engineered by Rishank Kesarwani.",
  alternates: {
    canonical: "https://www.rishankkesarwani.com/projects",
  },
  openGraph: {
    title: "Projects & Engineering Portfolio | Rishank Kesarwani",
    description:
      "Production AI systems, distributed microservices, and enterprise web applications engineered by Rishank Kesarwani.",
    url: "https://www.rishankkesarwani.com/projects",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.rishankkesarwani.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Projects",
      item: "https://www.rishankkesarwani.com/projects",
    },
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="content" className="py-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 mb-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200">Projects</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/5 px-3 py-1 text-xs font-semibold text-accent-600 dark:border-accent-400/20 dark:text-accent-400">
              <LuFolderGit2 className="h-3.5 w-3.5" />
              <span>Full Portfolio Showcase</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl dark:text-white">
              Software Systems & Live Applications
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              An index of production developer tools, live consumer applications, shared AI microservices, and enterprise platforms.
            </p>
          </div>
        </div>

        <LiveProducts />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
