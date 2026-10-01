import type { ReactNode } from "react"
import { cn } from "cn"

type PageContentWidth = "default" | "full"

const widthClasses: Record<PageContentWidth, string> = {
  default: "mx-auto w-[90%] max-w-full",
  full: "w-full max-w-full",
}

/**
 * Dashboard içerik alanı: tek kaydırma, tutarlı boşluk, grid/kart taşmasını azaltır.
 * Yeni sayfalarda ek sarmalayıcı div gerekmez.
 */
export function PageContent({
  children,
  className,
  width = "default",
  fill = false,
}: {
  children: ReactNode
  className?: string
  width?: PageContentWidth
  /** İç scroll (ör. AI sohbet); dış PageContent kaydırmaz */
  fill?: boolean
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      <div
        data-page-scroll
        className={cn(
          "flex min-h-0 min-w-0 flex-1 flex-col overscroll-y-contain",
          fill ? "overflow-hidden py-0" : "overflow-x-hidden overflow-y-auto py-3"
        )}
      >
        <div
          data-page-content
          className={cn(
            "flex min-h-0 flex-1 flex-col",
            fill ? "gap-0 pb-0" : "gap-4 pb-6",
            widthClasses[width],
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
