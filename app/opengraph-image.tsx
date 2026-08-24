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
          background: "linear-gradient(135deg, #ffffff 0%, #f0f8fc 70%, #e3ebf9 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 20,
              border: "5px solid #009cf4",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 58,
              fontWeight: 800,
              color: "#2021a8",
            }}
          >
            M
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 66, fontWeight: 800, color: "#03034d", letterSpacing: -2 }}>
              MMA
            </div>
            <div style={{ fontSize: 25, fontWeight: 700, color: "#d19e0b", letterSpacing: 10 }}>
              DIGITAL LABS
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 52,
            fontSize: 56,
            fontWeight: 800,
            color: "#03034d",
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
