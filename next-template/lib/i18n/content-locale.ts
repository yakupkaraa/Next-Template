import { isLocale, type Locale } from "@/lib/locales"

/** Ekran metinleri yalnızca bu dillerde tutulur. */
export const contentLocales = ["tr", "en"] as const

export type ContentLocale = (typeof contentLocales)[number]

export function isContentLocale(value: string): value is ContentLocale {
  return contentLocales.some((locale) => locale === value)
}

/**
 * URL locale (tr, en, de, …) → içerik dili.
 * de / fr / it menüde kalır; sayfa metinleri şimdilik tr veya en.
 */
export function resolveContentLocale(routeLocale: string | Locale): ContentLocale {
  if (routeLocale === "en") return "en"
  return "tr"
}
