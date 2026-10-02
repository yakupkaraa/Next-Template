import type { Locale } from "@/lib/locales"

export const headerBrand = "Proje Adı"

export const headerCopy: Record<
  Locale,
  {
    menuCollapse: string
    menuExpand: string
    language: string
    notifications: string
    settings: string
    profile: string
    signOut: string
  }
> = {
  tr: {
    menuCollapse: "Menüyü daralt",
    menuExpand: "Menüyü genişlet",
    language: "Dil",
    notifications: "Bildirimler",
    settings: "Ayarlar",
    profile: "Profil",
    signOut: "Çıkış yap",
  },
  en: {
    menuCollapse: "Collapse menu",
    menuExpand: "Expand menu",
    language: "Language",
    notifications: "Notifications",
    settings: "Settings",
    profile: "Profile",
    signOut: "Sign out",
  },
  de: {
    menuCollapse: "Menü einklappen",
    menuExpand: "Menü ausklappen",
    language: "Sprache",
    notifications: "Benachrichtigungen",
    settings: "Einstellungen",
    profile: "Profil",
    signOut: "Abmelden",
  },
  fr: {
    menuCollapse: "Réduire le menu",
    menuExpand: "Agrandir le menu",
    language: "Langue",
    notifications: "Notifications",
    settings: "Paramètres",
    profile: "Profil",
    signOut: "Se déconnecter",
  },
  it: {
    menuCollapse: "Comprimi menu",
    menuExpand: "Espandi menu",
    language: "Lingua",
    notifications: "Notifiche",
    settings: "Impostazioni",
    profile: "Profilo",
    signOut: "Esci",
  },
}
