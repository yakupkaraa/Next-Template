export const settingsColors = [
  { id: "blue", className: "bg-[#2563eb]" },
  { id: "green", className: "bg-[#006b2c]" },
  { id: "violet", className: "bg-[#7c3aed]" },
  { id: "dark", className: "bg-zinc-900 ring-1 ring-zinc-600" },
] as const

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
