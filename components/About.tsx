export function About() {
  return (
    <section id="about" className="border-y border-slate-200 bg-slate-50 py-20 dark:border-white/10 dark:bg-ink-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-600 dark:text-accent-400">
            About me
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl dark:text-white">
            I turn complex product requirements into stable, scalable systems.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300">
          <p>
            I work across frontend, backend, cloud workflows, and delivery systems, with
            production experience at Network18, 3Pillar Global, TCS, and GlobalLogic.
          </p>
          <p>
            My recent work includes notification platforms, CMS publishing workflows,
            analytics automation, high-volume micro-frontends, and RAG-based article assistants.
            I enjoy systems that need both thoughtful UX and dependable engineering underneath.
          </p>
        </div>
      </div>
    </section>
  );
}
