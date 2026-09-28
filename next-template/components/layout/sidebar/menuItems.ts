import {
  ChartColumn,
  IdCard,
  LayoutDashboard,
  List,
  Pencil,
  User,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react"
import type { Locale } from "@/lib/locales"

type MenuLabel = Record<Locale, string>

export type MenuLink = {
  href: string
  label: MenuLabel
  icon: LucideIcon
}

export type MenuGroup = {
  label: MenuLabel
  icon: LucideIcon
  children: MenuLink[]
}

export type MenuEntry = MenuLink | MenuGroup

export function isMenuGroup(item: MenuEntry): item is MenuGroup {
  return "children" in item
}

export const menuItems: MenuEntry[] = [
  {
    href: "/",
    label: {
      tr: "Panel",
      en: "Dashboard",
      de: "Übersicht",
      fr: "Tableau de bord",
      it: "Panoramica",
    },
    icon: LayoutDashboard,
  },
  {
    href: "/insights",
    label: {
      tr: "Operasyon",
      en: "Operations",
      de: "Betrieb",
      fr: "Opérations",
      it: "Operazioni",
    },
    icon: ChartColumn,
  },
  {
    label: {
      tr: "Kullanıcı",
      en: "Users",
      de: "Benutzer",
      fr: "Utilisateurs",
      it: "Utenti",
    },
    icon: Users,
    children: [
      {
        href: "/profile",
        label: {
          tr: "Profilim",
          en: "Profilim",
          de: "Profilim",
          fr: "Profilim",
          it: "Profilim",
        },
        icon: User,
      },
      {
        href: "/users/card",
        label: {
          tr: "Users-Card",
          en: "Users-Card",
          de: "Users-Card",
          fr: "Users-Card",
          it: "Users-Card",
        },
        icon: IdCard,
      },
      {
        href: "/users/list",
        label: {
          tr: "Users-List",
          en: "Users-List",
          de: "Users-List",
          fr: "Users-List",
          it: "Users-List",
        },
        icon: List,
      },
      {
        href: "/users/create",
        label: {
          tr: "Create",
          en: "Create",
          de: "Create",
          fr: "Create",
          it: "Create",
        },
        icon: UserPlus,
      },
      {
        href: "/users/edit",
        label: {
          tr: "Edit",
          en: "Edit",
          de: "Edit",
          fr: "Edit",
          it: "Edit",
        },
        icon: Pencil,
      },
    ],
  },
]

export type MenuLocale = Locale
