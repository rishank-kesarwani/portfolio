import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LuShieldCheck } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Privacy Policy | Rishank Kesarwani",
  description:
    "Privacy Policy for rishankkesarwani.com. Explains data practices, contact form submission handling, cookies, analytics, and advertising disclosure.",
  alternates: {
    canonical: "https://rishankkesarwani.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Rishank Kesarwani",
    description:
      "Privacy Policy for rishankkesarwani.com. Explains data practices, contact form submission handling, cookies, analytics, and advertising disclosure.",
    url: "https://rishankkesarwani.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
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
          <span className="text-slate-900 dark:text-slate-200">Privacy Policy</span>
        </nav>

        <header>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold text-emerald-600 dark:border-emerald-400/20 dark:text-emerald-400">
            <LuShieldCheck className="h-3.5 w-3.5" />
            <span>Transparency & Data Practices</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Effective Date: January 1, 2025 | Last Updated: February 15, 2025
          </p>
        </header>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">1. Overview</h2>
            <p className="mt-2">
              This Privacy Policy explains how Rishank Kesarwani (&quot;I&quot;, &quot;me&quot;, or &quot;the site&quot;) collects, uses, and safeguards information when you visit{" "}
              <a href="https://rishankkesarwani.com" className="font-semibold text-accent-600 hover:underline dark:text-accent-400">
                https://rishankkesarwani.com
              </a>
              . I respect your privacy and am committed to maintaining transparent, minimal data collection practices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">2. Information Collected and Processing Methods</h2>
            <div className="mt-3 space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
                <h3 className="font-bold text-slate-900 dark:text-white">A. Contact Form Communications</h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  When you submit a message via the Contact Form on this site, you provide your name, email address, and message content. This data is transmitted securely to and processed by <strong>Formspree</strong> (Formspree Inc.), a third-party form handler. Your contact information is used strictly to respond to your specific inquiry and is never sold, rented, or shared with third-party marketers.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
                <h3 className="font-bold text-slate-900 dark:text-white">B. AI Chatbot Interactions</h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  The on-site portfolio assistant routes user queries to an internal API (`/api/chat`). Messages are processed transiently in memory to generate grounded answers regarding engineering projects and technical skills. Chat queries are not used for advertising profiling and are not permanently tied to personal identity records.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.02]">
                <h3 className="font-bold text-slate-900 dark:text-white">C. Server Logs and Hosting Infrastructure</h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  This website is hosted on <strong>Vercel</strong> (Vercel Inc.). Like most websites, server infrastructure automatically logs standard technical metadata, such as your IP address, browser user-agent, operating system, and request timestamps. These logs are used solely for DDoS protection, infrastructure security, and operational reliability diagnostics.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">3. Cookies, Analytics & Advertising Technologies</h2>
            <p className="mt-2">
              Depending on site configuration and your browser settings, third-party cookies or scripts may be utilized as described below:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-xs text-slate-600 dark:text-slate-300">
              <li>
                <strong>Google AdSense:</strong> If enabled, Google uses cookies (including the DoubleClick cookie) to serve ads based on prior visits to this or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on user visits to internet sites. You can opt out of personalized advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent-600 hover:underline dark:text-accent-400"
                >
                  Google Ads Settings
                </a>{" "}
                or opt out of third-party vendor cookies via{" "}
                <a
                  href="https://www.aboutads.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent-600 hover:underline dark:text-accent-400"
                >
                  aboutads.info
                </a>
                .
              </li>
              <li>
                <strong>Client-Side Preferences:</strong> The site stores your preferred dark/light color theme in your browser&apos;s LocalStorage. This token does not track you across other websites.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">4. Affiliate Disclosures & External Links</h2>
            <p className="mt-2">
              Certain projects featured on this site (such as the AI Travel Planner) integrate travel search and booking links through the <strong>Travelpayouts</strong> affiliate network (Partner Marker #579629). If you click an external link to an airline or hotel provider, that third party manages its own cookies and privacy policies. For full details, please review our dedicated{" "}
              <Link href="/affiliate-disclosure" className="font-semibold text-accent-600 hover:underline dark:text-accent-400">
                Affiliate Disclosure
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">5. Data Retention & User Rights</h2>
            <p className="mt-2">
              In accordance with applicable privacy laws (such as GDPR and CCPA principles):
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-xs text-slate-600 dark:text-slate-300">
              <li>You have the right to request confirmation of any personal information held about you (e.g. past contact inquiries).</li>
              <li>You have the right to request deletion of your contact communications at any time.</li>
              <li>I do not sell personal data to data brokers or advertising exchanges.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">6. Contact Information</h2>
            <p className="mt-2">
              For any questions regarding this Privacy Policy or data inquiries, please email:
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
