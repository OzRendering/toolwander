import "./globals.css"; import Link from "next/link"; import type { Metadata } from "next"; import { SITE } from "@/lib/data";
export const metadata: Metadata = { metadataBase: new URL(SITE.url), title: { default: `${SITE.name} — Which AI tool to use for which job`, template: `%s | ${SITE.name}` },
  description: "A curated directory of AI tools and AI agent use cases: see which tool is best for each job, plus new AI tool releases every week.",
  openGraph: { siteName: SITE.name, type: "website" }, twitter: { card: "summary_large_image" },
  alternates: { canonical: "/", types: { "application/rss+xml": "/rss.xml" } } };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>
    <header><div className="wrap"><Link href="/" className="logo">Use<span>Which</span></Link>
      <nav><Link href="/new">New this week</Link><Link href="/category/agents">Agents</Link><Link href="/submit">Submit a tool</Link><Link href="/sponsor">Sponsor / Get featured</Link></nav></div></header>
    <main className="wrap">{children}</main>
    <footer><div className="wrap">© 2026 {SITE.name} · {SITE.tagline} · <Link href="/sponsor">Advertise</Link> · <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · <a href="/rss.xml">RSS</a> · <Link href="/llms.txt">llms.txt</Link></div></footer>
  </body></html>);
}
