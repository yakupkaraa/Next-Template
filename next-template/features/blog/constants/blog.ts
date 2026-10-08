import type { ContentLocale } from "@/lib/i18n"

export type BlogLocale = ContentLocale

export type BlogCategoryId = "design" | "product" | "engineering" | "marketing" | "research"

export const blogCopy = {
  tr: {
    all: "Tümü",
    featured: "Öne çıkan",
    read: "Oku",
    popular: "Popüler konular",
    newsletterTitle: "Bülten",
    newsletterBody:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    newsletterPlaceholder: "E-posta adresiniz",
    newsletterCta: "Kayıt ol",
    recent: "Son okuduklarınız",
  },
  en: {
    all: "All",
    featured: "Featured",
    read: "Read",
    popular: "Popular topics",
    newsletterTitle: "Newsletter",
    newsletterBody:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    newsletterPlaceholder: "Your email",
    newsletterCta: "Subscribe",
    recent: "Recently read",
  },
} as const

export const blogCategories: { id: BlogCategoryId; tr: string; en: string }[] = [
  { id: "design", tr: "Tasarım", en: "Design" },
  { id: "product", tr: "Ürün", en: "Product" },
  { id: "engineering", tr: "Yazılım", en: "Engineering" },
  { id: "marketing", tr: "Pazarlama", en: "Marketing" },
  { id: "research", tr: "Araştırma", en: "Research" },
]

export const blogTags = [
  "DesignSystems",
  "ProductOps",
  "Accessibility",
  "Roadmap",
  "RemoteWork",
]
