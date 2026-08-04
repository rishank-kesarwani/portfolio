import type { Project } from "@/data/portfolio";

type ProjectsProps = {
  projects: Project[];
};

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-600 dark:text-accent-400">
          Projects
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl dark:text-white">
          Selected work across platforms, automation, and AI.
        </h2>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]"
          >
            <div className="flex aspect-[16/9] items-end bg-[linear-gradient(135deg,#0f172a,#0ea5e9_55%,#f8fafc)] p-5 dark:bg-[linear-gradient(135deg,#020617,#0f766e_55%,#1e293b)]">
              <span className="rounded-md bg-white/90 px-3 py-2 text-sm font-semibold text-slate-950 shadow-sm">
                {project.image}
              </span>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold tracking-normal text-slate-950 dark:text-white">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {project.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} tech stack`}>
                {project.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:text-slate-300"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-4 text-sm font-semibold">
                <a
                  href={project.githubUrl}
                  className="text-slate-950 transition hover:text-accent-600 dark:text-white dark:hover:text-accent-400"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a
                  href={project.liveUrl}
                  className="text-accent-600 transition hover:text-accent-500 dark:text-accent-400"
                  target="_blank"
                  rel="noreferrer"
                >
                  Live demo
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
