import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://bellewoodpharmacy.com";

  return [
    "",
    "/prescriptions",
    "/transfer",
    "/vaccines",
    "/availability",
    "/insurance",
    "/wellness",
    "/compounding",
    "/providers",
    "/careers",
    "/privacy",
    "/hipaa",
    "/accessibility",
    "/terms",
  ].map((route) => ({
    url: `${base}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
