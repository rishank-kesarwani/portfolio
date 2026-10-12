import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { LuBookOpen, LuArrowRight, LuClock } from "react-icons/lu";

export function CaseStudiesSection() {
  const featuredStudies = caseStudies.slice(0, 3);

  return (
    <section id="case-studies" className="border-t border-slate-200/80 bg-white py-20 dark:border-white/10 dark:bg-ink-950">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-600 dark:text-accent-400">
              In-Depth Architecture
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl dark:text-white">
              Engineering Case Studies
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Detailed technical write-ups covering real architectural trade-offs, API contracts, failure modes, and lessons learned from production implementations.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 transition hover:text-accent-500 dark:text-accent-400"
          >
            <span>View all 6 case studies</span>
            <LuArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredStudies.map((study) => (
            <article
              key={study.slug}
              className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-accent-400/30"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="rounded-md bg-accent-500/10 px-2 py-0.5 font-semibold text-accent-600 dark:text-accent-400">
                    {study.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <LuClock className="h-3.5 w-3.5" />
                    {study.readTime}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-950 group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-400">
                  <Link href={`/case-studies/${study.slug}`} className="hover:underline">
                    {study.title}
                  </Link>
                </h3>

                <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {study.subtitle}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {study.projectMeta.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:border-white/10 dark:bg-ink-900 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-slate-200/80 pt-4 dark:border-white/10">
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 transition hover:text-accent-500 dark:text-accent-400"
                >
                  <LuBookOpen className="h-3.5 w-3.5" />
                  <span>Read Full Case Study</span>
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
