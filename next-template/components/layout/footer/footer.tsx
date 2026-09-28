"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { localeFromPath } from "@/lib/locales"
import { footerContent } from "./content"

export function Footer() {
  const pathname = usePathname()
  const locale = localeFromPath(pathname)

  return (
    <footer className="flex h-14 shrink-0 items-center gap-4 border-t border-border bg-background px-4 text-sm text-muted-foreground">
      {footerContent.map((item) =>
        "href" in item ? (
          <Link
            key={item.label.tr}
            href={item.href === "/" ? `/${locale}` : `/${locale}${item.href}`}
            className="hover:text-foreground"
          >
            {item.label[locale]}
          </Link>
        ) : (
          <span key={item.label.tr}>{item.label[locale]}</span>
        )
      )}
    </footer>
  )
}
