import type { Locale } from "@/lib/locales"

export const sidebarCopy: Record<
  Locale,
  {
    brand: string
    panel: string
    menu: string
    userName: string
    userRole: string
    userSettings: string
  }
> = {
  tr: {
    brand: "Next Template",
    panel: "Yönetim paneli",
    menu: "Genel menü",
    userName: "Yakup K.",
    userRole: "Yönetici",
    userSettings: "Kullanıcı ayarları",
  },
  en: {
    brand: "Next Template",
    panel: "Admin panel",
    menu: "Main menu",
    userName: "Yakup K.",
    userRole: "Admin",
    userSettings: "User settings",
  },
  de: {
    brand: "Next Template",
    panel: "Admin-Panel",
    menu: "Hauptmenü",
    userName: "Yakup K.",
    userRole: "Admin",
    userSettings: "Benutzereinstellungen",
  },
  fr: {
    brand: "Next Template",
    panel: "Panneau d’admin",
    menu: "Menu principal",
    userName: "Yakup K.",
    userRole: "Admin",
    userSettings: "Paramètres utilisateur",
  },
  it: {
    brand: "Next Template",
    panel: "Pannello admin",
    menu: "Menu principale",
    userName: "Yakup K.",
    userRole: "Admin",
    userSettings: "Impostazioni utente",
  },
}
