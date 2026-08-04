type SkillsProps = {
  skills: string[];
};

export function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="border-y border-slate-200 bg-slate-50 py-20 dark:border-white/10 dark:bg-ink-900">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-600 dark:text-accent-400">
            Skills
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl dark:text-white">
            A full-stack toolkit for product teams that ship.
          </h2>
        </div>

        <ul className="mt-10 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
