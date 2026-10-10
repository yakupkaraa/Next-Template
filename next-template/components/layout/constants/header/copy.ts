import type { Locale } from "@/lib/locales"

export const headerBrand = "Next Template"

export const headerCopy: Record<
  Locale,
  {
    menuCollapse: string
    menuExpand: string
    breadcrumb: string
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
    breadcrumb: "Sayfa yolu",
    language: "Dil",
    notifications: "Bildirimler",
    settings: "Ayarlar",
    profile: "Profil",
    signOut: "Çıkış yap",
  },
  en: {
    menuCollapse: "Collapse menu",
    menuExpand: "Expand menu",
    breadcrumb: "Breadcrumb",
    language: "Language",
    notifications: "Notifications",
    settings: "Settings",
    profile: "Profile",
    signOut: "Sign out",
  },
  de: {
    menuCollapse: "Menü einklappen",
    menuExpand: "Menü ausklappen",
    breadcrumb: "Brotkrumen",
    language: "Sprache",
    notifications: "Benachrichtigungen",
    settings: "Einstellungen",
    profile: "Profil",
    signOut: "Abmelden",
  },
  fr: {
    menuCollapse: "Réduire le menu",
    menuExpand: "Agrandir le menu",
    breadcrumb: "Fil d’Ariane",
    language: "Langue",
    notifications: "Notifications",
    settings: "Paramètres",
    profile: "Profil",
    signOut: "Se déconnecter",
  },
  it: {
    menuCollapse: "Comprimi menu",
    menuExpand: "Espandi menu",
    breadcrumb: "Percorso",
    language: "Lingua",
    notifications: "Notifiche",
    settings: "Impostazioni",
    profile: "Profilo",
    signOut: "Esci",
  },
}
