"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { LuFlame } from "react-icons/lu";

const navItems = [
  { label: "Live Apps", href: "#live-apps", isSpecial: true },
  { label: "Architecture", href: "#architecture" },
  { label: "Projects", href: "#projects" },
  { label: "Engineering", href: "#engineering" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/80">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        <a
          href="#hero"
          className="flex items-center gap-2.5 font-bold tracking-tight text-slate-950 transition hover:opacity-90 dark:text-white"
        >
          <Logo className="h-7 w-7" />
          <span className="text-base sm:text-lg">Rishank Kesarwani</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${
                  item.isSpecial
                    ? "inline-flex items-center gap-1 text-accent-600 hover:text-accent-500 dark:text-accent-400 dark:hover:text-accent-300"
                    : "text-slate-600 hover:text-accent-600 dark:text-slate-300 dark:hover:text-accent-400"
                }`}
              >
                {item.isSpecial && <LuFlame className="h-3.5 w-3.5 text-accent-500" />}
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 border-l border-slate-200 pl-4 dark:border-white/10">
            <a
              href="#live-apps"
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-accent-500"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span>Explore Apps</span>
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-900 transition hover:bg-slate-100 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="sr-only">Open menu</span>
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition ${
                  isOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-0.5 w-5 bg-current transition ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-4 h-0.5 w-5 bg-current transition ${
                  isOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu"
        className={`border-t border-slate-200 px-5 py-3 md:hidden dark:border-white/10 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition ${
                item.isSpecial
                  ? "bg-accent-500/10 text-accent-600 dark:text-accent-400"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span>{item.label}</span>
              {item.isSpecial && (
                <span className="rounded bg-accent-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  Live
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
