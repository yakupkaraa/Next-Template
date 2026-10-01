import { settingsColors } from "@/components/layout/settings/data"

export type ThemeAppearance = (typeof settingsColors)[number]["id"]

export type ThemeAccent = Exclude<ThemeAppearance, "dark">

export const themeAppearanceIds = settingsColors.map((item) => item.id) as ThemeAppearance[]

export const themeAccentIds = themeAppearanceIds.filter(
  (id): id is ThemeAccent => id !== "dark"
)

export const DEFAULT_THEME_ACCENT: ThemeAccent = "blue"

export const DEFAULT_THEME_APPEARANCE: ThemeAppearance = "blue"

export function isThemeAppearance(value: string): value is ThemeAppearance {
  return themeAppearanceIds.includes(value as ThemeAppearance)
}

export function isThemeAccent(value: string): value is ThemeAccent {
  return themeAccentIds.includes(value as ThemeAccent)
}
