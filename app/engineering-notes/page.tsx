import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { engineeringNotes } from "@/data/engineering-notes";
import { LuFileText, LuClock, LuTag, LuArrowRight, LuSparkles } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Engineering Notes & Deep Dives | Rishank Kesarwani",
  description:
    "Original architectural articles on background task idempotency, LLM regression gates, vector tenant authorization, and database query optimization.",
  alternates: {
    canonical: "https://www.rishankkesarwani.com/engineering-notes",
  },
  openGraph: {
    title: "Engineering Notes & Deep Dives | Rishank Kesarwani",
    description:
      "Original architectural articles on background task idempotency, LLM regression gates, vector tenant authorization, and database query optimization.",
    url: "https://www.rishankkesarwani.com/engineering-notes",
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
      name: "Engineering Notes",
      item: "https://www.rishankkesarwani.com/engineering-notes",
    },
  ],
};

export default function EngineeringNotesIndexPage() {
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
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3 py-1 text-xs font-semibold text-indigo-600 dark:border-indigo-400/20 dark:text-indigo-400">
            <LuSparkles className="h-3.5 w-3.5" />
            <span>Original Technical Articles</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl dark:text-white">
            Engineering Notes
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Field notes and architectural guides drawn from production experience. We focus on non-obvious failure modes, distributed system correctness, and operational pragmatism.
          </p>
        </div>

        {/* Notes Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {engineeringNotes.map((note) => (
            <article
              key={note.slug}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-accent-400/30"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="rounded-md bg-indigo-500/10 px-2.5 py-1 font-semibold text-indigo-600 dark:text-indigo-400">
                    {note.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <LuClock className="h-3.5 w-3.5" />
                    <span>{note.readTime}</span>
                  </div>
                </div>

                <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-950 group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-400">
                  <Link href={`/engineering-notes/${note.slug}`} className="hover:underline">
                    {note.title}
                  </Link>
                </h2>

                <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {note.subtitle}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300"
                    >
                      <LuTag className="h-2.5 w-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-5 dark:border-white/5">
                <Link
                  href={`/engineering-notes/${note.slug}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                >
                  <LuFileText className="h-4 w-4" />
                  <span>Read Article</span>
                  <LuArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
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
