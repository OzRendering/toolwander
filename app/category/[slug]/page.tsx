import { notFound } from "next/navigation"; import ToolCard from "@/components/ToolCard"; import { tools, categories, SITE } from "@/lib/data";
export function generateStaticParams() { return Object.keys(categories).map(slug => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const c = categories[slug]; if (!c) return {};
  return { title: `Best AI ${c.name} Tools (2026)`, description: `Which AI ${c.name.toLowerCase()} tool to use for which job. ${c.blurb} Compare pricing and best use cases.`, alternates: { canonical: `/category/${slug}` } }; }
export default async function Cat({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const c = categories[slug]; if (!c) notFound(); const list = tools.filter(t => t.category === slug);
  const ld = { "@context": "https://schema.org", "@type": "ItemList", name: `AI ${c.name} tools`, itemListElement: list.map((t, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE.url}/tool/${t.slug}`, name: t.name })) };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <section className="hero"><h1>Best AI {c.name} tools</h1><p>{c.blurb}</p></section>
    <div className="grid">{list.map(t => <ToolCard key={t.slug} t={t} />)}</div></>);
}
