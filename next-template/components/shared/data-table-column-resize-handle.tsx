"use client"

import { Lock, LockOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** Sütun başlığının sağ kenarına bindirilen kilit düğmesi + sürüklenebilir genişlik tutacı. */
export function DataTableColumnResizeHandle({
  locked,
  onToggleLock,
  onResizeStart,
  lockColumnLabel,
  unlockColumnLabel,
  resizeHandleLabel,
}: {
  locked: boolean
  onToggleLock: () => void
  /** `header.getResizeHandler()`'ın döndürdüğü handler; `unknown` parametresi dnd-kit olmadan doğrudan geçilebilir. */
  onResizeStart: (event: unknown) => void
  lockColumnLabel: string
  unlockColumnLabel: string
  resizeHandleLabel: string
}) {
  return (
    <div className="absolute inset-y-0 right-0 z-10 flex items-center gap-0.5">
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={locked ? unlockColumnLabel : lockColumnLabel}
        aria-pressed={locked}
        className="shrink-0 text-muted-foreground hover:text-foreground"
        onClick={(event) => {
          event.stopPropagation()
          onToggleLock()
        }}
      >
        {locked ? <Lock className="size-3" /> : <LockOpen className="size-3" />}
      </Button>
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label={resizeHandleLabel}
        aria-disabled={locked}
        className={cn(
          "h-1/2 w-1 touch-none select-none rounded-full",
          locked ? "cursor-not-allowed" : "cursor-col-resize hover:bg-primary/50"
        )}
        onMouseDown={locked ? undefined : onResizeStart}
        onTouchStart={locked ? undefined : onResizeStart}
      />
    </div>
  )
}
