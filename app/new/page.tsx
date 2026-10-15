import ToolCard from "@/components/ToolCard"; import { tools } from "@/lib/data";
export const metadata = { title: "New AI tools this week", description: "The latest AI tool and agent releases added to UseWhich this week.", alternates: { canonical: "/new" } };
export default function New() { return (<><section className="hero"><h1>New this week</h1><p>Fresh AI tool releases and major updates.</p></section>
  <div className="grid">{tools.filter(t => t.isNew).map(t => <ToolCard key={t.slug} t={t} />)}</div></>); }
