import { ImageResponse } from "next/og";
import { SITE } from "@/lib/content";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          backgroundImage:
            "linear-gradient(to right, #E1EDEB 1px, transparent 1px), linear-gradient(to bottom, #E1EDEB 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #31C6BA, #0C6E69)",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 700, color: "#04191B", letterSpacing: "-0.03em" }}>
            Eullar Labs
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            lineHeight: 1.05,
            fontWeight: 700,
            color: "#04191B",
            letterSpacing: "-0.045em",
            maxWidth: 940,
          }}
        >
          Applied AI research, shipped as tools people use.
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 28, fontSize: 22, color: "#0A8B82", letterSpacing: "0.16em" }}>
            <div style={{ display: "flex" }}>SYLLABI</div>
            <div style={{ display: "flex", color: "#C9DEDB" }}>·</div>
            <div style={{ display: "flex" }}>REEVUE</div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#16504F", letterSpacing: "0.16em" }}>
            ACCRA · REMOTE
          </div>
        </div>
      </div>
    ),
    size,
  );
}
