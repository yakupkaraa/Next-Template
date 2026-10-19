"use client"

import { Bell, Check, LogOut, Menu, Settings, User } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useState } from "react"
import { usePathname } from "next/navigation"
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
import { HeaderBreadcrumbs } from "./breadcrumbs"
import { headerCopy } from "@/components/layout/constants/header/copy"
import { signOut } from "@/lib/session"
import { isMenuGroup, menuItems } from "../sidebar/menu-items"
import { LocaleFlag } from "@/components/shared/locale-flag"
import { notifications } from "@/components/layout/mocks/notifications"
import { useThemeSettings } from "@/components/theme/theme-provider"
import { preloadOnHover } from "@/lib/preload-on-hover"
import { HeaderNavLink } from "./header-nav-link"
import { HeaderNavGroup } from "./header-nav-group"

const SettingsPanel = dynamic(() =>
  import("@/components/theme/settings-panel").then((m) => ({ default: m.SettingsPanel }))
)

const preloadSettingsPanel = preloadOnHover(() => import("@/components/theme/settings-panel"))

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
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsMounted, setSettingsMounted] = useState(false)

  function openSettings() {
    setSettingsMounted(true)
    setSettingsOpen(true)
  }

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
      <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
        <SheetTrigger
          nativeButton
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={text.settings}
              onClick={openSettings}
              onPointerEnter={preloadSettingsPanel}
              onFocus={preloadSettingsPanel}
            />
          }
        >
          <Settings className="size-[1.2rem]" />
        </SheetTrigger>
        <SheetContent side={settingsSide} className="w-full gap-3 overflow-y-auto sm:max-w-xs">
          <SheetHeader>
            <SheetTitle>{text.settings}</SheetTitle>
          </SheetHeader>
          {settingsMounted && <SettingsPanel locale={locale} />}
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
          <form action={signOut.bind(null, locale)} className="w-full">
            <DropdownMenuItem
              nativeButton
              variant="destructive"
              className="w-full justify-start"
              render={<Button type="submit" variant="destructive" className="w-full justify-start" />}
            >
              <LogOut />
              {text.signOut}
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
  )

  const spacer = (
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <HeaderBreadcrumbs locale={locale} pathname={pathname} />
          {showMenu ? (
            <nav className="flex min-w-0 items-center gap-0.5 overflow-x-auto">
              {menuItems.map((item) =>
                isMenuGroup(item) ? (
                  <HeaderNavGroup key={item.label.en} item={item} locale={locale} pathname={pathname} />
                ) : (
                  <HeaderNavLink key={item.href} item={item} locale={locale} pathname={pathname} />
                )
              )}
            </nav>
          ) : null}
        </div>
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
