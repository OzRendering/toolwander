import { ImageResponse } from "next/og";
export const alt = "UseWhich — Which AI tool to use for which job"; export const size = { width: 1200, height: 630 }; export const contentType = "image/png";
export default function OG() { return new ImageResponse((<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#ffffff,#eef0ff)", fontFamily: "sans-serif" }}>
  <div style={{ display: "flex", fontSize: 96, fontWeight: 800, color: "#111" }}>Use<span style={{ color: "#5b5bf7" }}>Which</span></div>
  <div style={{ fontSize: 48, color: "#333", marginTop: 20 }}>Which AI tool to use for which job.</div>
  <div style={{ fontSize: 30, color: "#666", marginTop: 30 }}>77+ AI tools & agents · New releases every week</div></div>), size); }
