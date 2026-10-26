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
    switchToDark: string
    switchToLight: string
    search: string
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
    switchToDark: "Koyu moda geç",
    switchToLight: "Açık moda geç",
    search: "Sayfada ara",
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
    switchToDark: "Switch to dark mode",
    switchToLight: "Switch to light mode",
    search: "Search page",
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
    switchToDark: "Zum dunklen Modus wechseln",
    switchToLight: "Zum hellen Modus wechseln",
    search: "Seite durchsuchen",
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
    switchToDark: "Passer au mode sombre",
    switchToLight: "Passer au mode clair",
    search: "Rechercher sur la page",
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
    switchToDark: "Passa alla modalità scura",
    switchToLight: "Passa alla modalità chiara",
    search: "Cerca nella pagina",
  },
}
