import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MMA Digital Labs — Production-ready software systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #070b14 0%, #0d1424 60%, #131c30 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: 22,
              border: "4px solid #6366f1",
              background: "rgba(99,102,241,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 56,
              fontWeight: 900,
              color: "#a5b4fc",
            }}
          >
            M
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 64, fontWeight: 900, color: "#f1f5f9", letterSpacing: -2 }}>
              MMA
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: "#818cf8", letterSpacing: 10 }}>
              DIGITAL LABS
            </div>
          </div>
        </div>
        <div style={{ marginTop: 48, fontSize: 40, fontWeight: 700, color: "#e2e8f0" }}>
          Production-ready software systems.
        </div>
        <div style={{ marginTop: 16, fontSize: 28, color: "#94a3b8" }}>
          Casino platforms · CRMs · AI business development · Telecom compliance — licensed or
          custom-built.
        </div>
      </div>
    ),
    { ...size }
  );
}
