import type { Metadata } from "next";
import Script from "next/script";
import { Chatbot } from "@/components/Chatbot";
import "./globals.css";

const siteUrl = "https://rishankkesarwani.com";
const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
const isAdSenseConfigured = Boolean(
  adsenseClientId && /^ca-pub-\d+$/.test(adsenseClientId)
);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rishank Kesarwani | Full-Stack & AI Systems Engineer",
    template: "%s | Rishank Kesarwani",
  },
  description:
    "Portfolio and technical engineering notes of Rishank Kesarwani, a full-stack engineer specializing in React, Next.js, Node.js, NestJS, distributed systems, and production AI architectures.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Rishank Kesarwani | Full-Stack & AI Systems Engineer",
    description:
      "Engineering case studies, technical notes, and live production platforms across distributed backends, AI orchestration, and cloud systems.",
    url: siteUrl,
    siteName: "Rishank Kesarwani",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishank Kesarwani | Full-Stack & AI Systems Engineer",
    description:
      "Engineering case studies, technical notes, and live production platforms across distributed backends, AI orchestration, and cloud systems.",
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
      "sameAs": [
        "https://github.com/rishank-kesarwani",
      ],
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
        "Qdrant",
        "BullMQ",
      ],
    },
    {
      "@type": "WebSite",
      "name": "Rishank Kesarwani",
      "url": siteUrl,
      "description":
        "Engineering portfolio, technical case studies, and architecture notes by Rishank Kesarwani.",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {isAdSenseConfigured ? (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
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
