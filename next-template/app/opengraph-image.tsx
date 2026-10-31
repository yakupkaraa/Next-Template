import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Next-Template Dashboard"

// ImageResponse render'ı app/globals.css'teki CSS token'larını okuyamaz (ayrı bir Satori/edge
// render bağlamı); bu yüzden varsayılan "blue" accent'in (lib/theme/accents.ts) sabit hex
// karşılıkları burada ayrıca adlandırılmıştır.
const OG_BACKGROUND = "#0b1220"
const OG_ACCENT = "#2563eb"
const OG_TITLE_TEXT = "#f8fafc"
const OG_BODY_TEXT = "#cbd5e1"

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
          gap: 24,
          padding: 96,
          backgroundColor: OG_BACKGROUND,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            backgroundColor: OG_ACCENT,
          }}
        />
        <div style={{ fontSize: 64, fontWeight: 700, color: OG_TITLE_TEXT }}>
          Next-Template Dashboard
        </div>
        <div style={{ fontSize: 32, color: OG_BODY_TEXT }}>
          Yeniden kullanılabilir Next.js dashboard şablonu
        </div>
        <div style={{ fontSize: 28, color: OG_ACCENT }}>Next.js · TypeScript · Tailwind</div>
      </div>
    ),
    { ...size }
  )
}
