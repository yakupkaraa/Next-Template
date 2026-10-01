"use client"

import { Bell, Check, LogOut, Menu, Settings, User } from "lucide-react"
import Link from "next/link"
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
import { headerBrand, headerCopy } from "./copy"
import { signOut } from "@/lib/session"
import { isMenuGroup, menuItems, type MenuLink } from "../sidebar/menu-items"
import { LocaleFlag } from "@/components/shared/locale-flag"
import { notifications } from "./notifications"
import { SettingsPanel } from "../settings/settings-panel"

export function Header({
  open,
  onToggle,
  showMenu = false,
}: {
  open: boolean
  onToggle: () => void
  showMenu?: boolean
}) {
  const pathname = usePathname()
  const locale = localeFromPath(pathname)
  const text = headerCopy[locale]
  const toggleLabel = open ? text.menuCollapse : text.menuExpand

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4">
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
      <span className="text-sm font-medium">{headerBrand}</span>
      <div className="ml-auto flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger
          nativeButton
          render={
            <Button type="button" variant="ghost" size="icon" aria-label={text.language} />
          }
        >
          <LocaleFlag code={locale} className="size-[1.2rem]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-44">
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
        <DropdownMenuContent align="end" className="w-72">
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
        <SheetContent side="right" className="w-full gap-3 overflow-y-auto sm:max-w-xs">
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
        <DropdownMenuContent align="end" className="min-w-40">
          <DropdownMenuItem render={<Link href={`/${locale}/profile`} />}>
            <User />
            {text.profile}
          </DropdownMenuItem>
          <form action={signOut.bind(null, locale)}>
            <DropdownMenuItem
              nativeButton
              variant="destructive"
              render={<button type="submit" />}
            >
              <LogOut />
              {text.signOut}
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
      {showMenu ? (
        <nav className="flex items-center gap-1">
          {menuItems
            .flatMap((item) => (isMenuGroup(item) ? item.children : [item]))
            .map((item: MenuLink) => {
            const href = item.href === "/" ? `/${locale}` : `/${locale}${item.href}`
            const active =
              item.href === "/"
                ? pathname === href
                : pathname === href || pathname.startsWith(`${href}/`)

            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted ${
                  active ? "bg-muted font-medium text-foreground" : "text-muted-foreground"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                {item.label[locale]}
              </Link>
            )
          })}
        </nav>
      ) : null}
    </header>
  )
}
