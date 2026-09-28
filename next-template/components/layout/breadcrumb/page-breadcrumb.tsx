"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { House } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { localeFromPath, type Locale } from "@/lib/locales"
import { isMenuGroup, menuItems } from "@/components/layout/sidebar/menu-items"

function pagePath(pathname: string) {
  const locale = localeFromPath(pathname)
  const rest = pathname.slice(locale.length + 1)
  return rest === "" ? "/" : rest
}

function matches(path: string, href: string) {
  if (href === "/") return path === "/"
  return path === href || path.startsWith(`${href}/`)
}

function currentPage(path: string, locale: Locale) {
  for (const item of menuItems) {
    if (isMenuGroup(item)) {
      const child = item.children.find((entry) => matches(path, entry.href))
      if (child) {
        return {
          title: child.label[locale],
          group: item.children[0]
            ? { label: item.label[locale], href: item.children[0].href }
            : null,
          page: child,
        }
      }
    } else if (matches(path, item.href)) {
      return { title: item.label[locale], group: null, page: item }
    }
  }

  const segment = path.split("/").filter(Boolean).at(-1) ?? ""
  const label = { tr: segment, en: segment, de: segment, fr: segment, it: segment }
  return { title: segment, group: null, page: { label } }
}

export function PageBreadcrumb() {
  const pathname = usePathname()
  const locale = localeFromPath(pathname)
  const path = pagePath(pathname)
  const current = currentPage(path, locale)
  const home = menuItems.find((item) => !isMenuGroup(item) && item.href === "/")
  const homeLabel = home && !isMenuGroup(home) ? home.label[locale] : locale

  return (
    <div className="relative z-10 flex shrink-0 items-center justify-between gap-3 rounded-xl bg-muted px-4 py-3">
      <h2 className="text-base font-medium">{current.title}</h2>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            {path === "/" ? (
              <BreadcrumbPage>
                <House className="size-4" />
                <span className="sr-only">{homeLabel}</span>
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink render={<Link href={`/${locale}`} />}>
                <House className="size-4" />
                <span className="sr-only">{homeLabel}</span>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {current.group ? (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href={`/${locale}${current.group.href}`} />}>
                  {current.group.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          ) : null}
          {path !== "/" ? (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{current.page.label[locale]}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : null}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
