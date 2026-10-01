import { en } from "@/lib/messages/en"
import { tr } from "@/lib/messages/tr"
import type { Locale } from "@/lib/locales"

export type NavLabelKey = keyof typeof tr.layout.nav

export type MenuLabel = Record<Locale, string>

/** TR/EN sözlükten menü etiketi; de/fr/it için isteğe bağlı override veya EN yedek. */
export function navLabel(
  key: NavLabelKey,
  overrides?: Partial<Record<Locale, string>>
): MenuLabel {
  const trText = tr.layout.nav[key]
  const enText = en.layout.nav[key]

  return {
    tr: trText,
    en: enText,
    de: overrides?.de ?? enText,
    fr: overrides?.fr ?? enText,
    it: overrides?.it ?? enText,
    ...overrides,
  }
}
