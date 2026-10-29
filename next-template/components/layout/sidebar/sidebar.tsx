"use client"

import { LogOut, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useActiveIndicator } from "@/hooks/use-active-indicator"
import { localeFromPath } from "@/lib/locales"
import { signOut } from "@/lib/session"
import { cn } from "@/lib/utils"
import { headerCopy } from "@/components/layout/constants/header/copy"
import { sidebarCopy } from "@/components/layout/constants/sidebar/copy"
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
  const { containerRef, style: indicatorStyle } = useActiveIndicator<HTMLElement>([pathname, open, horizontal])
  const text = sidebarCopy[locale]
  const profileText = headerCopy[locale]
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
              placement === "end" ? "border-l border-sidebar-border" : "border-r border-sidebar-border",
              "floating:h-auto",
              "floating:my-3",
              "floating:rounded-2xl",
              "floating:border",
              "floating:border-sidebar-border",
              "floating:shadow-sm",
              placement === "end" ? "floating:mr-3" : "floating:ml-3"
            )
      )}
    >
      <nav
        ref={containerRef}
        className={cn(
          "relative isolate flex gap-1 p-2",
          horizontal ? "h-auto min-h-12 flex-row flex-wrap items-center" : "min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain"
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 -z-10 rounded-lg bg-[color-mix(in_oklch,var(--primary)_28%,var(--sidebar))] transition-[transform,width,height,opacity] duration-300 ease-out"
          style={indicatorStyle}
        />
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
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={profileText.profile}
                      className="shrink-0 text-(--sidebar-muted) hover:text-sidebar-foreground"
                    />
                  }
                >
                  <User />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-40">
                  <DropdownMenuItem render={<Link href={`/${locale}/profile`} />}>
                    <User />
                    {profileText.profile}
                  </DropdownMenuItem>
                  <form action={signOut.bind(null, locale)} className="w-full">
                    <DropdownMenuItem
                      nativeButton
                      variant="destructive"
                      className="w-full justify-start"
                      render={<Button type="submit" variant="destructive" className="w-full justify-start" />}
                    >
                      <LogOut />
                      {profileText.signOut}
                    </DropdownMenuItem>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>
        </div>
      ) : null}
    </aside>
  )
}
