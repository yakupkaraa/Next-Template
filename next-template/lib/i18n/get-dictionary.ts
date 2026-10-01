import type { ContentLocale } from "@/lib/i18n/content-locale"
import type { Messages } from "@/lib/i18n/messages-type"
import { en } from "@/lib/messages/en"
import { tr } from "@/lib/messages/tr"

const dictionaries: Record<ContentLocale, Messages> = { tr, en }

export function getDictionary(locale: ContentLocale): Messages {
  return dictionaries[locale]
}
