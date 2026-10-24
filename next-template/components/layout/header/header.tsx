"use client"

import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { localeFromPath } from "@/lib/locales"
import { HeaderBreadcrumbs } from "./breadcrumbs"
import { headerCopy } from "@/components/layout/constants/header/copy"
import { useThemeSettings } from "@/components/theme/theme-provider"
import { HeaderActions } from "./header-actions"
import { HeaderBrandButton } from "./header-brand-button"
import { HeaderNavPill } from "./header-nav-pill"
import { cn } from "@/lib/utils"

export function Header({
  open,
  onToggle,
  showMenu = false,
  showSidebarToggle = true,
  className,
}: {
  open: boolean
  onToggle: () => void
  showMenu?: boolean
  showSidebarToggle?: boolean
  className?: string
}) {
  const pathname = usePathname()
  const locale = localeFromPath(pathname)
  const text = headerCopy[locale]
  const toggleLabel = open ? text.menuCollapse : text.menuExpand
  const { layout } = useThemeSettings()
  const reverseChrome = layout === "right"

  const sidebarToggle = showSidebarToggle ? (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-expanded={open}
        aria-controls="panel-sidebar"
        onClick={onToggle}
      >
        <Menu className="size-[1.2rem]" />
        <span className="sr-only">{toggleLabel}</span>
      </Button>
  ) : null

  const headerActions = <HeaderActions locale={locale} pathname={pathname} layout={layout} />

  const spacer = (
    <div className={cn("flex min-w-0 flex-1 items-center gap-3", showMenu && "floating:justify-center")}>
      <HeaderBreadcrumbs locale={locale} pathname={pathname} className={showMenu ? "floating:hidden" : undefined} />
      {showMenu ? <HeaderNavPill locale={locale} pathname={pathname} /> : null}
    </div>
  )

  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center gap-3 border-b px-4 backdrop-blur-sm",
        showMenu
          ? "border-sidebar-border bg-sidebar/40 text-sidebar-foreground [&_[data-slot=button]]:text-sidebar-foreground [&_[data-slot=button]:hover]:bg-sidebar-accent [&_[data-slot=button]:hover]:text-sidebar-accent-foreground"
          : "border-border bg-card/40 text-foreground",
        showMenu &&
          cn(
            "floating:mt-3",
            "floating:border-b-0",
            "floating:bg-transparent",
            "floating:text-foreground",
            "floating:backdrop-blur-none",
            "floating:[&_[data-slot=button]]:text-foreground",
            "floating:[&_[data-slot=button]:hover]:bg-muted",
            "floating:[&_[data-slot=button]:hover]:text-foreground"
          ),
        className
      )}
    >
      <HeaderBrandButton locale={locale} />
      {reverseChrome ? (
        <>
          {headerActions}
          {spacer}
          {sidebarToggle}
        </>
      ) : (
        <>
          {sidebarToggle}
          {spacer}
          {headerActions}
        </>
      )}
    </header>
  )
}
