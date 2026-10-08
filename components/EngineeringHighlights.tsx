import { engineeringPillars } from "@/data/portfolio";
import {
  LuSparkles,
  LuLayers,
  LuServer,
  LuLayoutTemplate,
  LuCloud,
  LuDatabase,
  LuShieldCheck,
  LuCpu,
  LuCheck,
} from "react-icons/lu";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <LuSparkles className="h-5 w-5 text-accent-500" />,
  Layers: <LuLayers className="h-5 w-5 text-indigo-500" />,
  Server: <LuServer className="h-5 w-5 text-emerald-500" />,
  Layout: <LuLayoutTemplate className="h-5 w-5 text-sky-500" />,
  Cloud: <LuCloud className="h-5 w-5 text-cyan-500" />,
  Database: <LuDatabase className="h-5 w-5 text-amber-500" />,
  Shield: <LuShieldCheck className="h-5 w-5 text-rose-500" />,
  Cpu: <LuCpu className="h-5 w-5 text-violet-500" />,
};

export function EngineeringHighlights() {
  return (
    <section id="engineering" className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-600 dark:text-accent-400">
          Core Competencies
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl dark:text-white">
          Engineering Capabilities & Technical Depth
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Proven architectural patterns across distributed backends, AI orchestration pipelines, database query optimization, and production monetization.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {engineeringPillars.map((pillar) => (
          <div
            key={pillar.title}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5">
                {iconMap[pillar.icon] || <LuSparkles className="h-5 w-5 text-accent-500" />}
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-950 dark:text-white">
                {pillar.title}
              </h3>

              <ul className="mt-4 space-y-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {pillar.capabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <LuCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-600 dark:text-accent-400" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
