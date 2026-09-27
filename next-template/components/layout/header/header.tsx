"use client"

import { LogOut, Menu, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/lib/session"
import { menuItems, type MenuLocale } from "../sidebar/menuItems"

function localeFromPath(pathname: string): MenuLocale {
  const segment = pathname.split("/")[1]
  return segment === "en" ? "en" : "tr"
}

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
  const toggleLabel = open
    ? locale === "en"
      ? "Collapse menu"
      : "Menüyü daralt"
    : locale === "en"
      ? "Expand menu"
      : "Menüyü genişlet"

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
        <Menu />
        <span className="sr-only">{toggleLabel}</span>
      </Button>
      <span className="text-sm font-medium">Site Adı</span>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="ml-auto"
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={locale === "en" ? "Profile" : "Profil"}
            />
          }
        >
          <User />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-40">
          <DropdownMenuItem render={<Link href={`/${locale}/profile`} />}>
            <User />
            {locale === "en" ? "Profile" : "Profil"}
          </DropdownMenuItem>
          <form action={signOut.bind(null, locale)}>
            <DropdownMenuItem
              nativeButton
              variant="destructive"
              render={<button type="submit" />}
            >
              <LogOut />
              {locale === "en" ? "Sign out" : "Çıkış yap"}
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
      {showMenu ? (
        <nav className="flex items-center gap-1">
          {menuItems.map((item) => {
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
