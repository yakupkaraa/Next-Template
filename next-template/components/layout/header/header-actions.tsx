"use client"

import { Bell, Check, LogOut, Settings, User } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useState } from "react"
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
import { languages, swapLocale, type localeFromPath } from "@/lib/locales"
import { headerCopy } from "@/components/layout/constants/header/copy"
import { sidebarCopy } from "@/components/layout/constants/sidebar/copy"
import { signOut } from "@/lib/session"
import { LocaleFlag } from "@/components/shared/locale-flag"
import { notifications } from "@/components/layout/mocks/notifications"
import type { ShellLayout } from "@/lib/theme/storage"
import { preloadOnHover } from "@/lib/preload-on-hover"
import { cn } from "@/lib/utils"

const SettingsPanel = dynamic(() =>
  import("@/components/theme/settings-panel").then((m) => ({ default: m.SettingsPanel }))
)

const preloadSettingsPanel = preloadOnHover(() => import("@/components/theme/settings-panel"))

const floatingIconButton = cn(
  "floating:rounded-full",
  "floating:border",
  "floating:border-border",
  "floating:bg-card",
  "floating:text-foreground",
  "floating:shadow-sm",
  "floating:hover:bg-muted"
)

export function HeaderActions({
  locale,
  pathname,
  layout,
}: {
  locale: ReturnType<typeof localeFromPath>
  pathname: string
  layout: ShellLayout
}) {
  const text = headerCopy[locale]
  const reverseChrome = layout === "right"
  const settingsSide = layout === "right" ? "left" : "right"
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsMounted, setSettingsMounted] = useState(false)
  const initials = sidebarCopy[locale].userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)

  function openSettings() {
    setSettingsMounted(true)
    setSettingsOpen(true)
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-1",
        reverseChrome && "flex-row-reverse",
        "floating:gap-1.5"
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          nativeButton
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={text.language}
              className={floatingIconButton}
            />
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
              className={cn("relative", floatingIconButton)}
            />
          }
        >
          <Bell className="size-[1.2rem]" />
          <Badge className={cn("absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px]", "floating:hidden")}>
            {notifications.length}
          </Badge>
          <span
            aria-hidden
            className={cn(
              "absolute top-1 right-1 hidden size-2 rounded-full bg-primary ring-2 ring-card",
              "floating:block"
            )}
          />
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
              className={floatingIconButton}
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
              className={cn(
                "floating:h-10",
                "floating:w-auto",
                "floating:rounded-full",
                "floating:border",
                "floating:border-border",
                "floating:bg-card",
                "floating:pl-1",
                "floating:pr-3",
                "floating:gap-2",
                "floating:shadow-sm",
                "floating:hover:bg-muted"
              )}
            />
          }
        >
          <User className={cn("size-[1.2rem]", "floating:hidden")} />
          <span className={cn("hidden items-center gap-2", "floating:flex")}>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {initials}
            </span>
            <span className="truncate text-sm font-medium">{sidebarCopy[locale].userName}</span>
          </span>
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
}
