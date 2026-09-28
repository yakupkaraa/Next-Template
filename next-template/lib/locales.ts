export const locales = ["tr", "en", "de", "fr", "it"] as const

export type Locale = (typeof locales)[number]

export const languages: { code: Locale; label: string }[] = [
  { code: "tr", label: "Türkçe" },
  { code: "en", label: "İngilizce" },
  { code: "de", label: "Almanca" },
  { code: "fr", label: "Fransızca" },
  { code: "it", label: "İtalyanca" },
]

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value)
}

export function localeFromPath(pathname: string): Locale {
  const segment = pathname.split("/")[1] ?? ""
  return isLocale(segment) ? segment : "tr"
}

export function swapLocale(pathname: string, locale: Locale) {
  const parts = pathname.split("/")
  parts[1] = locale
  return parts.join("/") || `/${locale}`
}
