import { sidebarCopy } from "@/components/layout/constants/sidebar/copy"
import { isMenuGroup, menuItems } from "@/components/layout/sidebar/menu-items"
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
  return (
    <nav
      aria-label={sidebarCopy[locale].menu}
      className={cn(
        "flex min-w-0 items-center gap-0.5 overflow-x-auto",
        "topmenu:gap-1",
        "topmenu:rounded-full",
        "topmenu:border",
        "topmenu:border-border",
        "topmenu:bg-card",
        "topmenu:p-1",
        "topmenu:shadow-sm"
      )}
    >
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
