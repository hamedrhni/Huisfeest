import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

const base = siteConfig.baseUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // Dutch (default, no prefix)
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { nl: base, en: `${base}/en` } },
    },
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: { nl: `${base}/privacy`, en: `${base}/en/privacy` } },
    },
    {
      url: `${base}/voorwaarden`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: { nl: `${base}/voorwaarden`, en: `${base}/en/voorwaarden` } },
    },

    {
      url: `${base}/prijzen`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { nl: `${base}/prijzen`, en: `${base}/en/prijzen` } },
    },

    // English
    {
      url: `${base}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { nl: base, en: `${base}/en` } },
    },
    {
      url: `${base}/en/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: { nl: `${base}/privacy`, en: `${base}/en/privacy` } },
    },
    {
      url: `${base}/en/voorwaarden`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: { nl: `${base}/voorwaarden`, en: `${base}/en/voorwaarden` } },
    },
    {
      url: `${base}/en/prijzen`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { nl: `${base}/prijzen`, en: `${base}/en/prijzen` } },
    },
  ];
}
