"use client";

import { useState } from "react";
import { enterpriseProjects, type Project } from "@/data/portfolio";
import { ProjectModal } from "@/components/ProjectModal";
import { LuLayers, LuLock, LuArrowUpRight } from "react-icons/lu";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "AI / Full Stack", "Backend / Infrastructure", "Frontend", "Developer Tools"];

  const filteredProjects =
    selectedCategory === "All"
      ? enterpriseProjects
      : enterpriseProjects.filter((p) => p.category === selectedCategory || (selectedCategory === "Frontend" && p.id.includes("frontend")));

  return (
    <section id="projects" className="border-t border-slate-200/80 bg-slate-50/50 py-20 dark:border-white/10 dark:bg-ink-950/40">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-600 dark:text-accent-400">
              Enterprise Engineering
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl dark:text-white">
              Scalable Systems & Platform Architecture
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Real-world backend microservices, high-volume event streaming, micro-frontends, and automated data pipelines built for enterprise scale.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              role="tab"
              aria-selected={selectedCategory === cat}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-accent-400/30"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-accent-500/10 px-2.5 py-1 text-xs font-semibold text-accent-600 dark:text-accent-400">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                    <LuLock className="h-3 w-3" />
                    <span>Enterprise</span>
                  </div>
                </div>

                <h3 className="mt-4 flex items-center justify-between text-xl font-bold tracking-tight text-slate-950 group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-400">
                  <span>{project.title}</span>
                  <LuArrowUpRight className="h-4 w-4 shrink-0 opacity-0 transition group-hover:opacity-100" />
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>

                {project.architectureHighlights && project.architectureHighlights.length > 0 ? (
                  <div className="mt-4 border-t border-slate-100 pt-3 dark:border-white/5">
                    <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      <LuLayers className="h-3 w-3 text-accent-500" />
                      Highlight:
                    </span>
                    <p className="mt-1 text-xs text-slate-700 dark:text-slate-300">
                      {project.architectureHighlights[0]}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 dark:border-white/5">
                <ul className="flex flex-wrap gap-1.5" aria-label={`${project.title} tech stack`}>
                  {project.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
