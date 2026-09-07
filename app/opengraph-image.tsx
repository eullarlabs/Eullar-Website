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
          background: "#0b1413",
          backgroundImage:
            "radial-gradient(circle at 78% 22%, rgba(123,121,215,0.30), transparent 55%), radial-gradient(circle at 16% 76%, rgba(131,207,203,0.26), transparent 55%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 999,
              border: "13px solid #6DBFC8",
              transform: "rotate(-19deg) scaleX(1.5)",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 32, fontWeight: 600, color: "#efede4", letterSpacing: "-0.02em" }}>
            Eullar Labs
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 78,
            lineHeight: 1.04,
            color: "#efede4",
            letterSpacing: "-0.035em",
            maxWidth: 960,
          }}
        >
          AI that has to work on a Tuesday morning.
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 26, fontSize: 21, color: "#5fd4c3", letterSpacing: "0.16em" }}>
            <div style={{ display: "flex" }}>SYLLABI</div>
            <div style={{ display: "flex", color: "#8e8be0" }}>·</div>
            <div style={{ display: "flex", color: "#8e8be0" }}>REEVUE</div>
          </div>
          <div style={{ display: "flex", fontSize: 21, color: "rgba(239,237,228,0.45)", letterSpacing: "0.16em" }}>
            ACCRA · REMOTE
          </div>
        </div>
      </div>
    ),
    size,
  );
}
