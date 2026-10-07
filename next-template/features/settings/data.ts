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
