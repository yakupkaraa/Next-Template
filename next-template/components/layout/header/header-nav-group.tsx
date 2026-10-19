import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { localeFromPath } from "@/lib/locales"
import type { MenuGroup } from "../sidebar/menu-items"

function itemHref(locale: ReturnType<typeof localeFromPath>, href: string) {
  return href === "/" ? `/${locale}` : `/${locale}${href}`
}

function isActive(pathname: string, href: string, locale: ReturnType<typeof localeFromPath>) {
  const full = itemHref(locale, href)
  return pathname === full || pathname === `${full}/`
}

export function HeaderNavGroup({
  item,
  locale,
  pathname,
}: {
  item: MenuGroup
  locale: ReturnType<typeof localeFromPath>
  pathname: string
}) {
  const Icon = item.icon
  const childActive = item.children.some((child) => isActive(pathname, child.href, locale))

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton
        render={
          <Button
            type="button"
            variant="ghost"
            className={cn(
              "h-9 shrink-0 gap-2 px-2.5 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              childActive && "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
            )}
          />
        }
      >
        <Icon className="size-4 shrink-0" />
        {item.label[locale]}
        <ChevronDown className="size-3.5 opacity-70" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-44 bg-sidebar text-sidebar-foreground">
        {item.children.map((child) => {
          const ChildIcon = child.icon
          return (
            <DropdownMenuItem key={child.href} render={<Link href={itemHref(locale, child.href)} />}>
              <ChildIcon />
              {child.label[locale]}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
