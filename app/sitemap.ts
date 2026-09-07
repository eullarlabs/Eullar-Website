import type { MetadataRoute } from "next";

const ROUTES = ["", "/research", "/products/syllabi", "/products/reevue", "/about", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: `https://eullar.com${r}`,
    lastModified: new Date(),
    changeFrequency: r === "" || r === "/research" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r.startsWith("/products") ? 0.9 : 0.7,
  }));
}
