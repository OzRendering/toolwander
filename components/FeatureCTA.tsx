import Link from "next/link";
export default function FeatureCTA({ context }: { context?: string }) {
  return (<div className="box featured-slot"><h3 style={{ marginTop: 0 }}>Building {context ? `a ${context} tool` : "an AI tool"}? Get featured here.</h3>
    <p>Pinned placement at the top of the directory and category pages from $49/week, or sponsor the weekly newsletter.</p>
    <Link className="btn" href="/sponsor">Get featured →</Link></div>);
}
