import type { Metadata } from "next";
import Script from "next/script";
import { Chatbot } from "@/components/Chatbot";
import "./globals.css";

const siteUrl = "https://rishankkesharwani.com";
const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rishank Kesarwani | Full-Stack Engineer",
  description:
    "Portfolio of Rishank Kesarwani, a full-stack engineer specializing in React, Next.js, Node.js, NestJS, distributed systems, GCP, and AI-assisted workflows.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Rishank Kesarwani | Full-Stack Engineer",
    description:
      "Portfolio of Rishank Kesarwani, a full-stack engineer specializing in React, Next.js, Node.js, NestJS, distributed systems, GCP, and AI-assisted workflows.",
    url: siteUrl,
    siteName: "Rishank Kesarwani",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishank Kesarwani | Full-Stack Engineer",
    description:
      "Portfolio of Rishank Kesarwani, a full-stack engineer specializing in React, Next.js, Node.js, NestJS, distributed systems, GCP, and AI-assisted workflows.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "name": "Rishank Kesarwani",
      "jobTitle": "Full-Stack Software Engineer",
      "url": siteUrl,
      "email": "rishankkesar111@gmail.com",
      "knowsAbout": [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "NestJS",
        "PostgreSQL",
        "MySQL",
        "Redis",
        "Kafka",
        "GCP",
        "Docker",
        "CI/CD",
        "LangGraph",
        "RAG",
        "LLM Systems",
      ],
    },
    {
      "@type": "WebSite",
      "name": "Rishank Kesarwani | Full-Stack Engineer",
      "url": siteUrl,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {adsenseClientId ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-white text-slate-950 dark:bg-ink-950 dark:text-white">
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
