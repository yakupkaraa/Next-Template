import { Inter, Outfit, Source_Sans_3 } from "next/font/google"
import type { Locale } from "@/lib/locales"

const inter = Inter({ subsets: ["latin"], weight: "600" })
const outfit = Outfit({ subsets: ["latin"], weight: "600" })
const sourceSans = Source_Sans_3({ subsets: ["latin"], weight: "600" })

export const settingsLayouts = ["side", "top", "right"] as const

export type SettingsLayout = (typeof settingsLayouts)[number]

export const settingsCopy = {
  tr: {
    side: "Yan menü",
    top: "Üst menü",
    right: "Sağ panel",
    footer: "Sabit altlık",
    dark: "Koyu mod",
    family: "Aile",
    size: "Boyut",
  },
  en: {
    side: "Side menu",
    top: "Top menu",
    right: "Right panel",
    footer: "Pinned footer",
    dark: "Dark mode",
    family: "Family",
    size: "Size",
  },
}

export const settingsColors = [
  { id: "navy", className: "bg-slate-800" },
  { id: "blue", className: "bg-sky-500" },
  { id: "green", className: "bg-emerald-500" },
  { id: "amber", className: "bg-amber-400" },
  { id: "violet", className: "bg-violet-500" },
  { id: "rose", className: "bg-rose-500" },
]

export const settingsFonts = [
  { id: "nunito", label: "Nunito", className: "" },
  { id: "inter", label: "Inter", className: inter.className },
  { id: "outfit", label: "Outfit", className: outfit.className },
  { id: "source", label: "Source Sans", className: sourceSans.className },
]

export const settingsSizes = ["14", "16", "18"]

export function settingsText(locale: Locale) {
  return locale === "en" ? settingsCopy.en : settingsCopy.tr
}
