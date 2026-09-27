"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { menuItems, type MenuLocale } from "./menuItems"

function localeFromPath(pathname: string): MenuLocale {
  const segment = pathname.split("/")[1]
  return segment === "en" ? "en" : "tr"
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
        {menuItems.map((item) => {
          const href = item.href === "/" ? `/${locale}` : `/${locale}${item.href}`
          const label = item.label[locale]
          const Icon = item.icon
          const active =
            item.href === "/"
              ? pathname === href
              : pathname === href || pathname.startsWith(`${href}/`)

          return (
            <Link
              key={item.href}
              href={href}
              title={open ? undefined : label}
              aria-current={active ? "page" : undefined}
              className={`flex h-9 shrink-0 items-center gap-3 overflow-hidden rounded-lg px-2.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                active
                  ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                  : ""
              }`}
            >
              <Icon className="size-4 shrink-0" />
              <span className={open ? "truncate" : "sr-only"}>{label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
