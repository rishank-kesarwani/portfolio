import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdBanner } from "@/components/ads/AdBanner";
import { engineeringNotes } from "@/data/engineering-notes";
import {
  LuArrowLeft,
  LuClock,
  LuTag,
  LuCircleCheck,
  LuTriangleAlert,
  LuListChecks,
} from "react-icons/lu";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return engineeringNotes.map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = engineeringNotes.find((n) => n.slug === slug);

  if (!note) {
    return {
      title: "Note Not Found",
    };
  }

  const siteUrl = "https://www.rishankkesarwani.com";
  const url = `${siteUrl}/engineering-notes/${note.slug}`;

  return {
    title: `${note.title} | Rishank Kesarwani`,
    description: note.summary.slice(0, 160),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: note.title,
      description: note.summary.slice(0, 160),
      url,
      type: "article",
      publishedTime: note.publishedAt,
      modifiedTime: note.updatedAt,
      authors: ["Rishank Kesarwani"],
    },
    twitter: {
      card: "summary_large_image",
      title: note.title,
      description: note.summary.slice(0, 160),
    },
  };
}

export default async function EngineeringNoteDetailPage({ params }: Props) {
  const { slug } = await params;
  const note = engineeringNotes.find((n) => n.slug === slug);

  if (!note) {
    notFound();
  }

  const siteUrl = "https://www.rishankkesarwani.com";
  const relatedNotes = engineeringNotes.filter((n) => n.slug !== note.slug).slice(0, 2);

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
            name: "Engineering Notes",
            item: `${siteUrl}/engineering-notes`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: note.title,
            item: `${siteUrl}/engineering-notes/${note.slug}`,
          },
        ],
      },
      {
        "@type": "TechArticle",
        headline: note.title,
        description: note.summary,
        datePublished: note.publishedAt,
        dateModified: note.updatedAt,
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
          "@id": `${siteUrl}/engineering-notes/${note.slug}`,
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
          <Link href="/engineering-notes" className="hover:text-slate-900 dark:hover:text-white">
            Engineering Notes
          </Link>
          <span>/</span>
          <span className="truncate text-slate-900 dark:text-slate-200">{note.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {note.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <LuClock className="h-3.5 w-3.5" />
              <span>{note.readTime}</span>
            </span>
            <span className="text-xs text-slate-400">Updated: {note.updatedAt}</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl dark:text-white">
            {note.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {note.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                <LuTag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Overview Box */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-white/10 dark:bg-white/[0.02]">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Core Takeaway
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {note.summary}
          </p>
        </section>

        {/* Problem Context */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Problem Statement & Context</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
            {note.problemContext}
          </p>
        </section>

        {/* Architecture Diagram if present */}
        {note.architectureDiagram && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">System Flow & Data Path</h2>
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-slate-900 p-4 text-xs font-mono text-emerald-400 shadow-inner dark:border-white/10">
              <pre>{note.architectureDiagram.trim()}</pre>
            </div>
          </section>
        )}

        {/* Core Concepts */}
        <section className="mt-12 space-y-10">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Architectural Concepts & Implementation</h2>
          {note.coreConcepts.map((concept, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {idx + 1}. {concept.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {concept.description}
              </p>
              {concept.codeSnippet && (
                <div className="mt-3 overflow-hidden rounded-xl border border-slate-800 bg-[#0e1117] text-xs">
                  {concept.codeSnippet.caption && (
                    <div className="border-b border-slate-800 bg-slate-900/80 px-4 py-2 font-mono text-[11px] text-slate-400">
                      {concept.codeSnippet.caption}
                    </div>
                  )}
                  <div className="overflow-x-auto p-4 font-mono text-slate-200">
                    <pre>{concept.codeSnippet.code}</pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Pitfalls & Trade-offs */}
        <section className="mt-12">
          <div className="flex items-center gap-2">
            <LuTriangleAlert className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">Common Pitfalls & Trade-offs</h2>
          </div>
          <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.03] p-5 dark:border-amber-400/20 dark:bg-white/[0.02]">
            <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
              {note.tradeoffsAndPitfalls.map((pitfall, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">!</span>
                  <span>{pitfall}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Production Checklist */}
        <section className="mt-12">
          <div className="flex items-center gap-2">
            <LuListChecks className="h-5 w-5 text-emerald-500" />
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">Production Verification Checklist</h2>
          </div>
          <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-5 dark:border-emerald-400/20 dark:bg-white/[0.02]">
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              {note.productionChecklist.map((check, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <LuCircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Editorial AdSlot */}
        <AdBanner isEditorialPage={true} />

        {/* Related Articles Navigation */}
        <nav aria-label="Related Articles" className="mt-16 border-t border-slate-200/80 pt-10 dark:border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-950 dark:text-white">
              Related Engineering Notes
            </h3>
            <Link
              href="/engineering-notes"
              className="text-xs font-semibold text-accent-600 hover:underline dark:text-accent-400"
            >
              All articles →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {relatedNotes.map((rel) => (
              <Link
                key={rel.slug}
                href={`/engineering-notes/${rel.slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-accent-500/40 dark:border-white/10 dark:bg-white/[0.02]"
              >
                <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
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
            href="/engineering-notes"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <LuArrowLeft className="h-3.5 w-3.5" />
            <span>Back to all engineering notes</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
