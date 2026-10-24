import Link from "next/link"
import { BrandMark } from "@/components/layout/sidebar/brand-mark"
import { sidebarCopy } from "@/components/layout/constants/sidebar/copy"
import type { localeFromPath } from "@/lib/locales"
import { cn } from "@/lib/utils"

export function HeaderBrandButton({
  locale,
}: {
  locale: ReturnType<typeof localeFromPath>
}) {
  return (
    <Link
      href={`/${locale}`}
      aria-label={sidebarCopy[locale].brand}
      className={cn(
        "hidden shrink-0 items-center justify-center rounded-2xl border border-border bg-card text-foreground shadow-sm outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2",
        "floating:flex",
        "floating:size-11"
      )}
    >
      <BrandMark className="size-5" />
    </Link>
  )
}
