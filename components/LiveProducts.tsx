"use client";

import { useState } from "react";
import { aiEngineeringProjects, type Project } from "@/data/portfolio";
import { ProjectModal } from "@/components/ProjectModal";
import { trackEvent } from "@/lib/analytics";
import {
  LuExternalLink,
  LuSparkles,
  LuArrowRight,
  LuCompass,
  LuFilm,
  LuTrophy,
  LuMapPin,
  LuGitPullRequest,
  LuShieldAlert,
  LuServer,
  LuMountain,
  LuGithub,
} from "react-icons/lu";

const iconMap: Record<string, React.ReactNode> = {
  "ai-pr-review": <LuGitPullRequest className="h-6 w-6 text-purple-500" />,
  "model-regression-detection": <LuShieldAlert className="h-6 w-6 text-rose-500" />,
  "ai-platform": <LuServer className="h-6 w-6 text-indigo-500" />,
  "travel-planner": <LuCompass className="h-6 w-6 text-accent-500" />,
  "movie-matcher": <LuFilm className="h-6 w-6 text-violet-500" />,
  "sports-tracker": <LuTrophy className="h-6 w-6 text-amber-500" />,
  "study-spot-finder": <LuMapPin className="h-6 w-6 text-emerald-500" />,
  "hiking-explorer": <LuMountain className="h-6 w-6 text-teal-500" />,
};

export function LiveProducts() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Top 2 Primary Featured Projects: AI PR Review Platform and AI Model Regression Detection (or Travel Planner)
  const flagshipProjects = aiEngineeringProjects.filter((p) =>
    ["ai-pr-review", "model-regression-detection", "ai-platform"].includes(p.id)
  );
  const otherLiveApps = aiEngineeringProjects.filter(
    (p) => !["ai-pr-review", "model-regression-detection", "ai-platform"].includes(p.id)
  );

  return (
    <section id="live-apps" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-600 dark:text-accent-400">
              Live AI Systems & Applications
            </p>
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl dark:text-white">
            Production AI Engineering & Developer Platforms
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Deployed production systems demonstrating multi-agent workflows, LLM regression benchmarking, shared RAG pipelines, and full-stack execution.
        </p>
      </div>

      {/* Flagship AI Systems Grid */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {flagshipProjects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-accent-500/[0.03] p-6 shadow-md transition hover:-translate-y-1 hover:border-accent-500/35 hover:shadow-xl dark:border-white/10 dark:from-ink-900 dark:via-ink-950 dark:to-accent-950/20"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5">
                  {iconMap[project.id] || <LuSparkles className="h-6 w-6 text-accent-500" />}
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {project.liveUrl ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      LIVE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                      INFRASTRUCTURE
                    </span>
                  )}
                </div>
              </div>

              <h3 className="mt-4 text-xl font-bold text-slate-950 dark:text-white">
                {project.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {project.description}
              </p>

              {/* Architecture highlights list */}
              {project.architectureHighlights && (
                <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 dark:border-white/5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Key Architecture:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {project.architectureHighlights.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-accent-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Badges */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Actions */}
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/5">
              <button
                onClick={() => setSelectedProject(project)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 transition hover:text-accent-500 dark:text-accent-400"
              >
                <span>Architecture Details</span>
                <LuArrowRight className="h-3.5 w-3.5" />
              </button>

              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub repository for ${project.title}`}
                    className="rounded-lg p-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <LuGithub className="h-4 w-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("live_app_click", { project_id: project.id })}
                    className="inline-flex items-center gap-1 rounded-md bg-accent-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-accent-500"
                  >
                    <span>Launch</span>
                    <LuExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Grid of Other Live Applications */}
      <div className="mt-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-white/10">
          <h3 className="text-lg font-bold text-slate-950 dark:text-white">
            Deployed Full-Stack AI Products
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            5 Active Public Applications
          </span>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherLiveApps.map((app) => (
            <div
              key={app.id}
              className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5">
                    {iconMap[app.id] || <LuSparkles className="h-5 w-5 text-accent-500" />}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    LIVE
                  </span>
                </div>

                <h4 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">
                  {app.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {app.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1">
                  {app.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/5">
                <button
                  onClick={() => setSelectedProject(app)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 transition hover:text-accent-500 dark:text-accent-400"
                >
                  <span>Details</span>
                  <LuArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </button>

                <div className="flex items-center gap-2">
                  {app.githubUrl && (
                    <a
                      href={app.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub for ${app.title}`}
                      className="rounded p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      <LuGithub className="h-4 w-4" />
                    </a>
                  )}
                  {app.liveUrl && (
                    <a
                      href={app.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("live_app_click", { project_id: app.id })}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 hover:text-accent-500 dark:text-accent-400"
                    >
                      <span>Demo</span>
                      <LuExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
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
