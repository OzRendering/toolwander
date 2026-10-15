import { store } from "@/lib/store";
export async function POST(req: Request) { const d = await req.json().catch(() => null);
  if (!d || typeof d.name !== "string" || typeof d.url !== "string" || !/^https?:\/\//.test(d.url)) return Response.json({ ok: false }, { status: 400 });
  const clean = Object.fromEntries(Object.entries(d).map(([k, v]) => [k, String(v).slice(0, 300)]));
  return Response.json({ ok: await store("submission", clean) }); }
