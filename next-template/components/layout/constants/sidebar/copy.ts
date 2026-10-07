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
    brand: "Proje Adı",
    panel: "Yönetim paneli",
    menu: "Genel menü",
    userName: "Yakup K.",
    userRole: "Yönetici",
    userSettings: "Kullanıcı ayarları",
  },
  en: {
    brand: "Project Name",
    panel: "Admin panel",
    menu: "Main menu",
    userName: "Yakup K.",
    userRole: "Admin",
    userSettings: "User settings",
  },
  de: {
    brand: "Projektname",
    panel: "Admin-Panel",
    menu: "Hauptmenü",
    userName: "Yakup K.",
    userRole: "Admin",
    userSettings: "Benutzereinstellungen",
  },
  fr: {
    brand: "Nom du projet",
    panel: "Panneau d’admin",
    menu: "Menu principal",
    userName: "Yakup K.",
    userRole: "Admin",
    userSettings: "Paramètres utilisateur",
  },
  it: {
    brand: "Nome progetto",
    panel: "Pannello admin",
    menu: "Menu principale",
    userName: "Yakup K.",
    userRole: "Admin",
    userSettings: "Impostazioni utente",
  },
}
