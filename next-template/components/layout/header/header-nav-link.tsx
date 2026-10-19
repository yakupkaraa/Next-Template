import Link from "next/link"
import type { localeFromPath } from "@/lib/locales"
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
      className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-2.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
        active ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : "text-sidebar-foreground"
      }`}
    >
      <Icon className="size-4 shrink-0" />
      {item.label[locale]}
    </Link>
  )
}
