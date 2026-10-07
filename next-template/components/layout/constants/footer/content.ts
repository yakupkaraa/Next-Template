import type { Locale } from "@/lib/locales"

export const footerContent: (
  | { href: string; label: Record<Locale, string> }
  | { label: Record<Locale, string> }
)[] = [
  {
    href: "/",
    label: {
      tr: "Ana sayfa",
      en: "Home",
      de: "Startseite",
      fr: "Accueil",
      it: "Home",
    },
  },
  {
    label: {
      tr: "Site Adı",
      en: "Site Name",
      de: "Seitenname",
      fr: "Nom du site",
      it: "Nome del sito",
    },
  },
]
