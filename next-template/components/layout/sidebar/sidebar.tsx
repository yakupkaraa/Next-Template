"use client"

import { useState } from "react"
import { ChevronRight, LayoutGrid, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { localeFromPath, type Locale } from "@/lib/locales"
import { cn } from "cn"
import { getCurrentUser, openTicketCount, seedTickets } from "@/features/ticket/data"
import { sidebarCopy } from "./copy"
import { isMenuGroup, menuItems, type MenuGroup, type MenuLink } from "./menu-items"

function itemHref(locale: Locale, href: string) {
  return href === "/" ? `/${locale}` : `/${locale}${href}`
}

function isActive(pathname: string, itemPath: string, locale: Locale) {
  const href = itemHref(locale, itemPath)
  return pathname === href || pathname === `${href}/`
}

function MenuLinkItem({
  item,
  open,
  locale,
  pathname,
  nested = false,
  horizontal = false,
}: {
  item: MenuLink
  open: boolean
  locale: Locale
  pathname: string
  nested?: boolean
  horizontal?: boolean
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
      {item.badge === "open-tickets" && getCurrentUser().role === "admin" && open ? (
        <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
          {openTicketCount(seedTickets)}
        </span>
      ) : null}
    </Link>
  )
}

function MenuGroupItem({
  item,
  open,
  locale,
  pathname,
  horizontal = false,
}: {
  item: MenuGroup
  open: boolean
  locale: Locale
  pathname: string
  horizontal?: boolean
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
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

export function Sidebar({
  open,
  orientation = "vertical",
  placement = "start",
}: {
  open: boolean
  orientation?: "vertical" | "horizontal"
  placement?: "start" | "end"
}) {
  const pathname = usePathname()
  const locale = localeFromPath(pathname)
  const horizontal = orientation === "horizontal"
  const labelsOpen = horizontal || open
  const text = sidebarCopy[locale]
  const initials = text.userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)

  return (
    <aside
      id="panel-sidebar"
      className={cn(
        "flex shrink-0 flex-col bg-sidebar text-sidebar-foreground",
        horizontal
          ? "h-auto min-h-12 w-full overflow-visible border-b border-sidebar-border"
          : cn(
              "h-full min-h-0 self-stretch overflow-hidden transition-[width] duration-200",
              open ? "w-64" : "w-14",
              placement === "end" ? "border-l border-sidebar-border" : "border-r border-sidebar-border"
            )
      )}
    >
      {!horizontal ? (
        <div className={cn("flex h-16 shrink-0 items-center gap-3", open ? "px-4" : "justify-center px-2")}>
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <LayoutGrid className="size-5" />
          </div>
          {open ? (
            <div className="min-w-0 flex flex-col">
              <span className="truncate text-base font-semibold tracking-tight">{text.brand}</span>
              <span className="text-[11px] font-semibold tracking-[0.06em] text-(--sidebar-muted) uppercase">
                {text.panel}
              </span>
            </div>
          ) : null}
        </div>
      ) : null}

      {!horizontal && open ? (
        <p className="px-5 pt-4 pb-2 text-[11px] font-semibold tracking-[0.06em] text-(--sidebar-muted) uppercase">
          {text.menu}
        </p>
      ) : null}

      <nav
        className={cn(
          "flex gap-1 p-2",
          horizontal ? "h-auto min-h-12 flex-row flex-wrap items-center" : "min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain"
        )}
      >
        {menuItems.map((item) =>
          isMenuGroup(item) ? (
            <MenuGroupItem
              key={item.label.en}
              item={item}
              open={labelsOpen}
              locale={locale}
              pathname={pathname}
              horizontal={horizontal}
            />
          ) : (
            <MenuLinkItem
              key={item.href}
              item={item}
              open={labelsOpen}
              locale={locale}
              pathname={pathname}
              horizontal={horizontal}
            />
          )
        )}
      </nav>

      {!horizontal ? (
        <div className={cn("flex shrink-0 flex-col p-2", open ? "p-3" : "items-center")}>
          <div
            className={cn(
              "flex items-center rounded-xl border border-sidebar-border/60 bg-card/50",
              open ? "h-14 justify-between px-2.5" : "size-11 justify-center"
            )}
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="relative shrink-0">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {initials}
                </div>
                <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-card" />
              </div>
              {open ? (
                <div className="min-w-0 flex flex-col">
                  <span className="truncate text-sm font-semibold">{text.userName}</span>
                  <span className="text-xs text-(--sidebar-muted)">{text.userRole}</span>
                </div>
              ) : null}
            </div>
            {open ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={text.userSettings}
                className="shrink-0 text-(--sidebar-muted) hover:text-sidebar-foreground"
              >
                <Settings />
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}
    </aside>
  )
}
