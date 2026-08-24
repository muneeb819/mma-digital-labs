import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { SEO_PAGES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

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
