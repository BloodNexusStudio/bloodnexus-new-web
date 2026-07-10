import type { MetadataRoute } from "next";
import { GAMES } from "@/data/games";

const BASE = "https://bloodnexusstudio.in";

// §10 SEO — full sitemap incl. every game detail page
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/games",
    "/services",
    "/careers",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const gameRoutes = GAMES.map((g) => ({
    url: `${BASE}/games/${g.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...gameRoutes];
}
