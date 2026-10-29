"use client"

import { Bell, Check, Moon, Settings, Sun } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import type { MouseEvent } from "react"
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
import { LocaleFlag } from "@/components/shared/locale-flag"
import { notifications } from "@/components/layout/mocks/notifications"
import { DEFAULT_THEME_ACCENT } from "@/lib/theme/accents"
import type { ShellLayout } from "@/lib/theme/storage"
import { originFromElement } from "@/lib/theme/theme-transition"
import { preloadOnHover } from "@/lib/preload-on-hover"
import { useThemeSettings } from "@/components/theme/theme-provider"
import { cn } from "@/lib/utils"

const SettingsPanel = dynamic(() =>
  import("@/components/theme/settings-panel").then((m) => ({ default: m.SettingsPanel }))
)

const preloadSettingsPanel = preloadOnHover(() => import("@/components/theme/settings-panel"))

export const SETTINGS_SHEET_ID = "app-settings-sheet"

const groupPill = cn(
  "flex shrink-0 items-center gap-1",
  "rounded-full",
  "border",
  "border-border",
  "bg-card",
  "shadow-sm",
  "p-1"
)

const groupItemButton = cn("rounded-full", "text-foreground", "hover:bg-muted")

export function HeaderActions({
  locale,
  pathname,
  layout,
  settingsOpen,
  onSettingsOpenChange,
  settingsMounted,
  onOpenSettings,
}: {
  locale: ReturnType<typeof localeFromPath>
  pathname: string
  layout: ShellLayout
  settingsOpen: boolean
  onSettingsOpenChange: (open: boolean) => void
  settingsMounted: boolean
  onOpenSettings: () => void
}) {
  const text = headerCopy[locale]
  const reverseChrome = layout === "right"
  const settingsSide = layout === "right" ? "left" : "right"
  const { appearance, setAppearance } = useThemeSettings()
  const isDark = appearance === "dark"

  function toggleAppearance(event: MouseEvent<HTMLButtonElement>) {
    setAppearance(isDark ? DEFAULT_THEME_ACCENT : "dark", originFromElement(event.currentTarget))
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-1",
        reverseChrome && "flex-row-reverse",
        "floating:gap-1.5"
      )}
    >
      <div className={cn(groupPill, reverseChrome && "flex-row-reverse")}>
        <DropdownMenu>
          <DropdownMenuTrigger
            nativeButton
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={text.language}
                className={groupItemButton}
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
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={isDark ? text.switchToLight : text.switchToDark}
          onClick={toggleAppearance}
          className={groupItemButton}
        >
          {isDark ? <Sun className="size-[1.2rem]" /> : <Moon className="size-[1.2rem]" />}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            nativeButton
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={text.notifications}
                className={cn("relative", groupItemButton)}
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
        <Sheet open={settingsOpen} onOpenChange={onSettingsOpenChange}>
          <SheetTrigger
            nativeButton
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={text.settings}
                onClick={onOpenSettings}
                onPointerEnter={preloadSettingsPanel}
                onFocus={preloadSettingsPanel}
                className={groupItemButton}
              />
            }
          >
            <Settings className="size-[1.2rem]" />
          </SheetTrigger>
          <SheetContent
            id={SETTINGS_SHEET_ID}
            side={settingsSide}
            className="w-full gap-3 overflow-y-auto sm:max-w-xs"
          >
            <SheetHeader>
              <SheetTitle>{text.settings}</SheetTitle>
            </SheetHeader>
            {settingsMounted && <SettingsPanel locale={locale} />}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
