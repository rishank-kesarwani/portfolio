"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/80">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        <a href="#hero" className="font-semibold tracking-tight text-slate-950 dark:text-white">
          Rishank Kesarwani
        </a>

        <div className="hidden items-center gap-7 md:flex">
          <div className="flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition hover:text-accent-600 dark:text-slate-300 dark:hover:text-accent-400"
              >
                {item.label}
              </a>
            ))}
          </div>
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-900 transition hover:bg-slate-100 md:hidden dark:border-white/15 dark:text-white dark:hover:bg-white/10"
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
      </nav>

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
              className="rounded-md px-2 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="px-2 py-3">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
