import { getDictionary, resolveContentLocale, type ContentLocale } from "@/lib/i18n"
import type { Locale } from "@/lib/locales"
import {
  fontFamilies,
  fontFamilyLabels,
  fontFamilyVars,
  fontSizes,
} from "@/lib/theme/fonts"

export const settingsLayouts = ["side", "top", "right"] as const

export type SettingsLayout = (typeof settingsLayouts)[number]

export const settingsColors = [
  { id: "blue", className: "bg-[#2563eb]" },
  { id: "green", className: "bg-[#006b2c]" },
  { id: "violet", className: "bg-[#7c3aed]" },
  { id: "dark", className: "bg-zinc-900 ring-1 ring-zinc-600" },
] as const

export const settingsFonts = fontFamilies.map((id) => ({
  id,
  label: fontFamilyLabels[id],
  className: `[font-family:var(${fontFamilyVars[id]})]`,
}))

export const settingsSizes = fontSizes

export function settingsText(routeLocale: Locale) {
  const locale: ContentLocale = resolveContentLocale(routeLocale)
  return getDictionary(locale).layout.settings
}
