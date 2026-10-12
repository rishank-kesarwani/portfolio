import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LuInfo, LuShieldCheck } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | Rishank Kesarwani",
  description:
    "Affiliate Disclosure for rishankkesarwani.com detailing commercial partnerships, Travelpayouts integration, and FTC compliance.",
  alternates: {
    canonical: "https://rishankkesarwani.com/affiliate-disclosure",
  },
  openGraph: {
    title: "Affiliate Disclosure | Rishank Kesarwani",
    description:
      "Affiliate Disclosure for rishankkesarwani.com detailing commercial partnerships, Travelpayouts integration, and FTC compliance.",
    url: "https://rishankkesarwani.com/affiliate-disclosure",
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <Navbar />
      <main id="content" className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200">Affiliate Disclosure</span>
        </nav>

        <header>
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/5 px-3 py-1 text-xs font-semibold text-accent-600 dark:border-accent-400/20 dark:text-accent-400">
            <LuInfo className="h-3.5 w-3.5" />
            <span>FTC & Commercial Transparency</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
            Affiliate Disclosure
          </h1>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Last Updated: February 15, 2025
          </p>
        </header>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">1. FTC Compliance Statement</h2>
            <p className="mt-2">
              In compliance with the Federal Trade Commission (FTC) guidelines and global consumer transparency standards, this disclosure details commercial partnerships and affiliate link implementations operating across this website and associated applications.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">2. Travelpayouts Partnership & Integration</h2>
            <p className="mt-2">
              Rishank Kesarwani participates in the <strong>Travelpayouts Affiliate Network</strong> (Partner Marker: <code>#579629</code>).
            </p>
            <p className="mt-2">
              In products such as the <Link href="/case-studies/ai-travel-planner" className="font-semibold text-accent-600 hover:underline dark:text-accent-400">AI Travel Planner</Link>, generated itineraries provide contextual travel suggestions (such as recommended hotels, flights, or local tours in the planned destination). These suggestions may contain tracking links associated with Travelpayouts partner programs.
            </p>
            <div className="mt-4 rounded-xl border border-accent-500/20 bg-accent-500/[0.04] p-5 dark:border-accent-400/20 dark:bg-white/[0.02]">
              <div className="flex items-start gap-3">
                <LuShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-600 dark:text-accent-400" />
                <div className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                  <p className="font-bold text-slate-900 dark:text-white">Zero Extra Cost to You:</p>
                  <p>
                    If you click through an affiliate link and complete a booking or purchase with an external provider (such as Booking.com, Aviasales, or GetYourGuide), we may earn a small referral commission. <strong>This occurs at absolutely no additional cost to you.</strong> The price you pay is identical to booking directly.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">3. Editorial Independence</h2>
            <p className="mt-2">
              Affiliate monetization does not dictate which destinations, itineraries, or engineering architectures are built or recommended. Travel recommendations are generated algorithmically based on user travel preferences, budget parameters, and geographic proximity. We do not accept sponsored placement fees to artificially inflate attraction rankings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">4. Google AdSense Advertising</h2>
            <p className="mt-2">
              This site is configured for programmatic Google AdSense advertising. When active, Google may serve contextual or personalized advertisements. Advertisements are clearly distinguished with standard ad labels or container borders. We do not participate in click-incentivization schemes or deceptive ad practices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">5. Inquiries</h2>
            <p className="mt-2">
              For any questions regarding affiliate relationships or commercial infrastructure on this site, please contact:
            </p>
            <p className="mt-2 font-mono text-xs font-semibold text-slate-900 dark:text-slate-100">
              rishankkesar111@gmail.com
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
