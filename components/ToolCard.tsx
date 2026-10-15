import Link from "next/link";
import { Tool, categories } from "@/lib/data";
export default function ToolCard({ t, featured }: { t: Tool; featured?: boolean }) {
  return (<Link href={`/tool/${t.slug}`} className={"card" + (featured ? " featured-slot" : "")}>
    <h3>{t.name}</h3><p>{t.description}</p>
    <div className="best"><b>Best for:</b> {t.bestFor}</div>
    <div style={{ marginTop: 8 }}>{featured && <span className="tag feat">Featured</span>}{t.isNew && <span className="tag new">New</span>}
      <span className="tag">{categories[t.category].name}</span><span className="tag">{t.pricing}</span></div>
  </Link>);
}
