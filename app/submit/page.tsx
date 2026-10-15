import SubmitForm from "./SubmitForm";
export const metadata = { title: "Submit an AI tool", description: "Submit your AI tool or agent to the UseWhich directory for free review.", alternates: { canonical: "/submit" } };
export default function Submit() { return (<><section className="hero"><h1>Submit a tool</h1><p>Free listing review. Real, live products only.</p></section><div className="box"><SubmitForm /></div></>); }
