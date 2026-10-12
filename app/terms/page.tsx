import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LuFileText } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Terms of Use | Rishank Kesarwani",
  description:
    "Terms of Use for rishankkesarwani.com governing website usage, intellectual property, open-source references, and external links.",
  alternates: {
    canonical: "https://rishankkesarwani.com/terms",
  },
  openGraph: {
    title: "Terms of Use | Rishank Kesarwani",
    description:
      "Terms of Use for rishankkesarwani.com governing website usage, intellectual property, open-source references, and external links.",
    url: "https://rishankkesarwani.com/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="content" className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200">Terms of Use</span>
        </nav>

        <header>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <LuFileText className="h-3.5 w-3.5" />
            <span>Site Agreement</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
            Terms of Use
          </h1>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Last Updated: February 15, 2025
          </p>
        </header>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing and using this website (https://rishankkesarwani.com), you agree to comply with and be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use the website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">2. Purpose of Website</h2>
            <p className="mt-2">
              This site serves as an engineering portfolio, technical case-study knowledge base, and professional contact platform by Rishank Kesarwani. The articles, code snippets, and diagrams are provided for informational, educational, and professional showcase purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">3. Intellectual Property & Open-Source Code</h2>
            <p className="mt-2">
              All written editorial content, architectural diagrams, and case study descriptions are the original work and intellectual property of Rishank Kesarwani unless explicitly noted.
            </p>
            <p className="mt-2">
              Where open-source GitHub repositories are referenced, code in those repositories is governed by their respective licenses (e.g. MIT, Apache 2.0). Code snippets presented in engineering notes are provided &quot;as is&quot; without warranties of any kind for production deployment.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">4. External Links & Third-Party Platforms</h2>
            <p className="mt-2">
              This website links to third-party services, including live application demos, GitHub repositories, and travel booking platforms. Rishank Kesarwani is not responsible for the availability, uptime, content, or practices of external websites.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">5. Limitation of Liability</h2>
            <p className="mt-2">
              Under no circumstances shall Rishank Kesarwani be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this website, including but not limited to reliance on architectural advice, code snippets, or third-party links.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">6. Questions</h2>
            <p className="mt-2">
              If you have any questions regarding these terms, please reach out via{" "}
              <a href="mailto:rishankkesar111@gmail.com" className="font-semibold text-accent-600 hover:underline dark:text-accent-400">
                rishankkesar111@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
