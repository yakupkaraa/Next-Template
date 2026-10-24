"use client"

import { Settings } from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { localeFromPath } from "@/lib/locales"
import { cn } from "@/lib/utils"
import { sidebarCopy } from "@/components/layout/constants/sidebar/copy"
import { BrandMark } from "./brand-mark"
import { isMenuGroup, menuItems } from "./menu-items"
import { MenuGroupItem, MenuLinkItem } from "./sidebar-menu-item"

export function Sidebar({
  open,
  orientation = "vertical",
  placement = "start",
  badgeCounts,
  isAdmin,
}: {
  open: boolean
  orientation?: "vertical" | "horizontal"
  placement?: "start" | "end"
  badgeCounts?: Partial<Record<string, number>>
  isAdmin?: boolean
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
            <BrandMark className="size-5" />
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
              badgeCounts={badgeCounts}
              isAdmin={isAdmin}
            />
          ) : (
            <MenuLinkItem
              key={item.href}
              item={item}
              open={labelsOpen}
              locale={locale}
              pathname={pathname}
              horizontal={horizontal}
              badgeCounts={badgeCounts}
              isAdmin={isAdmin}
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
                <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-success ring-2 ring-card" />
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
