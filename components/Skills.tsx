import { LuLayoutTemplate, LuDatabase, LuCloud, LuSparkles, LuServer, LuLayers } from "react-icons/lu";

type GroupedSkill = {
  category: string;
  icon: string;
  skills: string[];
};

type SkillsProps = {
  groupedSkills: GroupedSkill[];
};

const iconMap: Record<string, React.ReactNode> = {
  Layout: <LuLayoutTemplate className="h-5 w-5" />,
  Server: <LuServer className="h-5 w-5" />,
  Database: <LuDatabase className="h-5 w-5" />,
  Cloud: <LuCloud className="h-5 w-5" />,
  Layers: <LuLayers className="h-5 w-5" />,
  Sparkles: <LuSparkles className="h-5 w-5 text-accent-400" />,
};

export function Skills({ groupedSkills }: SkillsProps) {
  return (
    <section id="skills" className="border-y border-slate-200 bg-slate-50 py-20 dark:border-white/10 dark:bg-ink-900">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <LuSparkles className="h-8 w-8 text-accent-600 dark:text-accent-400" />
          <h2 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl dark:text-white">
            Technical Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groupedSkills.map((group) => (
            <div
              key={group.category}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-300">
                  {iconMap[group.icon] || <LuSparkles className="h-5 w-5" />}
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {group.category}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
