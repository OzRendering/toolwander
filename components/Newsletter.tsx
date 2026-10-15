"use client";
import { useState } from "react";
export default function Newsletter() {
  const [s, setS] = useState<"idle"|"ok"|"err">("idle");
  async function go(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const email = new FormData(e.currentTarget).get("email");
    const r = await fetch("/api/subscribe", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email }) });
    setS(r.ok ? "ok" : "err");
  }
  if (s === "ok") return <p>Thanks — you're on the list for the weekly AI tools newsletter.</p>;
  return (<form className="inline" onSubmit={go}><input name="email" type="email" required placeholder="you@example.com" aria-label="Email" />
    <button className="btn" type="submit">Subscribe</button>{s === "err" && <span className="muted">Try again.</span>}</form>);
}
