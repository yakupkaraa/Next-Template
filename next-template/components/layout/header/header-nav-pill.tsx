"use client"

import { sidebarCopy } from "@/components/layout/constants/sidebar/copy"
import { isMenuGroup, menuItems } from "@/components/layout/sidebar/menu-items"
import { useActiveIndicator } from "@/hooks/use-active-indicator"
import type { localeFromPath } from "@/lib/locales"
import { cn } from "@/lib/utils"
import { HeaderNavGroup } from "./header-nav-group"
import { HeaderNavLink } from "./header-nav-link"

export function HeaderNavPill({
  locale,
  pathname,
}: {
  locale: ReturnType<typeof localeFromPath>
  pathname: string
}) {
  const { containerRef, style } = useActiveIndicator<HTMLElement>([pathname])

  return (
    <nav
      ref={containerRef}
      aria-label={sidebarCopy[locale].menu}
      className={cn(
        "relative isolate flex min-w-0 items-center gap-0.5 overflow-x-auto",
        "transition-[border-radius,gap,padding,box-shadow] duration-300 ease-out",
        "topmenu:gap-1",
        "topmenu:rounded-full",
        "topmenu:border",
        "topmenu:border-border",
        "topmenu:bg-card",
        "topmenu:p-1",
        "topmenu:shadow-sm"
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 -z-10 rounded-full bg-primary transition-[transform,width,height,opacity] duration-300 ease-out"
        style={style}
      />
      {menuItems.map((item) =>
        isMenuGroup(item) ? (
          <HeaderNavGroup key={item.label.en} item={item} locale={locale} pathname={pathname} />
        ) : (
          <HeaderNavLink key={item.href} item={item} locale={locale} pathname={pathname} />
        )
      )}
    </nav>
  )
}
