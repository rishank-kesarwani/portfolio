export function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent-600 dark:text-accent-400">
          Software Development Engineer
        </p>
        <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
          Building scalable products with calm engineering and sharp execution.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          I am Rishank Kesarwani, a full-stack engineer with 8 years of experience across
          React, Next.js, Node.js, NestJS, cloud automation, and AI-assisted product systems.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-md bg-accent-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-ink-950"
          >
            View projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
          >
            Contact me
          </a>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-glow dark:border-white/10 dark:bg-white/[0.04]">
        <dl className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
          {[
            ["8+", "years building full-stack web applications"],
            ["30%", "faster release turnaround through CI/CD improvements"],
            ["50%", "reduction in production bugs through stronger test coverage"],
          ].map(([value, label]) => (
            <div key={value} className="rounded-md bg-slate-50 p-5 dark:bg-white/[0.04]">
              <dt className="text-3xl font-semibold text-slate-950 dark:text-white">{value}</dt>
              <dd className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
