import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdBanner } from "@/components/ads/AdBanner";
import { caseStudies } from "@/data/case-studies";
import {
  LuArrowLeft,
  LuClock,
  LuExternalLink,
  LuGithub,
  LuShieldCheck,
  LuCircleCheck,
  LuTriangleAlert,
  LuBookOpen,
} from "react-icons/lu";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  const siteUrl = "https://www.rishankkesarwani.com";
  const url = `${siteUrl}/case-studies/${study.slug}`;

  return {
    title: `${study.title} | Rishank Kesarwani`,
    description: study.summary.slice(0, 160),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: study.title,
      description: study.summary.slice(0, 160),
      url,
      type: "article",
      publishedTime: study.publishedAt,
      modifiedTime: study.updatedAt,
      authors: ["Rishank Kesarwani"],
    },
    twitter: {
      card: "summary_large_image",
      title: study.title,
      description: study.summary.slice(0, 160),
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    notFound();
  }

  const siteUrl = "https://www.rishankkesarwani.com";
  const relatedStudies = caseStudies.filter((s) => s.slug !== study.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Case Studies",
            item: `${siteUrl}/case-studies`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: study.title,
            item: `${siteUrl}/case-studies/${study.slug}`,
          },
        ],
      },
      {
        "@type": "TechArticle",
        headline: study.title,
        description: study.summary,
        datePublished: study.publishedAt,
        dateModified: study.updatedAt,
        author: {
          "@type": "Person",
          name: "Rishank Kesarwani",
          url: siteUrl,
        },
        publisher: {
          "@type": "Person",
          name: "Rishank Kesarwani",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteUrl}/case-studies/${study.slug}`,
        },
      },
    ],
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="content" className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link href="/case-studies" className="hover:text-slate-900 dark:hover:text-white">
            Case Studies
          </Link>
          <span>/</span>
          <span className="truncate text-slate-900 dark:text-slate-200">{study.title.split(":")[0]}</span>
        </nav>

        {/* Article Header */}
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-accent-500/10 px-2.5 py-1 text-xs font-semibold text-accent-600 dark:text-accent-400">
              {study.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <LuClock className="h-3.5 w-3.5" />
              <span>{study.readTime}</span>
            </span>
            <span className="text-xs text-slate-400">Updated: {study.updatedAt}</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl dark:text-white">
            {study.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {study.subtitle}
          </p>

          {/* Project Metadata Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="space-y-1 text-xs">
              <span className="font-semibold text-slate-900 dark:text-white">Role / Scope: </span>
              <span className="text-slate-600 dark:text-slate-300">{study.projectMeta.role}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {study.projectMeta.githubUrl && (
                <a
                  href={study.projectMeta.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-white/10 dark:bg-ink-900 dark:text-slate-200 dark:hover:bg-white/10"
                >
                  <LuGithub className="h-3.5 w-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {study.projectMeta.liveUrl && (
                <a
                  href={study.projectMeta.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-accent-500"
                >
                  <span>Live Platform</span>
                  <LuExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Section: Executive Summary */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Executive Summary</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
            {study.summary}
          </p>
        </section>

        {/* Section: Problem Statement */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">The Engineering Challenge & Context</h2>
          <div className="mt-3 rounded-xl border border-rose-500/20 bg-rose-500/[0.03] p-5 dark:border-rose-400/20 dark:bg-white/[0.02]">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {study.problemStatement}
            </p>
          </div>
        </section>

        {/* Section: Architecture Diagram & Flow */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">System Architecture & Data Flow</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {study.systemArchitecture}
          </p>

          {study.architectureDiagram && (
            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-slate-900 p-4 text-xs font-mono text-emerald-400 shadow-inner dark:border-white/10">
              <pre>{study.architectureDiagram.trim()}</pre>
            </div>
          )}
        </section>

        {/* Section: Key Engineering Decisions */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Key Engineering Decisions & Trade-offs</h2>
          <div className="mt-5 space-y-4">
            {study.keyDecisions.map((decision, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.02]"
              >
                <div className="flex items-start gap-2.5">
                  <LuCircleCheck className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                  <div>
                    <h3 className="text-base font-bold text-slate-950 dark:text-white">
                      {decision.decision}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-800 dark:text-slate-200">Rationale: </strong>
                      {decision.reasoning}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      <strong className="text-slate-700 dark:text-slate-300">Trade-offs & Constraints: </strong>
                      {decision.tradeoffs}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Implementation Highlights & Code */}
        {study.implementationDetails.map((detail) => (
          <section key={detail.id} className="mt-12">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">{detail.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {detail.content}
            </p>
            {detail.codeSnippet && (
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-800 bg-[#0e1117] text-xs">
                {detail.codeSnippet.caption && (
                  <div className="border-b border-slate-800 bg-slate-900/80 px-4 py-2 font-mono text-[11px] text-slate-400">
                    {detail.codeSnippet.caption}
                  </div>
                )}
                <div className="overflow-x-auto p-4 font-mono text-slate-200">
                  <pre>{detail.codeSnippet.code}</pre>
                </div>
              </div>
            )}
          </section>
        ))}

        {/* Section: Reliability & Security */}
        <section className="mt-12">
          <div className="flex items-center gap-2">
            <LuShieldCheck className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              Reliability, Security & Operational Considerations
            </h2>
          </div>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
            {study.reliabilityAndSecurity.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-accent-500">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section: Lessons Learned */}
        <section className="mt-12">
          <div className="flex items-center gap-2">
            <LuBookOpen className="h-5 w-5 text-accent-500" />
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">Lessons Learned</h2>
          </div>
          <div className="mt-4 rounded-xl border border-accent-500/20 bg-accent-500/[0.03] p-5 dark:border-accent-400/20 dark:bg-white/[0.02]">
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {study.lessonsLearned.map((lesson, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section: Limitations & Future Work */}
        <section className="mt-12">
          <div className="flex items-center gap-2">
            <LuTriangleAlert className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              Known Limitations & Future Architecture Roadmap
            </h2>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {study.limitationsAndFutureWork.map((lim, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500">→</span>
                <span>{lim}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Editorial AdSlot (Only rendered when AdSense client is properly configured) */}
        <AdBanner isEditorialPage={true} />

        {/* Related Case Studies Navigation */}
        <nav aria-label="Related Case Studies" className="mt-16 border-t border-slate-200/80 pt-10 dark:border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              More Engineering Case Studies
            </h3>
            <Link
              href="/case-studies"
              className="text-xs font-semibold text-accent-600 hover:underline dark:text-accent-400"
            >
              All case studies →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {relatedStudies.map((rel) => (
              <Link
                key={rel.slug}
                href={`/case-studies/${rel.slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-accent-500/40 dark:border-white/10 dark:bg-white/[0.02]"
              >
                <span className="text-[10px] font-semibold text-accent-600 dark:text-accent-400">
                  {rel.category}
                </span>
                <h4 className="mt-1 text-sm font-bold text-slate-950 group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-400">
                  {rel.title}
                </h4>
              </Link>
            ))}
          </div>
        </nav>

        {/* Back Link */}
        <div className="mt-10">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <LuArrowLeft className="h-3.5 w-3.5" />
            <span>Back to all case studies</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
