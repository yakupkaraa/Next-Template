"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { localeFromPath, type Locale } from "@/lib/locales"
import { isMenuGroup, menuItems, type MenuGroup, type MenuLink } from "./menuItems"

function itemHref(locale: Locale, href: string) {
  return href === "/" ? `/${locale}` : `/${locale}${href}`
}

function isActive(pathname: string, href: string) {
  return href === "/"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`)
}

const rowClass =
  "flex h-9 w-full shrink-0 items-center gap-3 overflow-hidden rounded-lg px-2.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"

function MenuLinkItem({
  item,
  open,
  locale,
  pathname,
  nested = false,
}: {
  item: MenuLink
  open: boolean
  locale: Locale
  pathname: string
  nested?: boolean
}) {
  const href = itemHref(locale, item.href)
  const label = item.label[locale]
  const Icon = item.icon
  const active = isActive(pathname, href)

  return (
    <Link
      href={href}
      title={open ? undefined : label}
      aria-current={active ? "page" : undefined}
      className={`${rowClass} ${nested && open ? "pl-8" : ""} ${
        active ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : ""
      }`}
    >
      <Icon className="size-4 shrink-0" />
      <span className={open ? "truncate" : "sr-only"}>{label}</span>
    </Link>
  )
}

function MenuGroupItem({
  item,
  open,
  locale,
  pathname,
}: {
  item: MenuGroup
  open: boolean
  locale: Locale
  pathname: string
}) {
  const label = item.label[locale]
  const Icon = item.icon
  const childActive = item.children.some((child) =>
    isActive(pathname, itemHref(locale, child.href))
  )
  const [expanded, setExpanded] = useState(childActive)

  return (
    <Collapsible open={open && expanded} onOpenChange={setExpanded}>
      <CollapsibleTrigger
        className={`${rowClass} ${
          childActive ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : ""
        }`}
        title={open ? undefined : label}
      >
        <Icon className="size-4 shrink-0" />
        <span className={open ? "truncate" : "sr-only"}>{label}</span>
        <ChevronRight
          className={`ml-auto size-4 shrink-0 transition-transform ${
            open ? "" : "sr-only"
          } ${expanded ? "rotate-90" : ""}`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-1 pt-1">
        {item.children.map((child) => (
          <MenuLinkItem
            key={child.href}
            item={child}
            open={open}
            locale={locale}
            pathname={pathname}
            nested
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

export function Sidebar({ open }: { open: boolean }) {
  const pathname = usePathname()
  const locale = localeFromPath(pathname)

  return (
    <aside
      id="panel-sidebar"
      className={`h-full shrink-0 overflow-x-hidden overflow-y-auto border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ${
        open ? "w-60" : "w-14"
      }`}
    >
      <nav className="flex flex-col gap-1 p-2">
        {menuItems.map((item) =>
          isMenuGroup(item) ? (
            <MenuGroupItem
              key={item.label.en}
              item={item}
              open={open}
              locale={locale}
              pathname={pathname}
            />
          ) : (
            <MenuLinkItem
              key={item.href}
              item={item}
              open={open}
              locale={locale}
              pathname={pathname}
            />
          )
        )}
      </nav>
    </aside>
  )
}
