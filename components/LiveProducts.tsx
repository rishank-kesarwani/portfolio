"use client";

import { useState } from "react";
import { liveProducts, type Project } from "@/data/portfolio";
import { ProjectModal } from "@/components/ProjectModal";
import { trackEvent } from "@/lib/analytics";
import {
  LuExternalLink,
  LuSparkles,
  LuLayers,
  LuFlame,
  LuArrowRight,
  LuCompass,
  LuFilm,
  LuTrophy,
  LuMapPin,
} from "react-icons/lu";

const iconMap: Record<string, React.ReactNode> = {
  "travel-planner": <LuCompass className="h-6 w-6 text-accent-500" />,
  "movie-matcher": <LuFilm className="h-6 w-6 text-purple-500" />,
  "sports-tracker": <LuTrophy className="h-6 w-6 text-amber-500" />,
  "study-spot-finder": <LuMapPin className="h-6 w-6 text-emerald-500" />,
};

export function LiveProducts() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const travelPlanner = liveProducts.find((p) => p.id === "travel-planner");
  const otherApps = liveProducts.filter((p) => p.id !== "travel-planner");

  return (
    <section id="live-apps" className="relative mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-600 dark:text-accent-400">
              Live Products & Applications
            </p>
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl dark:text-white">
            Deployed Full-Stack & AI Systems
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Production applications demonstrating end-to-end full-stack engineering, AI/LLM workflow orchestration, and integrated monetization infrastructure.
        </p>
      </div>

      {/* Primary Featured: AI Travel Planner */}
      {travelPlanner && (
        <div className="mt-10 overflow-hidden rounded-2xl border border-accent-500/20 bg-gradient-to-br from-white via-slate-50 to-accent-500/[0.04] p-6 shadow-xl transition hover:border-accent-500/35 dark:border-white/10 dark:from-ink-900 dark:via-ink-950 dark:to-accent-950/20 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/70 pb-5 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 dark:bg-accent-400/10 dark:text-accent-400">
                <LuCompass className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Live Application
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent-500/10 px-2.5 py-0.5 text-xs font-semibold text-accent-600 dark:text-accent-400">
                    <LuFlame className="h-3 w-3" />
                    Featured Flagship
                  </span>
                </div>
                <h3 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white sm:text-3xl">
                  {travelPlanner.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedProject(travelPlanner)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-white/10 dark:bg-ink-950 dark:text-white dark:hover:bg-white/5"
              >
                Case Study
              </button>
              {travelPlanner.liveUrl && (
                <a
                  href={travelPlanner.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("live_app_click", { project_id: travelPlanner.id })}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent-500/20 transition hover:bg-accent-500"
                >
                  <span>Open Application</span>
                  <LuExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
            <div>
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {travelPlanner.longDescription || travelPlanner.description}
              </p>

              <div className="mt-5 space-y-2">
                <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <LuLayers className="h-4 w-4 text-accent-500" />
                  Architecture Highlights
                </h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {travelPlanner.architectureHighlights?.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-slate-200/70 bg-white/70 p-3 text-xs text-slate-700 dark:border-white/5 dark:bg-white/[0.03] dark:text-slate-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-5 dark:border-white/5 dark:bg-white/[0.02]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Live Tech Stack
                  </span>
                  <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">
                    Travelpayouts #579629
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {travelPlanner.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 dark:border-white/5">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Target Domain:</span>
                  <span className="font-mono font-medium text-accent-600 dark:text-accent-400">
                    travel-planner.rishankkesarwani.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Other Applications: Movie Matcher, Sports Tracker, Study Spot Finder */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {otherApps.map((app) => (
          <div
            key={app.id}
            className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5">
                  {iconMap[app.id] || <LuSparkles className="h-5 w-5 text-accent-500" />}
                </div>
                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300">
                  {app.category}
                </span>
              </div>

              <h3 className="mt-4 text-xl font-bold text-slate-950 dark:text-white">
                {app.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {app.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {app.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/5">
              <button
                onClick={() => setSelectedProject(app)}
                className="inline-flex items-center gap-1 text-sm font-semibold text-accent-600 transition hover:text-accent-500 dark:text-accent-400"
              >
                <span>View Details</span>
                <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              {app.liveUrl ? (
                <a
                  href={app.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-slate-900 transition hover:text-accent-600 dark:text-white dark:hover:text-accent-400"
                >
                  Live Demo
                </a>
              ) : (
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                  {app.statusText}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
