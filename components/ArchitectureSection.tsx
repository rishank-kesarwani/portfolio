"use client";

import { useState } from "react";
import {
  LuLayers,
  LuCpu,
  LuGitPullRequest,
  LuDatabase,
  LuZap,
  LuSparkles,
  LuCircleCheck,
  LuArrowDown,
  LuShieldCheck,
  LuNetwork,
  LuBell,
  LuServer,
} from "react-icons/lu";

export function ArchitectureSection() {
  const [activeTab, setActiveTab] = useState<"ai-platform" | "pr-review">("ai-platform");

  return (
    <section id="architecture" className="border-t border-slate-200/80 bg-slate-50/60 py-20 dark:border-white/10 dark:bg-ink-950/40">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-600 dark:text-accent-400">
              System Architecture
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl dark:text-white">
              Shared Platform & CI/CD Pipelines
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Engineered as a cohesive ecosystem: a centralized AI microservice platform with semantic caching, and an automated PR review & regression detection pipeline.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="mt-8 flex gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("ai-platform")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
              activeTab === "ai-platform"
                ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-950"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
            }`}
          >
            <LuNetwork className="h-4 w-4" />
            <span>Shared AI Platform Pipeline</span>
          </button>
          <button
            onClick={() => setActiveTab("pr-review")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
              activeTab === "pr-review"
                ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-950"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
            }`}
          >
            <LuGitPullRequest className="h-4 w-4" />
            <span>AI PR Review & Regression Flow</span>
          </button>
        </div>

        {/* Diagram 1: Shared AI Platform Flow */}
        {activeTab === "ai-platform" && (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                End-to-End AI Request Architecture
              </h3>

              <div className="mt-6 space-y-4">
                {/* Layer 1: Client Applications */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      <LuServer className="h-4 w-4 text-accent-500" />
                      Client Applications & Web Interfaces
                    </span>
                    <span className="rounded bg-accent-500/10 px-2 py-0.5 text-[10px] font-bold text-accent-600 dark:text-accent-400">
                      Frontend Layer
                    </span>
                  </div>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {["Travel Planner", "Movie Matcher", "Sports Tracker", "Study Spot", "Hiking Explorer", "Portfolio"].map((app) => (
                      <span
                        key={app}
                        className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 dark:border-white/10 dark:bg-ink-950 dark:text-slate-300"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center text-slate-400">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                    <LuArrowDown className="h-4 w-4" />
                    <span>POST /api/v1/ai/chat (x-api-key Auth & Rate Limiting)</span>
                  </div>
                </div>

                {/* Layer 2: Centralized AI Platform */}
                <div className="rounded-xl border border-accent-500/30 bg-gradient-to-br from-accent-500/[0.04] to-indigo-500/[0.04] p-5 dark:border-accent-400/20 dark:bg-white/[0.03]">
                  <div className="flex items-center justify-between text-xs font-bold text-accent-600 dark:text-accent-400">
                    <span className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                      <LuSparkles className="h-4 w-4 text-accent-500" />
                      Centralized AI Platform (Shared Infrastructure)
                    </span>
                    <span className="rounded bg-accent-600 px-2 py-0.5 text-[10px] font-bold text-white">
                      Core Gateway
                    </span>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2 text-xs">
                    <div className="rounded-lg border border-slate-200/80 bg-white/90 p-2.5 dark:border-white/10 dark:bg-ink-900">
                      <span className="font-semibold text-slate-900 dark:text-white">Redis Semantic Cache</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Sub-ms cache hit for repeated prompts</p>
                    </div>
                    <div className="rounded-lg border border-slate-200/80 bg-white/90 p-2.5 dark:border-white/10 dark:bg-ink-900">
                      <span className="font-semibold text-slate-900 dark:text-white">Qdrant Vector RAG</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Hybrid search over indexed collections</p>
                    </div>
                    <div className="rounded-lg border border-slate-200/80 bg-white/90 p-2.5 dark:border-white/10 dark:bg-ink-900">
                      <span className="font-semibold text-slate-900 dark:text-white">Memory Manager</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Session history & user-level context</p>
                    </div>
                    <div className="rounded-lg border border-slate-200/80 bg-white/90 p-2.5 dark:border-white/10 dark:bg-ink-900">
                      <span className="font-semibold text-slate-900 dark:text-white">Multi-LLM Router</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Gemini 2.0 / OpenAI / Fallback policy</p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center text-slate-400">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                    <LuArrowDown className="h-4 w-4" />
                    <span>Kafka Events & BullMQ Queues</span>
                  </div>
                </div>

                {/* Layer 3: Persistence & Notification */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
                      <LuDatabase className="h-4 w-4 text-emerald-500" />
                      Storage & Vector Databases
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      PostgreSQL relational persistence, Qdrant vector collections, and Redis in-memory key-value stores.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
                      <LuBell className="h-4 w-4 text-amber-500" />
                      Notification Service
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Kafka-backed multi-channel delivery (SMS, WhatsApp, Email, Push) with dead-letter queue retries.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Details Sidebar */}
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  <LuShieldCheck className="h-4 w-4 text-emerald-500" />
                  Service-to-Service Isolation
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  Client apps never communicate directly with upstream LLM APIs. Every request routes through the AI Platform with per-app API keys (<code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[11px] dark:bg-white/10">x-api-key</code>), enforcing tenant quotas and logging execution telemetry.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  <LuZap className="h-4 w-4 text-accent-500" />
                  Semantic Caching & Cost Optimization
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  By embedding queries and matching cosine similarity in Redis, high-frequency identical or near-identical prompts receive sub-millisecond responses, cutting LLM token costs by up to 70%.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  <LuLayers className="h-4 w-4 text-indigo-500" />
                  Shared vs Application Separation
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-800 dark:text-slate-200">AI Platform</strong> and <strong className="text-slate-800 dark:text-slate-200">Notification Service</strong> act as shared horizontal backbones, allowing new frontend applications (Travel, Movie, Sports) to be deployed rapidly without duplicating core AI or messaging logic.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Diagram 2: PR Review & Model Regression Flow */}
        {activeTab === "pr-review" && (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Automated Code Review & Model Evaluation Pipeline
              </h3>

              <div className="mt-6 space-y-4">
                {/* Step 1: GitHub Webhook */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      <LuGitPullRequest className="h-4 w-4 text-purple-500" />
                      GitHub Pull Request Event
                    </span>
                    <span className="rounded bg-purple-500/10 px-2 py-0.5 text-[10px] font-bold text-purple-600 dark:text-purple-400">
                      Webhook Trigger
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    Developer opens or updates a Pull Request. GitHub sends signed payload to AI PR Review Platform.
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex justify-center text-slate-400">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                    <LuArrowDown className="h-4 w-4" />
                    <span>BullMQ Asynchronous Job Ingestion</span>
                  </div>
                </div>

                {/* Step 2: AI PR Review Platform */}
                <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/[0.04] to-accent-500/[0.04] p-5 dark:border-purple-400/20 dark:bg-white/[0.03]">
                  <div className="flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                    <span className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                      <LuCpu className="h-4 w-4 text-purple-500" />
                      AI PR Review Engine & Static Analysis
                    </span>
                    <span className="rounded bg-purple-600 px-2 py-0.5 text-[10px] font-bold text-white">
                      Processing Pipeline
                    </span>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2 text-xs">
                    <div className="rounded-lg border border-slate-200/80 bg-white/90 p-2.5 dark:border-white/10 dark:bg-ink-900">
                      <span className="font-semibold text-slate-900 dark:text-white">AST Changed-File Parser</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Extracts modified functions & context</p>
                    </div>
                    <div className="rounded-lg border border-slate-200/80 bg-white/90 p-2.5 dark:border-white/10 dark:bg-ink-900">
                      <span className="font-semibold text-slate-900 dark:text-white">Multi-Agent Code Review</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Security, performance & logic checks</p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center text-slate-400">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                    <LuArrowDown className="h-4 w-4" />
                    <span>Benchmark Evaluation Gate</span>
                  </div>
                </div>

                {/* Step 3: Model Regression & Output */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
                      <LuShieldCheck className="h-4 w-4 text-emerald-500" />
                      Model Regression Detection
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Evaluates output adherence against golden baselines (Quality, Latency, Cost, Safety) to prevent model drift.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-white">
                      <LuCircleCheck className="h-4 w-4 text-sky-500" />
                      GitHub Checks & PR Comments
                    </div>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Posts actionable inline annotations, summary Check Run status (PASS / WARN / FAIL), and review telemetry.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  <LuCircleCheck className="h-4 w-4 text-emerald-500" />
                  Finding Arbitration to Reduce Noise
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  Standard LLM code reviewers frequently output pedantic or false-positive comments. The arbitration stage cross-verifies issues with static AST rules and confidence thresholds before annotating GitHub diffs.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  <LuZap className="h-4 w-4 text-purple-500" />
                  Model Regression as a Quality Gate
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  Whenever system prompts or underlying LLMs are altered, the Model Regression suite runs automated statistical benchmarks across test sets, ensuring structured schema adherence and zero latency degradation.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
