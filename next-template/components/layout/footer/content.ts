export const footerContent = [
  { href: "/", label: { tr: "Ana sayfa", en: "Home" } },
  { label: { tr: "Site Adı", en: "Site Name" } },
] as const

export type FooterLocale = "tr" | "en"
