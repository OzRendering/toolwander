// Minimal form backend. If FORM_WEBHOOK_URL is set (e.g. a Google Apps Script, Zapier, or Formspree endpoint),
// entries are forwarded there; otherwise they are written to the Vercel function logs as a placeholder.
export async function store(kind: string, data: Record<string, unknown>) {
  const entry = { kind, at: new Date().toISOString(), ...data };
  const hook = process.env.FORM_WEBHOOK_URL;
  if (hook) { const r = await fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(entry) }); return r.ok; }
  console.log("FORM_ENTRY", JSON.stringify(entry)); return true;
}
