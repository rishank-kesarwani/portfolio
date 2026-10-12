import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Skills } from "@/components/Skills";
import { groupedSkills } from "@/data/portfolio";
import {
  LuUser,
  LuServer,
  LuLayers,
  LuSparkles,
  LuMail,
  LuGithub,
  LuArrowRight,
} from "react-icons/lu";

export const metadata: Metadata = {
  title: "About Rishank Kesarwani | Full-Stack & AI Systems Engineer",
  description:
    "Engineering profile, technical background, and architectural experience of Rishank Kesarwani. 8+ years designing scalable backends, event streaming, and AI workflows.",
  alternates: {
    canonical: "https://rishankkesarwani.com/about",
  },
  openGraph: {
    title: "About Rishank Kesarwani | Full-Stack & AI Systems Engineer",
    description:
      "Engineering profile, technical background, and architectural experience of Rishank Kesarwani. 8+ years designing scalable backends, event streaming, and AI workflows.",
    url: "https://rishankkesarwani.com/about",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://rishankkesarwani.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: "https://rishankkesarwani.com/about",
        },
      ],
    },
    {
      "@type": "Person",
      name: "Rishank Kesarwani",
      jobTitle: "Full-Stack Software Engineer",
      url: "https://rishankkesarwani.com",
      email: "rishankkesar111@gmail.com",
      sameAs: [
        "https://github.com/rishank-kesarwani",
      ],
      description:
        "Full-Stack Engineer with 8+ years of production experience across React, Next.js, Node.js, NestJS, Apache Kafka, Redis, and AI/RAG architectures.",
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="content" className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/5 px-3 py-1 text-xs font-semibold text-accent-600 dark:border-accent-400/20 dark:text-accent-400">
            <LuUser className="h-3.5 w-3.5" />
            <span>Author & Engineer Profile</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl md:text-5xl dark:text-white">
            Rishank Kesarwani
          </h1>
          <p className="mt-2 text-xl font-medium text-accent-600 dark:text-accent-400">
            Full-Stack, AI & Distributed Systems Engineer
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Over 8 years designing dependable web applications, backend microservices, and AI-enabled workflows. I focus on turning complex product and editorial requirements into calm, stable systems that scale cleanly under production loads.
          </p>
        </div>

        {/* Narrative Bio */}
        <section className="mt-12 space-y-6 text-base leading-relaxed text-slate-700 dark:text-slate-300">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            Engineering Background & Philosophy
          </h2>
          <p>
            My engineering journey is rooted in full-stack web and distributed backend development. Over the past 8+ years, I have architected systems across the entire stack: from responsive React and Next.js frontends to modular NestJS microservices, event-driven pipelines using Apache Kafka and BullMQ, and high-performance relational databases with PostgreSQL and MySQL.
          </p>
          <p>
            In enterprise publishing and high-velocity digital media (including major digital initiatives at Network18), I helped design and maintain multi-language CMS micro-frontends, automated data reporting pipelines saving dozens of weekly editorial hours, and Kafka-backed notification backends handling high-throughput transactional messaging.
          </p>
          <p>
            More recently, my focus has centered on production AI engineering. Rather than treating LLMs as standalone chat widgets, I build AI infrastructure as disciplined engineering systems: incorporating AST static analysis into code reviews, evaluating prompt updates against versioned golden datasets, and routing model invocations through centralized microservices equipped with Redis semantic caching and Qdrant vector retrieval.
          </p>
        </section>

        {/* Core Pillars Grid */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            Areas of Core Technical Focus
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400">
                <LuServer className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-950 dark:text-white">
                Backend Microservices
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Building modular NestJS/Node.js APIs, GraphQL gateways, and persistent data tiers with PostgreSQL, Redis, and Docker.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <LuLayers className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-950 dark:text-white">
                Distributed Queues & Events
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Event streaming via Kafka, background job orchestration with BullMQ, dead-letter retries, and strict idempotency patterns.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <LuSparkles className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-950 dark:text-white">
                AI & Evaluation Systems
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                Hybrid RAG with Qdrant, multi-agent arbitration pipelines, prompt regression gates, and Redis semantic caching.
              </p>
            </div>
          </div>
        </section>

        {/* Verified Public Projects & Systems */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            Verified Projects & Production Architectures
          </h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-950 dark:text-white">
                    AI PR Review Platform & Model Regression Detection
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    Production developer automation platform pairing AST static analysis with multi-agent finding arbitration, integrated with automated model evaluation gates.
                  </p>
                </div>
                <Link
                  href="/case-studies/ai-pr-review"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 hover:underline dark:text-accent-400"
                >
                  <span>Case Study</span>
                  <LuArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-950 dark:text-white">
                    Centralized AI Platform (Shared Infrastructure)
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    High-performance NestJS gateway unifying multi-tenant RAG over Qdrant collections, sub-millisecond Redis semantic caching, and per-tenant rate limits.
                  </p>
                </div>
                <Link
                  href="/case-studies/ai-platform"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 hover:underline dark:text-accent-400"
                >
                  <span>Case Study</span>
                  <LuArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-950 dark:text-white">
                    Enterprise Notification Service
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    Kafka-backed distributed notification engine with channel topic separation, Resend/SMTP fallback, FCM push alerts, and dead-letter queues.
                  </p>
                </div>
                <Link
                  href="/case-studies/notification-service"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 hover:underline dark:text-accent-400"
                >
                  <span>Case Study</span>
                  <LuArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section Embed */}
        <section className="mt-14">
          <Skills groupedSkills={groupedSkills} />
        </section>

        {/* Contact CTA */}
        <section className="mt-14 rounded-2xl border border-slate-200 bg-slate-50/70 p-8 dark:border-white/10 dark:bg-white/[0.02]">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">
            Get in Touch
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            I am open to discussions regarding senior full-stack, distributed backend, and AI engineering opportunities. Feel free to send a message through the contact form or reach out directly via email.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-accent-500"
            >
              <LuMail className="h-4 w-4" />
              <span>Contact Form</span>
            </Link>
            <a
              href="mailto:rishankkesar111@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-white/10 dark:bg-ink-900 dark:text-slate-200 dark:hover:bg-white/10"
            >
              <span>rishankkesar111@gmail.com</span>
            </a>
            <a
              href="https://github.com/rishank-kesarwani"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-white/10 dark:bg-ink-900 dark:text-slate-200 dark:hover:bg-white/10"
            >
              <LuGithub className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
