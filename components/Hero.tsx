"use client";

import { trackEvent } from "@/lib/analytics";
import { LuSparkles, LuArrowRight, LuLayers, LuServer } from "react-icons/lu";

const techStrip = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "Redis",
  "Kafka",
  "BullMQ",
  "LangGraph",
  "RAG",
  "Docker",
  "GCP",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-6 sm:pt-20 lg:px-8"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
        <div>
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold text-emerald-600 dark:border-emerald-400/20 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Full-Stack & AI Systems Engineer</span>
          </div>

          <h1 className="mt-5 max-w-2xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl md:text-4xl lg:text-[2.65rem] lg:leading-[1.18] dark:text-white">
            Building scalable products with calm engineering and sharp execution.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Full-Stack Engineer specializing in React, Next.js, Node.js, NestJS, distributed message queues, and production AI/RAG workflows. Over 8 years designing dependable systems from user interfaces to cloud microservices.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#live-apps"
              onClick={() => trackEvent("live_app_click", { action: "hero_explore_live_apps" })}
              className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent-500/20 transition hover:bg-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-ink-950"
            >
              <span>Explore Live Apps</span>
              <LuArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-white/15 dark:bg-ink-950 dark:text-white dark:hover:bg-white/10"
            >
              Enterprise Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:text-accent-600 dark:text-slate-300 dark:hover:text-accent-400"
            >
              Get in touch
            </a>
          </div>
        </div>

        {/* Feature Cards Column */}
        <div className="space-y-3.5">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400">
                <LuServer className="h-5 w-5" />
              </div>
              <div>
                <dt className="text-base font-bold text-slate-950 dark:text-white">
                  8+ Years Full-Stack Engineering
                </dt>
                <dd className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  Architecting resilient web applications, NestJS microservices, and distributed pipelines with Kafka and Redis.
                </dd>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <LuSparkles className="h-5 w-5" />
              </div>
              <div>
                <dt className="text-base font-bold text-slate-950 dark:text-white">
                  Production AI & RAG Workflows
                </dt>
                <dd className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  Multi-agent travel planning and journalistic article assistants built with LangGraph, ChromaDB, and OpenAI.
                </dd>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <LuLayers className="h-5 w-5" />
              </div>
              <div>
                <dt className="text-base font-bold text-slate-950 dark:text-white">
                  Monetization & Cloud Infrastructure
                </dt>
                <dd className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  Programmatic AdSense integration, Travelpayouts affiliate engines, Docker containers, and GCP deployments.
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Stack Strip */}
      <div className="mt-14 border-t border-slate-200/80 pt-7 dark:border-white/10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Core Technology Stack
        </p>
        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          {techStrip.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-accent-500/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
