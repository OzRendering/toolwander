import type { MetadataRoute } from "next"; import { tools, categories, SITE } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap { const u = (p: string) => ({ url: SITE.url + p, lastModified: new Date("2026-10-15") });
  return [u(""), u("/new"), u("/newsletter"), u("/sponsor"), u("/submit"), u("/privacy"), u("/terms"), ...Object.keys(categories).map(c => u(`/category/${c}`)), ...tools.map(t => u(`/tool/${t.slug}`))]; }
