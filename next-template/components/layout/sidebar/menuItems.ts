import {
  LayoutDashboard,
  List,
  Settings,
  type LucideIcon,
} from "lucide-react"

export const menuItems: {
  href: string
  label: { tr: string; en: string }
  icon: LucideIcon
}[] = [
  { href: "/", label: { tr: "Panel", en: "Dashboard" }, icon: LayoutDashboard },
  { href: "/list", label: { tr: "Liste", en: "List" }, icon: List },
  { href: "/settings", label: { tr: "Ayarlar", en: "Settings" }, icon: Settings },
]

export type MenuLocale = "tr" | "en"
