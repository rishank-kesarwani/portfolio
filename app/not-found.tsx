import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LuFileQuestion, LuBookOpen, LuHouse, LuFolderGit2 } from "react-icons/lu";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="content" className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-5 py-20 text-center sm:px-6 lg:px-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
          <LuFileQuestion className="h-8 w-8" />
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400">
          404 Error
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
          Page Not Found
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          The requested page could not be located. It may have moved or been renamed. You can explore the links below:
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-accent-500"
          >
            <LuHouse className="h-4 w-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/10"
          >
            <LuBookOpen className="h-4 w-4" />
            <span>Engineering Case Studies</span>
          </Link>
          <Link
            href="/engineering-notes"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/10"
          >
            <span>Technical Notes</span>
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/10"
          >
            <LuFolderGit2 className="h-4 w-4" />
            <span>Projects Catalog</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
