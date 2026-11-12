import { ImageResponse } from "next/og";

// No `runtime = "edge"`: it disabled static generation for this route
// (build warning) for no benefit — ImageResponse prerenders fine on Node.
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
          background:
            "radial-gradient(circle at 15% -10%, rgba(65,96,140,0.35), transparent 60%), linear-gradient(150deg, #0a0d13 0%, #0e1522 55%, #12202f 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 20,
              border: "5px solid #c8a24c",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 58,
              fontWeight: 800,
              color: "#c8a24c",
            }}
          >
            M
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 66, fontWeight: 800, color: "#f2f5fa", letterSpacing: -2 }}>
              MMA
            </div>
            <div style={{ fontSize: 25, fontWeight: 700, color: "#c8a24c", letterSpacing: 10 }}>
              DIGITAL LABS
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 52,
            fontSize: 56,
            fontWeight: 800,
            color: "#f2f5fa",
            lineHeight: 1.15,
          }}
        >
          Build for six months?{" "}
          <span style={{ color: "#c8a24c" }}>Or ship this week.</span>
        </div>
        <div style={{ marginTop: 22, fontSize: 28, color: "#9fb0c4" }}>
          Casino platforms · CRMs · AI business development · Telecom compliance — licensed or
          custom-built.
        </div>
      </div>
    ),
    { ...size }
  );
}
