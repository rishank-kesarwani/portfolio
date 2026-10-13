import Link from "next/link";
import { caseStudies } from "@/data/case-studies";
import { engineeringNotes } from "@/data/engineering-notes";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 bg-white py-14 dark:border-white/10 dark:bg-ink-950">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Author & Mission */}
          <div className="space-y-3">
            <Link href="/" className="text-base font-bold text-slate-950 dark:text-white">
              Rishank Kesarwani
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Full-Stack, AI & Distributed Systems Engineer with 8+ years designing high-throughput backends, RAG pipelines, and web applications.
            </p>
            <div className="pt-2 text-xs text-slate-600 dark:text-slate-300">
              <a
                href="mailto:rishankkesar111@gmail.com"
                className="font-medium text-accent-600 hover:underline dark:text-accent-400"
              >
                rishankkesar111@gmail.com
              </a>
            </div>
          </div>

          {/* Col 2: Engineering Case Studies */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-white">
              Case Studies
            </p>
            <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {caseStudies.slice(0, 5).map((cs) => (
                <li key={cs.slug}>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="transition hover:text-accent-600 dark:hover:text-accent-400"
                  >
                    {cs.title.split(":")[0]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/case-studies"
                  className="font-semibold text-accent-600 hover:underline dark:text-accent-400"
                >
                  View all case studies →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Engineering Notes */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-white">
              Engineering Notes
            </p>
            <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {engineeringNotes.slice(0, 4).map((note) => (
                <li key={note.slug}>
                  <Link
                    href={`/engineering-notes/${note.slug}`}
                    className="transition hover:text-accent-600 dark:hover:text-accent-400"
                  >
                    {note.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/engineering-notes"
                  className="font-semibold text-accent-600 hover:underline dark:text-accent-400"
                >
                  View all technical notes →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Navigation & Policies */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-white">
              Pages & Transparency
            </p>
            <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/about" className="transition hover:text-accent-600 dark:hover:text-accent-400">
                  About the Author
                </Link>
              </li>
              <li>
                <Link href="/projects" className="transition hover:text-accent-600 dark:hover:text-accent-400">
                  Project Catalog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-accent-600 dark:hover:text-accent-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="transition hover:text-accent-600 dark:hover:text-accent-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition hover:text-accent-600 dark:hover:text-accent-400">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/affiliate-disclosure"
                  className="transition hover:text-accent-600 dark:hover:text-accent-400"
                >
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-6 text-xs text-slate-500 sm:flex-row dark:border-white/10 dark:text-slate-400">
          <p>© {currentYear} Rishank Kesarwani. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/rishank-kesarwani"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-slate-900 dark:hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://www.rishankkesarwani.com/sitemap.xml"
              className="transition hover:text-slate-900 dark:hover:text-white"
            >
              Sitemap
            </a>
            <a
              href="https://www.rishankkesarwani.com/robots.txt"
              className="transition hover:text-slate-900 dark:hover:text-white"
            >
              Robots.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
