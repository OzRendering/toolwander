import { tools, categories, SITE } from "@/lib/data";
export const dynamic = "force-static";
export function GET() { let s = `# ${SITE.name}\n\n> ${SITE.tagline} A curated directory of AI tools and AI agent use cases.\n\n`;
  for (const [k, c] of Object.entries(categories)) { s += `## ${c.name}\n\n`; for (const t of tools.filter(t => t.category === k)) s += `- [${t.name}](${SITE.url}/tool/${t.slug}): ${t.description} Best for: ${t.bestFor}. Pricing: ${t.pricing}. Official site: ${t.url}\n`; s += "\n"; }
  s += `## Optional\n\n- [Sponsor / Get featured](${SITE.url}/sponsor)\n- [Submit a tool](${SITE.url}/submit)\n`;
  return new Response(s, { headers: { "content-type": "text/plain; charset=utf-8" } }); }
