import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { LuMail, LuClock, LuMessageSquare, LuGithub } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Contact Rishank Kesarwani | Full-Stack & AI Systems Engineer",
  description:
    "Get in touch with Rishank Kesarwani for senior engineering roles, architectural consulting, distributed systems, and AI engineering opportunities.",
  alternates: {
    canonical: "https://rishankkesarwani.com/contact",
  },
  openGraph: {
    title: "Contact Rishank Kesarwani | Full-Stack & AI Systems Engineer",
    description:
      "Get in touch with Rishank Kesarwani for senior engineering roles, architectural consulting, distributed systems, and AI engineering opportunities.",
    url: "https://rishankkesarwani.com/contact",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Rishank Kesarwani",
  description: "Contact page for full-stack engineer Rishank Kesarwani.",
  url: "https://rishankkesarwani.com/contact",
  mainEntity: {
    "@type": "Person",
    name: "Rishank Kesarwani",
    email: "rishankkesar111@gmail.com",
    url: "https://rishankkesarwani.com",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="content" className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200">Contact</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Info Side */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/5 px-3 py-1 text-xs font-semibold text-accent-600 dark:border-accent-400/20 dark:text-accent-400">
              <LuMessageSquare className="h-3.5 w-3.5" />
              <span>Get in Touch</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              Let&apos;s Discuss an Engineering Challenge
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Whether you have a senior engineering opportunity, a distributed systems design question, or want to explore an AI engineering collaboration, I welcome the conversation.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400">
                  <LuMail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Direct Email</p>
                  <a
                    href="mailto:rishankkesar111@gmail.com"
                    className="mt-0.5 text-xs font-semibold text-accent-600 hover:underline dark:text-accent-400"
                  >
                    rishankkesar111@gmail.com
                  </a>
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    Typical response time: within 24–48 hours on business days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <LuClock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Work Scope</p>
                  <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
                    Full-time Senior Full-Stack Engineering, Backend Distributed Systems Architecture, AI/LLM Infrastructure.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.02]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <LuGithub className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Source Code & Proof</p>
                  <a
                    href="https://github.com/rishank-kesarwani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-accent-600 hover:underline dark:text-accent-400"
                  >
                    <span>github.com/rishank-kesarwani</span>
                  </a>
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    Explore open-source repositories and implementation details.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div>
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
