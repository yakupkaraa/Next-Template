export const fontFamilies = ["nunito", "inter", "outfit", "source"] as const

export type FontFamily = (typeof fontFamilies)[number]

export const fontSizes = ["14", "16", "18"] as const

export type FontSize = (typeof fontSizes)[number]

export const DEFAULT_FONT_FAMILY: FontFamily = "nunito"
export const DEFAULT_FONT_SIZE: FontSize = "16"

export const fontFamilyVars: Record<FontFamily, string> = {
  nunito: "--font-nunito",
  inter: "--font-inter",
  outfit: "--font-outfit",
  source: "--font-source",
}

export const fontFamilyLabels: Record<FontFamily, string> = {
  nunito: "Nunito",
  inter: "Inter",
  outfit: "Outfit",
  source: "Source Sans",
}

export function isFontFamily(value: string): value is FontFamily {
  return (fontFamilies as readonly string[]).includes(value)
}

export function isFontSize(value: string): value is FontSize {
  return (fontSizes as readonly string[]).includes(value)
}
