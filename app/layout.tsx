import type { Metadata } from "next";
import { Chatbot } from "@/components/Chatbot";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rishank Kesarwani | Full-Stack Engineer",
  description:
    "Portfolio of Rishank Kesarwani, a full-stack software engineer specializing in React, Next.js, Node.js, GCP, and AI-powered products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-white text-slate-950 dark:bg-ink-950 dark:text-white">
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
