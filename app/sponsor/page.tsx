export const metadata = { title: "Sponsor / Get featured", description: "Feature your AI tool at the top of the ToolWander directory or sponsor the weekly AI tools newsletter. Pricing from $49.", alternates: { canonical: "/sponsor" } };
const plans = [
  { name: "Featured listing — 1 week", price: "$49", desc: "Pinned in the Featured row at the top of the homepage and your category page, with a Featured badge." },
  { name: "Newsletter sponsor slot", price: "$99", desc: "Top-of-email sponsor placement in one issue of the weekly AI tools newsletter (logo, 50-word blurb, link)." },
  { name: "Bundle — featured week + newsletter", price: "$129", desc: "Both placements in the same week. Best value for launches." },
];
export default function Sponsor() { return (<><section className="hero"><h1>Sponsor / Get featured</h1><p>Put your AI tool in front of people actively choosing which tool to use.</p></section>
  <div className="price">{plans.map(p => (<div className="box" key={p.name}><h3 style={{ marginTop: 0 }}>{p.name}</h3><b>{p.price}</b><p>{p.desc}</p>
    <button className="btn" disabled aria-disabled="true">Checkout — coming soon</button><p className="muted">Online payments are not live yet.</p></div>))}</div>
  <div className="box"><h3 style={{ marginTop: 0 }}>Want a spot before checkout opens?</h3><p>Use the <a href="/submit">Submit a tool</a> form and tick “Interested in a featured listing”. We'll follow up.</p></div></>); }
