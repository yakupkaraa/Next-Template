import type { BlogCategoryId } from "../types/blog"

export const blogCopy = {
  tr: {
    all: "Tümü",
    featured: "Öne çıkan",
    read: "Oku",
  },
  en: {
    all: "All",
    featured: "Featured",
    read: "Read",
  },
} as const

export const blogCategories: { id: BlogCategoryId; tr: string; en: string }[] = [
  { id: "design", tr: "Tasarım", en: "Design" },
  { id: "product", tr: "Ürün", en: "Product" },
  { id: "engineering", tr: "Yazılım", en: "Engineering" },
  { id: "marketing", tr: "Pazarlama", en: "Marketing" },
  { id: "research", tr: "Araştırma", en: "Research" },
]

