import Link from "next/link"; import ToolCard from "@/components/ToolCard"; import Newsletter from "@/components/Newsletter";
import { tools, categories, featuredSlugs, SITE } from "@/lib/data";
export default function Home() {
  const featured = tools.filter(t => featuredSlugs.includes(t.slug)); const fresh = tools.filter(t => t.isNew);
  const ld = { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url, description: SITE.tagline };
  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <section className="hero"><h1>Which AI tool should you use?</h1><p>{tools.length} hand-picked AI tools and agents, each matched to the job it does best. New releases every week.</p></section>
    <div className="cats">{Object.entries(categories).map(([k, c]) => <Link key={k} href={`/category/${k}`}>{c.name}</Link>)}</div>
    <h2>Featured</h2>
    <div className="grid">{featured.map(t => <ToolCard key={t.slug} t={t} featured />)}
      <Link href="/sponsor" className="card featured-slot"><h3>Your tool here</h3><p>Get your AI tool featured at the top of the directory.</p><span className="tag feat">From $49/week</span></Link></div>
    <h2>New this week</h2><p className="muted">Recent releases and updates added to the directory.</p>
    <div className="grid">{fresh.map(t => <ToolCard key={t.slug} t={t} />)}</div>
    <div className="box"><h2 style={{ marginTop: 0 }}>The weekly AI tools newsletter</h2><p>New AI tools and agent use cases, one email a week.</p><Newsletter /></div>
    {Object.entries(categories).map(([k, c]) => (<section key={k}><h2><Link href={`/category/${k}`}>{c.name}</Link></h2><p className="muted">{c.blurb}</p>
      <div className="grid">{tools.filter(t => t.category === k).map(t => <ToolCard key={t.slug} t={t} />)}</div></section>))}
  </>);
}
