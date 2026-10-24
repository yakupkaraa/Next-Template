"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import type { Locale } from "@/lib/locales"
import { cn } from "@/lib/utils"
import type { MenuGroup, MenuLink } from "./menu-items"

function itemHref(locale: Locale, href: string) {
  return href === "/" ? `/${locale}` : `/${locale}${href}`
}

function isActive(pathname: string, itemPath: string, locale: Locale) {
  const href = itemHref(locale, itemPath)
  return pathname === href || pathname === `${href}/`
}

export function MenuLinkItem({
  item,
  open,
  locale,
  pathname,
  nested = false,
  horizontal = false,
  badgeCounts,
  isAdmin,
}: {
  item: MenuLink
  open: boolean
  locale: Locale
  pathname: string
  nested?: boolean
  horizontal?: boolean
  badgeCounts?: Partial<Record<string, number>>
  isAdmin?: boolean
}) {
  const href = itemHref(locale, item.href)
  const label = item.label[locale]
  const Icon = item.icon
  const active = isActive(pathname, item.href, locale)

  return (
    <Link
      href={href}
      prefetch
      title={open ? undefined : label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex h-11 shrink-0 items-center gap-3 overflow-hidden rounded-lg px-3 text-sm transition-colors",
        horizontal ? "w-auto" : "w-full",
        nested && open && !horizontal && "h-8 px-2 py-1.5 text-[13px]",
        active
          ? "bg-[color-mix(in_oklch,var(--primary)_28%,var(--sidebar))] font-medium text-sidebar-foreground"
          : "text-sidebar-foreground/85 hover:bg-card/60 hover:text-sidebar-foreground"
      )}
    >
      {nested && open && !horizontal ? null : (
        <Icon className="size-4 shrink-0 opacity-90" />
      )}
      <span className={open ? "min-w-0 flex-1 truncate" : "sr-only"}>{label}</span>
      {item.badge && isAdmin && open ? (
        <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
          {badgeCounts?.[item.badge] ?? 0}
        </span>
      ) : null}
    </Link>
  )
}

export function MenuGroupItem({
  item,
  open,
  locale,
  pathname,
  horizontal = false,
  badgeCounts,
  isAdmin,
}: {
  item: MenuGroup
  open: boolean
  locale: Locale
  pathname: string
  horizontal?: boolean
  badgeCounts?: Partial<Record<string, number>>
  isAdmin?: boolean
}) {
  const label = item.label[locale]
  const Icon = item.icon
  const childActive = item.children.some((child) =>
    isActive(pathname, child.href, locale)
  )
  const [expanded, setExpanded] = useState(childActive)

  return (
    <Collapsible
      open={horizontal ? expanded : open && expanded}
      onOpenChange={setExpanded}
      className={cn(
        horizontal ? "relative" : "rounded-xl",
        !horizontal && open && "pt-3"
      )}
    >
      <CollapsibleTrigger
        className={cn(
          "flex h-9 w-full shrink-0 items-center gap-2.5 overflow-hidden rounded-lg px-2.5 text-sm transition-colors",
          horizontal && "h-11 w-auto rounded-xl px-3",
          childActive
            ? "font-medium text-sidebar-foreground"
            : "text-(--sidebar-muted) hover:bg-card/60 hover:text-sidebar-foreground"
        )}
        title={open ? undefined : label}
      >
        <Icon className="size-4 shrink-0 text-(--sidebar-muted)" />
        <span className={open ? "min-w-0 flex-1 truncate text-left" : "sr-only"}>{label}</span>
        <ChevronRight
          className={cn(
            "ml-auto size-4 shrink-0 text-(--sidebar-muted) transition-transform",
            open ? "" : "sr-only",
            expanded && "rotate-90"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent
        className={
          horizontal
            ? "absolute top-full left-0 z-50 mt-1 flex min-w-48 flex-col gap-1 rounded-lg bg-sidebar p-1 shadow-md ring-1 ring-sidebar-border"
            : cn(
                "flex flex-col gap-1",
                open && "relative my-1 ml-4 border-l border-sidebar-border py-1 pl-3.5"
              )
        }
      >
        {item.children.map((child) => (
          <MenuLinkItem
            key={child.href}
            item={child}
            open={open}
            locale={locale}
            pathname={pathname}
            nested
            horizontal={horizontal}
            badgeCounts={badgeCounts}
            isAdmin={isAdmin}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
