"use client"

import { Bell, Check, ChevronDown, LogOut, Menu, Settings, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "cn"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { languages, localeFromPath, swapLocale } from "@/lib/locales"
import { headerBrand, headerCopy } from "./copy"
import { signOut } from "@/lib/session"
import { isMenuGroup, menuItems, type MenuGroup, type MenuLink } from "../sidebar/menu-items"
import { LocaleFlag } from "@/components/shared/locale-flag"
import { notifications } from "./notifications"
import { SettingsPanel } from "../settings/settings-panel"
import { useThemeSettings } from "@/components/theme/theme-provider"

function itemHref(locale: ReturnType<typeof localeFromPath>, href: string) {
  return href === "/" ? `/${locale}` : `/${locale}${href}`
}

function isActive(pathname: string, href: string, locale: ReturnType<typeof localeFromPath>) {
  const full = itemHref(locale, href)
  return pathname === full || pathname === `${full}/`
}

function HeaderNavLink({
  item,
  locale,
  pathname,
}: {
  item: MenuLink
  locale: ReturnType<typeof localeFromPath>
  pathname: string
}) {
  const href = itemHref(locale, item.href)
  const active = isActive(pathname, item.href, locale)
  const Icon = item.icon

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-lg px-2.5 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
        active ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : "text-sidebar-foreground"
      }`}
    >
      <Icon className="size-4 shrink-0" />
      {item.label[locale]}
    </Link>
  )
}

function HeaderNavGroup({
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
  const settingsSide = layout === "right" ? "left" : "right"
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

  const headerActions = (
      <div className={`flex shrink-0 items-center gap-1 ${reverseChrome ? "flex-row-reverse" : ""}`}>
      <DropdownMenu>
        <DropdownMenuTrigger
          nativeButton
          render={
            <Button type="button" variant="ghost" size="icon" aria-label={text.language} />
          }
        >
          <LocaleFlag code={locale} className="size-[1.2rem]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align={reverseChrome ? "start" : "end"} className="min-w-44">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              render={<Link href={swapLocale(pathname, language.code)} />}
            >
              <LocaleFlag code={language.code} />
              {language.label}
              {language.code === locale ? <Check className="ml-auto" /> : null}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger
          nativeButton
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={text.notifications}
              className="relative"
            />
          }
        >
          <Bell className="size-[1.2rem]" />
          <Badge className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px]">
            {notifications.length}
          </Badge>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={reverseChrome ? "start" : "end"} className="w-72">
          {notifications.map((item) => (
            <DropdownMenuItem key={item.id} className="items-start">
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="truncate">{item.title[locale]}</span>
                <span className="text-xs text-muted-foreground">{item.time[locale]}</span>
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Sheet>
        <SheetTrigger
          nativeButton
          render={
            <Button type="button" variant="ghost" size="icon" aria-label={text.settings} />
          }
        >
          <Settings className="size-[1.2rem]" />
        </SheetTrigger>
        <SheetContent side={settingsSide} className="w-full gap-3 overflow-y-auto sm:max-w-xs">
          <SheetHeader>
            <SheetTitle>{text.settings}</SheetTitle>
          </SheetHeader>
          <SettingsPanel locale={locale} />
        </SheetContent>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={text.profile}
            />
          }
        >
          <User className="size-[1.2rem]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align={reverseChrome ? "start" : "end"} className="min-w-40">
          <DropdownMenuItem render={<Link href={`/${locale}/profile`} />}>
            <User />
            {text.profile}
          </DropdownMenuItem>
          <form action={signOut.bind(null, locale)}>
            <DropdownMenuItem
              nativeButton
              variant="destructive"
              render={<Button type="submit" variant="destructive" />}
            >
              <LogOut />
              {text.signOut}
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
  )

  const brand = <span className="shrink-0 text-sm font-medium">{headerBrand}</span>
  const spacer = showMenu ? (
        <nav className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto">
          {menuItems.map((item) =>
            isMenuGroup(item) ? (
              <HeaderNavGroup key={item.label.en} item={item} locale={locale} pathname={pathname} />
            ) : (
              <HeaderNavLink key={item.href} item={item} locale={locale} pathname={pathname} />
            )
          )}
        </nav>
      ) : (
        <div className="min-w-0 flex-1" />
      )

  return (
    <header
      className={
        showMenu
          ? "flex h-14 shrink-0 items-center gap-3 border-b border-sidebar-border bg-sidebar px-4 text-sidebar-foreground [&_[data-slot=button]]:text-sidebar-foreground [&_[data-slot=button]:hover]:bg-sidebar-accent [&_[data-slot=button]:hover]:text-sidebar-accent-foreground"
          : "flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card px-4 text-foreground"
      }
    >
      {reverseChrome ? (
        <>
          {headerActions}
          {spacer}
          {brand}
          {sidebarToggle}
        </>
      ) : (
        <>
          {sidebarToggle}
          {brand}
          {spacer}
          {headerActions}
        </>
      )}
    </header>
  )
}
