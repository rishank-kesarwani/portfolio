import Link from "next/link";
import { engineeringNotes } from "@/data/engineering-notes";
import { LuFileText, LuArrowRight, LuClock, LuTag } from "react-icons/lu";

export function EngineeringNotesSection() {
  const featuredNotes = engineeringNotes.slice(0, 3);

  return (
    <section id="engineering-notes" className="border-t border-slate-200/80 bg-slate-50/60 py-20 dark:border-white/10 dark:bg-ink-950/40">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-600 dark:text-accent-400">
              Technical Insights
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl dark:text-white">
              Engineering Notes & Deep Dives
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Original architectural articles addressing distributed task idempotency, LLM regression gates, vector tenant security, and database query tuning.
            </p>
          </div>
          <Link
            href="/engineering-notes"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 transition hover:text-accent-500 dark:text-accent-400"
          >
            <span>Browse all technical notes</span>
            <LuArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredNotes.map((note) => (
            <article
              key={note.slug}
              className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-accent-400/30"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="rounded-md bg-indigo-500/10 px-2 py-0.5 font-semibold text-indigo-600 dark:text-indigo-400">
                    {note.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <LuClock className="h-3.5 w-3.5" />
                    {note.readTime}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-bold tracking-tight text-slate-950 group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-400">
                  <Link href={`/engineering-notes/${note.slug}`} className="hover:underline">
                    {note.title}
                  </Link>
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {note.subtitle}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {note.tags.slice(0, 3).map((tag) => (
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

              <div className="mt-6 border-t border-slate-100 pt-4 dark:border-white/5">
                <Link
                  href={`/engineering-notes/${note.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 transition hover:text-accent-500 dark:text-accent-400"
                >
                  <LuFileText className="h-3.5 w-3.5" />
                  <span>Read Article</span>
                  <LuArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
