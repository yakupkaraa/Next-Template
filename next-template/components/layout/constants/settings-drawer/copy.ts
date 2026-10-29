import type { Locale } from "@/lib/locales"

export const settingsDrawerCopy: Record<
  Locale,
  {
    openLabel: string
    closeLabel: string
  }
> = {
  tr: {
    openLabel: "Ayarları aç",
    closeLabel: "Ayarları kapat",
  },
  en: {
    openLabel: "Open settings",
    closeLabel: "Close settings",
  },
  de: {
    openLabel: "Einstellungen öffnen",
    closeLabel: "Einstellungen schließen",
  },
  fr: {
    openLabel: "Ouvrir les paramètres",
    closeLabel: "Fermer les paramètres",
  },
  it: {
    openLabel: "Apri impostazioni",
    closeLabel: "Chiudi impostazioni",
  },
}
