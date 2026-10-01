import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { LuCircleDollarSign, LuFileCheck, LuGlobe } from "react-icons/lu";

export function MonetizationShowcase() {
  return (
    <section className="border-t border-slate-200/80 bg-slate-50/50 py-16 dark:border-white/10 dark:bg-ink-950/40">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-600 dark:text-accent-400">
              Commercial Infrastructure
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl dark:text-white">
              Monetization & Growth Engineering
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Engineered monetization workflows combining programmatic advertising, verified ads.txt routing, and contextual affiliate integrations.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {/* Card 1: Google AdSense */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <LuCircleDollarSign className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">
              Programmatic AdSense Integration
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Configured dynamic Google AdSense script injection with environment variable publisher binding, responsive layout containment, and zero CLS layout shifts.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Publisher: ca-pub-6553969348835282</span>
            </div>
          </div>

          {/* Card 2: Travelpayouts */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400">
              <LuGlobe className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">
              Travelpayouts Affiliate Engine
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Integrated contextual affiliate recommendation system within the AI Travel Planner, associating generated itineraries with destination-relevant booking inventory.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
              <span>Partner Marker: #579629</span>
            </div>
          </div>

          {/* Card 3: Compliance & Ads.txt */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <LuFileCheck className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">
              Ads.txt & Crawler Compliance
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Root-level Next.js route handler and static verification serving plain-text <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[11px] dark:bg-white/10">/ads.txt</code> with explicit crawler allowances in robots.txt.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              <span>Verified Direct Routing (HTTP 200)</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <AffiliateDisclosure />
        </div>
      </div>
    </section>
  );
}
