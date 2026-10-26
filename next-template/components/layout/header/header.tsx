"use client"

import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { localeFromPath } from "@/lib/locales"
import { HeaderBreadcrumbs } from "./breadcrumbs"
import { headerCopy } from "@/components/layout/constants/header/copy"
import { useThemeSettings } from "@/components/theme/theme-provider"
import { HeaderActions } from "./header-actions"
import { HeaderNavPill } from "./header-nav-pill"
import { PageSearch } from "./page-search"
import { cn } from "@/lib/utils"

export function Header({
  open,
  onToggle,
  showMenu = false,
  showSidebarToggle = true,
}: {
  open: boolean
  onToggle: () => void
  showMenu?: boolean
  showSidebarToggle?: boolean
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
    <div className={cn("flex min-w-0 flex-1 items-center gap-3", showMenu && "topmenu:justify-center")}>
      <HeaderBreadcrumbs locale={locale} pathname={pathname} className={showMenu ? "topmenu:hidden" : undefined} />
      {showMenu ? <HeaderNavPill locale={locale} pathname={pathname} /> : null}
    </div>
  )

  return (
    <header
      className={cn(
        "relative flex h-14 shrink-0 items-center gap-3 border-b px-4",
        showMenu
          ? "border-sidebar-border bg-sidebar text-sidebar-foreground [&_[data-slot=button]]:text-sidebar-foreground [&_[data-slot=button]:hover]:bg-sidebar-accent [&_[data-slot=button]:hover]:text-sidebar-accent-foreground"
          : "border-border bg-card text-foreground",
        showMenu && "topmenu:h-[var(--header-row-h)]",
        "border-transparent",
        "supports-[backdrop-filter:blur(1px)]:bg-background/70",
        "supports-[backdrop-filter:blur(1px)]:backdrop-blur-md"
      )}
    >
      {showMenu ? null : (
        <div className="pointer-events-none absolute inset-0 hidden items-center justify-center sm:flex">
          <div className="pointer-events-auto w-full max-w-[28.8rem] px-4">
            <PageSearch locale={locale} />
          </div>
        </div>
      )}

      {showMenu ? (
        <>
          {spacer}
          {headerActions}
        </>
      ) : reverseChrome ? (
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
