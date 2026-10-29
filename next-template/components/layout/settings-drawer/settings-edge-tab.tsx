"use client"

import { Settings, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { localeFromPath } from "@/lib/locales"
import { preloadOnHover } from "@/lib/preload-on-hover"
import { headerCopy } from "@/components/layout/constants/header/copy"
import { settingsDrawerCopy } from "@/components/layout/constants/settings-drawer/copy"
import { SETTINGS_SHEET_ID } from "@/components/layout/header/header-actions"
import { cn } from "@/lib/utils"

const preloadSettingsPanel = preloadOnHover(() => import("@/components/theme/settings-panel"))

export function SettingsEdgeTab({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const pathname = usePathname()
  const locale = localeFromPath(pathname)
  const text = settingsDrawerCopy[locale]

  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={SETTINGS_SHEET_ID}
      aria-label={open ? text.closeLabel : text.openLabel}
      title={headerCopy[locale].settings}
      onClick={onToggle}
      onPointerEnter={preloadSettingsPanel}
      onFocus={preloadSettingsPanel}
      className={cn(
        "fixed top-[35%] right-0 z-40 flex h-11 w-9 -translate-y-1/2 items-center justify-center",
        "rounded-l-xl border border-border bg-card text-foreground shadow-sm",
        "hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        "print:hidden"
      )}
    >
      {open ? <X className="size-[1.1rem]" /> : <Settings className="size-[1.1rem]" />}
    </button>
  )
}
