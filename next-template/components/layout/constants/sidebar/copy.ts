import type { Locale } from "@/lib/locales"

export const sidebarCopy: Record<
  Locale,
  {
    brand: string
    panel: string
    menu: string
    userName: string
    userRole: string
  }
> = {
  tr: {
    brand: "Next Template",
    panel: "Yönetim paneli",
    menu: "Genel menü",
    userName: "Yakup K.",
    userRole: "Yönetici",
  },
  en: {
    brand: "Next Template",
    panel: "Admin panel",
    menu: "Main menu",
    userName: "Yakup K.",
    userRole: "Admin",
  },
  de: {
    brand: "Next Template",
    panel: "Admin-Panel",
    menu: "Hauptmenü",
    userName: "Yakup K.",
    userRole: "Admin",
  },
  fr: {
    brand: "Next Template",
    panel: "Panneau d’admin",
    menu: "Menu principal",
    userName: "Yakup K.",
    userRole: "Admin",
  },
  it: {
    brand: "Next Template",
    panel: "Pannello admin",
    menu: "Menu principale",
    userName: "Yakup K.",
    userRole: "Admin",
  },
}
