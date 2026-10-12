import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { caseStudies } from "@/data/case-studies";
import { LuBookOpen, LuClock, LuLayers, LuArrowRight, LuCircleCheck } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Engineering Case Studies | Rishank Kesarwani",
  description:
    "In-depth architectural case studies on shared AI platforms, Kafka notification services, model regression testing, and full-stack product engineering.",
  alternates: {
    canonical: "https://rishankkesarwani.com/case-studies",
  },
  openGraph: {
    title: "Engineering Case Studies | Rishank Kesarwani",
    description:
      "Deep technical reviews of real systems: architecture diagrams, API contracts, failure modes, and lessons learned from production implementations.",
    url: "https://rishankkesarwani.com/case-studies",
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
      item: "https://rishankkesarwani.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Case Studies",
      item: "https://rishankkesarwani.com/case-studies",
    },
  ],
};

export default function CaseStudiesIndexPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="content" className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/5 px-3 py-1 text-xs font-semibold text-accent-600 dark:border-accent-400/20 dark:text-accent-400">
            <LuLayers className="h-3.5 w-3.5" />
            <span>Architecture & System Design</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl dark:text-white">
            Engineering Case Studies
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Comprehensive breakdowns of production systems and developer platforms. Each case study covers the real problem statement, architectural decisions, verified API contracts, reliability trade-offs, and lessons learned.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {caseStudies.map((study) => (
            <article
              key={study.slug}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-accent-400/30"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="rounded-md bg-accent-500/10 px-2.5 py-1 font-semibold text-accent-600 dark:text-accent-400">
                    {study.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <LuClock className="h-3.5 w-3.5" />
                    <span>{study.readTime}</span>
                  </div>
                </div>

                <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-400">
                  <Link href={`/case-studies/${study.slug}`} className="hover:underline">
                    {study.title}
                  </Link>
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {study.subtitle}
                </p>

                {/* Key decisions summary */}
                <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 dark:border-white/5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Architectural Highlights:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {study.keyDecisions.slice(0, 2).map((kd, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <LuCircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        <span>{kd.decision}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {study.projectMeta.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-5 dark:border-white/5">
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                >
                  <LuBookOpen className="h-4 w-4" />
                  <span>Read Complete Case Study</span>
                  <LuArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
