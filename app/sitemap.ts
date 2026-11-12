import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { SEO_PAGES } from "@/lib/seo";

// Same fallback as layout.tsx metadataBase — a sitemap full of localhost URLs
// would quietly de-index the site if NEXT_PUBLIC_SITE_URL were ever unset.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mma-digital-labs.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;

  const staticRoutes = ["", "/products", "/contact", "/solutions"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = PRODUCTS.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const seoRoutes = SEO_PAGES.map((p) => ({
    url: `${base}/solutions/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...seoRoutes];
}
