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
          padding: "90px",
          background: "linear-gradient(135deg, #ffffff 0%, #f4f6f8 70%, #dfe5ec 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 20,
              border: "5px solid #4a80b8",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 58,
              fontWeight: 800,
              color: "#14273a",
            }}
          >
            M
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 66, fontWeight: 800, color: "#14273a", letterSpacing: -2 }}>
              MMA
            </div>
            <div style={{ fontSize: 25, fontWeight: 700, color: "#96754a", letterSpacing: 10 }}>
              DIGITAL LABS
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 52,
            fontSize: 56,
            fontWeight: 800,
            color: "#14273a",
            lineHeight: 1.15,
          }}
        >
          Build for six months? Or ship this week.
        </div>
        <div style={{ marginTop: 22, fontSize: 28, color: "#363440" }}>
          Casino platforms · CRMs · AI business development · Telecom compliance — licensed or
          custom-built.
        </div>
      </div>
    ),
    { ...size }
  );
}
