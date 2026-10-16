import { store, backendName } from "@/lib/store";
export async function POST(req: Request) { const { email } = await req.json().catch(() => ({}));
  const e = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e) || e.length > 200) return Response.json({ ok: false, error: "invalid email" }, { status: 400 });
  const ok = await store("subscribe", { email: e });
  return Response.json({ ok, stored: backendName() }, { status: ok ? 200 : 500 }); }
