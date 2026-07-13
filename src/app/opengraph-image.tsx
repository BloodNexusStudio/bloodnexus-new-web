import { ImageResponse } from "next/og";

// Branded default OG image (§10) — cinematic near-black field + bone wordmark.
export const alt = "BloodNexus Studio";
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
          justifyContent: "space-between",
          background: "#0b0b0d",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(242,239,233,0.75)",
          }}
        >
          Immersive games · Cinematics · Real-time 3D
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: 180,
            fontWeight: 900,
            letterSpacing: -4,
            lineHeight: 1,
            color: "#f2efe9",
          }}
        >
          <span>BLOOD</span>
          <span style={{ color: "#c1121f" }}>NEXUS</span>
        </div>
        <div
          style={{
            fontSize: 32,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "rgba(242,239,233,0.75)",
          }}
        >
          Thane · Unreal Engine · Unity
        </div>
      </div>
    ),
    { ...size }
  );
}
