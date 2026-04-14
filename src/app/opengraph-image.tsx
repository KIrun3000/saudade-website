import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

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
          alignItems: "center",
          justifyContent: "center",
          background: "#0D2B30",
          color: "#D2BBB2",
        }}
      >
        <div
          style={{
            fontSize: 128,
            letterSpacing: "0.18em",
            fontWeight: 300,
            textTransform: "uppercase",
          }}
        >
          SAUDADE
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 34,
            letterSpacing: "0.36em",
            fontWeight: 300,
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          High Frequency Living
        </div>
      </div>
    ),
    size,
  );
}
