"use client";
import { useState } from "react"; import { categories } from "@/lib/data";
export default function SubmitForm() {
  const [done, setDone] = useState<null | boolean>(null);
  async function go(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); const d = Object.fromEntries(new FormData(e.currentTarget));
    const r = await fetch("/api/submit", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(d) }); setDone(r.ok); }
  if (done) return <p>Thanks! Your tool was submitted for review.</p>;
  return (<form onSubmit={go}>
    <label>Tool name<input name="name" required maxLength={80} /></label>
    <label>Official URL<input name="url" type="url" required placeholder="https://" /></label>
    <label>Category<select name="category">{Object.entries(categories).map(([k, c]) => <option key={k} value={k}>{c.name}</option>)}</select></label>
    <label>Pricing<select name="pricing"><option>Free</option><option>Freemium</option><option>Paid</option><option>Open source</option></select></label>
    <label>One-line description<input name="description" required maxLength={140} /></label>
    <label>Best for (the job it does best)<input name="bestFor" required maxLength={100} /></label>
    <label>Your contact email<input name="email" type="email" required /></label>
    <label style={{ display: "flex", gap: 8, alignItems: "center" }}><input type="checkbox" name="featured" style={{ width: "auto", margin: 0 }} /> Interested in a featured listing</label><br />
    <button className="btn" type="submit">Submit tool</button>{done === false && <p className="muted">Something went wrong; please try again.</p>}
  </form>);
}
