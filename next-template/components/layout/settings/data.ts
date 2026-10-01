import { Inter, Outfit, Source_Sans_3 } from "next/font/google"
import { getDictionary, resolveContentLocale, type ContentLocale } from "@/lib/i18n"
import type { Locale } from "@/lib/locales"

const inter = Inter({ subsets: ["latin"], weight: "600" })
const outfit = Outfit({ subsets: ["latin"], weight: "600" })
const sourceSans = Source_Sans_3({ subsets: ["latin"], weight: "600" })

export const settingsLayouts = ["side", "top", "right"] as const

export type SettingsLayout = (typeof settingsLayouts)[number]

export const settingsColors = [
  { id: "blue", className: "bg-[#2c5ead]" },
  { id: "green", className: "bg-[#2a7c13]" },
  { id: "violet", className: "bg-[#8b7cc0]" },
  { id: "dark", className: "bg-zinc-900 ring-1 ring-zinc-600" },
] as const

export const settingsFonts = [
  { id: "nunito", label: "Nunito", className: "" },
  { id: "inter", label: "Inter", className: inter.className },
  { id: "outfit", label: "Outfit", className: outfit.className },
  { id: "source", label: "Source Sans", className: sourceSans.className },
]

export const settingsSizes = ["14", "16", "18"]

export function settingsText(routeLocale: Locale) {
  const locale: ContentLocale = resolveContentLocale(routeLocale)
  return getDictionary(locale).layout.settings
}
