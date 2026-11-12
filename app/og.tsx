import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared Open Graph card: dark background, lime accent, title + subtitle. */
export function renderOg({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#070807",
          color: "#eef2ee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#6ee26a", letterSpacing: 4, textTransform: "uppercase" }}>{eyebrow}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{title}</div>
          <div style={{ fontSize: 36, color: "#9aa39c", marginTop: 24, maxWidth: 1000 }}>{subtitle}</div>
        </div>
        <div style={{ fontSize: 28, color: "#9aa39c" }}>eliasalsumairi.dev</div>
      </div>
    ),
    ogSize,
  );
}
