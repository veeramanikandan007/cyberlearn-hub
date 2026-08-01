import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cyberlearnhub.example.com";
  const routes = [
    "",
    "/about",
    "/courses",
    "/learning-paths",
    "/roadmaps",
    "/labs",
    "/practice-challenges",
    "/blog",
    "/resources",
    "/community",
    "/dashboard",
    "/profile",
    "/certificates",
    "/pricing",
    "/contact",
    "/login",
    "/register",
    "/forgot-password",
    "/terms",
    "/privacy-policy",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
