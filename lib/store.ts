// Form backend. Uses the first backend whose env vars are set:
// 1. Upstash Redis (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN, or KV_REST_API_URL + KV_REST_API_TOKEN from the Vercel Marketplace)
// 2. Vercel Blob (BLOB_READ_WRITE_TOKEN): one private JSON file per entry under forms/<kind>/
// 3. GitHub issues (GITHUB_TOKEN + GITHUB_REPO, e.g. "OzRendering/usewhich"): submissions only (never emails, the repo is public)
// 4. FORM_WEBHOOK_URL: POST JSON to any webhook
// Otherwise entries only go to the Vercel function logs ("FORM_ENTRY").
export async function store(kind: string, data: Record<string, unknown>): Promise<boolean> {
  const entry = { kind, at: new Date().toISOString(), ...data };
  const json = JSON.stringify(entry);
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  try {
    if (url && token) {
      const r = await fetch(url, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(["RPUSH", `usewhich:${kind}`, json]) });
      return r.ok;
    }
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import("@vercel/blob");
      await put(`forms/${kind}/${entry.at}-${Math.random().toString(36).slice(2, 8)}.json`, json, { access: "private", contentType: "application/json" });
      return true;
    }
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO && kind === "submission") {
      const { email: _omit, ...pub } = entry as Record<string, unknown>;
      const r = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPO}/issues`, { method: "POST",
        headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "User-Agent": "usewhich" },
        body: JSON.stringify({ title: `Tool submission: ${String(pub.name)}`, body: "```json\n" + JSON.stringify(pub, null, 2) + "\n```", labels: ["submission"] }) });
      if (r.ok) { console.log("FORM_ENTRY_PRIVATE", json); return true; }
    }
    if (process.env.FORM_WEBHOOK_URL) {
      const r = await fetch(process.env.FORM_WEBHOOK_URL, { method: "POST", headers: { "content-type": "application/json" }, body: json });
      return r.ok;
    }
  } catch (e) { console.error("FORM_STORE_ERROR", e); }
  console.log("FORM_ENTRY", json);
  return true;
}
export function backendName() {
  if ((process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL)) return "upstash";
  if (process.env.BLOB_READ_WRITE_TOKEN) return "blob"; if (process.env.GITHUB_TOKEN) return "github"; if (process.env.FORM_WEBHOOK_URL) return "webhook"; return "logs";
}
