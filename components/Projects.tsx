import type { Project } from "@/data/portfolio";
import { LuExternalLink, LuGithub, LuLock } from "react-icons/lu";

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
        {projects.map((project) => {
          const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim());
          const hasLive = Boolean(project.liveUrl && project.liveUrl.trim());
          const hasAnyLink = hasGithub || hasLive;

          return (
            <article
              key={project.title}
              className="group flex flex-col justify-between overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div>
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
                </div>
              </div>

              <div className="border-t border-slate-100 px-6 py-4 dark:border-white/5">
                {hasAnyLink ? (
                  <div className="flex items-center gap-4 text-sm font-semibold">
                    {hasGithub ? (
                      <a
                        href={project.githubUrl}
                        className="inline-flex items-center gap-1.5 text-slate-950 transition hover:text-accent-600 dark:text-white dark:hover:text-accent-400"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View source code for ${project.title}`}
                      >
                        <LuGithub className="h-4 w-4" />
                        GitHub
                      </a>
                    ) : null}
                    {hasLive ? (
                      <a
                        href={project.liveUrl}
                        className="inline-flex items-center gap-1.5 text-accent-600 transition hover:text-accent-500 dark:text-accent-400"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View live demo for ${project.title}`}
                      >
                        <LuExternalLink className="h-4 w-4" />
                        Live demo
                      </a>
                    ) : null}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <LuLock className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                    <span>Enterprise Production Architecture</span>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
