import Link from "next/link"; import { notFound } from "next/navigation"; import ToolCard from "@/components/ToolCard"; import { tools, categories, SITE } from "@/lib/data";
export function generateStaticParams() { return tools.map(t => ({ slug: t.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const t = tools.find(x => x.slug === slug); if (!t) return {};
  return { title: `${t.name}: best for ${t.bestFor.toLowerCase()}`, description: `${t.name} — ${t.description} Best for: ${t.bestFor}. Pricing: ${t.pricing}.`, alternates: { canonical: `/tool/${t.slug}` } }; }
export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const t = tools.find(x => x.slug === slug); if (!t) notFound(); const c = categories[t.category];
  const ld = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: t.name, description: t.description, url: t.url, applicationCategory: `${c.name} AI tool`,
    offers: { "@type": "Offer", price: t.pricing === "Free" || t.pricing === "Open source" ? "0" : undefined, priceCurrency: "USD", description: t.pricing } };
  const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url }, { "@type": "ListItem", position: 2, name: c.name, item: `${SITE.url}/category/${t.category}` }, { "@type": "ListItem", position: 3, name: t.name, item: `${SITE.url}/tool/${t.slug}` }] };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([ld, crumbs]) }} />
    <p className="muted" style={{ marginTop: 24 }}><Link href="/">Home</Link> / <Link href={`/category/${t.category}`}>{c.name}</Link></p>
    <div className="box"><h1 style={{ marginTop: 0 }}>{t.name}</h1><p style={{ fontSize: 18 }}>{t.description}</p>
      <p><b>Use it for:</b> {t.bestFor}</p><p><span className="tag">{c.name}</span><span className="tag">{t.pricing}</span>{t.isNew && <span className="tag new">New this week</span>}</p>
      <a className="btn" href={t.url} target="_blank" rel="noopener">Visit {t.name} ↗</a></div>
    <h2>Alternatives in {c.name}</h2><div className="grid">{tools.filter(x => x.category === t.category && x.slug !== t.slug).slice(0, 6).map(x => <ToolCard key={x.slug} t={x} />)}</div></>);
}
