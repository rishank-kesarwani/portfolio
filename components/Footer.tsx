export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 bg-white py-12 dark:border-white/10 dark:bg-ink-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:flex-row sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-bold text-slate-950 dark:text-white">
            Rishank Kesarwani
          </p>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Full-Stack, AI & Distributed Systems Engineer
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
          <a href="#hero" className="transition hover:text-accent-600 dark:hover:text-accent-400">
            Home
          </a>
          <a href="#live-apps" className="transition hover:text-accent-600 dark:hover:text-accent-400">
            Live Apps
          </a>
          <a href="#projects" className="transition hover:text-accent-600 dark:hover:text-accent-400">
            Projects
          </a>
          <a href="#engineering" className="transition hover:text-accent-600 dark:hover:text-accent-400">
            Engineering
          </a>
          <a href="#skills" className="transition hover:text-accent-600 dark:hover:text-accent-400">
            Skills
          </a>
          <a href="#contact" className="transition hover:text-accent-600 dark:hover:text-accent-400">
            Contact
          </a>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500">
          © {currentYear} Rishank Kesarwani. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
