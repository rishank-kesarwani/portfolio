import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { engineeringNotes } from "@/data/engineering-notes";

const siteUrl = "https://www.rishankkesarwani.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date("2025-02-15"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date("2025-02-15"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/case-studies`,
      lastModified: new Date("2025-02-15"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/engineering-notes`,
      lastModified: new Date("2025-02-15"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date("2025-02-15"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date("2025-02-15"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date("2025-02-15"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date("2025-02-15"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/affiliate-disclosure`,
      lastModified: new Date("2025-02-15"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const caseStudyUrls: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${siteUrl}/case-studies/${cs.slug}`,
    lastModified: new Date(cs.updatedAt),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const engineeringNoteUrls: MetadataRoute.Sitemap = engineeringNotes.map((note) => ({
    url: `${siteUrl}/engineering-notes/${note.slug}`,
    lastModified: new Date(note.updatedAt),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticPages, ...caseStudyUrls, ...engineeringNoteUrls];
}
