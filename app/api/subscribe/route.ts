import { store } from "@/lib/store";
export async function POST(req: Request) { const { email } = await req.json().catch(() => ({}));
  if (typeof email !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 200) return Response.json({ ok: false }, { status: 400 });
  return Response.json({ ok: await store("subscribe", { email }) }); }
