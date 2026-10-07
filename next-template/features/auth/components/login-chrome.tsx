"use client"

import { Check } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LocaleFlag } from "@/components/shared/locale-flag"
import { useThemeSettings } from "@/components/theme/theme-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getLoginCopy } from "@/features/auth/constants/copy"
import { resolveContentLocale } from "@/lib/i18n"
import { languages, swapLocale, type Locale } from "@/lib/locales"
import { settingsColors, type ThemeAppearance } from "@/lib/theme/accents"
import { cn } from "cn"

export function LoginChrome({
  locale,
  variant,
}: {
  locale: Locale
  variant: "desktop" | "mobile"
}) {
  const pathname = usePathname()
  const text = getLoginCopy(resolveContentLocale(locale))
  const { appearance, setAppearance } = useThemeSettings()
  const onBrand = variant === "mobile"

  const triggerClass = onBrand
    ? "size-10 min-h-10 min-w-10 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
    : "size-10 min-h-10 min-w-10 border border-border bg-card text-foreground"

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger
          nativeButton
          render={<Button type="button" variant="ghost" size="icon" className={triggerClass} aria-label={text.language} />}
        >
          <LocaleFlag code={locale} className="size-4" />
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
          render={<Button type="button" variant="ghost" size="icon" className={triggerClass} aria-label={text.theme} />}
        >
          <span
            className={cn(
              "size-4 rounded-sm",
              appearance === "dark" ? "bg-foreground" : "bg-primary"
            )}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-40">
          {settingsColors.map((item) => (
            <DropdownMenuItem key={item.id} onClick={() => setAppearance(item.id as ThemeAppearance)}>
              <span className={cn("size-4 rounded-sm", item.className)} />
              {item.id === "dark" ? "Dark" : item.id}
              {appearance === item.id ? <Check className="ml-auto" /> : null}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
