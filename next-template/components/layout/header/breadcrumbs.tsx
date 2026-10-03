"use client"

import { Fragment } from "react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { headerCopy } from "@/components/layout/header/copy"
import {
  isMenuGroup,
  menuItems,
  type MenuGroup,
  type MenuLink,
} from "@/components/layout/sidebar/menu-items"
import type { Locale } from "@/lib/locales"
import { cn } from "cn"

function itemHref(locale: Locale, href: string) {
  return href === "/" ? `/${locale}` : `/${locale}${href}`
}

function routePath(pathname: string, locale: Locale) {
  const prefix = `/${locale}`
  if (pathname === prefix || pathname === `${prefix}/`) return "/"
  if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length)
  return pathname
}

function headerCrumbs(pathname: string, locale: Locale) {
  const rest = routePath(pathname, locale)
  const home = menuItems.find((item) => !isMenuGroup(item) && item.href === "/") as
    | MenuLink
    | undefined
  const homeLabel = home?.label[locale] ?? "Home"

  if (rest === "/") {
    return [{ label: homeLabel }]
  }

  const crumbs: { label: string; href?: string }[] = [
    { label: homeLabel, href: itemHref(locale, "/") },
  ]

  let group: MenuGroup | undefined
  let link: MenuLink | undefined
  let best = -1

  for (const item of menuItems) {
    if (isMenuGroup(item)) {
      for (const child of item.children) {
        if (rest === child.href || rest.startsWith(`${child.href}/`)) {
          if (child.href.length > best) {
            best = child.href.length
            group = item
            link = child
          }
        }
      }
    } else if (item.href !== "/" && (rest === item.href || rest.startsWith(`${item.href}/`))) {
      if (item.href.length > best) {
        best = item.href.length
        group = undefined
        link = item
      }
    }
  }

  if (group) {
    crumbs.push({ label: group.label[locale] })
  }

  if (link) {
    crumbs.push(
      rest === link.href
        ? { label: link.label[locale] }
        : { label: link.label[locale], href: itemHref(locale, link.href) }
    )
    const extra = rest.slice(link.href.length).split("/").filter(Boolean)
    extra.forEach((segment, index) => {
      const isLast = index === extra.length - 1
      crumbs.push({
        label: decodeURIComponent(segment),
        href: isLast ? undefined : `${itemHref(locale, link.href)}/${extra.slice(0, index + 1).join("/")}`,
      })
    })
  } else {
    rest
      .split("/")
      .filter(Boolean)
      .forEach((segment, index, parts) => {
        const isLast = index === parts.length - 1
        crumbs.push({
          label: decodeURIComponent(segment),
          href: isLast
            ? undefined
            : `/${locale}/${parts.slice(0, index + 1).join("/")}`,
        })
      })
  }

  return crumbs
}

export function HeaderBreadcrumbs({
  locale,
  pathname,
  className,
}: {
  locale: Locale
  pathname: string
  className?: string
}) {
  const crumbs = headerCrumbs(pathname, locale)
  const text = headerCopy[locale]

  return (
    <Breadcrumb className={cn("min-w-0 flex-1", className)} aria-label={text.breadcrumb}>
      <BreadcrumbList className="flex-nowrap overflow-x-auto">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1
          return (
            <Fragment key={`${crumb.label}-${index}`}>
              {index > 0 ? <BreadcrumbSeparator /> : null}
              <BreadcrumbItem className="shrink-0">
                {last || !crumb.href ? (
                  <BreadcrumbPage className="truncate">{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink render={<Link href={crumb.href} />}>{crumb.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
