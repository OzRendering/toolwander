import Newsletter from "@/components/Newsletter";
export const metadata = { title: "The weekly AI tools newsletter", description: "New AI tools and agent use cases from ToolWander, one email a week. Free, unsubscribe anytime.", alternates: { canonical: "/newsletter" } };
export default function NewsletterPage() { return (<><section className="hero"><h1>The weekly AI tools newsletter</h1><p>New AI tools and agent use cases, one email a week. Free, unsubscribe anytime.</p></section><div className="box"><Newsletter /></div></>); }
