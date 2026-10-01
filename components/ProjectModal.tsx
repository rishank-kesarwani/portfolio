"use client";

import { useEffect } from "react";
import type { Project } from "@/data/portfolio";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { trackEvent } from "@/lib/analytics";
import { LuX, LuExternalLink, LuGithub, LuCircleCheck, LuSparkles, LuLayers, LuLock } from "react-icons/lu";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    trackEvent("project_open", { project_id: project.id, project_title: project.title });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="relative my-8 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl transition-all dark:border-white/10 dark:bg-ink-900 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/5 dark:hover:text-white"
        >
          <LuX className="h-5 w-5" />
        </button>

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2 pr-10">
          <span className="rounded-md bg-accent-500/10 px-2.5 py-1 text-xs font-semibold text-accent-600 dark:text-accent-400">
            {project.category}
          </span>
          {project.isLiveApp && project.liveUrl ? (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Application
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300">
              {project.statusText || "Architecture / Case Study"}
            </span>
          )}
          {project.monetization ? (
            <span className="rounded-md bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
              Monetized
            </span>
          ) : null}
        </div>

        {/* Title & Tagline */}
        <h3
          id="modal-title"
          className="mt-3 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl"
        >
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.longDescription || project.description}
        </p>

        {/* Problem Statement */}
        {project.problemStatement ? (
          <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-white/5 dark:bg-white/[0.02]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Engineering Problem
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {project.problemStatement}
            </p>
          </div>
        ) : null}

        {/* Solution Summary */}
        {project.solutionSummary ? (
          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-white/5 dark:bg-white/[0.02]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Solution & Architecture
            </h4>
            <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {project.solutionSummary}
            </p>
          </div>
        ) : null}

        {/* Architecture Highlights */}
        {project.architectureHighlights && project.architectureHighlights.length > 0 ? (
          <div className="mt-6">
            <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <LuLayers className="h-4 w-4 text-accent-500" />
              Key Architecture Highlights
            </h4>
            <ul className="mt-2.5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {project.architectureHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <LuCircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* AI Capabilities */}
        {project.aiFeatures && project.aiFeatures.length > 0 ? (
          <div className="mt-5">
            <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <LuSparkles className="h-4 w-4 text-accent-500" />
              AI & Workflow Capabilities
            </h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.aiFeatures.map((feature, idx) => (
                <span
                  key={idx}
                  className="rounded-md border border-accent-500/20 bg-accent-500/5 px-2.5 py-1 text-xs font-medium text-accent-700 dark:text-accent-300"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {/* Technologies */}
        <div className="mt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Technology Stack
          </h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Monetization & Disclosure */}
        {project.monetization ? (
          <div className="mt-6 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Monetization Infrastructure
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Integrated: <span className="font-semibold text-slate-800 dark:text-slate-200">{project.monetization}</span>
            </p>
            {project.id === "travel-planner" ? <AffiliateDisclosure /> : null}
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5 dark:border-white/5">
          <div className="flex flex-wrap gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("live_app_click", { project_id: project.id })}
                className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2"
              >
                <LuExternalLink className="h-4 w-4" />
                Open Live Application
              </a>
            ) : null}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-white/10 dark:bg-ink-950 dark:text-white dark:hover:bg-white/5"
              >
                <LuGithub className="h-4 w-4" />
                View Source
              </a>
            ) : null}
            {!project.liveUrl && !project.githubUrl ? (
              <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                <LuLock className="h-3.5 w-3.5 text-slate-400" />
                <span>Enterprise Production Architecture</span>
              </div>
            ) : null}
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
