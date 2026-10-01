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
          group: item.children[0]
            ? { label: item.label[locale], href: item.children[0].href }
            : null,
          page: child,
        }
      }
    } else if (matches(path, item.href)) {
      return { group: null, page: item }
    }
  }

  const segment = path.split("/").filter(Boolean).at(-1) ?? ""
  const label = { tr: segment, en: segment, de: segment, fr: segment, it: segment }
  return { group: null, page: { label } }
}

export function PageBreadcrumb() {
  const pathname = usePathname()
  const locale = localeFromPath(pathname)
  const path = pagePath(pathname)
  const current = currentPage(path, locale)
  const home = menuItems.find((item) => !isMenuGroup(item) && item.href === "/")
  const homeLabel = home && !isMenuGroup(home) ? home.label[locale] : locale
  const width =
    path === "/" || path === "/insights" ? "mx-auto w-[90%]" : path === "/profile" ? "mx-auto w-4/5" : ""

  return (
    <div
      className={`relative z-10 flex shrink-0 items-center justify-end gap-3 rounded-xl bg-muted px-4 py-3 ${width}`}
    >
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
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{current.page.label[locale]}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
