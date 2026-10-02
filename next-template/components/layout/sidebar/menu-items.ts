import {
  Bot,
  ChartColumn,
  FilePlus,
  IdCard,
  Home,
  List,
  Newspaper,
  Pencil,
  User,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react"
import { navLabel, type MenuLabel } from "@/lib/navigation/nav-label"
import type { Locale } from "@/lib/locales"

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
    label: navLabel("dashboard", {
      de: "Startseite",
      fr: "Accueil",
      it: "Home",
    }),
    icon: Home,
  },
  {
    href: "/insights",
    label: navLabel("insights", {
      de: "Betrieb",
      fr: "Opérations",
      it: "Operazioni",
    }),
    icon: ChartColumn,
  },
  {
    href: "/ai-chat",
    label: navLabel("aiChat", {
      de: "KI-Chat",
      fr: "Chat IA",
      it: "Chat IA",
    }),
    icon: Bot,
  },
  {
    label: navLabel("users", {
      de: "Benutzer",
      fr: "Utilisateurs",
      it: "Utenti",
    }),
    icon: Users,
    children: [
      {
        href: "/profile",
        label: navLabel("profile", {
          de: "Mein Profil",
          fr: "Mon profil",
          it: "Il mio profilo",
        }),
        icon: User,
      },
      {
        href: "/users/card",
        label: navLabel("usersCard", {
          de: "Kartenansicht",
          fr: "Vue cartes",
          it: "Vista schede",
        }),
        icon: IdCard,
      },
      {
        href: "/users/list",
        label: navLabel("usersList", {
          de: "Liste",
          fr: "Liste",
          it: "Elenco",
        }),
        icon: List,
      },
      {
        href: "/users/create",
        label: navLabel("usersCreate", {
          de: "Benutzer anlegen",
          fr: "Créer un utilisateur",
          it: "Crea utente",
        }),
        icon: UserPlus,
      },
      {
        href: "/users/edit",
        label: navLabel("usersEdit", {
          de: "Bearbeiten",
          fr: "Modifier",
          it: "Modifica",
        }),
        icon: Pencil,
      },
    ],
  },
  {
    label: navLabel("blog", {
      de: "Blog",
      fr: "Blog",
      it: "Blog",
    }),
    icon: Newspaper,
    children: [
      {
        href: "/blog",
        label: navLabel("blogPosts", {
          de: "Beiträge",
          fr: "Articles",
          it: "Articoli",
        }),
        icon: Newspaper,
      },
      {
        href: "/blog/create",
        label: navLabel("blogCreate", {
          de: "Neuer Beitrag",
          fr: "Nouvel article",
          it: "Nuovo articolo",
        }),
        icon: FilePlus,
      },
      {
        href: "/blog/edit",
        label: navLabel("blogEdit", {
          de: "Bearbeiten",
          fr: "Modifier",
          it: "Modifica",
        }),
        icon: Pencil,
      },
    ],
  },
]

export type MenuLocale = Locale
