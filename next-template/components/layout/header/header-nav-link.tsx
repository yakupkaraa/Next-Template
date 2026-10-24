import Link from "next/link"
import type { localeFromPath } from "@/lib/locales"
import { cn } from "@/lib/utils"
import type { MenuLink } from "../sidebar/menu-items"

function itemHref(locale: ReturnType<typeof localeFromPath>, href: string) {
  return href === "/" ? `/${locale}` : `/${locale}${href}`
}

function isActive(pathname: string, href: string, locale: ReturnType<typeof localeFromPath>) {
  const full = itemHref(locale, href)
  return pathname === full || pathname === `${full}/`
}

export function HeaderNavLink({
  item,
  locale,
  pathname,
}: {
  item: MenuLink
  locale: ReturnType<typeof localeFromPath>
  pathname: string
}) {
  const href = itemHref(locale, item.href)
  const active = isActive(pathname, item.href, locale)
  const Icon = item.icon

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-2.5 text-sm outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2",
        active ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : "text-sidebar-foreground",
        "floating:rounded-full",
        "floating:px-4",
        "floating:hover:bg-muted",
        "floating:hover:text-foreground",
        active
          ? "floating:bg-primary floating:text-primary-foreground floating:hover:bg-primary floating:hover:text-primary-foreground"
          : "floating:text-foreground"
      )}
    >
      <Icon className="size-4 shrink-0" />
      {item.label[locale]}
    </Link>
  )
}
