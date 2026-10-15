import { tools, SITE } from "@/lib/data";
export const dynamic = "force-static";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
export function GET() {
  const list = [...tools].sort((a, b) => b.added.localeCompare(a.added) || Number(!!b.isNew) - Number(!!a.isNew));
  const items = list.map(t => `<item><title>${esc(t.name)}</title><link>${SITE.url}/tool/${t.slug}</link><guid>${SITE.url}/tool/${t.slug}</guid><pubDate>${new Date(t.added + "T12:00:00Z").toUTCString()}</pubDate><category>${t.category}</category><description>${esc(`${t.description} Best for: ${t.bestFor}.`)}</description></item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${SITE.name}: new AI tools</title><link>${SITE.url}</link><atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml"/><description>${esc(SITE.tagline)} New AI tools and agents added to the directory.</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
